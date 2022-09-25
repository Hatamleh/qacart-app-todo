import { createMuiTheme } from '@material-ui/core/styles';

const font = "'Inconsolata', monospac";

const theme = createMuiTheme({
  typography: {
    fontFamily: font,
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        padding: '10px 120px',
        fontWeight: 700,
        fontSize: 20,
        borderRadius: 16,
        margin: '10px 0',
      },
    },
    MuiAlert: {
      standardError: {
        borderRadius: 16,
        backgroundColor: 'rgb(3, 14, 24)',
        color: 'rgb(166, 213, 250)',
        margin: '10px 0',
      },
    },
  },
});

export default theme;
