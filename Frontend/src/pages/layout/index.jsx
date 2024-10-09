import React, { useState, useMemo, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tooltip, Zoom, Fade, Grow } from '@mui/material';
import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { mainListItems, secondaryListItems } from './ListItems';
import { motion, AnimatePresence } from 'framer-motion';
import { logoutAPI } from '@/api/user.jsx';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <MuiLink component={RouterLink} color="inherit" to="/">
                Your Website
            </MuiLink>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Layout() {
    const [open, setOpen] = useState(true);
    const [mode, setMode] = useState('light');
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'light'
                        ? {
                            primary: {
                                main: '#3a7bd5',
                            },
                            secondary: {
                                main: '#00bcd4',
                            },
                            background: {
                                default: '#f5f7fa',
                                paper: '#ffffff',
                            },
                        }
                        : {
                            primary: {
                                main: '#90caf9',
                            },
                            secondary: {
                                main: '#80deea',
                            },
                            background: {
                                default: '#121212',
                                paper: '#1e1e1e',
                            },
                        }),
                },
                components: {
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                borderRadius: 8,
                                textTransform: 'none',
                            },
                        },
                    },
                    MuiCard: {
                        styleOverrides: {
                            root: {
                                borderRadius: 12,
                                boxShadow: mode === 'dark' ? '0 4px 6px rgba(0, 0, 0, 0.2)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
                            },
                        },
                    },
                    MuiListItemIcon: {
                        styleOverrides: {
                            root: {
                                color: mode === 'dark' ? '#90caf9' : '#3a7bd5',
                            },
                        },
                    },
                },
            }),
        [mode],
    );

    const toggleDrawer = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const getPageTitle = (path) => {
        if (path === "/") {
            return "Dashboard";
        }
        return path.substring(1).charAt(0).toUpperCase() + path.slice(2);
    };

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const handleLogout = () => {
        setLogoutDialogOpen(true);
    };

    const handleLogoutConfirm = async () => {
        setLogoutDialogOpen(false);
        try {
            await logoutAPI();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleLogoutCancel = () => {
        setLogoutDialogOpen(false);
    };

    const handleAccountClick = () => {
        navigate('/account');
    };

    const handleUserProfileClick = () => {
        navigate('/userprofile');
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 600) {
                setOpen(false);
            } else {
                setOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    open={open}
                    elevation={0}
                    sx={{
                        backdropFilter: 'blur(20px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                    }}
                >
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1, color: theme.palette.text.primary }}
                        >
                            {getPageTitle(location.pathname)}
                        </Typography>
                        <Zoom in={true} style={{ transitionDelay: '500ms' }}>
                            <IconButton onClick={toggleColorMode}>
                                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                            </IconButton>
                        </Zoom>
                        <Zoom in={true} style={{ transitionDelay: '600ms' }}>
                            <IconButton onClick={handleAccountClick} aria-label="account settings">
                                <SettingsIcon />
                            </IconButton>
                        </Zoom>
                        <Zoom in={true} style={{ transitionDelay: '700ms' }}>
                            <IconButton onClick={handleUserProfileClick} aria-label="user profile">
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <AccountCircleIcon />
                                </StyledBadge>
                            </IconButton>
                        </Zoom>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            px: [1],
                        }}
                    >
                        <Fade in={open} timeout={1000}>
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                                <img src="/public/logo.png" alt="Logo" style={{ height: '40px' }} />
                            </Box>
                        </Fade>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <AnimatePresence>
                            {open && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {mainListItems}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <Divider sx={{ my: 1 }} />
                        <AnimatePresence>
                            {open && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                    {secondaryListItems}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </List>
                    <Box sx={{ mt: 'auto', p: 2 }}>
                        <Tooltip title="Logout" placement="right">
                            <IconButton
                                color="primary"
                                onClick={handleLogout}
                                sx={{
                                    width: '100%',
                                    justifyContent: open ? 'flex-start' : 'center',
                                    '& .MuiButton-startIcon': {
                                        mr: open ? 1 : 'auto',
                                    },
                                }}
                            >
                                <LogoutIcon />
                                <AnimatePresence>
                                    {open && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                        >
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    ml: 1,
                                                    display: { xs: 'none', sm: 'block' },
                                                }}
                                            >
                                                Logout
                                            </Typography>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
                        <Box sx={{ p: 3 }}>
                            <Outlet />
                        </Box>
                    </Grow>
                    <Copyright sx={{ pt: 4, pb: 4 }} />
                </Box>
            </Box>
            <Dialog
                open={logoutDialogOpen}
                onClose={handleLogoutCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                TransitionComponent={Zoom}
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
                <DialogContent>
                    <DialogContentText  id="alert-dialog-description">
                        Are you sure you want to log out?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLogoutCancel}>Cancel</Button>
                    <Button onClick={handleLogoutConfirm} autoFocus>
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}