import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';

export default function ContactPage() {
  const [emailFormData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...emailFormData,
      [name]: value,
    });
  };

  // TODO: Need to Expand upon this when Email Submission Post is created
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(emailFormData);
  };

  return (
    <Container
      maxWidth='sm'
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        background: '#f6f6f6',
        marginTop: '5em',
        borderRadius: '10px',
      }}
    >
      <Typography variant='h4' gutterBottom>
        Contact Us
      </Typography>

      <Typography variant='body1'>
        If you have any questions or feedback, please feel free to get in touch
        with us.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label='Name'
              variant='outlined'
              fullWidth
              required
              name='name'
              id='name-input'
              value={emailFormData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Email'
              variant='outlined'
              fullWidth
              required
              name='email'
              id='email-input'
              value={emailFormData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Message'
              variant='outlined'
              fullWidth
              multiline
              rows={4}
              required
              name='message'
              id='message-input'
              value={emailFormData.message}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              name='submitBtn'
              id='submit-btn'
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
