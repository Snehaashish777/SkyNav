import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Details() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve flight data from location state or show fallback
  const flight = location.state?.flightData;

  const handleBack = () => {
    navigate(-1);
  };

  if (!flight) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
          <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Flight Not Found</h2>
          <p className="text-gray-500 mb-6">We couldn't find the details for flight {id}. Please go back and try again.</p>
          <button 
            onClick={handleBack}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Go Back
          </button>
        </main>
      </div>
    );
  }

  // Destructure for cleaner access
  const { airline, departure, arrival, flight_status, flight_date } = flight;
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'incident': return 'bg-orange-100 text-orange-800';
      case 'diverted': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={handleBack}
          className="mb-6 flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to results
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header section */}
          <div className="bg-gray-900 px-6 py-8 sm:px-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">{airline?.name || 'Unknown Airline'}</h1>
              <p className="text-gray-400 font-mono">Flight {flight.flight?.iata || id}</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-gray-300 text-sm">{flight_date}</span>
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide ${getStatusColor(flight_status)}`}>
                {flight_status}
              </span>
            </div>
          </div>

          {/* Body section */}
          <div className="p-6 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* Departure Info */}
              <div className="relative">
                <div className="absolute top-0 right-[-2.5rem] bottom-0 w-px bg-gray-100 hidden md:block"></div>
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11l7-7 7 7M5 19l7-7 7 7"></path></svg>
                  Departure
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Airport</p>
                    <p className="text-lg text-gray-800 font-medium">{departure?.airport || 'Unknown'}</p>
                    <p className="text-sm text-gray-500 font-mono">{departure?.iata || '--'}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Terminal</p>
                      <p className="text-gray-800 font-medium">{departure?.terminal || 'TBD'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Gate</p>
                      <p className="text-gray-800 font-medium">{departure?.gate || 'TBD'}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-50">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Scheduled Time</p>
                    <p className="text-gray-800">{departure?.scheduled ? new Date(departure.scheduled).toLocaleString() : 'Not scheduled'}</p>
                  </div>
                </div>
              </div>

              {/* Arrival Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7"></path></svg>
                  Arrival
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Airport</p>
                    <p className="text-lg text-gray-800 font-medium">{arrival?.airport || 'Unknown'}</p>
                    <p className="text-sm text-gray-500 font-mono">{arrival?.iata || '--'}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Terminal</p>
                      <p className="text-gray-800 font-medium">{arrival?.terminal || 'TBD'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Gate</p>
                      <p className="text-gray-800 font-medium">{arrival?.gate || 'TBD'}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-50">
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Scheduled Time</p>
                    <p className="text-gray-800">{arrival?.scheduled ? new Date(arrival.scheduled).toLocaleString() : 'Not scheduled'}</p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
