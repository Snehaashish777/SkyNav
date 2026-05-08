import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FlightFeed from '../components/FlightFeed';

const apiKey = "b4d0ac7c49e0ad1bbe3635510de44fda";
const url = `https://api.aviationstack.com/v1/flights?access_key=${apiKey}`;

export default function Home() {
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
        const airlineName = (flight.airline?.name || '').toLowerCase();
        const airlineIata = (flight.airline?.iata || '').toLowerCase();
        return airlineName.includes(lowercasedTerm) || airlineIata.includes(lowercasedTerm);
      });
      setFilteredFlights(filtered);
    }
  }, [searchTerm, flights]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Flight Tracking</h1>
          <p className="text-gray-500">Search for active flights by airline name or IATA code.</p>
        </div>

        <div className="mb-8 max-w-xl">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by Airline (e.g. American Airlines, AA)"
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
