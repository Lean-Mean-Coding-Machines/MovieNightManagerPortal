import React from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';


function ContactPage() {
    


  return (

<Container maxWidth="sm" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '70vh'}}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>

      <Typography variant="body1">
        If you have any questions or feedback, please feel free to get in touch with us.
      </Typography>

      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
                name="submitBtn"
                id='submit-btn' 
                type='submit'
                variant="contained" 
                color="primary" 
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

export default ContactPage;
