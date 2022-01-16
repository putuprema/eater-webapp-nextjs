import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#081933',
        },
        secondary: {
            main: '#0c59a0',
        },
        // error: {
        //     main: red.A400,
        // }
    },
    typography: {
        fontFamily: ['Nunito'].join(',')
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    paddingTop: '0.25rem',
                    paddingBottom: '0.25rem',
                    borderRadius: '10px'
                }
            }
        }
    }
})

export default theme