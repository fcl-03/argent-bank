import argentBankLogo from '../assets/img/argentBankLogo.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../store/authSlice'


function Navbar() {

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const user = useSelector((state) => state.auth.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSignOut = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
            <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
            {isLoggedIn ? (
                <>
                <Link className="main-nav-item" to="/profile">
                    <i className="fa fa-user-circle"></i>
                    {' '}{user?.firstName}
                </Link>
                <button onClick={handleSignOut} className="main-nav-item"> 
                    <i className="fa fa-sign-out"></i>{' '}Sign Out 
                </button>
                </>
            ) : (
                <Link className="main-nav-item" to="/login">
                    <i className="fa fa-user-circle"></i>
                {' '}Sign In
                </Link>  
            )}
        </div>
        </nav>
    )
}

export default Navbar