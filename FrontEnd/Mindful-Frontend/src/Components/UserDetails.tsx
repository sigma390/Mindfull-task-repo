
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Card, TextField, Typography } from "@mui/material";
import { BASE_URL } from "../config.js";



interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  chbk1: SocialEntity;
  city: string;
  state: string;
  lastModified: Date;
}

type SocialEntity = 'LinkedInProfile' | 'Friend' | 'JobPosting' | 'others';

const UserDetails: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/users/${userId}`, {
          headers: {
            auth: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(response.data.user);
        setEditedUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleInputChange = (field: keyof User, value: string) => {
    setEditedUser((prevUser) => ({
      ...prevUser!,
      [field]: value,
    }));
  };

  const handleUpdateClick = async () => {
    try {
      await axios.put(`${BASE_URL}/user/users/${userId}`, editedUser, {
        headers: {
          auth: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUser(editedUser);
      alert("updated details")
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{display:'flex', justifyContent:'center', flex:'wrap',}}>
     
      <Card style={{ margin: 10, width: 300, minHeight: 600, padding: 20, marginTop:40 }}>
        <Typography fontSize={20} style={{font:'bold'}}>User Details</Typography>
        <TextField
          label="Name"
          value={editedUser?.name || ''}
          style={{marginTop:20}}
          
          onChange={(e) => handleInputChange('name', e.target.value)
        }
        />
        <TextField
          label="Email"
          style={{marginTop:20}}
          value={editedUser?.email || ''}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
        <TextField
          label="Phone"
          style={{marginTop:20}}
          value={editedUser?.phone || ''}
          onChange={(e) => handleInputChange('phone', e.target.value)}
        />
        <TextField
          label="Gender"
          style={{marginTop:20}}
          value={editedUser?.gender || ''}
          onChange={(e) => handleInputChange('gender', e.target.value)}
        />
        <TextField
          label="Social Entity"
          style={{marginTop:20}}
          value={editedUser?.chbk1 || ''}
          onChange={(e) => handleInputChange('chbk1', e.target.value)}
        />
        <TextField
          label="City"
          style={{marginTop:20}}
          value={editedUser?.city || ''}
          onChange={(e) => handleInputChange('city', e.target.value)}
        />
        <TextField
          label="State"
          style={{marginTop:20}}
          value={editedUser?.state || ''}
          onChange={(e) => handleInputChange('state', e.target.value)}
        />

        <Button style={{backgroundColor:'green', color:'white', marginTop:5 ,marginRight:5 }} onClick={handleUpdateClick}>Update User</Button>
        <Button style={{backgroundColor:'red', color:'white', marginTop:5}}>Delete User</Button>
      </Card>
    </div>
  );
};

export default UserDetails;