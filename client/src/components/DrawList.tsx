import React, { useContext } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Link,
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import FaceIcon from '@material-ui/icons/Face';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CreateIcon from '@material-ui/icons/Create';
import InputIcon from '@material-ui/icons/Input';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface Props {
  handleLogout: (event: React.KeyboardEvent | React.MouseEvent) => void;
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const DrawList: React.FC<Props> = (props) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  return (
    <div
      role='presentation'
      onClick={props.toggleDrawer(false)}
      onKeyDown={props.toggleDrawer(false)}>
      <List>
        <Typography align='center' variant='h6'>
          SWAT{' '}
        </Typography>
        <Divider />
        <Link component={RouterLink} to='/' color='textPrimary'>
          <ListItem button key={'home'}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>{' '}
        </Link>{' '}
        {!isAuthenticated && (
          <Link component={RouterLink} to='/login' color='textPrimary'>
            <ListItem button key={'login'}>
              <ListItemIcon>
                <VpnKeyIcon />
              </ListItemIcon>
              <ListItemText primary={'Login'} />
            </ListItem>
          </Link>
        )}
        <Link component={RouterLink} to='/testing' color='textPrimary'>
          <ListItem button key={'testing'}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={'testing'} />
          </ListItem>{' '}
        </Link>{' '}
        {isAuthenticated && (
          <Link component={RouterLink} to='/displaytext' color='textPrimary'>
            <ListItem button key={'dating texts'}>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary={'Dating texts'} />
            </ListItem>
          </Link>
        )}{' '}
        {isAuthenticated && (
          <Link component={RouterLink} to='/adddatingtext' color='textPrimary'>
            <ListItem button key={'add dating text'}>
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary={'Add Dating text'} />
            </ListItem>
          </Link>
        )}{' '}
        {isAuthenticated && (
          <Link component={RouterLink} to='/dashboard' color='textPrimary'>
            <ListItem button key={`${user?.username} Zone`}>
              <ListItemIcon>
                <FaceIcon />
              </ListItemIcon>
              <ListItemText primary={`${user?.username} Zone`} />
            </ListItem>
          </Link>
        )}
        {!isAuthenticated && (
          <Link component={RouterLink} to='/signup' color='textPrimary'>
            <ListItem button key={'signup'}>
              <ListItemIcon>
                <InputIcon />
              </ListItemIcon>
              <ListItemText primary={'SignUp'} />
            </ListItem>
          </Link>
        )}
      </List>
      <Divider />
      {isAuthenticated && (
        <List>
          <ListItem button key={'logout'} onClick={props.handleLogout}>
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItem>
        </List>
      )}
    </div>
  );
};

export default DrawList;
