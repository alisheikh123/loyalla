import React , {useState , useEffect} from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink,

} from "shards-react";
import history from '../../../../history.js'
import ProfleModal from '../../../UserProfile/ProfileModal'
import avatar from '../../../../styles/images/avatar-users.png'
import {Avatar} from '@material-ui/core'
import useAuth from '../../../../Authentication/useAuth'

const UserActions = () => {

  const [visible, setVisible] = useState(false);
  const [open, setModal] = useState(false);
  // const [user, setUser] = useState({
  //   avatar : '',
  //   name : ''
  // });
  const { logout, user } = useAuth()

  const toggleUserActions = () => {
    setVisible(prevCheck => !prevCheck);
  };
  const toggle = () => {
    setModal(prevCheck => !prevCheck);
  };
  // const logout = () => {

  //   localStorage.removeItem("accessTokens&d");
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("users");
  //   history.push('/login');

  // };
  // useEffect(() => {
  //   debugger;
  //   var userList = JSON.parse(localStorage.getItem("users"));
  //   setUser({name : userList.name , avatar : userList.avatar});

  // }, [])
  return (
    <div>
      <NavItem tag={Dropdown} caret toggle={toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">

            {user.avatar === null ?
              <img
                className="user-avatar rounded-circle mr-2"
                src={avatar}
                alt="User Avatar"
              />
              :
              <img
                className="user-avatar rounded-circle mr-2"
                src={avatar}
                alt="User Avatar"
              />
            }

        <span className="d-none d-md-inline-block">{user.fname} {' '} {user.lname}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={visible}>
          <DropdownItem className="nav-action" >
            My Profile
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={logout} className="nav-action" style={{ color: "#FF4D4D" }}>
            Sign Out
          </DropdownItem>
        </Collapse>

        {/* ----------View Profile Modal-------------- */}


      </NavItem>
      {open ?
        <ProfleModal open={open} handleclose={toggle} /> : null
      }
    </div>

  )

}

export default UserActions
