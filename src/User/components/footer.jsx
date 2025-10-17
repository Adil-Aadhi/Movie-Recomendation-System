import React from 'react';
import '../style/footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer bg-gradient-to-r from-blue-800 via-purple-800 to-pink-700 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Grid: 3 columns on mobile, 4 columns on larger screens */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 sm:gap-8">

          {/* Logo + description + social */}
          <div className="col-span-3 sm:col-span-1">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-cyan-400 mb-2">
              MovieVerse
            </div>
            <p className="text-gray-200 text-sm">
              Your personal movie recommendation engine
            </p>
            <div className="flex gap-3 mt-2">
              <a aria-label="Facebook" className="hover:text-blue-500"><i className="fab fa-facebook-f"></i></a>
              <a aria-label="Twitter" className="hover:text-blue-400"><i className="fab fa-twitter"></i></a>
              <a aria-label="Instagram" className="hover:text-pink-500"><i className="fab fa-instagram"></i></a>
              <a aria-label="YouTube" className="hover:text-red-600"><i className="fab fa-youtube"></i></a>
            </div>
          </div>

          {/* Discover Section */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-2 text-sm sm:text-base">Discover</h4>
            <hr className='w-10 md:w-40 text-yellow-300'></hr>
            <hr className='w-10 md:w-40 text-yellow-300 mb-2'></hr>
            <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
              <li><Link to="/discovermovie" className="hover:text-cyan-300">Coming Soon</Link></li>
            </ul>
          </div>

          {/* Genres Section */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-2 text-sm sm:text-base">Genres</h4>
             <hr className='w-10 md:w-40  text-yellow-300'></hr>
             <hr className='w-10 md:w-40 text-yellow-300  mb-2'></hr>
            <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
              <li><Link to="/moviegenre" state={{ id: 28, name: "Action" }} className="hover:text-cyan-300">Action</Link></li>
              <li><Link to="/moviegenre" state={{ id: 35, name: "Comedy" }} className="hover:text-cyan-300">Comedy</Link></li>
              <li><Link to="/moviegenre" state={{ id: 18, name: "Drama" }} className="hover:text-cyan-300">Drama</Link></li>
              <li><Link to="/moviegenre" state={{ id: 878, name: "Sci-Fi" }} className="hover:text-cyan-300">Sci-Fi</Link></li>
              <li><Link to="/moviegenre" state={{ id: 27, name: "Horror" }} className="hover:text-cyan-300">Horror</Link></li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="col-span-1">
            <h4 className="font-semibold mb-2 text-sm sm:text-base">Support</h4>
             <hr className='w-10 md:w-40 text-yellow-300'></hr>
             <hr className='w-10 md:w-40 text-yellow-300  mb-2'></hr>
            <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
              <li><Link to="/about" className="hover:text-cyan-300">About</Link></li>
              <li><Link to="/services" className="hover:text-cyan-300">Services</Link></li>
              <li><Link to="/helpcenter" className="hover:text-cyan-300">Help Center</Link></li>
            </ul>
          </div>

        </div>

        {/* Footer bottom */}
        <div className="mt-8 border-t border-gray-500 pt-4 text-center text-xs sm:text-sm text-gray-300">
          &copy; {new Date().getFullYear()} MovieVerse. All rights reserved.
          <p className="text-white/50 text-xs mt-3">
            MovieVerse uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
