# 🚀 CareerGrowth – Backend Application

CareerGrowth is a backend application developed using **Node.js, TypeScript, and Express.js**, designed with a modular architecture and production-oriented backend engineering practices.

The project integrates MongoDB for data persistence, JWT-based authentication, AWS S3 for cloud file storage, and security middleware to protect API endpoints.

It also incorporates Docker-based containerization and GitHub Actions workflows to support automated development and deployment processes.

## 🚀 Key Features

### 🔐 Authentication & Authorization
- JWT-based authentication.
- Password hashing using bcrypt.
- Cookie-based authentication support using cookie-parser.
- Authentication middleware for protecting API endpoints.
- Secure handling of authentication credentials.

### 🗄️ Database Management
- MongoDB integration using Mongoose.
- Schema-based data modeling.
- Database operations through Mongoose models.
- Environment-based database configuration.

### ☁️ AWS S3 Integration
- Integrated AWS S3 for cloud-based file storage.
- AWS SDK v3 for interacting with S3 services.
- Multipart file upload support using Multer.
- Managed file uploads using AWS SDK's `@aws-sdk/lib-storage`.
- Cloud storage integration separated from application logic.

### 🛡️ API Security
- Helmet for HTTP security headers.
- Express Rate Limit for protecting APIs against excessive requests.
- Joi for request payload validation.
- CORS configuration for controlled cross-origin requests.
- Centralized environment-based configuration.

### 🏗️ TypeScript Development
- Built using TypeScript for static type checking.
- Strongly typed application components.
- TypeScript compiler for generating production JavaScript.
- Nodemon for development-time automatic restarts.

### 🔄 CI/CD & Containerization
- GitHub Actions workflows for CI/CD automation.
- Dockerfile for application containerization.
- Docker Compose for simplified application startup.
- Environment-based configuration for deployment.
- Production build using the TypeScript compiler.

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Programming Language | TypeScript, JavaScript |
| Runtime | Node.js |
| Backend Framework | Express.js 5 |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT, bcrypt, Cookie Parser |
| Validation | Joi |
| Cloud Storage | AWS S3 |
| AWS SDK | AWS SDK v3, Lib Storage |
| File Uploads | Multer |
| Security | Helmet, Express Rate Limit |
| Containerization | Docker, Docker Compose |
| CI/CD | GitHub Actions |
| Development Tools | Nodemon, TypeScript |
| Package Manager | npm |

## 🏗️ Architecture Overview

CareerGrowth uses a modular backend architecture that separates HTTP request handling, business logic, authentication, database operations, and external integrations.

### System Architecture

```text
                  Client
                    |
                    v
               Express Server
                    |
                    v
              Security Middleware
                    |
          +---------+---------+
          |                   |
          v                   v
    Authentication        API Routes
       Middleware              |
          |                    v
          |               Controllers
          |                    |
          |                    v
          |               Service Layer
          |                    |
          |          +---------+---------+
          |          |                   |
          v          v                   v
        JWT       MongoDB              AWS S3
                   Mongoose          File Storage
```

## 📁 Project Structure

The repository uses a TypeScript application structure.

```text
careergrowth/
│
├── .github/
│   └── workflows/          # GitHub Actions workflows
│
├── src/                    # TypeScript application source
│
├── Dockerfile              # Application Docker image
├── docker-compose.yml      # Docker Compose configuration
├── .dockerignore
├── .gitignore
├── nodemon.json            # Development configuration
├── package.json            # Dependencies and scripts
├── package-lock.json
└── tsconfig.json           # TypeScript configuration
```

## ⚙️ Getting Started

### Prerequisites

Ensure the following are installed:

- Node.js
- npm
- MongoDB or MongoDB Atlas
- Docker and Docker Compose
- AWS account with an S3 bucket
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Prasanna-cpu/careergrowth.git

cd careergrowth
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root.

```env
# Application
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_secure_jwt_secret

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_S3_BUCKET_NAME=your_bucket_name
```

Add any additional environment variables required by the application source code.

**Security considerations:**
- Never commit `.env` files to GitHub.
- Use IAM roles or secure credential providers for production AWS deployments.
- Keep JWT signing secrets private.
- Avoid exposing database credentials in application logs.

### 4. Run in Development Mode

Start the application using Nodemon:

```bash
npm run dev
```

### 5. Build the Application

Compile TypeScript into JavaScript:

```bash
npm run build
```

The compiled output is generated in the `dist/` directory.

### 6. Run the Production Build

```bash
npm start
```

The application starts using the compiled entry point:

```text
dist/index.js
```

## 🐳 Docker Deployment

CareerGrowth includes a Dockerfile and Docker Compose configuration for containerized execution.

### Build and Start

```bash
docker compose up --build
```

The application container is configured with:

- Dockerfile-based image building.
- Environment variable loading through `.env`.
- Port mapping from host port 3000 to container port 3000.
- Automatic container restart unless explicitly stopped.

### Stop Containers

```bash
docker compose down
```

## 🔄 CI/CD with GitHub Actions

GitHub Actions workflows are maintained under:

```text
.github/workflows/
```

The repository incorporates GitHub Actions for automating development workflows.

The TypeScript build process provides a compilation step that can be incorporated into automated validation.

This reduces repetitive manual operations and helps maintain consistency across code changes.

## 🔐 Security Considerations

- JWT-based authentication.
- Password hashing using bcrypt.
- Helmet for HTTP security headers.
- Rate limiting for API protection.
- Joi-based request validation.
- CORS configuration.
- Secure AWS credential management.
- Environment-based secret management.

## 🔮 Future Improvements

- Add comprehensive unit and integration testing.
- Introduce Redis caching for frequently accessed resources.
- Implement structured logging and centralized error handling.
- Add Swagger/OpenAPI documentation.
- Introduce automated deployment to AWS.
- Implement application monitoring and distributed tracing.
- Add health-check endpoints for container orchestration.

## 👨‍💻 Author

**Prasanna Kumar M**

- GitHub: [Prasanna-cpu](https://github.com/Prasanna-cpu)
- Repository: [CareerGrowth](https://github.com/Prasanna-cpu/careergrowth)

---

⭐ If you find this project interesting, consider giving the repository a star!
