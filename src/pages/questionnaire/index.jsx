import React, { useState, useMemo, useEffect } from "react";
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
  AppBar,
  Toolbar,
  createTheme,
  ThemeProvider
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "90vh",
  background: "#fff",
  color: "#000",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  }
}));

const StyledSidebar = styled(Box)(({ theme }) => ({
  width: "300px",
  borderRight: "1px solid #e0e0e0",
  overflowY: "auto",
  background: "#fff",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "100%",
  }
}));

const StyledChatArea = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "100%",
  }
}));

const StyledMessageContainer = styled(Box)({
  flex: 1,
  overflowY: "auto",
  padding: "20px",
  background: "#f5f5f5"
});

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
  padding: "10px 20px",
  background: "#fff"
});

const StyledHeader = styled(Box)(({ theme }) => ({
  padding: "10px 16px",
  background: "#fff",
  borderBottom: "1px solid #e0e0e0",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    padding: "16px",
  }
}));

const ChatUI = () => {
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Close drawer when selecting a contact on mobile
  useEffect(() => {
    if (isMobile && selectedContact) {
      setDrawerOpen(false);
    }
  }, [selectedContact, isMobile]);

  const contacts = [
    { 
      id: 1, 
      name: "Aarav Singh", 
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36", 
      lastMessage: "I have a doubt regarding the recent lecture on algorithms.",
      messages: [
        { id: 1, text: "Hello, I have a doubt regarding the algorithm topic discussed in today's class. Can you help me?", isOwn: false, timestamp: "10:00 AM" },
        { id: 2, text: "Sure, what exactly do you want help with?", isOwn: true, timestamp: "10:05 AM" },
        { id: 3, text: "I am confused about the difference between QuickSort and MergeSort. Could you explain that?", isOwn: false, timestamp: "10:10 AM" }
      ]
    },
    { 
      id: 2, 
      name: "Sneha Patel", 
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", 
      lastMessage: "Can you help me with the Python assignment?",
      messages: [
        { id: 1, text: "Hi, I need help with the Python assignment on file handling.", isOwn: false, timestamp: "11:00 AM" },
        { id: 2, text: "Of course! What part are you struggling with?", isOwn: true, timestamp: "11:05 AM" },
        { id: 3, text: "I'm not sure how to read from and write to files correctly. Can you guide me?", isOwn: false, timestamp: "11:10 AM" }
      ]
    },
    { 
      id: 3, 
      name: "Rajesh Kumar", 
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61", 
      lastMessage: "I have a question about the recent quiz.",
      messages: [
        { id: 1, text: "Hey, I didn't understand question 5 in the quiz. Could you explain it?", isOwn: false, timestamp: "12:00 PM" },
        { id: 2, text: "Sure, let me check the question. What was the problem with it?", isOwn: true, timestamp: "12:05 PM" },
        { id: 3, text: "The question was about database normalization. I couldn't remember the correct form.", isOwn: false, timestamp: "12:10 PM" }
      ]
    },
    { 
      id: 4, 
      name: "Ravi Mehta", 
      avatar: "https://images.unsplash.com/photo-1501594907352-0a6a64c6ff99", 
      lastMessage: "I'm having trouble understanding the concepts of OOP in Java.",
      messages: [
        { id: 1, text: "Hello, I am stuck on object-oriented programming concepts in Java. Can you help?", isOwn: false, timestamp: "1:00 PM" },
        { id: 2, text: "Of course! Which part are you having trouble with?", isOwn: true, timestamp: "1:05 PM" },
        { id: 3, text: "I don't get inheritance and polymorphism clearly. Can you explain with examples?", isOwn: false, timestamp: "1:10 PM" }
      ]
    },
    { 
      id: 5, 
      name: "Priya Verma", 
      avatar: "https://images.unsplash.com/photo-1596322095578-415d72d02b97", 
      lastMessage: "Can you help with the DBMS lab assignment?",
      messages: [
        { id: 1, text: "Hi, I am facing issues with the DBMS lab assignment. Can you assist me?", isOwn: false, timestamp: "2:00 PM" },
        { id: 2, text: "Sure! What part is troubling you?", isOwn: true, timestamp: "2:05 PM" },
        { id: 3, text: "I'm unable to design the ER diagram correctly. Could you guide me through it?", isOwn: false, timestamp: "2:10 PM" }
      ]
    },
    { 
      id: 6, 
      name: "Ananya Reddy", 
      avatar: "https://images.unsplash.com/photo-1533084363971-e02cf9d72e13", 
      lastMessage: "I need clarification on the ML algorithm covered last week.",
      messages: [
        { id: 1, text: "Hi, I have some doubts regarding the machine learning algorithm we discussed last week. Can you help?", isOwn: false, timestamp: "3:00 PM" },
        { id: 2, text: "Sure! What exactly are you unsure about?", isOwn: true, timestamp: "3:05 PM" },
        { id: 3, text: "I am confused between supervised and unsupervised learning. Could you explain it better?", isOwn: false, timestamp: "3:10 PM" }
      ]
    }
  ];
  
  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, contacts]);

  const handleMessageSend = () => {
    if (message.trim() && selectedContact) {
      const newMessage = {
        id: selectedContact.messages.length + 1,
        text: message,
        isOwn: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      selectedContact.messages.push(newMessage);
      setMessage("");
    }
  };

  const renderContactsList = () => (
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
                <Typography variant="body2" sx={{ color: "#999999", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
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
          <AppBar position="static" color="default" elevation={1}>
            <Toolbar>
              {selectedContact ? (
                <>
                  <IconButton edge="start" color="inherit" onClick={() => setSelectedContact(null)}>
                    <ArrowBackIcon />
                  </IconButton>
                  <Avatar src={selectedContact.avatar} alt={selectedContact.name} sx={{ ml: 1, mr: 2 }} />
                  <Typography variant="h6" noWrap>
                    {selectedContact.name}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Question
                  </Typography>
                </>
              )}
            </Toolbar>
          </AppBar>
        )}

        {!isMobile && (
          <StyledSidebar component="nav">
            <StyledHeader>
              <Typography variant="h6">Messages</Typography>
            </StyledHeader>
            {renderContactsList()}
          </StyledSidebar>
        )}
        {isMobile && !selectedContact && (
          <Box sx={{ flex: 1, overflowY: "auto" }}>
            {renderContactsList()}
          </Box>
        )}
        {(!isMobile || (isMobile && selectedContact)) && (
          <StyledChatArea>
            {selectedContact ? (
              <>
                {!isMobile && (
                  <StyledHeader>
                    <Avatar src={selectedContact.avatar} alt={selectedContact.name} />
                    <Box ml={2}>
                      <Typography variant="h6">{selectedContact.name}</Typography>
                    </Box>
                  </StyledHeader>
                )}

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
                          <Typography variant="caption" sx={{color: "#cccccc", display: "block", textAlign: msg.isOwn ? "right" : "left" }}>
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
                  Choose a contact to begin the conversation
                </Typography>
              </Box>
            )}
          </StyledChatArea>
        )}
      </StyledContainer>
    </ThemeProvider>
  );
};

export default ChatUI;