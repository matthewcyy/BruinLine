import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';

function LandingPage() {
    return (
        <div style = {{textAlign: "center"}}>
            <h1 style = {{marginBottom: '50px'}}>
                Welcome to BruinLine
            </h1>
            <Box component="span" sx={{ p: 2, border: '1px solid grey' }}>
                <Button component={Link} style={{display: "inline-block"}} to="/register">
                    Register
                </Button>
                <Button component={Link} style={{display: "inline-block"}} to="/login">
                    Login
                </Button>
            </Box>
        </div>
    )
}
export default LandingPage