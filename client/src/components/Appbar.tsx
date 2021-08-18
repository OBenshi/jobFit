import React, { useState, useContext, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { AuthContext } from '../context/AuthContext';
import { LOGOUT_USER as logoutUser } from '../GraphQL/Mutations';
import { SEARCH_TEXT as searchText } from '../GraphQL/Queries';
import {
  Link as RouterLink,
  NavLink,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Drawer,
  Link,
  Box,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import imag from '../img/newHead2.png';
import { useStyles } from '../style/useStyles';
import DrawList from './DrawList';

export default function SearchAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);
  const [drawerState, setDrawerState] = useState<boolean>(false);
  const [logOutMutation, { error: logOutErr }] = useMutation(logoutUser);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const {
    loading: searchLoading,
    data: searchData,
    refetch: searchcgRefetch,
  } = useQuery(searchText, {
    variables: {
      searchTextSearchTerm: searchTerm,
    },
  });
  const handleLogout = async (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    event.preventDefault();
    try {
      await logOutMutation();
      window.localStorage.removeItem('token');
      await setUser(null);
      await setIsAuthenticated(false);
    } catch (err) {
      console.log(`err`, err);
    }
  };
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setDrawerState(open);
    };
  useEffect(() => {
    console.log(`object`, searchData);
  }, [searchData, isAuthenticated]);
  return (
    <div className={classes.appbarRoot}>
      <AppBar
        position='fixed'
        style={{
          backgroundImage: `url(${imag})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          // backgroundRepeat: 'no-repeat',
        }}>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor='left'
            open={drawerState}
            onClose={toggleDrawer(false)}>
            <DrawList handleLogout={handleLogout} toggleDrawer={toggleDrawer} />
          </Drawer>
          <Typography
            className={classes.title}
            variant='h5'
            onClick={() => {
              history.push('/');
            }}
            noWrap>
            SWAT
          </Typography>

          {(history.location.pathname === '/displaytext' ||
            history.location.pathname.match(/search/)) && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <IconButton
                  aria-label='search'
                  onClick={() => {
                    console.log(9);
                  }}>
                  <SearchIcon />
                </IconButton>
              </div>
              <InputBase
                placeholder='Search…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onKeyUp={(event: any) => {
                  if (event.key === 'Enter') {
                    setSearchTerm(event.target.value);
                    history.push(`/search/${event.target.value}`);
                  }
                }}
              />
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  );
}
