import Hero from "../components/hero"
import HomeCard from "../components/homecard"
import Footer from "../components/footer"

function Home(){
    return (
        <div>
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