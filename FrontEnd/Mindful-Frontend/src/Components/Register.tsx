
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
  Card, CardContent,
} from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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
      const response = await axios.post(`${BASE_URL}/user/signup`, formData, 
      
      );

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
      })
      const data = response.data;
      localStorage.setItem('token', data.token);

      // Redirect to the '/users' route upon successful registration
      navigate('/users');
    
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle errors or display a user-friendly message
    }
  };
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{width:400}}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Register
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={handleChange('name')}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleChange('password')}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleChange('email')}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            value={formData.phone}
            onChange={handleChange('phone')}
            style={{ marginBottom: '16px' }}
          />
          <FormControl fullWidth variant="outlined" style={{ marginBottom: '16px' }}>
            <InputLabel>Gender</InputLabel>
            <Select
              label="Gender"
              value={formData.gender}
              onChange={handleChange('gender')}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" style={{ marginBottom: '16px' }}>
            <InputLabel>Social Entity</InputLabel>
            <Select
              label="Social Entity"
              value={formData.chbk1}
              onChange={handleChange('chbk1')}
            >
              <MenuItem value="LinkedInProfile">LinkedIn Profile</MenuItem>
              <MenuItem value="Friend">Friend</MenuItem>
              <MenuItem value="JobPosting">Job Posting</MenuItem>
              <MenuItem value="others">Others</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="City"
            variant="outlined"
            fullWidth
            value={formData.city}
            onChange={handleChange('city')}
            style={{ marginBottom: '16px' }}
          />
          <TextField
            label="State"
            variant="outlined"
            fullWidth
            value={formData.state}
            onChange={handleChange('state')}
            style={{ marginBottom: '16px' }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleRegister}
          >
            Register
          </Button>
        </CardContent>
      </Card>
    </div>
    
  );
};

export default Register;

