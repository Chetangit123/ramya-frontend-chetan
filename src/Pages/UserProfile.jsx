import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Avatar,
  Button,
  Paper,
  Divider
} from '@mui/material';
import { useSelector } from 'react-redux';

const ProfileScreen = () => {
  const { auth } = useSelector((store) => store);

  const [phone, setPhone] = useState('');
  const [phoneSaved, setPhoneSaved] = useState(false);

  const user = {
    firstName: auth?.user?.firstName || '',
    lastName: auth?.user?.lastName || '',
    email: auth?.user?.email || '',
  };

  // Load phone from localStorage or fallback to Redux value
  useEffect(() => {
    const storedPhone = localStorage.getItem('userPhone');
    if (storedPhone) {
      setPhone(storedPhone);
    } else {
      setPhone(auth?.user?.mobile || '');
    }
  }, [auth?.user?.mobile]);

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    setPhoneSaved(false); // Reset save confirmation
  };

  const handleSavePhone = () => {
    localStorage.setItem('userPhone', phone);
    setPhoneSaved(true);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={4}
          sx={{
            borderRadius: 4,
            p: 4,
            bgcolor: '#fff',
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Grid container spacing={3}>
            {/* Avatar and Heading */}
            <Grid item xs={12} container alignItems="center" spacing={2}>
              <Grid item>
                <Avatar sx={{ width: 80, height: 80, bgcolor: '#551f3d', color: "#FFFFFF", fontSize: 28 }}>
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant="h5" fontWeight="bold">
                  {user.firstName} {user.lastName}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            {/* Profile Fields */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="First Name"
                value={user.firstName}
                InputProps={{ readOnly: true }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Last Name"
                value={user.lastName}
                InputProps={{ readOnly: true }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                value={user.email}
                InputProps={{ readOnly: true }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                value={phone}
                onChange={handlePhoneChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSavePhone}
                sx={{
                  backgroundColor: "#551f3d",
                  color: "#ffffff",        // text ko white rakha
                  '&:hover': {
                    backgroundColor: "#43172e", // hover ke liye thoda darker
                  }
                }}
              >
                Save Phone Number
              </Button>

              {phoneSaved && (
                <Typography variant="body2" color="#551f3d" sx={{ mt: 1 }}>
                  Phone number saved!
                </Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box >
  );
};

export default ProfileScreen;
