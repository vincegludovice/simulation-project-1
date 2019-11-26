import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PersonOutlined from "@material-ui/icons/PersonOutlined";
import Create from "@material-ui/icons/Create";
import EmailOutlined from "@material-ui/icons/EmailOutlined";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";

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
    boxShadow: "0 8px 17px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);",
    left: "50%",
    top: "45%",
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
    fontSize: "50px",
    marginTop: 10
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

export default function SignUp(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    password: ""
  });
  const [confirmValues, setConfirmValues] = useState({
    password: ""
  });
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [conf, setConf] = useState("");
  const [ErrorUsername, setErrorUsername] = useState("");
  const [ErrorEmail, setErrorEmail] = useState("");
  const [ErrorFirstname, setErrorFirstname] = useState("");
  const [ErrorLastname, setErrorLastname] = useState("");
  const [ErrorPass, setErrorPass] = useState("");
  const [ErrorConfirmPass, setErrorConfirmPass] = useState("");

  const handleChangeEmail = event => {
    setEmail(event.target.value);
  };
  const handleChangeUsername = event => {
    setUsername(event.target.value);
  };
  const handleChangeFname = event => {
    setFname(event.target.value);
  };
  const handleChangeLname = event => {
    setLname(event.target.value);
  };
  const handleChangePassword = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleChangeConfrmPassword = prop => event => {
    setConfirmValues({ ...confirmValues, [prop]: event.target.value });
    setConf(event.target.value);
  };
  const handleClickShowConfirmPassword = () => {
    setConfirmValues({
      ...confirmValues,
      showPassword: !confirmValues.showPassword
    });
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  // const Post
  const handleSubmit = e => {
    e.preventDefault();
    fname === ""
      ? setErrorFirstname("This field is required")
      : setErrorFirstname("");
    lname === ""
      ? setErrorLastname("This field is required")
      : setErrorLastname("");
    username === ""
      ? setErrorUsername("This field is required")
      : setErrorUsername("");
    values.password === ""
      ? setErrorPass("This field is required")
      : setErrorPass("");
    values.password.length < 8
      ? setErrorPass("Password should be 8 or more characters!")
      : setErrorPass("");
    if (conf === "") setErrorConfirmPass("This field is required");
    else if (conf !== values.password)
      setErrorConfirmPass("The password did not match. Please try again.");
    else setErrorConfirmPass("");

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
    if (
      email &&
      username &&
      lname &&
      fname &&
      conf === values.password &&
      values.password.length >= 8
    ) {
      // Sign Up
      axios
        .post("http://localhost:3000/register/active=true", {
          email: email,
          username: username,
          firstName: fname,
          lastName: lname,
          password: values.password,
          active: "true"
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
              Swal.fire({
                title: "Signed Up Successfully",
                text: "Please Sign In to your account",
                icon: "success",
                button: true
              }).then(function() {
                window.location = "/";
              });
            })
            .catch(e => {
              Swal.fire({
                title: "Failed to Sigdnup!",
                icon: "error",
                button: true
              });
            });
        })
        .catch(e => {
          Swal.fire({
            title: "Failed to Signup! Please try again",
            icon: "error",
            button: true
          });
        });
      // Sign Up End
    } else {
      Swal.fire({
        title: "Please complete the Sign Up form first",
        icon: "warning",
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
      <div className={classes.paper}>
        <Create className={classes.avatar} />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid container spacing={1} alignItems="flex-end" xs={12}>
              <Grid item xs={1}>
                <EmailOutlined />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  error={ErrorEmail === "" ? false : true}
                  helperText={ErrorEmail ? ErrorEmail : ""}
                  variant="standard"
                  margin="normal"
                  required
                  id="email input-with-icon-grid standard-full-width"
                  label="Email Address"
                  name="emailAdd"
                  autoComplete="emailadd"
                  style={{ margin: 8 }}
                  fullWidth
                  onChange={e => handleChangeEmail(e)}
                  InputLabelProps={{ required: false }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end" xs={12}>
              <Grid item xs={1}>
                <AssignmentIndIcon />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  error={ErrorUsername === "" ? false : true}
                  helperText={ErrorUsername ? ErrorUsername : ""}
                  variant="standard"
                  margin="normal"
                  required
                  id="username input-with-icon-grid standard-full-width"
                  label="Desired Username"
                  name="username"
                  autoComplete="username"
                  style={{ margin: 8 }}
                  fullWidth
                  onChange={e => handleChangeUsername(e)}
                  InputLabelProps={{ required: false }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end" xs={12}>
              <Grid item xs={1}>
                <PersonOutlined />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  error={ErrorFirstname === "" ? false : true}
                  helperText={ErrorFirstname ? ErrorFirstname : ""}
                  variant="standard"
                  margin="normal"
                  required
                  id="firstName input-with-icon-grid standard-full-width"
                  label="First Name"
                  name="firstName"
                  autoComplete="fname"
                  style={{ margin: 8 }}
                  fullWidth
                  onChange={e => handleChangeFname(e)}
                  InputLabelProps={{ required: false }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end" xs={12}>
              <Grid item xs={1}>
                <PersonOutlined />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  error={ErrorLastname === "" ? false : true}
                  helperText={ErrorLastname ? ErrorLastname : ""}
                  variant="standard"
                  margin="normal"
                  required
                  id="lastName input-with-icon-grid standard-full-width"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  style={{ margin: 8 }}
                  fullWidth
                  onChange={e => handleChangeLname(e)}
                  InputLabelProps={{ required: false }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end" xs={12}>
              <Grid item xs={1}>
                <LockOutlinedIcon />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  error={ErrorPass === "" ? false : true}
                  helperText={ErrorPass ? ErrorPass : ""}
                  variant="standard"
                  margin="normal"
                  required
                  id="password input-with-icon-grid standard-adornment-password"
                  label="Desired Password"
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
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end" xs={12}>
              <Grid item xs={1}>
                <LockOutlinedIcon />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  error={ErrorConfirmPass === "" ? false : true}
                  helperText={ErrorConfirmPass ? ErrorConfirmPass : ""}
                  variant="standard"
                  margin="normal"
                  required
                  id="confirm input-with-icon-grid standard-adornment-password"
                  label="Confirm Password"
                  name="confirmPassword"
                  autoComplete="confirmPassword"
                  style={{ margin: 8 }}
                  fullWidth
                  type={confirmValues.showPassword ? "text" : "password"}
                  value={conf}
                  onChange={handleChangeConfrmPassword()}
                  InputLabelProps={{ required: false }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {confirmValues.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={e => handleSubmit(e)}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}
