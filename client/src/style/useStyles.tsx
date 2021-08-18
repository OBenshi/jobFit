import {
  withStyles,
  createStyles,
  makeStyles,
  Theme,
  alpha,
} from '@material-ui/core/styles';
import { purple, amber, yellow } from '@material-ui/core/colors';
import Rating from '@material-ui/lab/Rating';
import descImg from '../img/descImg.jpeg';
import head2Img from '../img/head2.jpeg';

import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';

import bg from '../img/bg2.jpg';
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 360,
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
    },
    header: {
      textAlign: 'center',
      background: theme.palette.secondary.main,
      color: '#fff',
    },
    card: {
      marginTop: theme.spacing(5),
    },
    offset: theme.mixins.toolbar,

    appbarRoot: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      fontWeight: 500,
      [theme.breakpoints.up('xs')]: {
        display: 'block',
      },
    },
    search: {
      flexGrow: 1,

      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '30%',
      [theme.breakpoints.up('xs')]: {
        marginLeft: theme.spacing(2),
        width: '30%',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
    textCont: {
      background: 'rgba(255,255,255,0.7)',
      borderRadius: '99999999999999999999999999999px',
    },
    cardImg: {
      backgroundImage: `url(${descImg})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '600px',
      marginTop: '0px',
      display: 'flex',
      // flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      // alignContent: 'center',
    },
    heroContent: {
      // backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1, 0, 6),
      backgroundImage: `url(${head2Img})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      // width: '100%',
      // height: '300px',
      // marginTop: '12px',
    },
    heroButtons: {
      marginTop: theme.spacing(-2),
      padding: theme.spacing(0),
    },
    homeItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(0, 5),
      // marginTop: '80px',
    },
  })
);

// export const backgroundStyles = {
//   backgroundImage: `url(${bg})`,
//   backgroundPosition: "center",
//   backgroundSize: "cover",
//   backgroundRepeat: "no-repeat",
//   width: "100vw",
//   height: "100vh",
// };

export const AmberSwitch = withStyles({
  switchBase: {
    color: amber[300],
    '&$checked': {
      color: amber[500],
    },
    '&$checked + $track': {
      backgroundColor: amber[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

export const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);
