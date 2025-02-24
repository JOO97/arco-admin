const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

app.post('/api/error', (req, res) => {
  const { message, type } = req.body;
  console.log(req.body);
  fs.appendFile('./error.txt', `${message} - ${type} \n`, (error, data) => {
    if (error) {
      console.log(error);
      return;
    }

    res.send({
      code: 8200,
      success: true
    });
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
