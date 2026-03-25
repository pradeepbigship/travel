import React, { useState, useEffect, useMemo } from "react";

const TravelExplorer = () => {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("explore");
  const [category, setCategory] = useState("All");
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("fav")) || [];
  });
  const [dark, setDark] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(favorites));
  }, [favorites]);

  const destinations = [
    {
      id: 1,
      name: "Santorini, Greece",
      price: 1200,
      rating: 4.9,
      category: "Luxury",
      tag: "Trending",
      desc: "Cliffside sunsets & white-blue architecture.",
      img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800",
    },
    {
      id: 2,
      name: "Bali, Indonesia",
      price: 800,
      rating: 4.8,
      category: "Beach",
      tag: "Best Value",
      desc: "Tropical paradise with culture & nightlife.",
      img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800",
    },
    {
      id: 3,
      name: "Kyoto, Japan",
      price: 1500,
      rating: 4.7,
      category: "Culture",
      tag: "Historic",
      desc: "Temples, traditions & cherry blossoms.",
      img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800",
    },
    {
      id: 4,
      name: "Swiss Alps",
      price: 2100,
      rating: 5.0,
      category: "Mountains",
      tag: "Premium",
      desc: "Snow peaks & breathtaking landscapes.",
      img: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&w=800",
    },
  ];

  const toggleFav = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      return (
        d.name.toLowerCase().includes(search.toLowerCase()) &&
        (category === "All" || d.category === category) &&
        (tab === "explore" || favorites.includes(d.id))
      );
    });
  }, [search, category, tab, favorites]);

  const featured = destinations[0];

  return (
    <div className={`${dark ? "dark bg-slate-900 text-white" : "bg-slate-50"} min-h-screen transition`}>
      
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 shadow bg-white dark:bg-slate-800">
        <h1 className="text-2xl font-bold">🌍 TravelExplorer</h1>
        <div className="flex gap-4 items-center">
          <button onClick={() => setTab("explore")} className={tab==="explore" ? "font-bold" : ""}>Explore</button>
          <button onClick={() => setTab("favorites")} className={tab==="favorites" ? "font-bold" : ""}>Favorites</button>
          <button onClick={() => setDark(!dark)}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="relative h-[400px] flex items-center justify-center">
        <img src={featured.img} className="absolute w-full h-full object-cover brightness-50"/>
        <div className="relative text-center text-white">
          <h2 className="text-4xl font-bold">{featured.name}</h2>
          <p className="mt-2">{featured.desc}</p>
        </div>
      </div>

      {/* Search + Categories */}
      <div className="max-w-6xl mx-auto px-6 mt-6">
        <input
          placeholder="Search destinations..."
          className="w-full p-3 rounded-lg border mb-4 text-black"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-3 flex-wrap">
          {["All", "Beach", "Mountains", "Culture", "Luxury"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full border ${
                category === cat ? "bg-orange-500 text-white" : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((d) => {
          const fav = favorites.includes(d.id);

          return (
            <div key={d.id} className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow hover:scale-[1.02] transition">
              
              <div className="relative">
                <img src={d.img} className="h-52 w-full object-cover"/>
                <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                  {d.tag}
                </span>

                <button
                  onClick={() => toggleFav(d.id)}
                  className="absolute top-2 right-2 text-xl"
                >
                  {fav ? "❤️" : "🤍"}
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg">{d.name}</h3>
                <p className="text-sm opacity-70">{d.desc}</p>

                <div className="flex justify-between items-center mt-3">
                  <span className="text-orange-500 font-bold">${d.price}</span>
                  <span>⭐ {d.rating}</span>
                </div>

                <button
                  onClick={() => setSelected(d)}
                  className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
                >
                  Quick View
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl max-w-md w-full text-black">
            <h2 className="text-xl font-bold">{selected.name}</h2>
            <p className="mt-2">{selected.desc}</p>
            <p className="mt-2 font-bold">${selected.price}</p>
            <button
              onClick={() => setSelected(null)}
              className="mt-4 bg-black text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center py-6 text-sm opacity-60">
        ✈️ Built for travelers • Explore more, worry less
      </footer>
    </div>
  );
};

export default TravelExplorer;