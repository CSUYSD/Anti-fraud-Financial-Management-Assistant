import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Container,
    Typography,
    TextField,
    Button,
    Avatar,
    IconButton,
    Divider,
    Link,
    Snackbar,
    Switch,
    FormControlLabel,
    Grid,
    Paper,
    Box
} from '@mui/material';
import {
    Edit,
    Save,
    Close,
    Email,
    Phone,
    LocationOn,
    Work,
    Language,
    LinkedIn,
    GitHub,
    Twitter
} from '@mui/icons-material';

// 模拟用户数据
const userData = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    occupation: "Senior Software Engineer",
    languages: ["English", "Spanish", "French"],
    bio: "Passionate about creating intuitive and efficient software solutions. Always eager to learn and tackle new challenges in the tech world.",
    linkedin: "https://linkedin.com/in/janedoe",
    github: "https://github.com/janedoe",
    twitter: "https://twitter.com/janedoe"
};

const UserProfile = () => {
    const [editing, setEditing] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [user, setUser] = useState(userData);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = () => {
        setEditing(false);
        setSnackbarOpen(true);
    };

    const handleClose = () => {
        setEditing(false);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center p-4">
            <Container maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor: 'white' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h4" component="h1" sx={{ color: 'purple.700', fontWeight: 'bold' }}>
                                User Profile
                            </Typography>
                            {!editing ? (
                                <Button
                                    onClick={handleEdit}
                                    variant="contained"
                                    sx={{
                                        bgcolor: 'purple.600',
                                        color: 'white',
                                        '&:hover': { bgcolor: 'purple.700' },
                                    }}
                                    startIcon={<Edit />}
                                >
                                    Edit Profile
                                </Button>
                            ) : (
                                <Box>
                                    <Button
                                        onClick={handleSave}
                                        variant="contained"
                                        sx={{
                                            bgcolor: 'green.500',
                                            color: 'white',
                                            mr: 1,
                                            '&:hover': { bgcolor: 'green.600' },
                                        }}
                                        startIcon={<Save />}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        onClick={handleClose}
                                        variant="outlined"
                                        color="error"
                                        startIcon={<Close />}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            )}
                        </Box>

                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Avatar
                                            src="/placeholder-avatar.jpg"
                                            sx={{ width: 150, height: 150, mb: 2 }}
                                        />
                                    </motion.div>
                                    <Typography variant="h5" sx={{ color: 'purple.700', fontWeight: 'bold' }} gutterBottom>{user.name}</Typography>
                                    <Typography variant="subtitle1" sx={{ color: 'gray.600' }} gutterBottom>{user.occupation}</Typography>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            mt: 2,
                                            borderColor: 'purple.500',
                                            color: 'purple.500',
                                            '&:hover': { borderColor: 'purple.600', bgcolor: 'purple.50' },
                                        }}
                                    >
                                        Change Avatar
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <AnimatePresence>
                                    {editing ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="Name"
                                                        name="name"
                                                        value={user.name}
                                                        onChange={handleInputChange}
                                                        variant="outlined"
                                                        sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'purple.500' } } }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="Email"
                                                        name="email"
                                                        value={user.email}
                                                        onChange={handleInputChange}
                                                        variant="outlined"
                                                        sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'purple.500' } } }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="Phone"
                                                        name="phone"
                                                        value={user.phone}
                                                        onChange={handleInputChange}
                                                        variant="outlined"
                                                        sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'purple.500' } } }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="Location"
                                                        name="location"
                                                        value={user.location}
                                                        onChange={handleInputChange}
                                                        variant="outlined"
                                                        sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'purple.500' } } }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Occupation"
                                                        name="occupation"
                                                        value={user.occupation}
                                                        onChange={handleInputChange}
                                                        variant="outlined"
                                                        sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'purple.500' } } }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        multiline
                                                        rows={4}
                                                        label="Bio"
                                                        name="bio"
                                                        value={user.bio}
                                                        onChange={handleInputChange}
                                                        variant="outlined"
                                                        sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'purple.500' } } }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <Typography variant="body1" paragraph sx={{ display: 'flex', alignItems: 'center', color: 'gray.700' }}>
                                                <Email sx={{ mr: 1, color: 'purple.500' }} />
                                                {user.email}
                                            </Typography>
                                            <Typography variant="body1" paragraph sx={{ display: 'flex', alignItems: 'center', color: 'gray.700' }}>
                                                <Phone sx={{ mr: 1, color: 'purple.500' }} />
                                                {user.phone}
                                            </Typography>
                                            <Typography variant="body1" paragraph sx={{ display: 'flex', alignItems: 'center', color: 'gray.700' }}>
                                                <LocationOn sx={{ mr: 1, color: 'purple.500' }} />
                                                {user.location}
                                            </Typography>
                                            <Typography variant="body1" paragraph sx={{ display: 'flex', alignItems: 'center', color: 'gray.700' }}>
                                                <Work sx={{ mr: 1, color: 'purple.500' }} />
                                                {user.occupation}
                                            </Typography>
                                            <Typography variant="body1" paragraph sx={{ display: 'flex', alignItems: 'center', color: 'gray.700' }}>
                                                <Language sx={{ mr: 1, color: 'purple.500' }} />
                                                {user.languages.join(', ')}
                                            </Typography>
                                            <Typography variant="body1" paragraph sx={{ color: 'gray.700' }}>
                                                {user.bio}
                                            </Typography>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 3 }} />

                        <Box sx={{ mt: 3 }}>
                            <Typography variant="h6" sx={{ color: 'purple.700', fontWeight: 'bold' }} gutterBottom>Social Links</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <Link href={user.linkedin} target="_blank" rel="noopener noreferrer"
                                          sx={{ display: 'flex', alignItems: 'center', color: 'purple.600', textDecoration: 'none', '&:hover': { color: 'purple.700' } }}>
                                        <LinkedIn sx={{ mr: 1 }} />
                                        LinkedIn
                                    </Link>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Link href={user.github} target="_blank" rel="noopener noreferrer"
                                          sx={{ display: 'flex', alignItems: 'center', color: 'purple.600', textDecoration: 'none', '&:hover': { color: 'purple.700' } }}>
                                        <GitHub sx={{ mr: 1 }} />
                                        GitHub
                                    </Link>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Link href={user.twitter} target="_blank" rel="noopener noreferrer"
                                          sx={{ display: 'flex', alignItems: 'center', color: 'purple.600', textDecoration: 'none', '&:hover': { color: 'purple.700' } }}>
                                        <Twitter sx={{ mr: 1 }} />
                                        Twitter
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        <Box sx={{ mt: 3 }}>
                            <Typography variant="h6" sx={{ color: 'purple.700', fontWeight: 'bold' }} gutterBottom>Account Settings</Typography>
                            <FormControlLabel
                                control={<Switch color="primary" sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: 'purple.600' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: 'purple.600' } }} />}
                                label="Enable Two-Factor Authentication"
                            />
                            <Box sx={{ mt: 2 }}>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        mr: 2,
                                        borderColor: 'purple.500',
                                        color: 'purple.500',
                                        '&:hover': { borderColor: 'purple.600', bgcolor: 'purple.50' },
                                    }}
                                >
                                    Change Password
                                </Button>
                                <Button
                                    variant="text"
                                    component={Link}
                                    href="/contact"
                                    sx={{ color: 'purple.600', '&:hover': { color: 'purple.700' } }}
                                >
                                    Forgot Password?
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </motion.div>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    message="Profile updated successfully"
                    action={
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleSnackbarClose}
                        >
                            <Close fontSize="small" />
                        </IconButton>
                    }
                />
            </Container>
        </div>
    );
};

export default UserProfile;