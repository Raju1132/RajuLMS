import React, { useState, useMemo } from "react";
import { 
  Box, 
  Typography, 
  TextField, 
  IconButton, 
  Avatar, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Paper, 
  InputAdornment, 
  useMediaQuery,
  Drawer, 
  AppBar, 
  Toolbar,
  createTheme,
  ThemeProvider
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import MenuIcon from '@mui/icons-material/Menu';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff4500', 
    },
    secondary: {
      main: '#555', 
    }
  }
});

const StyledContainer = styled(Box)({
  display: "flex",
  height: "90vh",
  background: "#fff",
  color: "#000"
});

const StyledSidebar = styled(Box)({
  width: "300px",
  borderRight: "1px solid #e0e0e0",
  overflowY: "auto",
  background: "#fff"
});

const StyledChatArea = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column"
});

const StyledMessageContainer = styled(Box)({
  flex: 1,
  overflowY: "auto",
  padding: "20px",
  background: "#f5f5f5"
});

// Modify StyledMessage to use props safely
const StyledMessage = styled(Paper, { 
  shouldForwardProp: (prop) => prop !== 'isOwn' 
})(({ theme, isOwn }) => ({
  padding: "10px 15px",
  margin: "8px 0",
  maxWidth: "70%",
  width: "fit-content",
  background: isOwn ? theme.palette.primary.main : theme.palette.secondary.main,
  color: "#ffffff",
  borderRadius: "12px",
  alignSelf: isOwn ? "flex-end" : "flex-start"
}));

const StyledInputArea = styled(Box)({
  padding: "20px",
  background: "#fff"
});

const ChatUI = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  // Improved contacts with more realistic data
  const contacts = [
    { 
      id: 1, 
      name: "John Doe", 
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36", 
      lastMessage: "Hey, how are you?",
      messages: [
        { id: 1, text: "Hey there!", isOwn: false, timestamp: "10:00 AM" },
        { id: 2, text: "I'm doing great!", isOwn: false, timestamp: "10:05 AM" }
      ]
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", 
      lastMessage: "Let's meet tomorrow",
      messages: [
        { id: 1, text: "Hi Jane!", isOwn: true, timestamp: "11:00 AM" },
        { id: 2, text: "Sure, sounds good!", isOwn: false, timestamp: "11:15 AM" }
      ]
    },
    { 
      id: 3, 
      name: "Mike Johnson", 
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61", 
      lastMessage: "Great work!",
      messages: [
        { id: 1, text: "Hello Mike", isOwn: true, timestamp: "12:00 PM" },
        { id: 2, text: "Thanks!", isOwn: false, timestamp: "12:10 PM" }
      ]
    }
  ];

  // Optimized search functionality
  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, contacts]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMessageSend = () => {
    if (message.trim() && selectedContact) {
      // In a real app, you would send the message to the backend
      const newMessage = {
        id: selectedContact.messages.length + 1,
        text: message,
        isOwn: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      // Update the selected contact's messages
      selectedContact.messages.push(newMessage);
      setMessage("");
    }
  };

  const sidebar = (
    <>
      <Box p={2}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search contacts"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </Box>
      <List>
        {filteredContacts.map((contact) => (
          <ListItem 
            button 
            key={contact.id} 
            onClick={() => setSelectedContact(contact)}
            selected={selectedContact?.id === contact.id}
            sx={{ 
              "&:hover": { background: "#eee" },
              "&.Mui-selected": { background: "#e0e0e0" }
            }}
          >
            <ListItemAvatar>
              <Avatar src={contact.avatar} alt={contact.name} />
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="subtitle1">{contact.name}</Typography>}
              secondary={
                <Typography variant="body2" sx={{ color: "#999999" }}>
                  {contact.lastMessage}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </>  
  );

  return (
    <ThemeProvider theme={theme}>
      <StyledContainer>
        {isMobile && (
          <AppBar position="static" sx={{ background: "#262626" }}>
            <Toolbar>
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
                aria-label="open drawer"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">Chat App</Typography>
            </Toolbar>
          </AppBar>
        )}
        
        {isMobile ? (
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{ "& .MuiDrawer-paper": { width: 300, background: "#fff" } }}
          >
            {sidebar}
          </Drawer>
        ) : (
          <StyledSidebar component="nav">{sidebar}</StyledSidebar>
        )}

        <StyledChatArea>
          {selectedContact ? (
            <>
              <StyledMessageContainer>
                <Box display="flex" flexDirection="column" gap={1}>
                  {selectedContact.messages.map((msg) => (
                    <Box
                      key={msg.id}
                      display="flex"
                      flexDirection="column"
                      alignItems={msg.isOwn ? "flex-end" : "flex-start"}
                    >
                      <StyledMessage isOwn={msg.isOwn}>
                        <Typography>{msg.text}</Typography>
                        <Typography variant="caption" sx={{ color: "#cccccc" }}>
                          {msg.timestamp}
                        </Typography>
                      </StyledMessage>
                    </Box>
                  ))}
                </Box>
              </StyledMessageContainer>

              <StyledInputArea>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleMessageSend()}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleMessageSend} color="primary">
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </StyledInputArea>
            </>
          ) : (
            <Box 
              display="flex" 
              justifyContent="center" 
              alignItems="center" 
              height="100%" 
              sx={{ background: "#f5f5f5" }}
            >
              <Typography variant="h6" color="text.secondary">
                Select a contact to start chatting
              </Typography>
            </Box>
          )}
        </StyledChatArea>
      </StyledContainer>
    </ThemeProvider>
  );
};

export default ChatUI;