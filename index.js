const { server } = require('./server');

const { PORT } = process.env;

server.get('/', (req, res) => {
    res.send( 'api: running')
})

const port = PORT || 5000
server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
}) 