const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const routes = require('./routes/Routes');
const userRoutes = require('./routes/UserRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use('/api/user', userRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
