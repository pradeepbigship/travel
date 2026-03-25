import React, { useState } from 'react';

const TravelExplorer = () => {
  const [search, setSearch] = useState('');

  const destinations = [
    { id: 1, name: 'Santorini, Greece', price: '$1,200', rating: 4.9, img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800' },
    { id: 2, name: 'Bali, Indonesia', price: '$800', rating: 4.8, img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800' },
    { id: 3, name: 'Kyoto, Japan', price: '$1,500', rating: 4.7, img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800' },
    { id: 4, name: 'Swiss Alps', price: '$2,100', rating: 5.0, img: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&w=800' },
  ];

  const filtered = destinations.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Section */}
      <header className="relative h-[500px] flex items-center justify-center text-white">
        <img 
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600" 
          className="absolute inset-0 w-full h-full object-cover brightness-50"
          alt="Travel Hero"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Explore the Unseen
          </h1>
          <p className="text-xl mb-8 opacity-90">Discover handpicked destinations for your next adventure.</p>
          
          <div className="max-w-xl mx-auto bg-white rounded-full p-2 flex shadow-2xl">
            <input 
              type="text" 
              placeholder="Where to next?" 
              className="flex-1 px-6 py-3 text-gray-800 outline-none rounded-full"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-full font-bold transition">
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Destination Grid */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Popular Destinations</h2>
            <div className="h-1 w-20 bg-orange-500 mt-2"></div>
          </div>
          <button className="text-orange-600 font-semibold hover:underline">View All</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map((dest) => (
            <div key={dest.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={dest.img} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-slate-900">
                  ⭐ {dest.rating}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-800 mb-1">{dest.name}</h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-orange-600 font-bold text-xl">{dest.price}</span>
                  <button className="text-sm bg-slate-100 px-4 py-2 rounded-lg font-medium hover:bg-slate-200 transition">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TravelExplorer;