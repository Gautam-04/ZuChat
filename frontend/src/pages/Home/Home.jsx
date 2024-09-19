import Homescreen from '../../components/Homescreen/Homescreen'
import './Home.css'
import { FcGoogle } from "react-icons/fc";
import { FaGithub,FaLinkedin,FaFacebookMessenger   } from "react-icons/fa";
import Encryption from "../../assets/end-to-end-encrypttion.svg";
import SelfDestruction from "../../assets/self_destruction.svg";
import Anonymous from "../../assets/anonymous.svg";
import Footer from '../../components/Footer/Footer';


function Home() {
  return (
    <>
        <Homescreen />
        <div className="TrustedIcons">
          <p className="trustedPara">Trusted by 10M+ users around the world</p>
          <div className="IconsDiv">
            <FaGithub className='icons' />
            <FcGoogle className='icons' />
            <FaLinkedin className='icons' color='blue'/>
            <FaFacebookMessenger className='icons' color='#0078FF'/>
          </div>
        </div>
        <div className="FeaturesMainDiv">
          <div className="FeaturesDiv1">
            <div className="ContentDiv">
              <h1>End-to-End Encryption</h1>
              <h4>Your conversations stay private.</h4>
              <p>All messages are encrypted from sender to receiver, ensuring that only the intended participants can read them.</p>
            </div>
            <div className="ImageDiv">
              <img src={Encryption} alt="" />
            </div>
          </div>
          <div className="FeaturesDiv2">
            <div className="ContentDiv">
              <h1>Self-Destructing Messages</h1>
              <h4>Privacy with a time limit.</h4>
              <p>Control how long your messages stay visible by setting them to disappear automatically after a chosen duration.</p>
            </div>
            <div className="ImageDiv">
              <img src={SelfDestruction} alt="" />
            </div>
          </div>
          <div className="FeaturesDiv1">
            <div className="ContentDiv">
              <h1>Anonymous Chat Rooms</h1>
              <h4>Connect without revealing your identity.</h4>
              <p>Join chat rooms without the need for personal details, keeping your identity private and secure.</p>
            </div>
            <div className="ImageDiv">
              <img src={Anonymous} alt="" />
            </div>
          </div>
        </div>
        <Footer />
    </>
  )
}

export default Home