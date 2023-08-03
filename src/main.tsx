import * as ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from 'react-router-dom'

import './style.css'
import Home from './home.tsx'

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
      element: <Home links={examplesRoutes.map(({path}) => path)} />,
    },
    {
      path: '/examples',
      Component: () => (
        <>
          <nav>
            <Link to="/">Go back</Link>
          </nav>
          <Outlet />
        </>
      ),
      children: examplesRoutes,
    },
  ])
}

async function getExamplesRoutes() {
  // eslint-disable-next-line react-refresh/only-export-components
  const examplesImports = import.meta.glob('./examples/*.tsx') as Record<
    string,
    () => Promise<{default: () => JSX.Element}>
  >

  const routes: {path: string; Component: () => JSX.Element}[] = []

  for (const route of Object.keys(examplesImports)) {
    const path = route.replace('./', '/').replace('.tsx', '')

    const {default: Component} = await examplesImports[route]()

    routes.push({path, Component})
  }

  return routes
}
