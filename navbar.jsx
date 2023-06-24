// import React, { useState, useRef, useEffect } from 'react';
// import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
// import MenuIcon from '@material-ui/icons/Menu';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import IconButton from '@material-ui/core/IconButton';
// import { Grid, Paper } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

// function Navg() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showSidebar, setShowSidebar] = useState(false);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const toggleShowSidebar = () => {
//     setShowSidebar(!showSidebar);
//   };

//   const { users } = useParams();
//   const navigate = useNavigate();
//   const usersss = sessionStorage.getItem('users');

//   const logout = () => {
//     sessionStorage.removeItem('users');
//     navigate('/react');
//   };

//   const sidebarRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setShowSidebar(false);
//       }
//     };

//     document.addEventListener('click', handleClickOutside);

//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, []);


//   return (
//     <>
//       <Navbar color="light" light expand="md" className="navbar justify-content-center">
//         <NavbarToggler onClick={toggleSidebar} className="navbar-toggler" />
//         <Collapse isOpen={isOpen} navbar>
//           <Nav className="mx-auto" navbar>
//             <NavItem>
//               <NavLink href="/">Home</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="/list">Gestion</NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="/ponts">Pont_Pascule</NavLink>
//             </NavItem>
//           </Nav>
//         </Collapse>
//       </Navbar>

//       {showSidebar && (
//         <div  className="sidebar">
//         <div className="profile">
//             <AccountCircleIcon />
//             <span className="profile-name">{usersss}</span>
//           </div>
//           <Nav  vertical>
//             <NavLink onClick={logout}>logout</NavLink>
//             {/* <NavLink href="/">Option 2</NavLink>
//             <NavLink href="/">Option 3</NavLink> */}
//           </Nav>
//         </div>
//       )}

//       <IconButton className={`sidebar-toggle ${showSidebar ? 'active' : ''}`} onClick={toggleShowSidebar}>
//         <MenuIcon />  
//       </IconButton>

   

//       <style jsx>{`



//         .navbar {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           z-index: 9999;
//         }

//         .navbar-toggler {
//             position: absolute;
//             left: 20px;
//             transition: left 0.3s ease-in-out;
//           }
  
//           .sidebar {
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 250px;
//             height: 100vh;
//             background-color: #fff;
//             padding: 20px;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//             transition: transform 0.3s ease-in-out;
//             transform: translateX(${showSidebar ? '0' : '-100%'});
//             z-index: 9999;
//           }
  
//           .profile {
//             display: flex;
//             align-items: center;
//             margin-bottom: 20px;
//           }
  
//           .profile svg {
//             font-size: 48px;
//             margin-right: 10px;
//             color: #333;
//           }
  
//           .profile-name {
//             font-size: 16px;
//             font-weight: bold;
//             color: #333;
//           }
  
//           .sidebar-nav {
//             margin-top: 20px;
//           }
  
//           .sidebar-nav .nav-link {
//             color: #333;
//             font-size: 16px;
//             padding: 10px 0;
//           }
  
//           .sidebar-nav .nav-link:hover {
//             color: #007bff;
//           }
  
//           .sidebar-toggle {
//             position: fixed;
//             top: 20px;
//             left: 280px;
//             background-color: #fff;
//             border: none;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//             transition: opacity 0.3s ease-in-out;
//             z-index: 9999;
//           }
  
//           .sidebar-toggle.active {
//             opacity: 0;
//           }
  

//         .dashboard {
//           padding: 20px;
//           margin-top: 80px; /* Adjust this value to leave space for the navbar */
//           background-color: #f8f9fa;
//         }

//         .dashboard-card {
//           padding: 20px;
//           text-align: center;
//           background-color: #fff;
//           height: 200px;
//         }
//       `}</style>
//     </>
//   );
// }

// export default Navg;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Nav from 'react-bootstrap/Nav';
import BalanceIcon from '@mui/icons-material/Balance';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';
import { Button } from 'react-bootstrap';
import { MDBIcon } from 'mdb-react-ui-kit';
import ocpp from '../ocpp.jpg';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const {users} = useParams();
  const navigate = useNavigate();
  const usersss = sessionStorage.getItem('users');

  const logout = () =>
  {
    sessionStorage.removeItem('users')
    navigate('/login');
  }

  const drawerItems = [
    { text: 'Home', icon: <HomeIcon />, href: '/' },
    { text: 'Pesage', icon: <BalanceIcon />, href: '/list' },
    { text: 'Pont_Bascule', icon: <InboxIcon />, href: '/ponts' },
    { text: 'Conducteurs', icon: <GroupIcon />, href: '/conducteurs' },
    { text: 'Terminal', icon: <DisplaySettingsIcon />, href: '/terminals' },
    { text: 'Vehicules', icon: <DirectionsRailwayIcon />, href: '/vehicules' },
    { text: 'produits', icon: <ProductionQuantityLimitsIcon />, href: '/produits' },

  ];

  const drawer = (
    <div> 
      <Toolbar />
      <Nav>
        <img src={ocpp} alt="Logo" className="logo-img" style={{ margin: '1rem' }} />
      </Nav>
      <Divider />
      <List>
        {drawerItems.map(({ text, icon, href }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component="a" href={href} onClick={handleDrawerToggle}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: drawerWidth,
          backgroundColor: 'lightgray',
          height: '167px',
          fontFamily: "monospace", fontStyle: "bold" 
        }}
      >
        <Toolbar style={{paddingTop: '5%'}}>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: 'none' },
            }}
          >
            {mobileOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h7" noWrap component="div">
            Espace des utilisateurs
          </Typography>
          
          <Nav className="ml-auto" style={{ marginLeft: "55%" }}>
  <Button style={{ marginRight: "10px" }} variant="outline-success">
    <PersonIcon style={{ fontSize: "2rem" }} /> {usersss}
  </Button>
  <Button style={{ marginLeft: "10px" }} variant="outline-success">
    <LogoutIcon style={{ fontSize: "2rem" }} onClick={logout} />
  </Button>
</Nav>

        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}
        >
          <Toolbar />
          {/* Content goes here */}
        </Box>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;






