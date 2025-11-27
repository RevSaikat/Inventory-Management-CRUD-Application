# CRUD Application - Full Stack Inventory Management

A modern full-stack web application for inventory management built with Spring Boot and React.

## 🚀 Tech Stack

### Backend
- **Framework**: Spring Boot 3.2.3
- **Language**: Java 17
- **Database**: MySQL (XAMPP)
- **Security**: Spring Security with role-based access control
- **Libraries**: Lombok, Bean Validation

### Frontend
- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router 7.9.6
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

## 📋 Features

- ✅ User Authentication (Admin/User roles)
- ✅ CRUD Operations for inventory items
- ✅ Role-based access control
- ✅ Image upload support
- ✅ Search and filter functionality
- ✅ Responsive modern UI
- ✅ Form validation (frontend & backend)
- ✅ Global error handling

## 🛠️ Prerequisites

Before running this application, ensure you have the following installed:

- **Java 17** or higher
- **Maven** 3.6+
- **Node.js** 18+ and npm
- **XAMPP** (for MySQL database)

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "Crud App"
```

### 2. Database Setup (XAMPP)

1. **Start XAMPP**:
   - Open XAMPP Control Panel
   - Start **Apache** and **MySQL** services

2. **Create Database**:
   - Open browser and go to `http://localhost/phpmyadmin`
   - The application will automatically create the `crud_db` database on first run
   - Alternatively, create it manually:
     ```sql
     CREATE DATABASE crud_db;
     ```

3. **Verify Connection**:
   - Default XAMPP MySQL credentials:
     - Host: `localhost:3306`
     - Username: `root`
     - Password: *(empty)*

### 3. Backend Setup

```bash
cd backend

# The application uses Spring profiles
# For development (XAMPP), it will use application-dev.properties by default

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

**Default Users** (seeded automatically):
- **Admin**: username: `admin`, password: `admin123`
- **User**: username: `user`, password: `user123`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🌍 Environment Configuration

### Backend Profiles

The application supports multiple environments:

- **Development** (`application-dev.properties`): Uses XAMPP MySQL
- **Production** (`application-prod.properties`): Template for production deployment

To switch profiles, edit `backend/src/main/resources/application.properties`:
```properties
spring.profiles.active=dev  # or 'prod' for production
```

### Frontend Environment Variables

Create environment-specific files:

- `.env.development` - Already configured for local development
- `.env.production` - Update with production API URL

Example:
```env
VITE_API_URL=http://localhost:8080
```

## 📁 Project Structure

```
Crud App/
├── backend/
│   └── src/main/
│       ├── java/com/example/crud/
│       │   ├── config/          # Security & configuration
│       │   ├── controller/      # REST API endpoints
│       │   ├── entity/          # JPA entities (Lombok)
│       │   ├── exception/       # Global error handling
│       │   ├── repository/      # Data access layer
│       │   └── service/         # Business logic
│       └── resources/
│           ├── application.properties
│           ├── application-dev.properties
│           └── application-prod.properties
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable UI components
    │   ├── pages/          # Page components
    │   └── services/       # API service layer
    ├── .env.development
    ├── .env.production
    └── .env.example
```

## 🔐 User Roles & Permissions

### Admin Role
- Full CRUD access to items
- Can create, update, and delete items
- Access to all pages

### User Role
- **Read-only** access to items
- Can view items and dashboard
- Cannot modify inventory

## 🚀 Usage

1. **Login**: Navigate to `http://localhost:5173` and login with default credentials
2. **Dashboard**: View statistics and overview
3. **Items Management**: 
   - View all items (Admin & User)
   - Add/Edit/Delete items (Admin only)
   - Search and filter items
   - Upload item images
4. **Settings**: Manage user preferences

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Items
- `GET /api/items` - Get all items (Authenticated)
- `GET /api/items/{id}` - Get item by ID (Authenticated)
- `POST /api/items` - Create new item (Admin only)
- `PUT /api/items/{id}` - Update item (Admin only)
- `DELETE /api/items/{id}` - Delete item (Admin only)

## 🔧 Development

### Run Backend Tests
```bash
cd backend
mvn test
```

### Run Frontend Tests
```bash
cd frontend
npm run test
```

### Build for Production

**Backend**:
```bash
cd backend
mvn clean package
# JAR file will be in target/ directory
```

**Frontend**:
```bash
cd frontend
npm run build
# Build output will be in dist/ directory
```

## 🐛 Troubleshooting

### Database Connection Issues

1. **Ensure XAMPP MySQL is running**:
   - Open XAMPP Control Panel
   - MySQL status should be green/running

2. **Check MySQL port**:
   - Default is 3306
   - If changed, update `application-dev.properties`

3. **Verify credentials**:
   - XAMPP default: username=`root`, password=*(empty)*

### CORS Issues

- Ensure backend is running on port 8080
- Frontend allowed origins configured in `SecurityConfig.java`

### Build Errors

**Backend**:
```bash
mvn clean install -U  # Force update dependencies
```

**Frontend**:
```bash
rm -rf node_modules package-lock.json
npm install
```
     CREATE DATABASE crud_db;
     ```

3. **Verify Connection**:
   - Default XAMPP MySQL credentials:
     - Host: `localhost:3306`
     - Username: `root`
     - Password: *(empty)*

### 3. Backend Setup

```bash
cd backend

# The application uses Spring profiles
# For development (XAMPP), it will use application-dev.properties by default

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

**Default Users** (seeded automatically):
- **Admin**: username: `admin`, password: `admin123`
- **User**: username: `user`, password: `user123`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🌍 Environment Configuration

### Backend Profiles

The application supports multiple environments:

- **Development** (`application-dev.properties`): Uses XAMPP MySQL
- **Production** (`application-prod.properties`): Template for production deployment

To switch profiles, edit `backend/src/main/resources/application.properties`:
```properties
spring.profiles.active=dev  # or 'prod' for production
```

### Frontend Environment Variables

Create environment-specific files:

- `.env.development` - Already configured for local development
- `.env.production` - Update with production API URL

Example:
```env
VITE_API_URL=http://localhost:8080
```

## 📁 Project Structure

```
Crud App/
├── backend/
│   └── src/main/
│       ├── java/com/example/crud/
│       │   ├── config/          # Security & configuration
│       │   ├── controller/      # REST API endpoints
│       │   ├── entity/          # JPA entities (Lombok)
│       │   ├── exception/       # Global error handling
│       │   ├── repository/      # Data access layer
│       │   └── service/         # Business logic
│       └── resources/
│           ├── application.properties
│           ├── application-dev.properties
│           └── application-prod.properties
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable UI components
    │   ├── pages/          # Page components
    │   └── services/       # API service layer
    ├── .env.development
    ├── .env.production
    └── .env.example
```

## 🔐 User Roles & Permissions

### Admin Role
- Full CRUD access to items
- Can create, update, and delete items
- Access to all pages

### User Role
- **Read-only** access to items
- Can view items and dashboard
- Cannot modify inventory

## 🚀 Usage

1. **Login**: Navigate to `http://localhost:5173` and login with default credentials
2. **Dashboard**: View statistics and overview
3. **Items Management**: 
   - View all items (Admin & User)
   - Add/Edit/Delete items (Admin only)
   - Search and filter items
   - Upload item images
4. **Settings**: Manage user preferences

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Items
- `GET /api/items` - Get all items (Authenticated)
- `GET /api/items/{id}` - Get item by ID (Authenticated)
- `POST /api/items` - Create new item (Admin only)
- `PUT /api/items/{id}` - Update item (Admin only)
- `DELETE /api/items/{id}` - Delete item (Admin only)

## 🔧 Development

### Run Backend Tests
```bash
cd backend
mvn test
```

### Run Frontend Tests
```bash
cd frontend
npm run test
```

### Build for Production

**Backend**:
```bash
cd backend
mvn clean package
# JAR file will be in target/ directory
```

**Frontend**:
```bash
cd frontend
npm run build
# Build output will be in dist/ directory
```

## 🐛 Troubleshooting

### Database Connection Issues

1. **Ensure XAMPP MySQL is running**:
   - Open XAMPP Control Panel
   - MySQL status should be green/running

2. **Check MySQL port**:
   - Default is 3306
   - If changed, update `application-dev.properties`

3. **Verify credentials**:
   - XAMPP default: username=`root`, password=*(empty)*

### CORS Issues

- Ensure backend is running on port 8080
- Frontend allowed origins configured in `SecurityConfig.java`

### Build Errors

**Backend**:
```bash
mvn clean install -U  # Force update dependencies
```

**Frontend**:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This project is licensed under the MIT License.

## ☁️ Deployment (Render)

This application is configured for seamless deployment on [Render](https://render.com).

### Configuration
- **Local Development**: Uses **MySQL** (XAMPP) via the `dev` profile.
- **Render Production**: Uses **PostgreSQL** via the `prod` profile.

### How it works
The `render.yaml` blueprint automatically:
1. Provision a free **PostgreSQL** database.
2. Builds the Backend (Docker) and connects it to the database.
3. Builds the Frontend (Static Site) and connects it to the backend.

### Steps to Deploy
1. Push this code to GitHub.
2. Log in to Render and go to **Blueprints**.
3. Click **New Blueprint Instance** and select your repository.
4. Click **Apply**. Render handles the rest!

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue in the repository.
