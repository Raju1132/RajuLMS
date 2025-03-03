import React, { useState } from "react";
import { Box, Typography, TextField, IconButton, Avatar, List, ListItem, ListItemAvatar, ListItemText, Paper, InputAdornment, useMediaQuery, Drawer, AppBar, Toolbar } from "@mui/material";
import { styled } from "@mui/system";


const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100vh",
  background: "#fff",
  color: "#000"
}));

const StyledSidebar = styled(Box)(({ theme }) => ({
  width: "300px",
  borderRight: "1px solid #333333",
  overflowY: "auto",
  background: "#fff"
}));

const StyledChatArea = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column"
}));

const StyledMessageContainer = styled(Box)({
  flex: 1,
  overflowY: "auto",
  padding: "20px",
  background: "#fff"
});

const StyledMessage = styled(Paper)(({ isOwn }) => ({
  padding: "10px 15px",
  margin: "8px 0",
  maxWidth: "70%",
  width: "fit-content",
  background: isOwn ? "red" : "blue",
  color: "#ffffff",
  borderRadius: "12px",
  alignSelf: isOwn ? "flex-end" : "flex-start"
}));

const StyledInputArea = styled(Box)({
  padding: "20px",
  background: "#fff"
});

const StyledSearchBox = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    color: "#000",
    "& fieldset": {
      borderColor: "#424242"
    },
    "&:hover fieldset": {
      borderColor: "#666666"
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0d47a1"
    }
  }
});

const ChatUI = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [message, setMessage] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");

  const contacts = [
    { id: 1, name: "John Doe", avatar: "images.unsplash.com/photo-1599566150163-29194dcaad36", lastMessage: "Hey, how are you?" },
    { id: 2, name: "Jane Smith", avatar: "images.unsplash.com/photo-1494790108377-be9c29b29330", lastMessage: "Let's meet tomorrow" },
    { id: 3, name: "Mike Johnson", avatar: "images.unsplash.com/photo-1570295999919-56ceb5ecca61", lastMessage: "Great work!" }
  ];

  const messages = [
    { id: 1, text: "Hey there!", isOwn: false, timestamp: "10:00 AM" },
    { id: 2, text: "Hi! How are you?", isOwn: true, timestamp: "10:02 AM" },
    { id: 3, text: "I'm doing great, thanks for asking!", isOwn: false, timestamp: "10:03 AM" },
    { id: 4, text: "That's wonderful to hear!", isOwn: true, timestamp: "10:05 AM" }
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMessageSend = () => {
    if (message.trim()) {
      // Handle message sending logic here
      setMessage("");
    }
  };

  const sidebar = (
    <>
      <Box p={2}>
        <StyledSearchBox
          fullWidth
          variant="outlined"
          placeholder="Search contacts"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                search
              </InputAdornment>
            )
          }}
        />
      </Box>
      <List>
        {contacts.map((contact) => (
          <ListItem button key={contact.id} sx={{ "&:hover": { background: "#eee" } }}>
            <ListItemAvatar>
              <Avatar src={`https://${contact.avatar}`} alt={contact.name} />
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
              menu
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
          sx={{ "& .MuiDrawer-paper": { width: 300, background: "#262626" } }}
        >
          {sidebar}
        </Drawer>
      ) : (
        <StyledSidebar component="nav">{sidebar}</StyledSidebar>
      )}

      <StyledChatArea>
        <StyledMessageContainer>
          <Box display="flex" flexDirection="column" gap={1}>
            {messages.map((msg) => (
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
                  <IconButton onClick={handleMessageSend} sx={{ color: "#ffffff" }}>
                    send
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#ffffff",
                "& fieldset": { borderColor: "#424242" },
                "&:hover fieldset": { borderColor: "#666666" },
                "&.Mui-focused fieldset": { borderColor: "#0d47a1" }
              }
            }}
          />
        </StyledInputArea>
      </StyledChatArea>
    </StyledContainer>
  );
};

export default ChatUI;