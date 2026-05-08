import FlightCard from './FlightCard';

export default function FlightFeed({ flights }) {
  if (!flights || flights.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="bg-gray-50 rounded-full p-6 mb-4">
          <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No flights found</h3>
        <p className="text-gray-500 max-w-sm">Try adjusting your search criteria or check back later for updated flight information.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {flights.map((flight, index) => (
        // Using index as fallback key since API data might not have unique IDs or might have duplicates
        <FlightCard key={flight.flight?.iata || index} flight={flight} />
      ))}
    </div>
  );
}
