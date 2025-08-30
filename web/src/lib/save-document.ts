import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import type { Item, ExportOptions } from './types'
import dayjs from 'dayjs'

function prepareExportData(items: Item[], includeHeaders: boolean = true): any[][] {
  const data: any[][] = []

  if (includeHeaders) {
    data.push(['Name', 'Description', 'Category', 'Quantity', 'Price Per Unit', 'Total Price', 'Creation Date'])
  }

  items.forEach((item) => {
    data.push([
      item.name,
      item.description,
      item.category,
      item.quantity,
      item.price,
      item.quantity * item.price,
      dayjs(item.createdAt).format('DD/MM/YYYY'),
    ])
  })

  return data
}

function exportToExcel(workbook: XLSX.WorkBook, fileName: string) {
  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
    cellStyles: true,
  })

  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })

  saveAs(blob, fileName)
}

function exportToCSV(worksheet: XLSX.WorkSheet, fileName: string) {
  // Converter para CSV
  const csvOutput = XLSX.utils.sheet_to_csv(worksheet, {
    FS: ';', // ✅ Separador para Excel em português
    RS: '\n', // ✅ Quebra de linha
    strip: false,
    blankrows: false,
  })

  const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8' })
  saveAs(blob, fileName)
}

export function exportItemsToFile(
  items: Item[],
  options: ExportOptions = { format: 'excel', fileName: 'items', includeHeaders: true }
) {
  try {
    //Prepara os dados para exportação
    const data = prepareExportData(items, options.includeHeaders)

    //Criar workbook
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.aoa_to_sheet(data)

    // Adicionar worksheet ao workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Items')

    //Gerar Arquivo
    const fileExtension = options.format === 'excel' ? 'xlsx' : 'csv'

    //${new Date().toISOString().split("T")[0]} no lo conpriendo
    const fileName = `${options.fileName || 'items'}-${new Date().toISOString().split('T')[0]}.${fileExtension}`

    if (options.format === 'excel') {
      exportToExcel(workbook, fileName)
    } else {
      exportToCSV(worksheet, fileName)
    }
    return true
  } catch (error) {
    console.log('Erro ao exportar items:', error)
    throw new Error('Falha ao exportar')
  }
}
