import * as ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
  useLocation,
} from 'react-router-dom'

import 'handsontable/dist/handsontable.full.css'
import './index.css'

import {getTitleFromPath} from './utils/get-title-from-path'
import Home from './routes/index.tsx'

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
      path: '/',
      element: <Home paths={examplesRoutes.map(({path}) => path)} />,
    },
    {
      path: '/examples',
      Component: () => (
        <>
          <Nav />
          <main>
            <Outlet />
          </main>
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

    console.log({title, path, Component})

    routes.push({
      title,
      path,
      Component: () => <Component />,
    })
  }

  return routes
}

// eslint-disable-next-line react-refresh/only-export-components -- we don't really care about fast refresh in this file
function Nav() {
  const location = useLocation()
  const title = getTitleFromPath(location.pathname)

  return (
    <nav>
      <Link to="/">Go back</Link>
      <h1>{title}</h1>
    </nav>
  )
}
