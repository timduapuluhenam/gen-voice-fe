/* eslint-disable new-cap */
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const generatePDF = (invoices, name) => {
  const doc = new jsPDF()
  doc.text(`Reports of ${name}`, 14, 15)

  const addFooters = doc => {
    const pageCount = doc.internal.getNumberOfPages()

    doc.setFont('helvetica', 'italic')
    doc.setFontSize(8)
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width / 2, 287, {
        align: 'center'
      })
    }
  }
  const tableColumn = ['Name', 'Email', 'Amount', 'Status']
  const tableRows = []

  invoices?.forEach(invoice => {
    const invoiceData = [
      invoice.name,
      invoice.email,
      Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(invoice.amount),
      invoice.status
    ]
    tableRows.push(invoiceData)
  })

  doc.autoTable(tableColumn, tableRows, { startY: 20 })
  addFooters(doc)
  const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const fileName = `Reports - ${date}.pdf`
  doc.save(fileName)
}

export default generatePDF
