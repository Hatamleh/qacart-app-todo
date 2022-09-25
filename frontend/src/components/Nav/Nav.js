import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { Button, Container } from "@material-ui/core";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Cookies from "js-cookie";

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.img`
  width: 200px;
`;

const NavLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin: 0 40px;
  &:hover {
    border-bottom: 2px solid #fff;
  }
`;

const Nav = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setUser("");
    Cookies.remove("access_token");
    Cookies.remove("userID");
    Cookies.remove("firstName");
  };
  return (
    <Container>
      <NavContainer>
        <Logo src={logo} />
        <NavLinksContainer>
          <NavLink to="/">Home</NavLink>
          {user ? null : <NavLink to="/login">Login</NavLink>}
          {user ? null : <NavLink to="/signup">Signup</NavLink>}
          {user ? <NavLink to="/todo">Todo</NavLink> : null}
          {user ? (
            <Button variant="contained" color="primary" onClick={handleLogout} style={{ width: "100px" }}>
              Logout
            </Button>
          ) : null}
        </NavLinksContainer>
      </NavContainer>
    </Container>
  );
};
export default Nav;
