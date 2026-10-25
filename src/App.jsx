 
import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:7981/Job";

const emptyJob = {
  title: "",
  company: "",
  location: "",
  salary: "",
  experience: "",
  skills: "",
  status: "Open",
};

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [form, setForm] = useState(emptyJob);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadJobs() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API}/ByAll`);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        "Cannot connect to Spring Boot. Make sure your backend is running on port 7981."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const keyword = search.toLowerCase().trim();
    const city = location.toLowerCase().trim();

    const matchesKeyword =
      !keyword ||
      [job.title, job.company, job.skills, job.location]
        .some((value) =>
          String(value ?? "").toLowerCase().includes(keyword)
        );

    const matchesLocation =
      !city ||
      String(job.location ?? "").toLowerCase().includes(city);

    return matchesKeyword && matchesLocation;
  });

  function openCreate() {
    setEditId(null);
    setForm({ ...emptyJob });
    setShowForm(true);
    setError("");
    setMessage("");
  }

  function openEdit(job) {
    setEditId(job.jobId);
    setForm({
      title: job.title ?? "",
      company: job.company ?? "",
      location: job.location ?? "",
      salary: job.salary ?? "",
      experience: job.experience ?? "",
      skills: job.skills ?? "",
      status: job.status ?? "Open",
    });
    setShowForm(true);
    setError("");
    setMessage("");
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function saveJob(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    const editing = editId !== null;

    const payload = {
      ...form,
      salary: Number(form.salary),
      experience: Number(form.experience),
    };

    try {
      const response = await fetch(
        editing
          ? `${API}/Update/${editId}`
          : `${API}/Post`,
        {
          method: editing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      setShowForm(false);
      setMessage(editing ? "Job updated successfully!" : "Job added successfully!");
      await loadJobs();
    } catch (err) {
      setError(err.message || "Unable to save job.");
    }
  }

  async function deleteJob(job) {
    const confirmed = window.confirm(
      `Delete ${job.title || "this job"}?`
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API}/Delete/${job.jobId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.status}`);
      }

      setMessage("Job deleted successfully!");
      await loadJobs();
    } catch (err) {
      setError(err.message || "Unable to delete job.");
    }
  }

  function clearFilters() {
    setSearch("");
    setLocation("");
  }

  return (
    <div className="job-site">
      {/* Welcome heading */}
      <div className="api-welcome">
        Welcome to Vamsidhar JobPortal Rest Api
      </div>

      {/* Navigation */}
      <header className="site-header">
        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <a className="logo" href="#home">
          <span className="logo-mark">V</span>
          <span>Voo<span className="logo-dot">.</span></span>
        </a>

        <nav className={menuOpen ? "header-nav nav-open" : "header-nav"}>
          <a className="nav-current" href="#jobs" onClick={() => setMenuOpen(false)}>
            Find Jobs
          </a>
          <a href="#jobs" onClick={() => setMenuOpen(false)}>
            Employers
          </a>
          <a
            href="#post-job"
            onClick={() => {
              setMenuOpen(false);
              openCreate();
            }}
          >
            Upload Job
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About Us
          </a>
        </nav>

        <button className="header-post" onClick={openCreate}>
          + Post a job
        </button>
      </header>

      <main id="home">
        {/* Hero search */}
        <section className="hero">
          <div className="hero-copy">
            <span className="hero-kicker">YOUR NEXT CHAPTER STARTS HERE</span>
            <h1>
              Find Your Dream Job Here <span>✳</span>
            </h1>
            <p>
              Discover roles that match your ambition and help you grow.
            </p>
          </div>

          <div className="hero-decoration" aria-hidden="true">
            <div className="hero-circle circle-one">✦</div>
            <div className="hero-circle circle-two">V</div>
            <div className="hero-note">A better career<br />starts here.</div>
          </div>

          <form
            className="hero-search"
            onSubmit={(event) => {
              event.preventDefault();
              document.getElementById("jobs")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            <label className="search-field">
              <span>⌕</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Job title or keyword"
                aria-label="Job title or keyword"
              />
            </label>

            <span className="search-divider" />

            <label className="search-field">
              <span>⌖</span>
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Country or city"
                aria-label="Country or city"
              />
            </label>

            <button className="search-submit" type="submit">
              Search →
            </button>
          </form>
        </section>

        <section className="popular-tags">
          <strong>Popular:</strong>
          {["Java", "React", "Spring Boot", "SQL", "Python", "Frontend"].map(
            (tag) => (
              <button key={tag} onClick={() => setSearch(tag)}>
                {tag}
              </button>
            )
          )}
          <button onClick={clearFilters}>Clear filters</button>
        </section>

        {(error || message) && (
          <div className={error ? "notice notice-error" : "notice"}>
            {error || message}
            <button onClick={() => { setError(""); setMessage(""); }}>
              ×
            </button>
          </div>
        )}

        {/* Jobs */}
        <section className="jobs-layout" id="jobs">
          <aside className="filter-panel">
            <div className="filter-heading">
              <h2>Filters</h2>
              <button onClick={clearFilters}>Clear all</button>
            </div>

            <div className="filter-group">
              <h3>Search jobs</h3>
              <input
                className="filter-input"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Title, company, skill"
              />
            </div>

            <div className="filter-group">
              <h3>Location</h3>
              <input
                className="filter-input"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="e.g. Hyderabad"
              />
            </div>

            <div className="filter-help">
              <span>✦</span>
              <h3>Find your next opportunity</h3>
              <p>Explore job listings and take the next step in your career.</p>
              <button onClick={clearFilters}>View all jobs →</button>
            </div>
          </aside>

          <div className="job-results">
            <div className="results-header">
              <div>
                <span className="results-eyebrow">CAREER OPPORTUNITIES</span>
                <h2>
                  Recommended Jobs <span className="job-count">{filteredJobs.length}</span>
                </h2>
                <p>Find the right opportunity for your next move.</p>
              </div>

              <button className="post-job-button" id="post-job" onClick={openCreate}>
                + Post a job
              </button>
            </div>

            <div className="results-toolbar">
              <span>
                {loading ? "Loading jobs..." : `Showing ${filteredJobs.length} jobs`}
              </span>
              <button onClick={loadJobs} disabled={loading}>↻ Refresh</button>
            </div>

            {loading && jobs.length === 0 ? (
              <div className="empty-results">Loading job listings...</div>
            ) : filteredJobs.length === 0 ? (
              <div className="empty-results">
                <span>⌕</span>
                <h3>No jobs found</h3>
                <p>Try a different keyword or add a new job listing.</p>
                <button className="post-job-button" onClick={openCreate}>
                  + Create a job
                </button>
              </div>
            ) : (
              <div className="result-list">
                {filteredJobs.map((job) => (
                  <article className="result-row" key={job.jobId}>
                    <div className="company-logo">
                      {(job.company || "J").charAt(0).toUpperCase()}
                    </div>

                    <div className="result-main">
                      <div className="result-title-line">
                        <h3>{job.title || "Untitled position"}</h3>
                        <span className="job-status">
                          {job.status || "Open"}
                        </span>
                      </div>

                      <p className="result-company">
                        {job.company || "Company not specified"}
                      </p>

                      <div className="result-meta">
                        <span>⌖ {job.location || "Location not specified"}</span>
                        <span>
                          {Number(job.experience) === 0
                            ? "Fresher"
                            : `${job.experience ?? "—"} years experience`}
                        </span>
                        <strong>
                          {job.salary !== "" && job.salary != null
                            ? `₹${Number(job.salary).toLocaleString("en-IN")}`
                            : "Salary not specified"}
                        </strong>
                      </div>

                      <div className="result-tags">
                        {String(job.skills || "Skills not specified")
                          .split(",")
                          .slice(0, 4)
                          .map((skill, index) => (
                            <span key={`${skill}-${index}`}>{skill.trim()}</span>
                          ))}
                      </div>
                    </div>

                    <div className="result-actions">
                      <button
                        title="Edit job"
                        aria-label="Edit job"
                        onClick={() => openEdit(job)}
                      >
                        ✎
                      </button>
                      <button
                        title="Delete job"
                        aria-label="Delete job"
                        className="delete-button"
                        onClick={() => deleteJob(job)}
                      >
                        ×
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="results-footer">
              <span>Job Portal REST API</span>
              <button onClick={loadJobs}>Refresh listings ↗</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="about">
        <span><strong>Voo.</strong> Find work that moves you.</span>
        <span>Welcome to Vamsidhar JobPortal Rest Api</span>
      </footer>

      {/* Create and update modal */}
      {showForm && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowForm(false);
          }}
        >
          <section className="job-modal">
            <div className="modal-head">
              <div>
                <span className="results-eyebrow">JOB MANAGEMENT</span>
                <h2>{editId !== null ? "Update Job" : "Post a New Job"}</h2>
                <p>Enter the job details below.</p>
              </div>
              <button className="modal-x" onClick={() => setShowForm(false)}>
                ×
              </button>
            </div>

            <form className="modal-form" onSubmit={saveJob}>
              <label>
                Job title *
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="Java Developer"
                />
              </label>

              <label>
                Company *
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  required
                  placeholder="Company name"
                />
              </label>

              <label>
                Location *
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  placeholder="Hyderabad"
                />
              </label>

              <label>
                Annual salary (₹) *
                <input
                  name="salary"
                  type="number"
                  min="0"
                  value={form.salary}
                  onChange={handleChange}
                  required
                  placeholder="600000"
                />
              </label>

              <label>
                Experience in years *
                <input
                  name="experience"
                  type="number"
                  min="0"
                  value={form.experience}
                  onChange={handleChange}
                  required
                  placeholder="0"
                />
              </label>

              <label>
                Status
                <select name="status" value={form.status} onChange={handleChange}>
                  <option>Open</option>
                  <option>Closed</option>
                  <option>On Hold</option>
                </select>
              </label>

              <label className="modal-wide">
                Skills *
                <textarea
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="Java, Spring Boot, MySQL"
                />
              </label>

              <div className="modal-buttons">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button className="search-submit" type="submit">
                  {editId !== null ? "Update Job →" : "Create Job →"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
