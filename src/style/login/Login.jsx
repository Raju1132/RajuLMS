import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { Colors } from "../theme";

export const LoginContain = styled(Box)(()=>({
    backgroundColor: Colors.color,
    width: '100%',
    height: 'auto',
    position: 'relative',
    overflow: 'hidden',
    '&::before,&::after':{
        content: '""',
        position: 'fixed',
        width: '135px',
        height: '135px',
        borderRadius: '50pc',
        backgroundColor: Colors.primary,
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        zIndex: 1,
    },
    '&::before':{
        bottom: '-70px',
        left: '-70px',
    },
    '&::after':{
        top: '-70px',
        right: '-70px',
    },
    '& .LoginLogo':{
        maxWidth: '500px',
        width: '100%',
        paddingLeft: '2px',
        margin: 'auto',
        '& img':{
            width:'60px',
        },
    },
    '& .LoginCard':{
        maxWdth: '500px',
        width: '100%',
        marginTop: '40px',
        padding: '40px',
        paddingBottom: '55px',
        position: 'relative',
        margin: 'auto',
        '& .LoginTitle':{
            marginBottom:'50px',
            '& h4':{
                fontSize:'33px',
                color:Colors.primary,
                textAlign:'center',
            },
            '& p':{
                textAlign: 'center',
                fontSize: '13px',
                fontWeight: 500,
                color: 'gray',
                letterSpacing: '1px',
                marginBottom: '5px',
            }
        },
        '& .LoginGroup':{
            marginBottom:'15px',
            '& label,&.CheckBox a':{
                color: Colors.primary,
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '2px',
            },
            '& label':{
                position: 'relative',
                display: 'inline-block',
            },
            '&.CheckBox':{
                marginBottom:'0',
            },
            '&.CheckBox a':{
                display: 'block',
            },
            '& input,& select':{
                width: '100%',
                fontSize: '13px',
                outline: 'none',
                border: 'none',
                backgroundColor: '#fff',
                padding: '10px',
                borderRadius: '10px',
                boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px',
                height:'39px',
                '&::placeholder':{
                    color: 'rgb(143, 142, 142)',
                },
                '& option:checked':{
                    backgroundColor:'#E8F0FE',
                },
            },
            '& button':{
                border: 'none',
                backgroundColor: Colors.primary,
                color: '#fff',
                padding: '12px 30px',
                borderTopLeftRadius: '10px',
                borderBottomLeftRadius: '10px',
                textTransform: 'uppercase',
            },
            '& .PasswrdInpt':{
                position:'relative',
                '& button':{
                    border: 'none',
                    background: 'transparent',
                    position: 'absolute',
                    padding: '0',
                    top: '10px',
                    right: '10px',
                    '& img':{
                        width:'18px',
                    },
                },
            },
            '&.LoginBtn':{
                position:'absolute',
                right:'0',
            },
        }
    },
    '@media (min-width: 500px)': {
        padding: '5px', 
        '& .LoginGroup button': {
            borderRadius:'10px'
        },
        '& .LoginBtn':{
            position:'static',
            textAlign:'center',
        }
    },
    '@media (max-width: 300px)':{
        '& .LoginCard':{
            padding:'20px',
        }
    }

}))
export const LoginFooter = styled(Box)(()=>({
    backgroundColor: '#f5f5f5',
    color: '#000',
    padding: '10px',
    position: 'fixed',
    bottom: '0',
    left: '0',
    width: '100%',
    '& p':{
        margin: '0',
        fontSize: '8px',
        fontWight: 'bold',
        letterSpacing: '1px',
        color: Colors.black,
        textAlign: 'center',
        textTransform: 'uppercase',
        '& span':{
            color: Colors.primary,
            fontSize: '8px',
            fontWeight: 'bold',
            letterSpacing: '1px',
        },
    },
}))
export const  Error = styled(Typography)(()=>({
    color:'red',
    fontSize:'14px',
}))
export const RequieredStar = styled(Typography)(()=>({
    color: '#0d6efd',
    position: 'absolute',
    top: '-4px',
    right: '-8px',
}))