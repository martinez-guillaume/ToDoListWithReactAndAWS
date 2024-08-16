const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',  // 'eu-central-1' pour serveur en europe
  endpoint: 'http://localhost:4566' 
});

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = docClient;


