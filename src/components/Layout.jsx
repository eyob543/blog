import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Outlet, NavLink } from "react-router-dom";
import { useLoginStore, useUser } from "../store";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import _ from "lodash";

// eslint-disable-next-line react/prop-types
function LoggedIn({ handleClick, userName }) {
  return (
    <>
      <NavLink
        to="your-blogs"
        className={({ isActive }) =>
          isActive
            ? "border-b-white border-b-4 p-3"
            : "hov hover:border-b-4 p-3 border-b-slate-300"
        }
      >
        <Typography variant="h5" sx={{ fontWeight: 600, color: "white" }}>
          Your Blogs
        </Typography>
      </NavLink>
      <NavLink
        onClick={handleClick}
        className="hov hover:border-b-4 p-3 border-b-slate-300"
      >
        <Link underline="none">
          <Typography variant="h5" sx={{ fontWeight: 600, color: "white" }}>
            Logout
          </Typography>
        </Link>
      </NavLink>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, color: "white", my: "auto", fontSize: 18 }}
      >
        Welcome {`${_.split(userName, " ")[0]}`}
      </Typography>
    </>
  );
}

export default function Layout() {
  const preventDefault = (event) => event.preventDefault();
  const { isLoggedIn, setIsLoggedIn } = useLoginStore();
  const user = useUser();
  function handleSignOut() {
    signOut(auth).catch((error) => {
      console.log(error);
    });
    setIsLoggedIn(false);
  }
  return (
    <>
      <div className="w-full">
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            justifyContent: "space-around",
            alignItems: "flex-end",
            borderBottom: {
              xs: "1px solid gray",
              md: "none",
            },
            p: 1,
            typography: "body1",
            "& > :not(style) ~ :not(style)": {
              ml: 2,
            },
          }}
          onClick={preventDefault}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "border-b-white text-3xl border-b-4 p-3"
                : "hov hover:border-b-4 p-3 border-b-slate-300"
            }
          >
            <Link underline="none">
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: "white",
                }}
              >
                Blogs
              </Typography>
            </Link>
          </NavLink>
          <NavLink
            to="add-blog"
            className={({ isActive }) =>
              isActive
                ? "border-b-white border-b-4 p-3"
                : "hov hover:border-b-4 p-3 border-b-slate-300"
            }
          >
            <Link underline="none">
              <Typography variant="h5" sx={{ fontWeight: 600, color: "white" }}>
                Add Blogs
              </Typography>
            </Link>
          </NavLink>
          {isLoggedIn ? (
            <LoggedIn handleClick={handleSignOut} userName={user} />
          ) : (
            <>
              <NavLink
                to="login"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-white border-b-4 p-3"
                    : "hov hover:border-b-4 p-3 border-b-slate-300"
                }
              >
                <Link underline="none">
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, color: "white" }}
                  >
                    Login
                  </Typography>
                </Link>
              </NavLink>
              <NavLink
                to="sign-up"
                className={({ isActive }) =>
                  isActive
                    ? "border-b-white border-b-4 p-3"
                    : "hov hover:border-b-4 p-3 border-b-slate-300"
                }
              >
                <Link underline="none">
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, color: "white" }}
                  >
                    Sign Up
                  </Typography>
                </Link>
              </NavLink>
            </>
          )}
        </Box>
      </div>
      <Outlet />
    </>
  );
}
