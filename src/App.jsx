import React, { useState, useMemo, useEffect } from "react";

const TravelExplorer = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [minRating, setMinRating] = useState(0);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const destinations = [
    { id: 1, name: "Santorini, Greece", price: 1200, rating: 4.9, img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800" },
    { id: 2, name: "Bali, Indonesia", price: 800, rating: 4.8, img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800" },
    { id: 3, name: "Kyoto, Japan", price: 1500, rating: 4.7, img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800" },
    { id: 4, name: "Swiss Alps", price: 2100, rating: 5.0, img: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&w=800" },
  ];

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const filtered = useMemo(() => {
    let result = destinations.filter(
      (d) =>
        d.name.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
        d.rating >= minRating
    );

    if (sortBy === "priceLow") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHigh") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [debouncedSearch, sortBy, minRating]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero */}
      <header className="relative h-[500px] flex items-center justify-center text-white">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
          alt=""
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl font-extrabold mb-4">Explore the Unseen</h1>
          <p className="text-lg mb-6">Find your next dream destination</p>

          <div className="max-w-xl mx-auto bg-white rounded-full p-2 flex shadow-xl">
            <input
              type="text"
              placeholder="Search destinations..."
              className="flex-1 px-5 py-3 text-gray-800 rounded-full outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-full font-bold">
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 mt-10 flex flex-wrap gap-4 justify-between items-center">
        <div className="flex gap-4">
          <select
            className="px-4 py-2 rounded-lg border"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="priceLow">Price ↑</option>
            <option value="priceHigh">Price ↓</option>
            <option value="rating">Top Rated</option>
          </select>

          <select
            className="px-4 py-2 rounded-lg border"
            onChange={(e) => setMinRating(Number(e.target.value))}
          >
            <option value="0">All Ratings</option>
            <option value="4.5">4.5+</option>
            <option value="4.8">4.8+</option>
          </select>
        </div>

        <div className="text-sm text-gray-600">
          {filtered.length} destinations found
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map((dest) => {
            const isFav = favorites.includes(dest.id);

            return (
              <div
                key={dest.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition group"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={dest.img}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />

                  {/* Rating */}
                  <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-bold">
                    ⭐ {dest.rating}
                  </div>

                  {/* Favorite */}
                  <button
                    onClick={() => toggleFavorite(dest.id)}
                    className="absolute top-3 left-3 text-xl"
                  >
                    {isFav ? "❤️" : "🤍"}
                  </button>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg">{dest.name}</h3>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-orange-600 font-bold text-xl">
                      ${dest.price}
                    </span>

                    <button className="bg-slate-100 px-4 py-2 rounded-lg hover:bg-slate-200">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No destinations found 😢
          </div>
        )}
      </main>
    </div>
  );
};

export default TravelExplorer;