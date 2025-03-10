![Citizen of Arcanis Banner](https://drive.google.com/uc?export=view&id=1cdj5-PQYFpt1LNz9va0Bdug3B1OhRs0b)


# Citizen of Arcanis Backend

## 📌 Prerequisites
Before starting the project, make sure you have the following tools installed:

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [NestJS CLI](https://docs.nestjs.com/) (`npm install -g @nestjs/cli`)
- [Docker](https://www.docker.com/) (for PostgreSQL database)
- [PostgreSQL](https://www.postgresql.org/) (if you don't want to use Docker)

---

## 🚀Installation

### 1️⃣ Clone the repository
```sh
git clone https://github.com/YOUR-USER/citizen-of-arcanis-backend.git
cd citizen-of-arcanis-backend
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Setup the environment
Create a .env file in the root of the project with the following content:
```sh
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=password
DB_NAME=coa_database
JWT_SECRET=supersecretkey
CONTRACT_ADDRESS=0x040811bb6636316c9f1809e2898285976d2a0db66e33703defbfb0c7572b87ad
WALLET_ADDRESS=0x066EE9d5F6791270d7cD1314ddB9fc8f7EdCb59E2847e2b13D57A06e7c988D63
WALLET_PRIVATE_KEY=0x0363c39930af5bfd1890d94963a503fec02cc4965080517dc2888c1671a5e25a
STARKNET_NETWORK=sepolia-alpha

```

If you use Docker, simply run:
```sh
docker-compose -d

```
### 4️⃣ Run the server
```sh
npm run start:dev
```

```sh
start npm run: dev
```

### 📖 Project structure

```sh
citizen-of-arcanis-backend/
│── src/
│ ├── modules/
│ │ ├── auth/ # Authentication module (JWT)
│ │ ├── users/ # User management
│ │ ├── Marketplace/ # NFT management and economy
│ │ ├── game/ # Unity synchronization
│ ├── common/ # Utilities and middlewares
│ ├── main.ts # Entry point
│── .env # Variables environment
│── package.json # dependencies
│── tsconfig.json # TypeScript configuration
│── docker-compose.yml # Database and deployment

```
