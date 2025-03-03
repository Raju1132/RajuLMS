import { Box, TableContainer } from "@mui/material";
import { styled, } from "@mui/system";
import { Colors } from "../theme";


export const CommanTableContainMain = styled(TableContainer)(()=>({
      marginTop: '20px',
      
}))

export const CommanTableContain = styled(TableContainer)(()=>({
    maxHeight: '400px',
    borderBottom:'1px solid rgba(224, 224, 224, 1)',
    '& table tr th,& table tr td':{
        borderRight:'1px solid rgba(224, 224, 224, 1)',
        borderBottom:'1px solid rgba(224, 224, 224, 1)',
        borderLeft:'none',
        borderTop:'none',
        textAlign:'center',
        textTransform:'capitalize',
    },
    '& table thead tr:first-of-type th':{
        borderTop:'1px solid rgba(224, 224, 224, 1)',
        // backgroundColor:Colors.headColor,
        backgroundColor:'#bec4cb',
        color:Colors.black, 
        whiteSpace: 'nowrap',
        '& span':{
            fontSize:'12px',
            display:'block',
        },
    },
    '& table tr td':{
        backgroundColor:'#fff',
        padding:'7px',
        '& button.action':{
            color: '#000',
            border: 'none',
            outline: 'none',
            padding: '7px 15px',
            borderRadius: '5px',
            fontSize: '12px',
            height: '30px',
            '&.save':{
                color:'#fff',
                backgroundColor: '#009000',
            },
        },
        '& a':{
        fontSize:'12px',
        color:'#007FFF',
        },
        '& input,& textarea, & select':{
            fontSize:'12px',
            width:'100%',
            padding:'5px',
            borderRadius:'5px',
        },
        '& .MuiStack-root':{
            padding:'0',
            '& .MuiFormControl-root':{
                minWidth:'150px',
                maxWidth:'150px',
                margin:"auto",
                border:'1px solid rgba(0, 0, 0, 0.23)',
                borderRadius:'5px',
                '& label':{
                    fontSize:'11px',
                    top:'-5px'
                },
                '& .MuiInputBase-input':{
                    padding:'9px 14px',
                    height:'auto',
                },
                '& .MuiOutlinedInput-notchedOutline':{
                    display:'none', 
                }
            }
        }
    },
    '& table tr:last-of-type td':{
        borderBottom:'none',
    },
    '& table tr td:first-of-type,& table tr th:first-of-type':{
        borderLeft:'1px solid rgba(224, 224, 224, 1)',
    },
    '& table tr':{
        '&:hover':{
            '& td.Form_accepted,& td.Form_submitted':{
                backgroundColor:Colors.formAcceptedBg,
            },
            '& td.Form_in-process,& td.Form_reconsideration':{
                backgroundColor:Colors.formInprocessBg,
            },
            '& td.Form_pending':{
                backgroundColor:Colors.formInprocessBg,
            },
        },
        '& td':{
            '&.Form_accepted,&.Form_submitted':{
                color:Colors.formAccepted,},
                '&.Form_in-process,&.Form_reconsideration':{
                    color:Colors.formInprcess,},
                    '&.Form_pending':{
                        color:Colors.formPending,}
        },
    },

}))



export const PaginationContain = styled(Box)(()=>({
    '& .MuiTablePagination-select':{
        zIndex:11,
    },

}))
  
