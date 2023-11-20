import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Register.css";
import { Box, Container, Link, Grid, Avatar } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        history.push("/login"); // Redirect to the login page
      } else {
        const data = await response.json();
        if (response.status === 400) {
          setError("User with that email or username already exists");
        } else {
          setError(data.message || "Failed to register");
        }
      }
    } catch (error) {
      setError("User with that email or username already exists");
      console.error(error);
    }
  };

  return (
      <Container maxWidth="sm">
        <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
        >
          <Avatar></Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="off"
                value={formData.username}
                onChange={handleChange}
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
            >
              Sign Up
            </Button>
            <Grid Container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  {"Already have an account? Sign in here"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          {error && (
              <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
                {error}
              </Typography>
          )}
        </Box>
      </Container>
  );
}
