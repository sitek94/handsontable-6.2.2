import * as ReactDOM from 'react-dom/client'
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom'

import 'handsontable/dist/handsontable.full.css'
import './index.css'

import packageJson from '../package.json'
import Home from '~/routes/index.tsx'
import {getTitleFromPath} from '~/utils/get-title-from-path'

init()

async function init() {
  const router = await createRouter()

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />,
  )
}

async function createRouter() {
  const examplesRoutes = await getExamplesRoutes()

  return createBrowserRouter([
    {
      path: getPath('/'),
      element: <Home paths={examplesRoutes.map(({path}) => path)} />,
    },
    {
      path: getPath('/examples'),
      Component: () => (
        <>
          <Outlet />
        </>
      ),
      children: examplesRoutes,
    },
  ])
}

async function getExamplesRoutes() {
  // eslint-disable-next-line react-refresh/only-export-components
  const examplesImports = import.meta.glob('./routes/examples/*.tsx') as Record<
    string,
    () => Promise<{default: () => JSX.Element}>
  >

  const routes: {
    path: string
    title: string
    Component: () => JSX.Element
  }[] = []

  for (const route of Object.keys(examplesImports)) {
    const path = route.replace('./routes/', '/').replace('.tsx', '')
    const title = getTitleFromPath(path)

    const {default: Component} = await examplesImports[route]()

    routes.push({
      title,
      path: getPath(path),
      Component: () => <Component />,
    })
  }

  return routes
}

function getPath(path: string) {
  if (process.env.NODE_ENV === 'production') {
    const basePath = `/${packageJson.name}`
    return `${basePath}${path}`
  }

  return path
}
