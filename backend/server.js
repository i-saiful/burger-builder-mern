const dotenv = require('dotenv')
dotenv.config()

const app = require('./app');
const mongoose = require('mongoose');
global.__basedir = __dirname

const DB = process.env.MONGODB_SERVER.replace('<password>', process.env.DB_PASSWORD);
// const DB = process.env.LOCAL_MONGODB_SERVER

mongoose.connect(DB)
    .then(
        () => console.log("Connected to MongoDB!")
    ).catch(
        () => console.log("MongoDB Connection Failed!")
    )

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`listening on port ${port}.....`)
})