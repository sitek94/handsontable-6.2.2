import {Link, useLocation} from 'react-router-dom'
import {getTitleFromPath} from './utils'

export function Nav() {
  const location = useLocation()
  const title = getTitleFromPath(location.pathname)

  return (
    <nav>
      <Link to="/">Go back</Link>
      <h1>{title}</h1>
    </nav>
  )
}
