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

export const getInvoice = async token => {
  const response = await axios.get('https://gen-voice-be.herokuapp.com/invoices/generate_invoice', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}
