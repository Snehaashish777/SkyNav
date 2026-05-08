import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-600 font-semibold' : 'text-gray-500 hover:text-blue-500';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tighter">
              SkyNav
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link to="/" className={`px-3 py-2 rounded-md text-sm transition-colors ${isActive('/')}`}>
              Home
            </Link>
            <Link to="/destination" className={`px-3 py-2 rounded-md text-sm transition-colors ${isActive('/destination')}`}>
              By Destination
            </Link>
            <Link to="/departure" className={`px-3 py-2 rounded-md text-sm transition-colors ${isActive('/departure')}`}>
              By Departure
            </Link>
            <Link to="/date" className={`px-3 py-2 rounded-md text-sm transition-colors ${isActive('/date')}`}>
              By Date
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
