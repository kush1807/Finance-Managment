 Full-Stack Personal Finance Dashboard
This document provides a comprehensive overview, feature list, and detailed setup guide for the Full-Stack Personal Finance Dashboard. This complete web application is engineered for secure and efficient personal finance tracking and visualization. Project OverviewThe dashboard offers users secure access to their financial data, providing clear, actionable insights into spending habits, transaction history, and overall balance trends.ComponentStackKey FunctionalityFrontend (UI)Next.js, TypeScript, Tailwind CSSData visualization, robust user interface, and authentication flow management.Backend (API)Node.js (Express), Prisma, PostgreSQLSecure REST API, reliable data persistence, and core business logic implementation.CachingRedis (Upstack Cache)Optimizes dashboard performance by caching frequently accessed data for rapid retrieval. Core FeaturesSecure Authentication: Utilizes JSON Web Tokens (JWT) for a robust, stateless authorization system across user registration and login endpoints.High Performance: Achieved through the integration of an external Redis cache instance, significantly accelerating dashboard data retrieval times.Dynamic Data Visualization: Features a dynamic Bar Chart on the dashboard, which accurately displays the calculated running balance across the last 10 transactions.Data Integrity: Ensures a structured starting point for the database with initial Category and Transaction data seeded via specific Prisma scripts. Setup and Installation GuidePrerequisitesEnsure the following essential software components are installed on your system:Node.js (LTS version)PostgreSQL Database InstanceGitAccess to a Redis instance (e.g., Upstack Online Cache).Global SetupClone the Repository:Bashgit clone <repository-url>
cd User-Dashboard
 Backend Setup (API and Database Logic)The backend handles all API and data persistence operations.1. Environment ConfigurationCreate a file named .env in the ./backend directory and populate it with your specific credentials:Bash# .env (in backend folder)
DATABASE_URL="postgresql://[USER]:[PASSWORD]@localhost:5432/finance_db"
JWT_SECRET="YOUR_STRONG_RANDOM_SECRET_KEY"
REDIS_URL="redis://<your-upstack-url>:<port>"
2. Install DependenciesNavigate to the backend directory and install necessary packages:Bashcd backend
npm install
3. Database Migration and SeedingRun the following commands to initialize and populate the database with initial data.⚠️ WARNING: The prisma migrate reset command will drop and recreate all data in your database!Bash# Reset database and run migrations
npx prisma migrate reset

# Run seed scripts in order: Categories -> [User Creation] -> Transactions
npx ts-node prisma/seedCategories.ts
# (Run your user creation script here if separate, otherwise it's handled on initial login/register.)
npx ts-node prisma/seedTransactions.ts
4. Run the API ServerStart the Node.js API server:Bashnpm run dev
The API will be accessible at http://localhost:4000. Frontend Setup (UI)The frontend is a Next.js application responsible for the user interface.1. Environment ConfigurationCreate a file named .env.local in the ./ui directory:Bash# .env.local (in ui folder)
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
2. Install DependenciesNavigate to the frontend directory and install dependencies:Bashcd ../ui
npm install
3. Run the Client ApplicationStart the Next.js development server:Bashnpm run dev

The dashboard application will be accessible at http://localhost:3000. Key API EndpointsEndpointMethodAuthenticationPurpose/api/v1/auth/registerPOSTNoneCreate a new user account./api/v1/auth/loginPOSTNoneAuthenticate user and issue JWT./api/v1/dashboardGETBearer TokenRetrieve cached and aggregated financial data for the dashboard view.🎨 Frontend Architecture HighlightsGlobal State Management: Key user and dashboard data is centralized and managed within ui/app/layout.tsx to ensure consistent state across the application.Data Flow: Data fetching is handled using the axios library, securely passing the JWT in the Authorization: Bearer <token> HTTP header.Visualization Logic: The SpendChart.tsx component is dedicated to handling the complex business logic of sorting transactions by date and calculating the running balance for accurate chart representation.
