function About() {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white py-16 px-6">
      <div className="max-w-5xl mx-auto text-center mt-10">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold mb-6">About Us</h1>

        {/* Intro */}
        <p className="text-lg mb-6 text-gray-300">
          Welcome to <span className="text-yellow-400 font-semibold">MovieVerse</span> 🎬 – 
          your personal movie discovery assistant! Choosing what to watch can be tough, 
          and that’s why we built this platform: to make finding the right movie easier, faster, and fun.
        </p>

        {/* What We Do */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 text-left">
          <h2 className="text-2xl font-bold mb-3">🎥 What We Do</h2>
          <ul className="space-y-2 text-gray-300 list-disc pl-5">
            <li>Search for any movie and instantly view its details – title, poster, release year, cast, and more.</li>
            <li>Discover other movies by the same director or lead actor.</li>
            <li>Get personalized movie suggestions based on your search.</li>
            <li>Enjoy a smooth and clean user experience powered by React.</li>
          </ul>
        </div>

        {/* How It Works */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 text-left">
          <h2 className="text-2xl font-bold mb-3">⚙️ How It Works</h2>
          <p className="text-gray-300 mb-3">
            The recommendation system uses a mix of data (such as cast, director, and genres) 
            to find movies similar to the one you searched for. By comparing these features, 
            we suggest films that match your taste.
          </p>
          <p className="text-gray-300">
            Built with <span className="text-yellow-400">React</span> for the frontend and 
            styled with <span className="text-yellow-400">Tailwind CSS</span>, 
            it focuses on performance and ease of use.
          </p>
        </div>

        {/* Future Plans */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 text-left">
          <h2 className="text-2xl font-bold mb-3">🚀 Future Plans</h2>
          <ul className="space-y-2 text-gray-300 list-disc pl-5">
            <li>Integrating user ratings and reviews to improve recommendations.</li>
            <li>Adding trending & popular movies section.</li>
            <li>Creating personalized watchlists for users.</li>
            <li>Enhancing search with filters like genre, language, and release year.</li>
          </ul>
        </div>

        {/* Goal */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 text-left">
          <h2 className="text-2xl font-bold mb-3">🎯 Our Goal</h2>
          <p className="text-gray-300">
            Our mission is simple: to help you discover the 
            <span className="text-yellow-400"> right movie at the right time</span>.  
            Whether you’re in the mood for action, romance, comedy, or thrillers – 
            MovieMate makes your movie journey effortless.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
