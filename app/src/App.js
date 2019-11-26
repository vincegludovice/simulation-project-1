import React, { useState } from "react";
import {
  Route,
  Link as RouterLink,
  BrowserRouter,
  Switch,
  Redirect
} from "react-router-dom";
import {
  Button,
  CssBaseline,
  Typography,
  Container,
  AppBar,
  Toolbar
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Background from "./components/Background";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ManageUsers from "./components/ManageUsers";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Swal from "sweetalert2";
import "./App.css";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  rooot: {
    background: "#FFF",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    left: "50%",
    top: "40%",
    position: "absolute",
    msTransform: "translate(-50%, -50%)",
    webkitTransform: "translate(-50%, -50%)",
    transform: "translate(-50%, -50%)",
    zIndex: "2"
  },
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#009688"
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  noPad: {
    padding: "0"
  },
  white: {
    color: "white"
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const [token, setToken] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    setAnchorEl(null);
    Swal.fire(
      `Logged out Successfully!`,
      `Goodbye, ${localStorage.getItem("Name")}!`
    ).then(function() {
      window.location = "/";
      localStorage.clear();
    });
  };
  return (
    <React.Fragment>
      <Container
        component="main"
        maxWidth="xl"
        className={`${classes.noPad} ${classes.paper}`}
      >
        <CssBaseline />
        <BrowserRouter>
          <React.Fragment>
            <AppBar position="static">
              <Toolbar className={classes.toolbar}>
                <Typography variant="h6">Boomsourcing Login Form</Typography>
                <Switch>
                  <Route
                    exact
                    path={["/", "/login", "/register"]}
                    render={() => (
                      <div>
                        <RouterLink to="/">
                          <Button className={classes.white}>login</Button>
                        </RouterLink>
                        <RouterLink to="/register">
                          <Button className={classes.white}>sign up</Button>
                        </RouterLink>
                      </div>
                    )}
                  />
                  <Route
                    path="/manage-users"
                    render={() => (
                      <div>
                        <Button
                          className={classes.white}
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                          onClick={handleClick}
                        >
                          My account
                        </Button>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={logout}>Logout</MenuItem>
                        </Menu>
                      </div>
                    )}
                  />
                </Switch>
              </Toolbar>
            </AppBar>
            {redirect || localStorage.getItem("Token") ? (
              <Redirect to="/manage-users" />
            ) : null}
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Login setRedirect={setRedirect} setToken={setToken} />
                )}
              />
              <Route
                path="/register"
                render={props => <SignUp {...props} setToken={setToken} />}
              />
              <Route
                path="/manage-users"
                render={props => <ManageUsers {...props} token={token} />}
              />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </Container>
      <Background />
    </React.Fragment>
  );
}
