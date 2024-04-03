import { createTheme } from "@material-ui/core";
import theme from './MuiTheme';

const LightTheme = createTheme({
    ...theme,
    overrides: {
        ...theme.overrides,
        MuiButton: {
            ...theme.overrides.MuiButton,
        }
    },
    palette: {
        ...theme.palette,
        primary: {
            main: '#243882',
            light: '#e7e7e7',
        },
        secondary: {
            main: '#2F2F2F',
            light: '#588cd1',
        },
        type: 'light'
    },
    typography: {
        ...theme.typography,
    }
});

export default LightTheme;
