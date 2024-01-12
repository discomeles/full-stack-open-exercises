import axios from 'axios'
const baseUrl = '/api/blogs'

const authHeader = (token) => {
  return (
      {headers: { Authorization: `Bearer ${token}`}}
  )    
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject, token) => {
  const response = await axios.post(baseUrl, newObject, authHeader(token))
  return response.data
}

export default { getAll, create }