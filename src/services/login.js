import axios from 'axios'

const baseUrl = 'http://13.250.107.155:8000/users/login'

const login = async data => {
  const response = await axios.post(baseUrl, data, { crossdomain: true })
  return response.data
}

export default login
