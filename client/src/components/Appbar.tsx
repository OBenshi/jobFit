import React, { useState, useContext, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../context/AuthContext";
import { LOGOUT_USER as logoutUser } from "../GraphQL/Mutations";
import {
  Link as RouterLink,
  NavLink,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Link,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {
  createStyles,
  alpha,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import HomeIcon from '@material-ui/icons/Home';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import FaceIcon from '@material-ui/icons/Face';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CreateIcon from '@material-ui/icons/Create';
import InputIcon from '@material-ui/icons/Input';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import imag from '../img/newHead2.png'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "none",
      fontWeight: 500,
      [theme.breakpoints.up("xs")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "30%",
      [theme.breakpoints.up("xs")]: {
        marginLeft: theme.spacing(2),
        width: "30%",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },
  })
);

export default function SearchAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);
  const [drawerState, setDrawerState] = useState<boolean>(false);
  const [logOutMutation, { error }] = useMutation(logoutUser);
  const handleLogout = async (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    event.preventDefault();
    try {
      await logOutMutation();
      window.localStorage.removeItem("token");
      await setUser(null);
      await setIsAuthenticated(false);
    } catch (err) {
      console.log(`err`, err);
    }
  };
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawerState(open);
    };
  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {user ? <Typography variant="h6">  🌸 Hello, {user?.firstName} </Typography> : <Typography>Please login🔐</Typography>}
        <Divider />
        <Link component={RouterLink} to="/" color="textPrimary">
          <ListItem button key={"home"}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>{" "}
        </Link>{" "}
        {!isAuthenticated && (
          <Link component={RouterLink} to="/login" color="textPrimary">
            <ListItem button key={"login"}>
              <ListItemIcon>
                <VpnKeyIcon />
              </ListItemIcon>
              <ListItemText primary={"Login"} />
            </ListItem>
          </Link>
        )}
        <Link component={RouterLink} to="/testing" color="textPrimary">
          <ListItem button key={"testing"}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"testing"} />
          </ListItem>{" "}
        </Link>{" "}
        {isAuthenticated && (
          <Link component={RouterLink} to="/displaytext" color="textPrimary">
            <ListItem button key={"dating texts"}>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary={"Dating texts"} />
            </ListItem>
          </Link>
        )}{" "}
        {isAuthenticated && (
          <Link component={RouterLink} to="/adddatingtext" color="textPrimary">
            <ListItem button key={"add dating text"}>
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary={"Add Dating text"} />
            </ListItem>
          </Link>
        )}{" "}
        {isAuthenticated && (
          <Link component={RouterLink} to="/dashboard" color="textPrimary">
            <ListItem button key={`${user?.username} Zone`}>
              <ListItemIcon>
                <FaceIcon />
              </ListItemIcon>
              <ListItemText primary={`${user?.username} Zone`} />
            </ListItem>
          </Link>
        )}
        {!isAuthenticated && (
          <Link component={RouterLink} to="/signup" color="textPrimary">
            <ListItem button key={"signup"}>
              <ListItemIcon>
                <InputIcon />
              </ListItemIcon>
              <ListItemText primary={"SignUp"} />
            </ListItem>
          </Link>
        )}
      </List>
      <Divider />
      {isAuthenticated && (
        <List>
          <ListItem button key={"logout"} onClick={handleLogout}>
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      )}
    </div>
  );
  useEffect(() => {
    // user !== null && console.log(`user`, user.birthday);
    // console.log(`isAuthenticated`, isAuthenticated);
  }, [isAuthenticated]);
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundImage: `url(${imag})`}}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={drawerState}
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
          <Typography className={classes.title} variant="h5" onClick={()=>{
            history.push('/');
          }} noWrap>
            <Box fontFamily="Century Gothic" fontWeight="fontWeightBold">
            💘 SWAT
            </Box>
          </Typography>
          {
            isAuthenticated && (
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            )
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
