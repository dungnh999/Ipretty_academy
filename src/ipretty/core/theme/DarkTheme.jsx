import { createTheme } from "@material-ui/core";
import theme from './MuiTheme';

const DarkTheme = createTheme({
    ...theme,
    palette: {
        ...theme.palette,
        primary: {
            main: '#2F2F2F',
            light: '#888888',
        },
        secondary: {
            main: '#243882',
            light: '#89bff4',
        },
        type: 'light'
    },
    typography: {
        ...theme.typography,
    }
});

export default DarkTheme;