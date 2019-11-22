import React, { useState } from "react";
import {
  Grid,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
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
  },
  margins: {
    margin: theme.spacing(1)
  }
}));

export default function Login() {
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
  const handleChangeEmail = event => {
    setEmail(event.target.value);
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
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
    // console.log(email  + "  " + passsword );
    // var token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx5emFtYWUubWlyYWJldGVAYm9vbS5jYW1wIiwiaWF0IjoxNTc0Mzg3Mzk5LCJleHAiOjE1NzQzOTA5OTksInN1YiI6IjUyIn0.Ct7d1irLx4OEXPv1t89_zAVeJfXOzp_sRI_lOu5HR1o";
    // axios({
    //   method: "get",
    //   url: `http://localhost:3000/users`,
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // }).then(data => {
    //   console.log(data);
    // });
  };
  // useEffect(() => {

  // });
  return (
    <Container
      maxWidth="xs"
      component="div"
      className={`${classes.paper} ${classes.rooot}`}
    >
      {/* <Box> */}
      {/* <Avatar className={classes.avatar}> */}
      <PersonPinIcon className={classes.avatar} />
      {/* </Avatar> */}
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
              required
              id="email input-with-icon-grid standard-full-width"
              label="Email Address"
              name="email"
              autoComplete="email"
              style={{ margin: 8 }}
              fullWidth
              type="email"
              onChange={e => handleChangeEmail(e)}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
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
        {/* <Grid container>
           <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid> */}
      </form>
      {/* </Box> */}
    </Container>
  );
}
