import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Grid container style={{ padding: '5vw' }}>
        <Grid item xs={12} md={6} lg={6}>
          <div style={{ marginTop: 100 }}>
            <Typography variant={'h2'} style={{fontFamily:'sans-serif'}}>Welcome To Mindful </Typography>
            <Typography variant={'h5'}>A place to learn, earn, and grow</Typography>
            <div style={{ display: 'flex', marginTop: 20 }}>
              <div style={{ marginRight: 10 }}>
                <Button style={{backgroundColor:'green'}}
                  size={'large'}
                  variant={'contained'}
                  onClick={() => {
                    navigate('/signup');
                  }}
                >
                  Signup
                </Button>
              </div>
              <div>
                <Button
                  size={'large'}
                  variant={'contained'}
                  onClick={() => {
                    navigate('/signin');
                  }}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
          <img src={'/src/assets/images/energy-meditation-source-spirituality-universe-life-force-prana-mind-god-generative-ai_742252-9802.avif'} width={'100%'} alt="Classroom" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;