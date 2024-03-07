import {HotTable} from '@handsontable/react'

export default function LoadingHugeExcel() {
  const data = [
    ['', 'Ford', 'Volvo', 'Toyota', 'Honda'],
    ['2016', 10, 11, 12, 13],
    ['2017', 20, 11, 14, 13],
    ['2018', 30, 15, 12, 13],
  ]

  return (
    <>
      <div id="hot-app">
        <HotTable
          data={data}
          colHeaders={true}
          rowHeaders={true}
          width={600}
          height={300}
          stretchH="all"
        />
      </div>
    </>
  )
}
