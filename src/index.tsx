import * as ReactDOM from 'react-dom/client'
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom'

import 'handsontable/dist/handsontable.full.css'
import './index.css'

import {getTitleFromPath} from '~/utils/get-title-from-path'
import Home from '~/routes/index.tsx'

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
      path,
      Component: () => <Component />,
    })
  }

  return routes
}
