import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FlightFeed from '../components/FlightFeed';

const apiKey = "b4d0ac7c49e0ad1bbe3635510de44fda";
const url = `https://api.aviationstack.com/v1/flights?access_key=${apiKey}`;

export default function SearchDeparture() {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch flights');
        }
        const data = await response.json();
        
        if (data.error) {
           throw new Error(data.error.message || 'API Error: Rate limit or invalid key');
        }

        setFlights(data.data || []);
        setFilteredFlights(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredFlights(flights);
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = flights.filter(flight => {
        const airportName = (flight.departure?.airport || '').toLowerCase();
        const airportIata = (flight.departure?.iata || '').toLowerCase();
        return airportName.includes(lowercasedTerm) || airportIata.includes(lowercasedTerm);
      });
      setFilteredFlights(filtered);
    }
  }, [searchTerm, flights]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search by Departure</h1>
          <p className="text-gray-500">Find flights originating from your desired departure airport.</p>
        </div>

        <div className="mb-8 max-w-xl">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by Departure Airport or IATA (e.g. JFK)"
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">Error loading flights: {error}</p>
              </div>
            </div>
          </div>
        ) : (
          <FlightFeed flights={filteredFlights} />
        )}
      </main>
    </div>
  );
}
