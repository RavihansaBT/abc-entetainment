require('dotenv').config({ path: `${__dirname}/${process.env.NODE_ENV}.env` });
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB connection success");
    } catch (error) {
        console.error(`MongoDB connection faild : ${error}`);
        process.exit(1)
    }
}

module.exports = connectDB;