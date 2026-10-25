# Job Portal REST API

A full-stack Job Portal application developed using Spring Boot and React.js that allows users to manage job listings through RESTful APIs and a responsive web interface.

## 🚀 Features

- Create, retrieve, update, and delete job listings (CRUD operations).
- Search and manage job information.
- RESTful API integration between frontend and backend.
- Responsive user interface built with React.js.
- Database integration using Spring Data JPA and MySQL.
- API testing using Postman.

## 🛠️ Technologies Used

**Backend**
- Java
- Spring Boot
- Spring Web
- Spring Data JPA / Hibernate
- MySQL
- Maven

**Frontend**
- React.js
- JavaScript
- HTML5
- CSS3
- Vite

**Tools**
- Git & GitHub
- Postman
- VS Code
- MySQL Workbench

## 📁 Project Structure

```text
Job-Portal-Rest-Api/
├── src/
│   ├── main/
│   │   ├── java/
│   │   └── resources/
│   └── test/
├── pom.xml
├── JobPortalFrontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

*Adjust the folder names if your actual project structure differs.*

## ⚙️ Prerequisites

- Java JDK
- Maven
- Node.js and npm
- MySQL Server

## 🔧 Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Vamsidhar-Developer/Job-Portal-Rest-Api.git
   ```

2. Open the project in your IDE.
3. Configure your MySQL database and update `application.properties` with your local database settings.
4. Run the Spring Boot application from your IDE or using Maven:

   ```bash
   mvn spring-boot:run
   ```

## 💻 Frontend Setup

1. Open a terminal in the frontend directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL displayed in the terminal.

## 🔗 API Endpoints

Example CRUD endpoint structure (adjust paths to match your controller):

| Method | Endpoint | Description |
|---|---|---|
| GET | `/Job/All` | Retrieve all jobs |
| GET | `/Job/{id}` | Retrieve a job by ID |
| POST | `/Job` | Create a job |
| PUT | `/Job/{id}` | Update a job |
| DELETE | `/Job/{id}` | Delete a job |

## 🔐 Configuration

Configure your database connection and frontend API base URL for your local environment. Never commit database passwords, API keys, or other secrets.

## 👨‍💻 Author

**Nelapati Vamsidhar**

GitHub: [Vamsidhar-Developer](https://github.com/Vamsidhar-Developer)

## 📄 License

This project is intended for educational and portfolio purposes unless a separate license is provided.
