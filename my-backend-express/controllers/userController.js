const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const docClient = require('../config/awsConfig');
const saltRounds = 10;

const register = async (req, res) => {
  const { username, email, password } = req.body;

  console.log('Received registration data:', { username, email, password });

  const userId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const params = {
    TableName: 'Users',
    Item: {
      id: userId,
      username: username,
      email: email,
      password: hashedPassword
    }
  };

  try {
    await docClient.put(params).promise();
    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (err) {
    console.error('Error saving data to DynamoDB', err);
    res.status(500).json({ error: 'An error occurred', details: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  console.log('Received email:', email);
  console.log('Received password:', password);

  const params = {
    TableName: 'Users',
    IndexName: 'EmailIndex',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email
    }
  };

  try {
    const data = await docClient.query(params).promise();
    console.log('Data from DynamoDB:', data);

    if (data.Items.length > 0) {
      const user = data.Items[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      
      if (passwordMatch) {
        res.status(200).json({ message: 'Login successful', userId: user.id });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Error fetching data from DynamoDB', err);
    res.status(500).json({ error: 'An error occurred', details: err.message });
  }
};

module.exports = { register, login };
