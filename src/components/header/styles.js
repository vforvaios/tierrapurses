const styles = ({ spacing, palette }) => ({
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing(1),
    background: palette?.action.success.main,
    '& > div': { color: palette?.white },
  },
  menuIcon: {
    fill: palette?.white,
    width: 30,
    height: 30,
    cursor: 'pointer',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default styles;
