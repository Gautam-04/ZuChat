import { Link } from 'react-router-dom'
import ChatingScreen from '../../assets/undraw_chatting_re_j55r.svg'
import { Button } from '@chakra-ui/react'

function Homescreen() {
  return (
    <>
        <div className="home_screen_maindiv">
            <div className="home_screen_1div">
                <h1 className="Home_screen_title">Let every conversation flow - <br/> <span>without<br/> compromise</span></h1>
                <div className="InnerContent">
                    <p className="firstline">Secure and compliant communication platform.</p>
                    <p className="secondline">Own your data and share anything and everything</p>
                </div>
            </div>
            <div className="home_screen_2div">
                <img src={ChatingScreen} alt="noimg.png"  />
            </div>
        </div>
        <div className="home_screen_2maindiv">
            <div className="taglineDiv"><p>Let the conversation begin</p></div>
            <div className="buttonContainer">
            <Link to="/auth"><Button className='HomeLoginButton'>Login</Button></Link>
            <Link to="/auth"><Button className='HomeSignUpButton'>Sign Up</Button></Link>
            </div>
        </div>
        <hr className='ultimateHr'/>
    </>
  )
}

export default Homescreen