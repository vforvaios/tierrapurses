const styles = ({ breakpoints }) => ({
  root: {
    position: 'relative',
    width: '100%',
    '& .MuiCardHeader-root': {
      display: 'flex',
      alignItems: 'center',
      padding: 12,
    },
  },
  media: {
    width: '100%',
    height: 'auto',
    position: 'relative',
    overflow: 'hidden',
  },
});

export default styles;
