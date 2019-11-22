import React from "react";
import {
  Route,
  Link as RouterLink,
  BrowserRouter,
  Switch
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
                <div>
                  <RouterLink to="/">
                    <Button className={classes.white}>login</Button>
                  </RouterLink>
                  <RouterLink to="/register">
                    <Button className={classes.white}>register</Button>
                  </RouterLink>
                </div>
              </Toolbar>
            </AppBar>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/register" component={SignUp} />
              <Route path="/manageUsers" component={ManageUsers} />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </Container>
      <Background />
    </React.Fragment>
  );
}
