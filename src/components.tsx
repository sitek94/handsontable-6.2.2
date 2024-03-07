import {Link, useLocation} from 'react-router-dom'
import {getTitleFromPath} from './utils'

export function Nav() {
  const location = useLocation()
  const title = getTitleFromPath(location.pathname)

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4rem',
        padding: '0 1rem',
        fontSize: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #ccc',
        backgroundColor: 'rgba(30, 30, 30, 0.3)',
      }}
    >
      <Link to="/">Go back</Link>
      <h1
        style={{
          margin: '0 auto',
          justifySelf: 'center',
        }}
      >
        {title}
      </h1>
    </nav>
  )
}
