import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Appbar from './components/Appbar';
import LogIn from './Views/LogIn';
import Home from './Views/Home';
import SignUp from './Views/SignUp';
import DisplayText from './Views/DisplayText';
import AddDatingText from './Views/AddDatingText';
// import AAbla from "./AAbla";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { AuthContextProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './Views/Dashboard';
import SrchRes from './Views/SrchRes';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { theme } from './style/theme';
import { useStyles } from './style/useStyles';
// theme.palette.background.paper = theme.palette.primary.dark;
function App() {
  const classes = useStyles();
  return (
    <AuthContextProvider>
      <div className={classes.rootOfroots}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Router>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Appbar />
              <Switch>
                <Route exact path='/login' children={<LogIn />} />
                <PrivateRoute
                  path='/search/:searchTerm'
                  component={SrchRes}
                  exact
                />
                <PrivateRoute
                  path='/displaytext'
                  component={DisplayText}
                  exact
                />
                <PrivateRoute path='/dashboard' component={Dashboard} exact />
                <PrivateRoute
                  path='/adddatingtext'
                  component={AddDatingText}
                  exact
                />
                <Route exact path='/signup' children={<SignUp />} />
                <Route exact path='/' children={<Home />} />
              </Switch>
            </MuiPickersUtilsProvider>
          </Router>
        </ThemeProvider>
      </div>
    </AuthContextProvider>
  );
}

export default App;
