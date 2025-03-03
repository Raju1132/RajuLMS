import styled from "@emotion/styled";
import { Box, List, Typography } from "@mui/material";
import { Colors } from "./theme";
import { height } from "@mui/system";



export const ParentContain = styled(Box)(()=>({
    paddingTop: '64px',
    marginBottom: '70px',
    paddingLeft: '10px',
    paddingRight: '10px',
    width:'100%',
    marginLeft:'auto',
    transition:'225ms',
    '&.DrawerOpen':{
      width: 'calc(100% - 260px)',
    },
    '@media (min-width:899px)':{
        marginBottom:'10px',
    },
    '@media (max-width: 599px)': {
       paddingTop: '48px',
     }

}))

// tabs style 
export const TabsContain = styled(Box)(()=> ({
    position:'relative',
    width:'100%',
    '&.TabsContain':{
        backgroundColor:'#708090',
    },
    '& button':{
        color:'#e0dede',
    },
    '& button.MuiTab-root.Mui-selected':{
        // color:Colors.accepted,
        color:'#fff',
    },
    '& span.MuiTabs-indicator':{
        backgroundColor:Colors.primary,
        
    },
    '& .HomeTabs':{
        position: 'sticky',
        top: '64px',
        zIndex: 101,
        // backgroundColor:Colors.white,
        backgroundColor:'#708090',
        '@media (max-width: 599px)': {
            top: '48px',
         }
    },
    '& .StickyShadow':{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    }
}))

export const FieldContain = styled(Box)(()=>({
    '& input,& select':{
    fontSize: '11px',
    padding: '0 5px',
    borderRadius: '5px',
    border: '1px solid gray',
    width: '100%',
    outline: 'none',
    height: '28px',
    backgroundColor: '#fff',
    color:Colors.black,
    '&:disabled':{
        backgroundColor:Colors.disabled
    },
    },
    '& label':{
        display:'block',
        fontSize:'12px',
        marginBottom:'5px',
    },
    '& div.react-datepicker-wrapper':{
        width:'100%',
    }
}))

export const CardContain = styled(Box)(()=>({
    boxShadow:'rgba(60, 64, 67, 0.3) 0px 2px 4px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 1px',
    '&.Sticky':{
        position:'sticky',
        top:'72px',
        zIndex:101,
        '@media (max-width: 599px)': {
            position: 'static',
            marginTop:'20px',
          },
        '& .StickyChild':{
            position:'relative',
            '&::before':{
                content:'" "',
                position:'absolute',
                top:'-10px',
                left:'0',
                width:'100%',
                height:'100px',
                backgroundColor:'#fff',
                zIndex:-1,
                '@media (max-width: 599px)': {
                    position: 'static',
                  },
            },
        },
    }
}))
export const CardTitle = styled(Typography)(()=> ({
    fontSize: '14px',
    fontWeight: 600,
    textAlign: 'center',
    backgroundColor: '#C0C0C0',
    color: '#000',
    padding: '8px',
}))
export const Card = styled(Box)(()=>({
    padding:'10px 10px',
    '&.p-0':{
        '@media (max-width: 599px)': {
           padding:'20px 0'
         }
    },
    '&.Filter_bg':{
        backgroundColor:'#f9e9e2',    },
}))
export const CardCustomList = styled(List)(()=>({
    padding:'0',
    margin:'0',
    '& li':{
        fontSize: '11px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: 600,
        color: '#4f4b4b',
        marginBottom: '8px',
        '& span':{
            fontSize:'11px'
        },
        '& span.total':{
            color:Colors.total,
        },
        '& span.pending':{
            color:Colors.pending,
        },
        '& span.submitted':{
            color:Colors.submitted,
        },
        '& span.accepted':{
            color:Colors.accepted,
        },
        '& span.reconsidertion':{
            color:Colors.reconsidertion,
        },
    },
}))
export const CardFooter = styled(Box)(()=>({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: '10px',
    '& div':{
        width:'50%',},
    '& p':{
        fontSize: '11px',
        fontWeight: 600,
        padding: '0 10px',
        margin: 0,
        color: '#000',
        color:Colors.primary,
        textTransform:'capitalize',
        padding:'0'
    },
    '& p .MVRCount':{
        fontSize:'11px'
        // color:Colors.accepted,
    }

}))
export const ButtonContain = styled(Box)(({sx})=>({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    gap: '10px',
    ...sx,
    '& button':{
    color: '#fff',
    border: 'none',
    outline: 'none',
    padding: '7px 15px',
    borderRadius: '5px',
    fontSize: '12px',
    marginTop:'10px',
    color:Colors.white,
    backgroundColor:Colors.search,
    height:'30px',
    },
    '& .SearchButton':{
        backgroundColor:Colors.search,
    },
    '& .ResetButton':{
        backgroundColor:Colors.primary,
    },
    '& .ExportButton':{
        backgroundColor:Colors.export,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        '& img':{
            width:'20px',
        }
    },

}))
export const CustomButtonContain = styled(Box)(()=>({
    position:'relative',
    '& button':{
    position: 'absolute',
    paddingTop: '5px',
    paddingBottom: '5px',
    top:'-12px',
    right: '0px',
    borderTopLeftRadius:'5px',
    borderBottomLeftRadius:'5px',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor:Colors.accepted,
    color:Colors.white,
    border: 'none',
    outline: 'none',
    padding: '5px ',
    paddingLeft:'10px',
    fontSize: '12px',
    display:'flex',
    alignItems:'center',
    '& svg':{
        fontSize:'12px'
    }
    }
}))
export const TableContain = styled(Box)(()=>({
    overflow:'auto',
    position:'relative',
    paddingBottom:'10px',
    '& table':{
        borderCollapse:'collapse',
        width:'100%',
    },
    '& table thead':{},
    '& table thead tr th,& table tbody tr td':{
        fontSize:'10px',
        border:'1px solid',
        borderColor:Colors.bordercolor,
        textAlign:'center',
        padding:'7px',
    },
    '& table thead tr th':{
        verticalAlign:'top',
        backgroundColor:'#f5f5f5'
    },
    '& .TableTitle th':{
        backgroundColor:Colors.tableheadercolor,
    },
    '& .TableTitle h4':{
        fontSize:'14px',
        textAlign:'center',
        fontWeight:600,
        marginBottom:0,
    },
}))