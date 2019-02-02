require('dotenv').config();
const { server } = require('./server');

const { PORT } = process.env;



const port = PORT || 5000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}) ;