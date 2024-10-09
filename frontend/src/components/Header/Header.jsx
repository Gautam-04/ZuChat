import HeaderIcon from '../../assets/favicon.svg'
function Header() {
  return (
    <div className="HeaderCompleteDiv">
        <img src={HeaderIcon} alt="" className="headerImg" />
        <h1 className="HeaderTitle">ZUCHAT</h1>
    </div>
  )
}

export default Header