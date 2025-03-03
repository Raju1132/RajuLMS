import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { Colors } from "../theme";


export const FooterContain = styled(Box)(()=> ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    borderTop: '1px solid rgba(195, 192, 192, 0.815)',
    backgroundColor: '#fff',
    fontSize: '12px',
    padding: '7px 12px',
    zIndex:99,
    '& button':{
        padding:'0'
    },
    '& a':{
        flexDirection:'column',
        display:"flex",
        alignItems:"center",
        fontSize:'12px',
        '& p':{
            fontSize:'12px'
        }
    },
    '& a.active,& a.active svg':{
        color:Colors.primary,
    },
}))