import { createTheme } from '@mui/material/styles';
// import merge from 'lodash/merge';

import palette from './palette';
import typography from './typography';

const muiTheme = createTheme({
  props: {
    MuiWithWidth: {
      initialWidth: 'lg', // Breakpoint being globally set 🌎!
    },
    MuiButtonBase: {
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: { xs: 360, sm: 769, md: 960, lg: 1366, xl: 1920 },
  },
  typography: {
    useNextVariants: true,
    ...typography,
  },
  palette,
  zIndex: {
    tooltip: 2000,
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.12)', // Level 1 (Rest) according to Design System
    '0px 1px 8px rgba(0, 0, 0, 0.12)', // Level 2 (Hover) according to Design System
    '0px 1px 6px rgba(0, 0, 0, 0.2)', // Level 3 (?) according to Design System
    'none', // Level 4 (non set in Design System)
    '0px 1px 24px rgba(0, 0, 0, 0.12)', // Level 5 (Popovers) according to Design System
    '0 12px 20px -12px rgba(0, 0, 0, 0.22)', // Level 6 (Modals) according to Design System
    '0px -4px 4px 0px rgba(0, 0, 0, 0.04)', // Level 7
    '0px 1px 2px rgba(213, 19, 23, 0.64)', // Level 8 (Error)
    'none', // Level 9 (non set in Design System)
    'none', // Level 10 (non set in Design System)
    'none', // Level 11 (non set in Design System)
    'none', // Level 12 (non set in Design System)
    'none', // Level 13 (non set in Design System)
    'none', // Level 14 (non set in Design System)
    'none', // Level 15 (non set in Design System)
    'none', // Level 16 (non set in Design System)
    'none', // Level 17 (non set in Design System)
    'none', // Level 18 (non set in Design System)
    'none', // Level 19 (non set in Design System)
    'none', // Level 20 (non set in Design System)
    'none', // Level 21 (non set in Design System)
    'none', // Level 22 (non set in Design System)
    'none', // Level 23 (non set in Design System)
    'none', // Level 24 (non set in Design System)
  ],
});

// muiTheme.typography = merge(muiTheme.typography, typography(muiTheme.typography));

// Overrides
muiTheme.overrides = {
  MuiDialog: {
    root: {
      zIndex: '10000 !important',
    },
  },
  MuiPickersToolbar: {
    toolbar: {
      backgroundColor: palette.black,
    },
  },
  MuiPickersClock: {
    pin: {
      height: 0,
      width: 0,
    },
  },
  MuiPickersClockPointer: {
    pointer: {
      backgroundColor: palette.black,
    },
    noPoint: {
      backgroundColor: palette.black,
    },
    thumb: {
      border: `14px solid ${palette.black}`,
    },
  },
  MuiGrid: {
    item: { padding: '0 16px' },
  },
  // MuiPickersClockNumber: {
  //   clockNumber: {},
  //   clockNumberSelected: {
  //     fontFamily: 'CFAstyStd-Book',
  //     fontSize: 16,
  //     fontStyle: 'normal',
  //     fontWeight: 700,
  //     lineHeight: '24px',
  //     letterSpacing: '0em',
  //     textAlign: 'center',
  //   },
  // },
  // MuiPickersToolbarText: {
  //   toolbarTxt: {
  //     fontFamily: 'CFAstyStd-Book',
  //     fontSize: 64,
  //     fontStyle: 'normal',
  //     fontWeight: 400,
  //     lineHeight: '67px',
  //     letterSpacing: '0em',
  //   },
  // },
  // MuiPickersTimePickerToolbar: {
  //   ampmLabel: {
  //     marginTop: -20,
  //     marginBottom: -14,
  //     fontSize: 14,
  //   },
  //   ampmSelection: {
  //     marginLeft: 5,
  //   },
  //   toolbarAmpmLeftPadding: {
  //     paddingLeft: 18,
  //   },
  // },
  // MuiSnackbarContent: {
  //   root: {
  //     backgroundColor: muiTheme.palette.primary.main,
  //   },
  // },
  // MuiFormLabel: {
  //   root: {
  //     color: `${muiTheme.palette.text.primary} !important`,
  //   },
  //   focused: {
  //     color: `${muiTheme.palette.primary.main} !important`,
  //   },
  // },
  // MuiInput: {
  //   underline: {
  //     '&:after': {
  //       borderBottom: `2px solid ${muiTheme.palette.primary.main}`,
  //     },
  //   },
  // },
  // MuiButton: {
  //   root: {
  //     fontFamily: cfAstyStdBook,
  //     boxShadow: 'none !important',
  //     zIndex: 3,
  //     borderRadius: 99,
  //     fontWeight: 400,
  //     backgroundColor: 'transparent',
  // fontFamily: 'Montserrat, Helvetica, Arial, sans-serif',
  //     border: `1px solid ${muiTheme.palette.common.white}`,
  //     color: muiTheme.palette.common.white,
  //     '&:hover': {
  //       backgroundColor: 'transparent',
  //     },
  // },
  //   textPrimary: {
  //     border: `1px solid ${muiTheme.palette.primary.main}`,
  //     color: muiTheme.palette.primary.main,
  //   },
  //   textSecondary: {
  //     border: `1px solid ${muiTheme.palette.secondary.main}`,
  //     color: muiTheme.palette.secondary.main,
  //   },
  //   containedPrimary: {
  //     border: 'none !important',
  //   },
  //   disabled: {
  //     border: `1px solid rgba(0, 0, 0, 0.26)`,
  //   },
  //   sizeSmall: {
  //     padding: `10px 20px`,
  //   },
  //   sizeLarge: {
  //     padding: `20px 70px`,
  //   },
  // },
  // MuiTypography: {
  //   h1: {
  //     [muiTheme.breakpoints.down('sm')]: {
  //       fontSize: 46,
  //     },
  //     [muiTheme.breakpoints.down('xs')]: {
  //       fontSize: 32,
  //     },
  //   },
  //   h2: {
  //     [muiTheme.breakpoints.down('sm')]: {
  //       fontSize: 28,
  //     },
  //   },
  //   h3: {
  //     [muiTheme.breakpoints.down('sm')]: {
  //       fontSize: 28,
  //     },
  //   },
  //   h4: {
  //     [muiTheme.breakpoints.down('sm')]: {
  //       fontSize: 20,
  //     },
  //   },
  //   h5: {
  //     [muiTheme.breakpoints.down('sm')]: {
  //       fontSize: 18,
  //     },
  //     [muiTheme.breakpoints.down('xs')]: {
  //       fontSize: 16,
  //     },
  //   },
  //   h6: {
  //     [muiTheme.breakpoints.down('sm')]: {
  //       fontSize: 16,
  //     },
  //   },
  //   subtitle1: {
  //     [muiTheme.breakpoints.down('sm')]: {
  //       fontSize: 14,
  //     },
  //   },
  //   body1: {
  //     [muiTheme.breakpoints.down('sm')]: {
  //       fontSize: 14,
  //     },
  //   },
  //   body2: {
  //     [muiTheme.breakpoints.down('sm')]: {
  //       fontSize: 12,
  //     },
  //   },
  // },
};

export default muiTheme;
