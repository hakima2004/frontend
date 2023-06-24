import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

import avatarImage from '../pontt.png';

const Signup = () => {
  const paperStyle = {
    padding: 20,
    height: '70vh',
    width: 500,
    margin: "80px auto",
  //  position: 'relative', // Add relative position
  };
  const avatarStyle = {
    backgroundColor: '#3370bd',
    // position: 'absolute', // Add absolute position
    // bottom: '10px', // Adjust the bottom position
    // left: '10px', // Adjust the left position
    // width: '140px',
    // height: '20vh',
  };
  const avatarStyl = { backgroundColor: '#3370bd' };
  const btnStyle = { margin: '8px 0', width: '160px'};
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState({});

  const signup = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('role', role);
    formData.append('password', password);

    await axios.post(`http://localhost:8000/api/register`, formData)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message
        });
        navigate("/");
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        } else {
          Swal.fire({
            text: response.data.message,
            icon: "error"
          });
        }
      });
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle} align='center'>
        <Grid align='center'>
        <Avatar style={avatarStyl}> <LockOutlinedIcon /> </Avatar>
          <h2>Signup</h2>
          <h3 style={{ color: "green" }}>{errors}</h3>
        </Grid>
        <TextField label='Name' name='name' value={name} onChange={(event) => setName(event.target.value)} />
      <br />  <TextField label='Email' name='email' value={email} onChange={(event) => setEmail(event.target.value)} />
      <br />   <TextField label='Role' name='role' value={role} onChange={(event) => setRole(event.target.value)} />
      <br />   <TextField label='Password' name='password' value={password} onChange={(event) => setPassword(event.target.value)} type='password' />
      <br />
        <Button type='submit' onClick={signup} color='primary' variant="contained" style={btnStyle}>Signup</Button>

        <Typography>click here for
          <NavLink to="/">
            <span style={{ marginLeft: "4px" }}>Login</span>
          </NavLink>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Signup;
