import Hero from "../components/hero"
import HomeCard from "../components/homecard"
import Footer from "../components/footer"
import { useState,useEffect } from "react";

function Home(){

  const [showAlert, setShowAlert] = useState(false);

   useEffect(() => {
    // Check if alert was already shown in this session
    const alertShown = sessionStorage.getItem("vpnAlertShown");
    if (!alertShown) {
      setShowAlert(true);
      sessionStorage.setItem("vpnAlertShown", "true");
    }
  }, []);

    return (
        <div>
          {showAlert && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm animate-fadeIn">
    <div className="bg-white border-2 border-blue-500 text-gray-800 font-semibold p-6 rounded-xl shadow-2xl text-center max-w-md transform scale-95 animate-popIn relative">
      {/* Close button */}
      <button
        onClick={() => setShowAlert(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition duration-200"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      {/* Icon */}
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      {/* Content */}
      <h2 className="text-xl font-bold mb-3 text-blue-800">VPN Recommendation</h2>
      <p className="text-gray-600 mb-6 leading-relaxed">
        For optimal performance, we recommend using a VPN service during your session.
      </p>
      
      {/* Action button */}
      <button
        onClick={() => setShowAlert(false)}
        className="bg-blue-600 text-white font-medium px-6 py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 w-full"
      >
        Continue Anyway
      </button>
    
    </div>
  </div>
)}


          <div>
            <Hero/>
          </div>
          <div>
            <HomeCard/>
          </div>
            <Footer/>
        </div>
    )
}
export default Home