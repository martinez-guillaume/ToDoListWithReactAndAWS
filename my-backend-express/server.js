const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', taskRoutes); // Toutes les routes pour les tâches doivent commencer par /api

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


