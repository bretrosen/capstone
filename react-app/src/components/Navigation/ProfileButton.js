import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const profileHighlight = "profile-highlight" + (showMenu ? "" : null);
  const closeMenu = () => setShowMenu(false);

  return (
    <>



      {user ? (
        <div>
          <button onClick={openMenu} className='nav-button account profile' id={profileHighlight}>
            Hey, {sessionUser?.first_name}
          </button>
          <ul className={ulClassName} ref={ulRef}>

            <>
              <li className="user-menu">{sessionUser.first_name} {sessionUser.last_name}</li>
              <li className="user-menu user-menu-nav"><NavLink exact to="/reviews/current" className="user-menu-nav" onClick={closeMenu} id="dropdown-links-">Your Ratings</NavLink>
              </li>
              <li className="user-menu user-border" onClick={closeMenu}></li>

              <li className="user-menu log-out">
                <button onClick={handleLogout}>Log Out</button>
              </li>
            </>
          </ul>
        </div>
      ) : (
        <div className='login-signup-buttons'>

          <li className='profile-button-link'>
            <OpenModalButton
              className='profile-button'
              buttonText='Log In'
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
          </li>

          <li className='profile-button-link'>
            <OpenModalButton
              className='signup-button'
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </li>

        </div>

      )}
    </>
  );
}

export default ProfileButton;
