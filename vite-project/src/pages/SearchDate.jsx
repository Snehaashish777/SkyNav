import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FlightFeed from '../components/FlightFeed';

const apiKey = "b4d0ac7c49e0ad1bbe3635510de44fda";
const url = `https://api.aviationstack.com/v1/flights?access_key=${apiKey}`;

export default function SearchDate() {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchDate, setSearchDate] = useState('');
  const [searchTime, setSearchTime] = useState('');

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
    if (!searchDate) {
      setFilteredFlights(flights);
      return;
    }

    const filtered = flights.filter(flight => {
      if (!flight.flight_date) return false;
      
      // API flight_date is usually YYYY-MM-DD
      const dateMatches = flight.flight_date === searchDate;
      
      if (!dateMatches) return false;
      
      // If time is provided, we can try to match it against departure time
      if (searchTime && flight.departure?.scheduled) {
        // departure.scheduled format: "2019-12-12T04:20:00+00:00"
        try {
          const depTime = flight.departure.scheduled.split('T')[1].substring(0, 5);
          // Simple string inclusion or exact match depending on precision wanted
          // Let's do a loose inclusion for simplicity (e.g. '04:' matches '04:20')
          // Or just exact HH:MM match
          return depTime === searchTime;
        } catch (e) {
          return true; // fallback to just date match if time parsing fails
        }
      }
      
      return true;
    });
    
    setFilteredFlights(filtered);
  }, [searchDate, searchTime, flights]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search by Date</h1>
          <p className="text-gray-500">Filter flights by specific dates and departure times.</p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row gap-4 max-w-xl">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              className="block w-full px-3 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Time (Optional)</label>
            <input
              type="time"
              className="block w-full px-3 py-3 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm"
              value={searchTime}
              onChange={(e) => setSearchTime(e.target.value)}
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
