import axios from 'axios'

const baseUrl = 'http://13.250.107.155:8000/users/register'

const register = async data => {
  const response = await axios.post(baseUrl, data)
  return response.data
}

export default register
