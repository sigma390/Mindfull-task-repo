
import React, { useState, ChangeEvent } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../config';

type SocialEntity = 'LinkedInProfile' | 'Friend' | 'JobPosting' | 'others';

interface User {
  name: string;
  password: string;
  email: string;
  phone: string;
  gender: string;
  chbk1: SocialEntity;
  city: string;
  state: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    name: '',
    password: '',
    email: '',
    phone: '',
    gender: '',
    chbk1: 'LinkedInProfile', // You can set a default value or leave it empty
    city: '',
    state: '',
  });

  const handleChange = (
    field: keyof User
  ) => (event: ChangeEvent<HTMLInputElement | { value: unknown }>) => {
    setFormData({
      ...formData,
      [field]: event.target.value as string,
    });
  };

  const handleRegister = async () => {
    try {
      // Make a request to your backend API to register the user
      const response = await axios.post(`${BASE_URL}/user/signup`, formData);

      // Handle the response as needed
      console.log('User registered successfully:', response.data);

      // Reset the form or navigate to a different page upon successful registration
      setFormData({
        name: '',
        password: '',
        email: '',
        phone: '',
        gender: '',
        chbk1: 'others',
        city: '',
        state: '',
      });
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle errors or display a user-friendly message
    }
  };
  

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          Register
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={formData.name}
          onChange={handleChange('name')}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={formData.password}
          onChange={handleChange('password')}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={formData.email}
          onChange={handleChange('email')}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          value={formData.phone}
          onChange={handleChange('phone')}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Gender</InputLabel>
          <Select
            label="Gender"
            value={formData.gender}
            onChange={handleChange('gender')}
          >
            {/* Include options for different genders */}
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Social Entity</InputLabel>
          <Select
            label="Social Entity"
            value={formData.chbk1}
            onChange={handleChange('chbk1')}
          >
            {/* Include options for different social entities */}
            <MenuItem value="LinkedInProfile">LinkedIn Profile</MenuItem>
            <MenuItem value="Friend">Friend</MenuItem>
            <MenuItem value="JobPosting">Job Posting</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="City"
          variant="outlined"
          fullWidth
          value={formData.city}
          onChange={handleChange('city')}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="State"
          variant="outlined"
          fullWidth
          value={formData.state}
          onChange={handleChange('state')}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleRegister}>
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default Register;

