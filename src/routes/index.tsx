import {Link} from 'react-router-dom'
import packageJson from '../../package.json'

import {getTitleFromPath} from '~/utils/get-title-from-path'

export default function Home({paths}: {paths: string[]}) {
  return (
    <div
      style={{
        maxWidth: '65ch',
        margin: '80px auto',
        fontSize: '2rem',
      }}
    >
      <h1>{packageJson.name}</h1>
      <hr />
      <h2>Examples</h2>
      <ul>
        {paths.map(path => (
          <li key={path}>
            <Link to={path}>{getTitleFromPath(path)}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
