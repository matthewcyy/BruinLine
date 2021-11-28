import "./Reviews.css";
import React, { useState, useContext } from 'react';
import UserContext from '../../../context/userContext';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function Reviews() {

  const { userData, setUserData } = useContext(UserContext);
  console.log("USERDATA", userData)
  return (
    <div className="header">
      <h2> Reviews </h2>
      {/* <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={spacing}>
          {[0, 1, 2].map((value) => (
            <Grid key={value} item>
              <Paper sx={{ height: 140, width: 100 }} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Grid container>
            <Grid item>

            </Grid>
          </Grid>
        </Paper>
        <HighlightedCode code={jsx} language="jsx" />
      </Grid>
    </Grid> */}
    </div>
  );
}
export default Reviews;
