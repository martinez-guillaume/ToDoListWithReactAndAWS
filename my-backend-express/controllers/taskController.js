const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: "us-east-1",
  endpoint: "http://localhost:4566",
});

const getTasks = async (req, res) => {
  const userId = req.user.id;
  const completed = req.query.completed === false;

  const params = {
    TableName: "Tasks",
    FilterExpression: "UserID = :userId AND CompletionStatus = :completed",
    ExpressionAttributeValues: {
      ":userId": userId,
      ":completed": completed,
    },
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    if (data.Items && Array.isArray(data.Items)) {
      res.json(data.Items);
    } else {
      console.error("Unexpected data format:", data);
      res.status(500).json({ error: "Unexpected data format" });
    }
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
};

const addTask = async (req, res) => {
  const {
    title,
    description,
    priority,
    date,
    time,
    completed,
    assignee,
    tags,
  } = req.body;

  const params = {
    TableName: "Tasks",
    Item: {
      TaskID: uuidv4(),
      Title: title,
      Description: description,
      Priority: priority,
      DateTime: `${date}T${time}:00Z`,
      CompletionStatus: completed,
      Assignee: assignee,
      Tags: tags.split(",").map((tag) => tag.trim()),
      UserID: req.user.id,
    },
  };

  try {
    await dynamoDB.put(params).promise();
    res.status(201).json({ message: "Task added successfully" });
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).json({ error: "Failed to add task" });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    priority,
    date,
    time,
    completed,
    assignee,
    tags,
  } = req.body;

  // Préparer les mises à jour en utilisant un alias pour DateTime, le nom de l'attribut DateTime est un mot réservé dans DynamoDB
  const updateExpression =
    "SET Title = :title, Description = :description, Priority = :priority, #dt = :dateTime, CompletionStatus = :completed, Assignee = :assignee, Tags = :tags";
  const expressionAttributeNames = {
    "#dt": "DateTime",
  };
  const expressionAttributeValues = {
    ":title": title,
    ":description": description,
    ":priority": priority,
    ":dateTime": `${date}T${time}:00Z`,
    ":completed": completed,
    ":assignee": assignee,
    ":tags": tags ? tags.split(",").map((tag) => tag.trim()) : [], // Transformation des tags en tableau
  };

  const params = {
    TableName: "Tasks",
    Key: { TaskID: id },
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "UPDATED_NEW",
  };

  try {
    await dynamoDB.update(params).promise();
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Error updating task" });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;

  const params = {
    TableName: "Tasks",
    Key: { TaskID: id },
  };

  try {
    const data = await dynamoDB.get(params).promise();
    if (data.Item) {
      res.json(data.Item);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve task" });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Task ID is required" });
  }

  const params = {
    TableName: "Tasks",
    Key: { TaskID: id },
  };

  try {
    await dynamoDB.delete(params).promise();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Error deleting task" });
  }
};

const updateTaskCompletionStatus = async (req, res) => {
  const { id } = req.params;

  const updateExpression = "SET CompletionStatus = :completed";
  const expressionAttributeValues = {
    ":completed": true,
  };

  const params = {
    TableName: "Tasks",
    Key: { TaskID: id },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "UPDATED_NEW",
  };

  try {
    await dynamoDB.update(params).promise();
    res.status(200).json({ message: "Task marked as completed" });
  } catch (error) {
    console.error("Error updating task completion status:", error);
    res.status(500).json({ error: "Failed to update task completion status" });
  }
};

const getCompletedTasks = async (req, res) => {
  const userId = req.user.id;
  const completed = req.query.completed === false;

  const params = {
    TableName: "Tasks",
    FilterExpression: "UserID = :userId AND CompletionStatus = :completed",
    ExpressionAttributeValues: {
      ":userId": userId,
      ":completed": !completed,
    },
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    if (data.Items && Array.isArray(data.Items)) {
      res.json(data.Items);
    } else {
      console.error("Unexpected data format:", data);
      res.status(500).json({ error: "Unexpected data format" });
    }
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
};

module.exports = {
  getTasks,
  addTask,
  updateTask,
  getTaskById,
  deleteTask,
  updateTaskCompletionStatus,
  getCompletedTasks,
};
