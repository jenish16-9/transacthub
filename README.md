# Paytm Project

## Tech Stack

- **Frontend & Backend**: [Next.js](https://nextjs.org/)
- **Auxiliary Backend**: [Express](https://expressjs.com/)
- **Monorepo Management**: [Turborepo](https://turborepo.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **CSS Framework**: [Tailwind CSS](https://tailwindcss.com/)

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

#### Money Transfer Process

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
   - Bank-webhook will change the status from **pending** to **success**.
   - Once the status is updated, the user's wallet will reflect the credited amount.

#### P2P Transfer

- Send money to other users within the app using the **P2P transfer** section.

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/priyanshu1044/paytm-final.git
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
   docker build -t priyanshu1044/paytm-final -f docker/Dockerfile.user-app .
   ```

2. **Run the Docker container:**

   ```sh
   docker run -p 3000:3000 priyanshu1044/paytm-final
   ```

(keep in mind that you have to set up the database as mentioned in the installation section)

## Contributing

We love contributions! Whether you're fixing bugs, improving the documentation, or adding new features, your help is greatly appreciated.

### How to Contribute

1. **Fork the repository**:

   Click the "Fork" button at the top right of the repository page.

2. **Clone your fork**:

   ```sh
   git clone https://github.com/YOUR-USERNAME/paytm-final.git
   cd paytm-final
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