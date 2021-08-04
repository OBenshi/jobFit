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
import MailIcon from "@material-ui/icons/Mail";
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
      [theme.breakpoints.up("sm")]: {
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
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
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
  const { user } = useContext(AuthContext);
  const [drawerState, setDrawerState] = useState<boolean>(false);
  const [logOutMutation, { error }] = useMutation(logoutUser);
  const handleLogout = async (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    event.preventDefault();
    try {
      await logOutMutation({ variables: { _id: 1 } });
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
        {" "}
        <Link component={RouterLink} to="/">
          <ListItem button key={"home"}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>{" "}
        </Link>{" "}
        <Link component={RouterLink} to="/login">
          <ListItem button key={"login"}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Login"} />
          </ListItem>{" "}
        </Link>{" "}
        <Link component={RouterLink} to="/testing">
          <ListItem button key={"testing"}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"testing"} />
          </ListItem>{" "}
        </Link>{" "}
        <Link component={RouterLink} to="/displaytext">
          <ListItem button key={"dating texts"}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Dating texts"} />
          </ListItem>{" "}
        </Link>{" "}
        <Link component={RouterLink} to="/signup">
          <ListItem button key={"signup"}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"SignUp"} />
          </ListItem>{" "}
        </Link>
      </List>
      <Divider />
      <List>
        <ListItem button key={"logout"} onClick={handleLogout}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
      </List>
    </div>
  );
  useEffect(() => {
    console.log(`user`, user);
  }, []);
  return (
    <div className={classes.root}>
      <AppBar position="static">
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
          <Typography className={classes.title} variant="h6" noWrap>
            SWAT
          </Typography>
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
        </Toolbar>
      </AppBar>
    </div>
  );
}
