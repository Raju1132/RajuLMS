import styled from "@emotion/styled"; 
import { Box, List, Typography } from "@mui/material";
import { Colors } from "../theme";

export const HeaderContain = styled(Box)(()=>({
  '& .NotificationIcon':{
    position:'relative',
    display:'flex',
    alignItems:'center',
    marginRight:'20px',
    backgroundColor:'transparent',
    '& svg':{
      fontSize:'18px',
      color:Colors.black,
    },
    '& .NotificationCount':{
      fontSize: '10px',
      position: 'absolute',
      top: '-9px',
      right: '-28px',
      color: '#ff4500',
      border: '1px solid gray',
      padding: '0 4px',
      borderRadius: '5px',
    }

  },
  '& .Appbar':{
    width:'100%',
    transition:'225ms',
    '&.DrawerOpen':{
      width: 'calc(100% - 260px)',
      '& .MenuButton':{
        visibility:'hidden',
      }
    }
  },
  '& .css-4nmryk-MuiBackdrop-root-MuiModal-backdrop':{
    display:'none',
  },
}))

export const SideBarHeadContain = styled(Box)(()=>({
    display: 'flex',
    gap: '10px',
    padding: '10px',
    backgroundColor: Colors.primary,
    color: Colors.white,
    justifyContent: 'space-between',
    alignItems: 'start',
    '& .SideBar':{
      display:'flex',
      alignItems:'center',
      gap:10,
      '& .user_name_text':{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        color: '#fff',
        width: '100%',
        '& span':{
          fontSize:'12px'
        },
      },
    },
    '& button svg':{
      color:Colors.white,
    }


}))

export const SideBarList = styled(List)(()=>({
  backgroundColor:'#f5f5f5',
  '& .LinkSideBar':{
    display:'flex',
    alignItems:'center',
    gap:5,
    '& span':{
      fontSize:'12px',
    },
    '& svg':{
      fontSize:'16px',
    },

  },
  '& .Border_top':{
    borderTop:'1px solid #fff'
  },
  '& li:first-of-type':{
    borderTop:0
  },
  '& li a span,& .ContainDropDown .DropDown  li a span':{
    fontSize:'12px',
  },
  '& li a svg,& .ContainDropDown .DropDown  li a svg':{
    fontSize:'16px',
  },
  '& > li:last-of-type a span,& > li:last-of-type a svg':{
    color:Colors.primary,
    fontWeight:600,
  },
  '& .DropDown':{
    borderLeft:'3px solid',
    borderColor:Colors.primary,
    backgroundColor:Colors.white,
    padding:'0',
    marginLeft:'18px',
    '& li':{
      paddingLeft:'10px',
      borderTop:'1px solid #f5f5f5',
      '&:last-child':{
        borderTop:0,
      }
    }
  },

}))




// Add const/let or export default if needed
export const  HeaderTitle = styled(Typography)(() => ({
  color: Colors.primary,
  textTransform: 'uppercase',
  fontSize:'14px',
  maxWidth:'600px',
  width:'100%',
  marginRight:'10px',
}));

