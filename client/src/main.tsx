import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import ManagePets from './pages/Home.js'
import Healthcare from './pages/Healthcare.js'
import Services from './pages/Services.js'
import SavedPets from './pages/SavedPets.js'
import SelectPet from './components/SelectPet.js'
import Calendar from './pages/Calendar.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <ManagePets />
      }, {
        path: '/healthcare',
        element: <Healthcare />
      }, {
        path: '/services',
        element: <Services />
      }, {
        path: '/calendar',
        element: <Calendar />
      }, {
        path: '/savedPets',
        element: <SavedPets />
      }, {
        path: '/pets/:petId',
        element: <SelectPet />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
