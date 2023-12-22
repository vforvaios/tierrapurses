import muiTheme from './muiTheme';

const theme = {
  ...muiTheme,
  app: {
    headerHeight: 50,
    sidebarWidth: 72,
    maxWidth: 1920,
    minWidth: 1440,
    mt4: { marginTop: muiTheme.spacing(0.5) },
  },
  // You can add here any values or utility functions you might need for styling
  // your components
};

if (
  typeof window !== 'undefined' &&
  process.env.NODE_ENV === 'development' &&
  process.env.NODE_ENV !== 'test'
) {
  /* eslint-disable no-console */
  console.log('--- THEME ---', theme);
}

export default theme;
