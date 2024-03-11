import * as xlsx from 'xlsx'

export function generateExcelFile({
  cells,
  columns = 10,
}: {
  cells: number
  columns?: number
}) {
  const rows = cells / columns
  const data = Array.from({length: rows}).map(() =>
    Array.from({length: columns}).map(() => 'placeholder'),
  )

  const workbook = xlsx.utils.book_new()
  const worksheet = xlsx.utils.json_to_sheet(data)

  xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  xlsx.writeFile(workbook, `${rows}x${columns} = ${cells}.xlsx`)
}
