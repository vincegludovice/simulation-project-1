import React, { useState } from "react";
import {
  Grid,
  Button,
  TextField,
  Typography,
  Container
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockOutlined from "@material-ui/icons/Lock";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from "axios";
import Swal from "sweetalert2";

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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto"
  },
  avatar: {
    fontSize: "50px",
    marginTop: 10
  },
  form: {
    width: "100%",
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
  },
  margins: {
    margin: theme.spacing(1)
  }
}));

export default function Login(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    password: ""
  });
  const [email, setEmail] = useState("");
  const [ErrorEmail, setErrorEmail] = useState("");
  const [ErrorPass, setErrorPass] = useState("");
  const handleChangePassword = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleSubmit = e => {
    e.preventDefault();
    values.password === ""
      ? setErrorPass("This field is required")
      : setErrorPass("");
    if (email === "") setErrorEmail("This field is required");
    else {
      if (
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
          email
        )
      ) {
        setErrorEmail("");
      } else setErrorEmail("Please Enter a valid Email");
    }
    if (email && values.password.length >= 8) {
      // Login
      axios
        .post("http://localhost:3000/login", {
          email: email,
          password: values.password
        })
        .then(token => {
          localStorage.setItem("Token", token.data.accessToken);
          props.setToken(token.data.accessToken);
          axios
            .get(`http://localhost:3000/users?q=${email}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("Token")}`
              }
            })
            .then(res => {
              localStorage.setItem("Name", res.data[0].firstName);
              Swal.fire(
                `Logged in Successfully!`,
                `Welcome, ${res.data[0].firstName}!`
              );
              props.setRedirect(true);
            })
            .catch(error => {
              try {
                Swal.fire({
                  title: error.response.data,
                  icon: "error",
                  button: true
                });
              } catch {
                Swal.fire({
                  title: error,
                  icon: "error",
                  button: true
                });
              }
            });
        })
        .catch(error => {
          try {
            Swal.fire({
              title: error.response.data,
              icon: "error",
              button: true
            });
          } catch {
            Swal.fire({
              title: error,
              icon: "error",
              button: true
            });
          }
        });
      // Login End
    } else if (values.password.length < 8 && values.password.length > 0) {
      Swal.fire({
        title: "Login Failed! Please check your email or password!",
        icon: "error",
        button: true
      });
    }
  };
  return (
    <Container
      maxWidth="xs"
      component="div"
      className={`${classes.paper} ${classes.rooot}`}
    >
      <PersonPinIcon className={classes.avatar} />
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={1} alignItems="flex-end" xs={12}>
          <Grid item xs={1}>
            <AccountCircle />
          </Grid>
          <Grid item xs={11}>
            <TextField
              error={ErrorEmail === "" ? false : true}
              helperText={ErrorEmail ? ErrorEmail : ""}
              variant="standard"
              margin="normal"
              required={true}
              id="email input-with-icon-grid standard-full-width"
              label="Email Address"
              name="email"
              autoComplete="email"
              style={{ margin: 8 }}
              fullWidth
              type="email"
              onChange={e => setEmail(e.target.value)}
              InputLabelProps={{ required: false }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end" xs={12}>
          <Grid item xs={1}>
            <LockOutlined />
          </Grid>
          <Grid item xs={11}>
            <TextField
              error={ErrorPass === "" ? false : true}
              helperText={ErrorPass ? ErrorPass : ""}
              variant="standard"
              margin="normal"
              required
              id="firstName input-with-icon-grid standard-adornment-password"
              label="Password"
              name="password"
              autoComplete="password"
              style={{ margin: 8 }}
              fullWidth
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChangePassword("password")}
              InputLabelProps={{ required: false }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={e => e.preventDefault()}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={e => handleSubmit(e)}
        >
          Sign In
        </Button>
      </form>
    </Container>
  );
}
