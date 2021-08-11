require('dotenv').config({ path: `${__dirname}/${process.env.NODE_ENV}.env` });
const express = require('express');
const connectDB = require('./config/db.js')
const albumRoutes = require('./routes/album-routes');
const genreRoutes = require('./routes/genre-routes');

connectDB();

const app = express();
app.use(express.json());

app.use('/api/album', albumRoutes)
app.use('/api/genre', genreRoutes)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))