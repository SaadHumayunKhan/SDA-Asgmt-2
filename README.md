# Replicating and Solving a Problem
---
- **Problem Chosen:** Database Bottleneck:
- **Replication and Solution:**
- **Scenario:** A Node.js application is connected to a SQL Server database. High query load causes slow response times.
- **Solution:** Introduce caching with Redis to store frequently accessed data.
---

# Express + Redis + SQL Server Example

This project demonstrates how to use an Express server to fetch data from a SQL Server database and cache the results using Redis.

---
# How To run the code
---

## Prerequisites

Ensure the following software is installed on your system:

1. [Node.js](https://nodejs.org/) (v14 or higher)
2. [npm](https://www.npmjs.com/) (comes with Node.js)
3. [Redis](https://redis.io/) (Ensure Redis is running)
4. SQL Server instance (Ensure it is running and accessible)

---

## Setup and Run

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure the Application

Update the `sqlConfig` object in `app.js` with your SQL Server credentials:

```javascript
const sqlConfig = {
    user: 'your_username', // Your SQL Server username
    password: 'your_password', // Your SQL Server password
    server: 'your_server',     // SQL Server address
    database: 'your_database', // Database name
};
```

Replace `'your_table'` in the SQL query with the name of the table you want to query.

### 4. Start Redis Server

Ensure the Redis server is running. Start it with the following command:

```bash
redis-server
```

### 5. Start the Application

Run the application:

```bash
node app.js
```

### 6. Access the API

Open a browser or API testing tool like [Postman](https://www.postman.com/) and access:

```
http://localhost:3000/data
```

---

## Expected Behavior

- If data is available in Redis, the application serves it from the cache.
- If data is not cached, the application fetches it from the SQL Server database and caches it in Redis for 1 hour.

---

## Dependencies

The application uses the following Node.js modules:

- `express`: For setting up the web server
- `mssql`: For connecting to SQL Server
- `redis`: For caching the data
- `util`: For promisifying the Redis `get` method

---

## Troubleshooting

- **Redis not running:** Ensure the Redis server is started before running the application.
- **SQL Server connection issues:** Verify `sqlConfig` and ensure the database is accessible.
- **Port conflicts:** If port `3000` is in use, modify the `app.listen` line in `app.js`:

    ```javascript
    app.listen(4000, () => {
        console.log('Server is running on port 4000');
    });
    ```

---

