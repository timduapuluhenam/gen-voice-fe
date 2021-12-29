import axios from 'axios'

const baseUrl = 'https://gen-voice-be.herokuapp.com/users/login'

const login = async data => {
  const response = await axios.post(baseUrl, data)
  return response.data
}

export default login
