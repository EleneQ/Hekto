import { Link, NavLink, useNavigate } from "react-router-dom";
import { GoPerson } from "react-icons/go";
import { BsCart } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import Container from "./styles/Container.styled";
import {
  NavbarStyled,
  Nav,
  NavLinks,
  Logo,
  SearchForm,
  SearchInput,
  SearchButton,
  LoginButton,
} from "./styles/Navbar.styled";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import NavDropdown from "./NavDropdown";

const navLinks = [
  { name: "Home", link: "/" },
  { name: "Products", link: "/products" },
  { name: "Blog", link: "/blog" },
];

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <NavbarStyled>
      <Container className="container">
        <Link to="/">
          <Logo>Hekto</Logo>
        </Link>
        <Nav>
          <NavLinks>
            {navLinks.map((navLink) => (
              <NavLink
                key={navLink.name}
                className={({ isActive }) => (isActive ? "active" : "")}
                to={navLink.link}
              >
                {navLink.name}
              </NavLink>
            ))}
          </NavLinks>
        </Nav>
        <SearchForm>
          <SearchInput type="text" name="searchTerm" />
          <SearchButton>
            <CiSearch />
          </SearchButton>
        </SearchForm>
        <div>
          {userInfo ? (
            <NavDropdown title={userInfo.name}>
              <Link to="/profile">Profile</Link>
              <button onClick={logoutHandler}>Logout</button>
            </NavDropdown>
          ) : (
            <Link to="/login">
              <LoginButton>
                Login <GoPerson size={"1.25rem"} />
              </LoginButton>
            </Link>
          )}

          <Link
            to="/cart"
            style={{
              backgroundColor: "transparent",
              marginLeft: "2rem",
              color: "black",
            }}
          >
            <BsCart size={"1.25rem"} /> Cart
          </Link>
        </div>
      </Container>
    </NavbarStyled>
  );
};
export default Navbar;
