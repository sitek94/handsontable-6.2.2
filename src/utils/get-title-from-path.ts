import packageJson from '../../package.json'

export function getTitleFromPath(path: string) {
  const fileName = path
    .replace('/examples/', '')
    .replace(`/${packageJson.name}`, '')
    .replace('.tsx', '')

  const parts = fileName.split('-')

  return parts.map(capitalize).join(' ')
}

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
