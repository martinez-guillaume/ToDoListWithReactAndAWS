require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authenticateToken = require('../src/utils/authMiddleware');
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(userRoutes);
app.use('/api/tasks', authenticateToken, taskRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});