import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateLoginStatus } from '../../store/loginStatus.slice'
import { useSelector } from "react-redux";

const Header = () => {
  const isLogin = useSelector((state:any)=>state.isLogin)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  function logoutHandler(navigate:Function){
    localStorage.removeItem("token")
    dispatch(updateLoginStatus(false))
    navigate("/")
  }

  return (
    <div style={{margin: '2rem 7rem'}}>
      <Link to="/">
        <h1 style={{display: 'contents'}}>Find your new home</h1>
      </Link>
      {isLogin ? <Link to="/" onClick={logoutHandler.bind(null, navigate)} style={{float: 'right', marginLeft: '1rem'}}><h3>logout</h3></Link> : <Link to="/login" style={{float: 'right', marginLeft: '1rem'}}><h3>login</h3></Link>}
      <Link to="/signup" style={{float: 'right'}}><h3>signup</h3></Link>
    </div>
  );
};

export default Header;
