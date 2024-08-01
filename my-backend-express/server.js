const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use(userRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

