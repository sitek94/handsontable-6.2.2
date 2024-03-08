import {HotTable} from '@handsontable/react'

const numberOfRows = 1000

const columns = [
  'id',
  'first_name',
  'last_name',
  'email',
  'gender',
  'ip_address',
]
const data = Array.from({length: numberOfRows})
  .map(() => ``)
  .map(() => columns.map(j => ``))

export default function LoadingHugeExcel() {
  return (
    <>
      <div
        id="hot-app"
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <HotTable
          data={data}
          colHeaders={columns}
          rowHeaders={true}
          stretchH="all"
        />
      </div>
    </>
  )
}
