# TransactHub: Real-Time Payment & Wallet Platform

## Tech Stack

- **Frontend & Backend**: [Next.js](https://nextjs.org/), [Express](https://expressjs.com/)
- **State Management**: React Context API
- **Monorepo Management**: [Turborepo](https://turbo.build/repo)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **CSS Framework**: [Tailwind CSS](https://tailwindcss.com/)
- **Deployment**: Docker, AWS ECS Fargate, Amazon ECR, Amazon RDS, CloudWatch

TransactHub is a distributed wallet application with separate user, merchant,
and bank-webhook services. It supports wallet funding, simulated bank
callbacks, peer-to-peer transfers, transaction history, and near-real-time
balance synchronization through the React Context API.

The project includes Terraform infrastructure under `infra/aws/` for deploying
the user app to ECS Fargate behind an Application Load Balancer, storing wallet
data in Amazon RDS for PostgreSQL, publishing images to Amazon ECR, and sending
container logs to CloudWatch. The GitHub Actions workflow uses AWS OIDC rather
than long-lived access keys.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v14 or later)
- PostgreSQL
- Docker (optional)

### Workflow

#### Apps Overview

- **user-app**: Handles user interactions and transactions.
- **merchant-app**: Manages merchant-related functionalities.
- **bank-webhook**: Simulates bank responses for transaction confirmations.

#### Wallet Funding Process

1. **Add Money:**
   - Navigate to the transfer section in **user-app**.
   - Select a bank and click **Add Money**.
   - You'll be redirected to the bank page.

2. **Simulate Bank Response:**
   - Since we don't have a real bank backend, we'll use **bank-webhook**.
   - Start the bank-webhook server:
     ```sh
     cd apps/bank-webhook
     npm run dev
     ```
   - Bank-webhook server runs at `http://localhost:3003`.

3. **Complete Transaction:**
   - Bank-webhook changes the transaction from **Processing** to **Success**.
   - The wallet context polls the authenticated wallet endpoint and reflects the credited amount without a full page reload.

#### P2P Transfer

- Send money to other users within the app using the **P2P transfer** section.

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/jenish16-9/transacthub.git
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up the database:**

   - Create a PostgreSQL database using a service like [Neon](https://neon.tech/) or [Aiven](https://console.aiven.io/).
   - Alternatively, run PostgreSQL using Docker:
     ```sh
     docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
     ```
   - Configure your `.env` file with your database credentials. An example `.env` file might look like:
     ```plaintext
     DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"
     ```

4. **Run database migrations:**

   ```sh
   npx prisma migrate dev --name initial_migration
   npx prisma generate
   ```
5. **Seed the database:**

   you already have seeded data in the database.
   you can login with the following credentials:
   ```plaintext
   number: 1111111111
   password: alice
   ```
   ```plaintext
   number: 2222222222
   password: bob
   ```

### Development

To start the development server, run:

```sh
npm run dev
```

### Docker

To build and run the application using Docker: 

1. **Build the Docker image:**

   ```sh
   docker build -t transacthub-user-app -f docker/Dockerfile.user-app .
   ```

2. **Run the Docker container:**

   ```sh
   docker run --env-file .env -p 3000:3000 transacthub-user-app
   ```

(keep in mind that you have to set up the database as mentioned in the installation section)

## Contributing

We love contributions! Whether you're fixing bugs, improving the documentation, or adding new features, your help is greatly appreciated.

### How to Contribute

1. **Fork the repository**:

   Click the "Fork" button at the top right of the repository page.

2. **Clone your fork**:

   ```sh
   git clone https://github.com/YOUR-USERNAME/transacthub.git
   cd transacthub
   ```

3. **Create a new branch**:

   ```sh
   git checkout -b my-new-feature
   ```

4. **Make your changes**:

   Make sure to test your changes thoroughly.

5. **Commit your changes**:

   ```sh
   git add .
   git commit -m "Add some feature"
   ```

6. **Push to your branch**:

   ```sh
   git push origin my-new-feature
   ```

7. **Create a Pull Request**:

   Go to the repository on GitHub and click the "Compare & pull request" button.

### What You Can Contribute

- **Bug Fixes**: Help us squash bugs!
- **New Features**: Have an idea for a cool new feature? Implement it and send us a PR.
- **Documentation**: Improve our documentation to help others understand how to use the project.

### Recognition

All contributors will receive a shoutout in our project's README and release notes. We appreciate your efforts and want to acknowledge your contributions!
