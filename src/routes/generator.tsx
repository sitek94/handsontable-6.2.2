import {faker} from '@faker-js/faker'
import {ChangeEvent, useState} from 'react'
import * as xlsx from 'xlsx'

const numberOfRowsToGenerate = 100000

enum Format {
  CSV = 'csv',
  XLSX = 'xlsx',
  JSON = 'json',
}

export default function Generator() {
  const [generatedData, setGeneratedData] = useState(null)
  const [format, setFormat] = useState(Format.XLSX)

  function onFormatChange(event: ChangeEvent<HTMLInputElement>) {
    setFormat(event.target.value as Format)
  }

  function generateData() {
    const data = Array.from({length: numberOfRowsToGenerate}).map(generateRow)

    console.log(data)

    setGeneratedData(data)
  }

  async function exportData() {
    if (!generatedData) return

    switch (format) {
      case Format.XLSX: {
        const workbook = xlsx.utils.book_new()
        const worksheet = xlsx.utils.json_to_sheet(generatedData)

        xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
        xlsx.utils.sheet_add_aoa(
          worksheet,
          [['id', 'first_name', 'last_name', 'email', 'ip_address']],
          {
            origin: 'A1',
          },
        )
        xlsx.writeFile(workbook, 'data.xlsx')

        break
      }

      default:
        throw new Error(`Unsupported format: ${format}`)
    }
  }

  return (
    <div
      style={{
        maxWidth: '65ch',
        margin: '80px auto',
        fontSize: '2rem',
      }}
    >
      <h1>Data Generator</h1>
      <hr />
      <div>
        <input
          type="radio"
          id="csv"
          name="format"
          value="CSV"
          checked={format === Format.CSV}
          onChange={onFormatChange}
        />
        <label htmlFor="csv">CSV</label>
      </div>
      <div>
        <input
          type="radio"
          id="json"
          name="format"
          value="JSON"
          checked={format === Format.JSON}
          onChange={onFormatChange}
        />
        <label htmlFor="json">JSON</label>
      </div>
      <div>
        <input
          type="radio"
          id="xlsx"
          name="format"
          value="XLSX"
          checked={format === Format.XLSX}
          onChange={onFormatChange}
        />
        <label htmlFor="xlsx">XLSX</label>
      </div>
      <button onClick={generateData}>
        Generate {numberOfRowsToGenerate} rows of data
      </button>
      <button onClick={exportData}>Export data</button>
    </div>
  )
}

function generateRow() {
  return {
    id: faker.string.alpha(10),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    ip_address: faker.internet.ip(),
  }
}
