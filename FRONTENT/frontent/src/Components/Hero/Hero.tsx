import "./hero.css"
import handicon from "../assets/images/image1.png"
import { MdWavingHand } from "react-icons/md";

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-second">
        <div className="hero-left">
          <h2>NEW ARRIVALS ONLY</h2>
          <div>
            <div className="hand-hand-icon">
              <p>new</p>
              <MdWavingHand color='red' />
            </div>
            <p className='para2'>Collections</p>
            <p className='para2'>for everyone</p>
          </div>
        </div>

        <div className="hero-right">
          <img className='editimg' src={handicon} alt="still loading"/>
        </div>
      </div>
    </div>
  )
}

export default Hero
