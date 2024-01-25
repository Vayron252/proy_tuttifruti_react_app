import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ChargingScreen } from './components/helpers/ChargingScreen'
import loadable from "@loadable/component"
import { InitialLayout } from './layouts/InitialLayout'
import { MainLayout } from './layouts/MainLayout'
import { AppContextProvider } from './contexts/AppContext'
import { loaderJoinHall } from './pages/JoinHallPage'

const lazyComponent = (component) => {
  return loadable(() => {
    return Promise.all([
      import(`./pages/${component}.jsx`),
      new Promise(resolve => setTimeout(resolve, 1500))
    ])
      .then(([moduleExports]) => moduleExports);
  }, {
    fallback: <ChargingScreen />
  });
}

const LoginPage = lazyComponent('LoginPage');
const RegisterUserPage = lazyComponent('RegisterUserPage');
const MenuPage = lazyComponent('MenuPage');
const NewHallPage = lazyComponent('NewHallPage');
const JoinHallPage = lazyComponent('JoinHallPage');

const router = createBrowserRouter([
  {
    path: "/",
    element: <InitialLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />
      },
      {
        path: "/user/register",
        element: <RegisterUserPage />
      }
    ]
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: '/menu',
        element: <MenuPage />
      },
      {
        path: '/hall/create',
        element: <NewHallPage />
      },
      {
        path: '/halls',
        element: <JoinHallPage />,
        loader: loaderJoinHall
      }
    ]
  }
]);

export const App = () => {
  return (
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  )
}
