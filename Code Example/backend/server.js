const app = express();
const redisClient = redis.createClient();
redisClient.get = util.promisify(redisClient.get);


const sqlConfig = {
    user: 'your_username',
    password: 'your_password',
    server: 'your_server',
    database: 'your_database',
};


app.get('/data', async (req, res) => {
    const cacheKey = 'data_cache';

    try {
        // Check Redis cache
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            console.log('Serving from cache');
            return res.json(JSON.parse(cachedData));
        }

        // If not cached, fetch from database
        const pool = await sql.connect(sqlConfig);
        const result = await pool.request().query('SELECT * FROM your_table');

        const data = result.recordset;

        // Store in Redis cache
        redisClient.setex(cacheKey, 3600, JSON.stringify(data));

        console.log('Serving from database');
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server Error');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});