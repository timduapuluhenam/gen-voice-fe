import axios from 'axios'

const baseUrl = 'https://gen-voice-be.herokuapp.com/invoices/add'

export const addInvoice = async (data, token) => {
  const response = await axios.post(baseUrl, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}
