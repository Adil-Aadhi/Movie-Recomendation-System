function HelpCenter() {
  return (
    <div className="bg-gradient-to-br from-black to-gray-900 min-h-screen text-white py-16 px-6">
      <div className="max-w-5xl mx-auto mt-10">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center mb-8">Help Center</h1>
        <p className="text-gray-300 text-center mb-12">
          Find answers to common questions and learn how to get the best out of 
          <span className="text-yellow-400 font-semibold"> MovieVerse</span>.
        </p>

        {/* FAQs */}
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-2">❓ How do I search for a movie?</h2>
            <p className="text-gray-300">
              Just type the movie name in the search bar and hit Enter. 
              You’ll instantly see details like title, release year, cast, and more.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-2">❓ How are recommendations generated?</h2>
            <p className="text-gray-300">
              Our system finds movies with similar directors, lead actors, and genres 
              to suggest films you’re likely to enjoy.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-2">❓ Do I need an account?</h2>
            <p className="text-gray-300">
              Nope! You can explore movies without signing up. 
              (Future versions may include optional accounts for watchlists.)
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-2">❓ Why don’t I see some movies?</h2>
            <p className="text-gray-300">
              The database is still growing. We’ll be adding more movies and improving 
              search results over time.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-2">❓ Can I save movies to watch later?</h2>
            <p className="text-gray-300">
              Not yet, but we’re working on a Watchlist feature so you can bookmark 
              your favorite titles.
            </p>
          </div>
        </div>

        {/* Still need help */}
        <div className="text-center mt-12">
          <p className="text-gray-300 mb-4">Still need help?</p>
          <a
            href="/contact"
            className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default HelpCenter;
