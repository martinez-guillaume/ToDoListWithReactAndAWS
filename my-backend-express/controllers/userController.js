const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const docClient = require('../config/awsConfig');
require('dotenv').config();

const saltRounds = 10;

const register = async (req, res) => {

  const { username, email, password } = req.body;
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
    console.error('Register: Error saving data to DynamoDB', err);
    res.status(500).json({ error: 'An error occurred during registration', details: err.message });
  }
};

const login = async (req, res) => {

  const { email, password } = req.body;

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
    console.log('Login: Data from DynamoDB:', data);

    if (data.Items.length > 0) {
      const user = data.Items[0];
      console.log('Login: User found:', user);

      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log('Login: Password match:', passwordMatch);

      if (passwordMatch) {
        console.log('JWT_SECRET:', process.env.JWT_SECRET);
        const secret = process.env.JWT_SECRET;

        if (!secret) {
          throw new Error('JWT_SECRET is not defined');
        }
        
        const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });

        // Renvoie les détails de l'utilisateur :
        res.status(200).json({ 
          message: 'Login successful', 
          token, 
          user: { id: user.id, email: user.email, username: user.username } 
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Login: Error fetching data from DynamoDB', err);
    res.status(500).json({ error: 'An error occurred during login', details: err.message });
  }
};


module.exports = { register, login };