const express = require('express');
const axios = require('axios');
const cors = require('cors');
const awsServerlessExpress = require('aws-serverless-express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Route for making the API call
app.post('/search', async (req, res) => {
  const apiUrl = 'https://www.wipo.int/patinformed/api/search';
  const requestData = req.body;

  try {
    const response = await axios.post(apiUrl, requestData);
    const responseData = response.data;

    // Handle the response data here
    res.json(responseData);
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error(error);
    res.status(500).json({ error: 'An error occurred while making the API call.' });
  }
});

app.post('/getAllInns', async (req, res) => {
    const apiUrl = 'https://www.wipo.int/patinformed/api/getAllInns';
    const requestData = req.body;
  
    try {
      const response = await axios.post(apiUrl, requestData);
      const responseData = response.data;
  
      // Handle the response data here
      res.json(responseData);
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error(error);
      res.status(500).json({ error: 'An error occurred while making the API call.' });
    }
  });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


// Create the server
const server = awsServerlessExpress.createServer(app);

// Create the AWS Lambda handler function
exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};