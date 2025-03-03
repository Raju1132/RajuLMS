import {  createTheme } from "@mui/material";
import {  lighten } from "polished";
import { useMediaQuery, useTheme } from "@mui/material";

export const Colors={
    // primary : "#1846a4",
    // primary : "#e4651e",
    // primary :'#000',
    primary :'#ff4500',
    total:'blue',
    submitted:'#71BC78',
    accepted:'#009000',
    reconsidertion:'#f9b94b',
    pending:'red',
    search:'#009000',
    reset:'red',
    export:'rgb(4 188 194)',
    tableheadercolor:'#C0C0C0',
    bordercolor:'#aeadad',
    skyblue:'rgb(4 188 194)',
    disabled:'#edeaea',
    edit:'#09B4B2',
    copy:'#09B4B2',
    delete:'red',
    pdf:'red',
    secondary : "#d1adcc",
    success : "#4CAF50",
    headColor:'#708090',
    info : "#00a2ff",
    danger : "#FF5722",
    warning : "#FFC107",
    dark : "#0e1d20",
    light : "#aaa",
    muted : "abafb3",
    border : "DDDFE1",
    inverse : "2F3D4A",
    shaft : "#333",
    // grays
    gray:'#5a5c69',
    dim_grey : "#696969",
    dove_gray : "#d5d5d5",
    light_gray : "#6c757d ",
    // solid color
    white : "#fff",
    black : "#000",
    formPending: '#ff4500',
    formPendngBg:'#f9efeb',
    formInprcess:'#04bcc2',
    formInprocessBg:'#edfafb',
    formAccepted:'#009000',
    formAcceptedBg:'#f3fbf3',
    accordianBrderColor:'#767676',
    formMomclr:'rgb(4 188 194)',
    formReconsiderationclr:'#ffc60d',
    datePickerHeader:'#b9ddfd',
    
}

const theme =  createTheme({

    palette: {
        primary: {
            main: Colors.primary
        },
        secondary: {
            main: Colors.secondary
        }
    },

    components:{
        MuiButton:{
            defaultProps:{
                disableRipple:true,
                disableElevation:true,
            },
        },
        
// banner shop button (mui custom)
        MyShopButton:{
            styleOverrides:{
                root: {
                    color: Colors.white
                },
                primary:{
                    background: Colors.primary,
                    "&:hover":{
                        background:lighten(0.1, Colors.primary),
                    }
                },
                secondary:{
                    background: Colors.secondary,
                    "&:hover":{
                        background:lighten(0.5, Colors.secondary),
                    },
                },
            },
        },
        
        overrides: {
            MuiTooltip: {
              tooltip: {
                fontSize: "2em",
                color: "yellow",
                backgroundColor: "red"
              }
            }
          },

        
    },

})

export function useMatches() {
    const theme = useTheme(); // Access Material-UI theme
    const matches = useMediaQuery("(max-width: 1020px)"); // Check breakpoint
    const customMatches = useMediaQuery(theme.breakpoints.down("md"));
    return {matches,customMatches}; // Return true or false
  }


export default theme;