const app = require('./app')
const {DBconfig} = require('./config/config')
require('dotenv').config({ path: './config/env.env' })

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const dbName = 'centreax';

// DATABASE CONNECTION
DBconfig.connect(DATABASE_URL, dbName);

app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log(`Server is running at: http://localhost:${PORT}`);
})