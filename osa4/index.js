const app = require('./app')
const config = require('./utils/config')

const PORT = process.env.port || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})