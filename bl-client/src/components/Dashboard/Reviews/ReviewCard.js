import React, { useState, useEffect } from 'react';
import UserContext from '../../../context/userContext';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



function ReviewCard(props) {
    console.log("REVIEW OBJ", props.reviewObj)
    console.log("HIHIHI")
    return (
        <Box xs={12}>
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{fontSize:"0.75rem"}} gutterBottom>
                        {props.reviewObj.itemName}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default ReviewCard;