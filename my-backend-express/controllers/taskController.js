const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-1',
  endpoint: 'http://localhost:4566' 
});

exports.getTasks = async (req, res) => {
  const params = {
    TableName: 'Tasks',
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    console.log('Data retrieved:', data);
    res.json(data.Items);
  } catch (err) {
    console.error('Error adding task:', err); 
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

exports.addTask = async (req, res) => {
  const { title, description, priority, date, time, completed, assignee, tags } = req.body;

  const params = {
    TableName: 'Tasks',
    Item: {
      TaskID: uuidv4(), 
      Title: title,
      Description: description,
      Priority: priority,
      DateTime: `${date}T${time}:00Z`, // Format ISO 8601
      CompletionStatus: completed,
      Assignee: assignee,
      Tags: tags.split(',').map(tag => tag.trim()), // Convertie les tags en tableau
    }
  };

  try {
    await dynamoDB.put(params).promise();
    res.status(201).json({ message: 'Task added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add task' });
  }
};

