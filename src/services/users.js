import axios from 'axios'

const baseUrl = 'http://13.250.107.155:8000/'

export const updateUser = async (data, token) => {
  const response = await axios.put(`${baseUrl}users/update`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}
