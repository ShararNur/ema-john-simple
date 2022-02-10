import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser);
    // console.log(success);
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                {
                    loggedInUser.success
                        ?
                        <>
                            <p style={{ display: 'inline', color: 'yellow', marginRight: '15px' }}>Welcome {loggedInUser.displayName}</p>
                            <Link to="#" onClick={() => setLoggedInUser({})}>Sign out</Link>
                        </>

                        : <Link to="/login">Sign in</Link>
                }
            </nav>
        </div >
    );
};

export default Header;