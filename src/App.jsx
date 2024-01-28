import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ChargingScreen } from './components/helpers/ChargingScreen'
import loadable from "@loadable/component"
import { InitialLayout } from './layouts/InitialLayout'
import { NavigationLayout } from './layouts/NavigationLayout'
import { AppContextProvider } from './contexts/AppContext'
import { loaderJoinHall } from './pages/JoinHallPage'
import { loaderWaitingRoom } from './pages/WaitingRoomPage'
import { GameLayout } from './layouts/GameLayout'

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
const WaitingRoomPage = lazyComponent('WaitingRoomPage');

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
    element: <NavigationLayout />,
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
  },
  {
    path: "/",
    element: <GameLayout />,
    children: [
      {
        path: '/room/:roomid',
        element: <WaitingRoomPage />,
        loader: loaderWaitingRoom
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
