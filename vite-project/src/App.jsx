import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import SearchDestination from './pages/SearchDestination';
import SearchDeparture from './pages/SearchDeparture';
import SearchDate from './pages/SearchDate';
import Details from './pages/Details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/destination',
    element: <SearchDestination />,
  },
  {
    path: '/departure',
    element: <SearchDeparture />,
  },
  {
    path: '/date',
    element: <SearchDate />,
  },
  {
    path: '/flight/:id',
    element: <Details />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
