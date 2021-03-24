import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PollIcon from '@material-ui/icons/Poll';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        color: 'inherit',
        textDecoration: 'auto !important'
    }
}));

export default function ButtonAppBar({ loggedUser, handleLogout }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <PollIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Dish Polling
                    </Typography>
                    {Object.keys(loggedUser).length !== 0 && (
                        <>
                            <Button color="inherit"><Link className={classes.link} to='/polls' > Dishes </Link></Button>
                            <Button color="inherit"><Link className={classes.link} to='/results' > Results </Link></Button>
                            <Button color="inherit" onClick={handleLogout}><Link className={classes.link} to='#' > Logout </Link></Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
