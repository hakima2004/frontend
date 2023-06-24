import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Login = () => {
  const paperStyle = {
    padding: 100,
    height: '70vh',
    width: 500,
    margin: '80px auto',
  };
  const avatarStyle = { backgroundColor: '#3370bd' };
  const btnStyle = { margin: '20px 0', width: '160px' };

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues((prevValues) => ({
      ...prevValues,
      showPassword: !prevValues.showPassword,
    }));
  };

  const handleInputChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value,
    }));
  };

  const signIn = () => {
    if (user.email.trim() === '') {
      Swal.fire({
        text: 'Email champ est vide',
        icon: 'error',
      });
      return;
    } else if (user.password.trim() === '') {
      Swal.fire({
        text: 'Mot de passe champ est vide',
        icon: 'error',
      });
      return;
    } else if (!validateEmail(user.email)) {
      Swal.fire({
        text: 'Invalide format Email ',
        icon: 'error',
      });
      return;
    }

    axios
      .get('http://localhost:8000/api/reactlogin', { params: user })
      .then((response) => {
        const userData = response.data;

        sessionStorage.setItem('users', response.data.email);

        sessionStorage.setItem('userI', userData.id);

        setMsg(response.data.email);
        const userRole = response.data.role;

        // Redirect based on user role
        if (userRole === 'admin') {
          navigate('/c', { state: { email: user.email } });
        } else if (userRole === 'user') {
          navigate('/list', { state: { email: user.email } });
        } else {
          // Handle unknown role or redirect to a default interface
          navigate('/react', { state: { email: user.email } });
        }
      })
      .catch((error) => {
        Swal.fire({
          text: "invalide mot de passe",
          icon: 'error',
        });
      });
  };


  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle} align="center">
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <br />
          <h2>Authentification</h2>
          <h3 style={{ color: 'green' }}>{msg}</h3>
        </Grid>
        <TextField
          label="Email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
        />
        <TextField
          label="Mot de passe"
          name="password"
          type={values.showPassword ? 'text' : 'password'}
          value={user.password}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <br />
        <Button
          type="submit"
          onClick={signIn}
          color="primary"
          variant="contained"
          style={btnStyle}
        >
          connexion
        </Button>
        <Typography>
          <NavLink to="/change">
            <span style={{ marginLeft: '4px' }}>Mot de passe oublié</span>
          </NavLink>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
