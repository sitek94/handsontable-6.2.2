import {Link} from 'react-router-dom'

export default function Home({links}: {links: string[]}) {
  return (
    <nav>
      <h2>Examples</h2>
      <ul>
        {links.map(link => (
          <li key={link}>
            <Link to={link}>{formatLink(link)}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function formatLink(path: string) {
  const fileName = path.replace('/examples/', '').replace('.tsx', '')
  const parts = fileName.split('-')

  return parts.map(capitalize).join(' ')
}

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
