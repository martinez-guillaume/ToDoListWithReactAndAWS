const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-1',
  endpoint: 'http://localhost:4566' 
});

const getTasks = async (req, res) => {
  const userId = req.user.id;
  const params = {
    TableName: 'Tasks',
    FilterExpression: 'UserID = :userId',
    ExpressionAttributeValues: {
      ':userId': userId,
    },
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    if (data.Items && Array.isArray(data.Items)) {
      console.log('Tasks Data:', data.Items);
      res.json(data.Items);
    } else {
      console.error('Unexpected data format:', data);
      res.status(500).json({ error: 'Unexpected data format' });
    }
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};


const addTask = async (req, res) => {
  const { title, description, priority, date, time, completed, assignee, tags } = req.body;

  const params = {
    TableName: 'Tasks',
    Item: {
      TaskID: uuidv4(),
      Title: title,
      Description: description,
      Priority: priority,
      DateTime: `${date}T${time}:00Z`,
      CompletionStatus: completed,
      Assignee: assignee,
      Tags: tags.split(',').map(tag => tag.trim()),
      UserID: req.user.id 
    }
  };

  try {
    await dynamoDB.put(params).promise();
    res.status(201).json({ message: 'Task added successfully' });
  } catch (err) {
    console.error('Error adding task:', err);
    res.status(500).json({ error: 'Failed to add task' });
  }
};

module.exports = { getTasks, addTask };