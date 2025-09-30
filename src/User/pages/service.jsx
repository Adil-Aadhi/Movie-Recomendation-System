function Services() {
  return (
    <div className="bg-gradient-to-br from-black to-gray-900 min-h-screen text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mt-10">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold mb-10">Our Services</h1>

        <p className="text-lg mb-12 text-gray-300">
          At <span className="text-yellow-400 font-semibold">MovieVerse</span>, 
          we provide smart tools to make your movie discovery journey easier and more enjoyable.
        </p>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Movie Search */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform">
            <h2 className="text-2xl font-bold mb-3">🔎 Movie Search</h2>
            <p className="text-gray-300">
              Instantly find details about any movie – including title, poster, cast, release year, and more.
            </p>
          </div>

          {/* Recommendations */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform">
            <h2 className="text-2xl font-bold mb-3">🎥 Smart Recommendations</h2>
            <p className="text-gray-300">
              Get personalized suggestions based on directors, lead actors, and genres related to your search.
            </p>
          </div>

          {/* Discovery */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform">
            <h2 className="text-2xl font-bold mb-3">🌍 Movie Discovery</h2>
            <p className="text-gray-300">
              Explore trending films, popular titles, and hidden gems across different genres and eras.
            </p>
          </div>

          {/* Personalization */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform">
            <h2 className="text-2xl font-bold mb-3">⭐ Personalized Experience</h2>
            <p className="text-gray-300">
              (Coming Soon) Get movie suggestions tailored to your taste and preferences.
            </p>
          </div>

          {/* Watchlist */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform">
            <h2 className="text-2xl font-bold mb-3">📌 Watchlist</h2>
            <p className="text-gray-300">
              (Coming Soon) Save your favorite movies to a personal watchlist and never lose track.
            </p>
          </div>

          {/* Easy UI */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform">
            <h2 className="text-2xl font-bold mb-3">⚡ Smooth Experience</h2>
            <p className="text-gray-300">
              Enjoy a fast, clean, and user-friendly interface built with React and Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
