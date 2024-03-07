import * as ReactDOM from 'react-dom/client'
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom'

import './style.css'
import 'handsontable/dist/handsontable.full.css'
import Home from './home.tsx'
import {Nav} from './components.tsx'
import {getTitleFromPath} from './utils.ts'

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
  const examplesImports = import.meta.glob('./examples/*.tsx') as Record<
    string,
    () => Promise<{default: () => JSX.Element}>
  >

  const routes: {
    path: string
    title: string
    Component: () => JSX.Element
  }[] = []

  for (const route of Object.keys(examplesImports)) {
    const path = route.replace('./', '/').replace('.tsx', '')
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
