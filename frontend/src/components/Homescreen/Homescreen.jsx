import ChatingScreen from '../../assets/undraw_chatting_re_j55r.svg'

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
        <div className="taglineDiv"><p>Lets the conversation begin</p></div>
        <div className="buttonContainer">
            <button className='HomeLoginButton'>Login</button>
            <button className='HomeSignUpButton'>Sign Up</button>
        </div>
        <hr className='ultimateHr'/>
    </>
  )
}

export default Homescreen