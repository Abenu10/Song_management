// require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

const cors = require('cors');
const corsOptions = {
  origin: 'https://song-management.vercel.app/',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
connectDB();

// Init MIddleware
app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('API Running'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/songs', require('./routes/api/songs'));
app.use('/api/playlist', require('./routes/api/playlist'));

const PORT = process.env.PORT || 8800;
app.listen(PORT, console.log(`Listening on port ${PORT}`));
//
//
