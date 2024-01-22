import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { BASE_URL } from "../config.js";
import axios from "axios";

interface User {
  _id: string; // MongoDB user ID
  name: string;
  password: string;
  email: string;
  phone: string;
  gender: string;
  chbk1: SocialEntity;
  city: string;
  state: string;
  lastModified: Date;
}

type SocialEntity = 'LinkedInProfile' | 'Friend' | 'JobPosting' | 'others';

function Users() {
  const [users, setUsers] = useState<User[]>([]);

  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/users/`, {
        headers: {
          auth: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
}

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const navigate = useNavigate();

  const cardClickHandler = () => {
    // Redirect to the user details page with the user's ID as a parameter
    navigate(`/users/${user._id}`);
  };

  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20,
        cursor: 'pointer',
      }}
      onClick={cardClickHandler}
    >
      <Typography textAlign={'center'} variant="h5">
        {user.name}
      </Typography>
      <Typography textAlign={'center'} variant="subtitle1">
        {user.email}
      </Typography>
      <img src="" alt={user.name} style={{ width: 300 }} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        {/* Additional user information or actions */}
      </div>
    </Card>
  );
};

export default Users;