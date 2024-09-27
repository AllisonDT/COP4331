import React, { useState } from "react";
import "./ChangePassword.css";
import Button from "@material-ui/core/Button";
import { Container, Box, TextField, Stack } from "@mui/material";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const userData = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;
  const userId = userData ? userData.user_id : null;
  const history = useHistory();

  const handleChange = async (e) => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        `${apiUrl}/editProfile/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: newPassword,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to change password");
      }

      setSuccessMessage("Password changed successfully");
      setError("");
      // Reset password fields
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      setError("Failed to change password");
      console.error(error);
    }
  };

  const handleCancel = () => {
    history.push("/profile-settings"); // Redirect to change settings page
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleChange}
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1>Change Password</h1>
        <TextField
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          margin="normal"
          required
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "black"
            },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "black"
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "black"
            },
            "& .MuiOutlinedInput-input": {
              color: "black"
            },
            "&:hover .MuiOutlinedInput-input": {
              color: "black"
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
              backgroundColor: "white",
              color: "black"
            },
            "& .MuiInputLabel-outlined": {
              color: "black"
            },
            "&:hover .MuiInputLabel-outlined": {
              color: "black"
            },
            "& .MuiInputLabel-outlined.Mui-focused": {
              color: "black"
            }
          }} 

          name="newPassword"
          label="New Password"
          type="password"
        />
        <TextField
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          margin="normal"
          required
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "black"
            },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "black"
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "black"
            },
            "& .MuiOutlinedInput-input": {
              color: "black"
            },
            "&:hover .MuiOutlinedInput-input": {
              color: "black"
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
              backgroundColor: "white",
              color: "black"
            },
            "& .MuiInputLabel-outlined": {
              color: "black"
            },
            "&:hover .MuiInputLabel-outlined": {
              color: "black"
            },
            "& .MuiInputLabel-outlined.Mui-focused": {
              color: "black"
            }
          }} 
          name="confirmNewPassword"
          label="Confirm New Password"
          type="password"
        />
        <Stack sx={{ pt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Stack direction="row" spacing={4} justifyContent="center">
            <Button type="submit" variant="contained" fullWidth sx={{ margin: 2}}>
                Change Password
            </Button>
            <Button 
              variant="contained"
              onClick={handleCancel}
              fullWidth
              margin="normal"
              sx={{ mt: 3, mb: 2 }}
            >
              Cancel
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}

export default ChangePassword;

/*

<Button type="submit" variant="contained" fullWidth sx={{ margin: 2}} >
Change Password
</Button>
<Button
variant="contained"
onClick={handleCancel}
fullWidth
margin="normal"
sx={{ mt: 3, mb: 2 }}
>
Cancel
</Button>
{error && <p style={{ color: "red" }}>{error}</p>}
{successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

*/