import React, { useState } from "react";
import "./Auth.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const defaultTheme = createTheme();

const Login = () => {
  const [userData, setUserData] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  console.log(userData);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!userData.email) {
        setAlertMsg("Email is Required.");
        setAlertSeverity("error");
        setOpenAlert(true);
      }
      if (!userData.password) {
        setAlertMsg("Password is Required.");
        setAlertSeverity("error");
        setOpenAlert(true);
      }
      const response = await axios.post(
        "http://localhost:2000/api/v1/auth/login",
        userData
      );
      setAuth({ user: response.data.data, token: response.data.token });
      localStorage.setItem("auth", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {}
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInputChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={openAlert}
          sx={{ width: "100%" }}
          spacing={2}
          onClose={handleCloseAlert}
          autoHideDuration={3000}
        >
          <Alert severity={alertSeverity}>{alertMsg}</Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
