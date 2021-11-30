import { BrowserRouter, Switch, Route, NavLink} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import AuthOptions from './components/auth/AuthOptions'
import MenuItem from '@mui/material/MenuItem'
import BLineLogo from './images/BLINE LOGO OUTLINED.png'

function NavBar() {
    return(
        <AppBar position="static" style={{ background: '#2c7dc3', minHeight: '48px'}}>
            <Toolbar disableGutters style={{ display:'flex', justifyContent: 'space-between', minHeight: '48px'}}>
                <div>
                    <MenuItem disableRipple>
                        <NavLink to="/" style={{textDecoration: 'none', marginRight: '0.5rem' }} disableRipple>
                            <ListItem button>
                                <ListItemText primary={<Box sx={{ color: '#f8b827', fontWeight: 'bold', fontSize:'1.25rem' }}>Home</Box>}/>
                                {/* <ListItemIcon>
                                    <img src={BLineLogo} style={{width: '15%'}} alt='The BLine Logo; a hand-drawn teddy bear wearing a BruinLine beanie, holding a bowl of honey with a buzzing bee nearby'/>
                                </ListItemIcon> */}
                                {/* <img src={BLineLogo} style={{width: '75%'}} alt='The BLine Logo; a hand-drawn teddy bear wearing a BruinLine beanie, holding a bowl of honey with a buzzing bee nearby'/> */}
                            </ListItem>
                        </NavLink>
                        <NavLink to="/dininghalls" style={{textDecoration: 'none', marginRight: '0.5rem' }} disableRipple>
                            <ListItem button>
                                <ListItemText primary={<Box sx={{ color: '#f8b827', fontWeight: 'bold', fontSize:'1.25rem' }}>Dining Halls</Box>}/>
                            </ListItem>
                        </NavLink>
                        <NavLink to="/reviews" style={{textDecoration: 'none', marginRight: '0.5rem' }} disableRipple>
                            <ListItem button>
                                <ListItemText primary={<Box sx={{ color: '#f8b827', fontWeight: 'bold', fontSize:'1.25rem' }}>Reviews</Box>}/>
                            </ListItem>
                        </NavLink>
                        <NavLink to="/profile" style={{textDecoration: 'none', marginRight: '0.5rem' }} disableRipple>
                            <ListItem button>
                                <ListItemText primary={<Box sx={{ color: '#f8b827', fontWeight: 'bold', fontSize:'1.25rem' }}>Profile</Box>}/>
                            </ListItem>
                        </NavLink>
                        <NavLink to="/groups" style={{textDecoration: 'none', marginRight: '0.5rem' }} disableRipple>
                            <ListItem button>
                                <ListItemText primary={<Box sx={{ color: '#f8b827', fontWeight: 'bold', fontSize:'1.25rem' }}>Groups</Box>}/>
                            </ListItem>
                        </NavLink>
                        <NavLink to="/rankings" style={{textDecoration: 'none', marginRight: '0.5rem' }} disableRipple>
                            <ListItem button>
                                <ListItemText primary={<Box sx={{ color: '#f8b827', fontWeight: 'bold', fontSize:'1.25rem' }}>Rankings</Box>}/>
                            </ListItem>
                        </NavLink>
                    </MenuItem>
                </div>
                <div>
                    <MenuItem disableRipple>
                        <AuthOptions/>
                    </MenuItem>
                </div>
            </Toolbar>
        </AppBar>
    )
}
export default NavBar;