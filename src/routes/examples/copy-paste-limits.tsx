import {HotTable} from '@handsontable/react'
import {useEffect, useState} from 'react'
import {generateExcelFile} from '~/utils/generate-excel-file'

const numberOfRows = 1000

const columns = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const initialData = Array.from({length: numberOfRows}).map(() =>
  columns.map(() => null),
)

let startTime = -1
let endTime = -1

export default function LoadingHugeExcel() {
  const [data, setData] = useState(initialData)
  const [cells, setCells] = useState(100_000)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'v' && event.metaKey) {
        startTime = performance.now()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <nav>
        <div>
          <label style={{fontSize: 14}}>
            Number of cells
            <input
              type="number"
              value={cells}
              onChange={e => setCells(+e.target.value)}
            />
          </label>
          <button
            style={{marginRight: 20}}
            onClick={() => generateExcelFile({cells})}
          >
            Generate excel
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              setData(initialData)
              backToTop()
            }}
          >
            Clear
          </button>
          <button
            onClick={() => {
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth' as const,
              })
            }}
          >
            Scroll to bottom
          </button>
          <button onClick={() => backToTop()}>Back to top</button>
        </div>
      </nav>
      <main>
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
            afterPaste={pastedData => {
              setData(pastedData)
              const rows = pastedData.length
              const columns = pastedData[0].length
              const cells = rows * columns

              endTime = performance.now()
              const timeElapsedInMs = endTime - startTime
              const timeElapsedInSeconds =
                Math.round((timeElapsedInMs / 1000) * 100) / 100

              console.log(
                `${rows - 1} rows x ${columns} columns (${cells - 10} cells)`,
              )
              console.log(`Time: ${timeElapsedInSeconds} seconds\n\n`)
            }}
          />
        </div>
      </main>
    </>
  )
}

function backToTop() {
  window.scrollTo({top: 0, behavior: 'smooth' as const})
}
