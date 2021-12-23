import axios from 'axios'

const baseUrl = 'https://gen-voice-be.herokuapp.com/users/register'

const register = async data => {
  const response = await axios.post(baseUrl, data)
  return response.data
}

export default register
