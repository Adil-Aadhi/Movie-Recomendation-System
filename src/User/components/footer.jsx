import React from 'react';
import '../style/footer.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer bg-gradient-to-r from-blue-800 via-purple-800 to-pink-700">
      <div className="footer-content">
        <div className="footer-section">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-cyan-400">
            <h3>MovieVerse</h3>
          </div>
           <p>Your personal movie recommendation engine</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Discover</h4>
          <ul>
            <li><a href="#">New Releases</a></li>
            <li><a href="#">Trending Now</a></li>
            <li><a href="#">Coming Soon</a></li>
            <li><a href="#">Top Rated</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Genres</h4>
          <ul>
            <li><Link to="/moviegenre" state={{ id: 28, name: "Action" }}>Action</Link></li>
            <li><Link to="/moviegenre"  state={{ id: 35, name: "Comedy" }}>Comedy</Link></li>
            <li><Link to="/moviegenre"  state={{ id: 18, name: "Drama" }}>Drama</Link></li>
            <li><Link to="/moviegenre"  state={{ id: 878, name: "Sci-Fi" }}>Sci-Fi</Link></li>
            <li><Link to="/moviegenre"  state={{ id: 27, name: "Horror" }}>Horror</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Newsletter</h4>
          <p>Subscribe to get movie recommendations</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" />
            <button type="submit">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MovieRec. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;