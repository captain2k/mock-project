import 'antd/dist/antd.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import { otherRoutes, publicRoutes } from './routes'
import { store } from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            {publicRoutes.map((route, index) => {
              const Page = route.component
              return <Route key={index} path={route.path} element={<Page />} />
            })}
          </Route>
          {otherRoutes.map((route, index) => {
            const Page = route.component
            return <Route key={index} path={route.path} element={<Page />} />
          })}
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
