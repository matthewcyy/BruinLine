import React, { useState, useEffect } from 'react';
import UserContext from '../../../context/userContext';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


function ReviewCard(props) {
    console.log("REVIEW OBJ", props.reviewObj)
    console.log("HIHIHI")
    return (
        <Box xs={12}>
            <Card variant="outlined">
                <CardContent>
                    <Grid container spacing={0.5}>
                        <Grid item xs={8}>
                            <Box sx={{fontSize:"1rem", fontWeight:"bold"}} gutterBottom>
                                {props.reviewObj.itemName}
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={{fontSize:"1rem", fontWeight:"bold"}} gutterBottom>
                                {props.reviewObj.rating}/5
                            </Box>
                        </Grid>
                        <Grid item xs={3.6}>
                            <Box sx={{fontSize:"0.75rem", fontWeight:"medium"}} gutterBottom>
                                {props.reviewObj.date}
                            </Box>
                        </Grid>
                    </Grid>
                    <Box textAlign="left" margin="auto" sx={{fontSize: '0.85rem', borderRadius: '4px', border: 1, borderWidth: 1.75, borderColor: 'grey.500', fontWeight:'regular'}}>
                        <b>Review:</b> {props.reviewObj.description}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

export default ReviewCard;