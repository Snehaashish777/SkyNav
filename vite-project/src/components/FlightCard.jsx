import { Link } from 'react-router-dom';

export default function FlightCard({ flight }) {
  // Destructure with default values safely since API data can sometimes be null
  const airlineName = flight?.airline?.name || 'Unknown Airline';
  const flightStatus = flight?.flight_status || 'scheduled';
  const departureAirport = flight?.departure?.airport || flight?.departure?.iata || 'Unknown Origin';
  const arrivalAirport = flight?.arrival?.airport || flight?.arrival?.iata || 'Unknown Destination';
  const flightNumber = flight?.flight?.iata || flight?.flight?.icao || 'Unknown Flight No';

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'incident':
        return 'bg-orange-100 text-orange-800';
      case 'diverted':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link to={`/flight/${flightNumber}`} state={{ flightData: flight }} className="block h-full">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-6 h-full flex flex-col cursor-pointer">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg text-gray-900">{airlineName}</h3>
            <p className="text-sm text-gray-500 font-mono">{flightNumber}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${getStatusColor(flightStatus)}`}>
            {flightStatus}
          </span>
        </div>
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1 truncate">Departure</p>
            <p className="font-medium text-gray-800 truncate" title={departureAirport}>{departureAirport}</p>
          </div>
          <div className="px-4 text-gray-300 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </div>
          <div className="flex-1 min-w-0 text-right">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1 truncate">Arrival</p>
            <p className="font-medium text-gray-800 truncate" title={arrivalAirport}>{arrivalAirport}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
