import axios from 'axios'

const baseUrl = 'http://13.250.107.155:8000/'

export const addInvoice = async (data, token) => {
  const response = await axios.post(`${baseUrl}+invoices/add`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const getInvoice = async token => {
  const response = await axios.get(`${baseUrl}invoices/generate_invoice`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}
