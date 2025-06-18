import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Email, LocationOn, Lock, Person } from "@mui/icons-material";

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    profilePic: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/user/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setFormData({
            name: data.name || "",
            email: data.email || "",
            address: data.address || "",
            password: "",
            profilePic: data.profilePic || "",
          });
        } else {
          alert("❌ Failed to fetch profile");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setFormData((prev) => ({
      ...prev,
      profilePic: URL.createObjectURL(file),
    }));
  };

  const handleUpdateProfile = async () => {
    setUpdating(true);
    try {
      const updateData = new FormData();
      updateData.append("name", formData.name);
      updateData.append("email", formData.email);
      updateData.append("address", formData.address);
      if (selectedImage) {
        updateData.append("profilePic", selectedImage);
      }

      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/profile/update`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: updateData,
        }
      );

      if (res.ok) {
        alert("✅ Profile updated successfully");
      } else {
        const data = await res.json();
        throw new Error(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("❌ Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!formData.password) return alert("Please enter a new password");
    setUpdating(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/password/update`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: formData.password }),
        }
      );

      if (res.ok) {
        alert("✅ Password updated successfully");
        setFormData((prev) => ({ ...prev, password: "" }));
      } else {
        const data = await res.json();
        throw new Error(data.message || "Failed to update password");
      }
    } catch (err) {
      console.error("Password update error:", err);
      alert("❌ Failed to update password");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Box className="min-h-screen flex justify-center items-center bg-gray-100">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" className="py-10">
      <Box className="bg-white shadow-lg rounded-2xl p-6">
        <Typography variant="h5" align="center" gutterBottom fontWeight={600}>
          Edit Your Profile
        </Typography>

        <Box className="flex flex-col items-center mb-6">
          <Avatar
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : formData.profilePic ||
                  "https://via.placeholder.com/150?text=Profile"
            }
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Button variant="outlined" component="label" size="small">
            Change Picture
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
              focused
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              focused
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              multiline
              rows={2}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationOn />
                  </InputAdornment>
                ),
              }}
              focused
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="New Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank if unchanged"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
              focused
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleUpdateProfile}
              disabled={updating}
            >
              {updating ? <CircularProgress size={24} color="inherit" /> : "Update Profile"}
            </Button>
          </Grid>

          {formData.password && (
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="warning"
                onClick={handleUpdatePassword}
                disabled={updating}
              >
                {updating ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Update Password"
                )}
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProfileEdit;
