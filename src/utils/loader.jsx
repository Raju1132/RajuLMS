
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export function Loader({ fullScreen = false }) {
  return (
    <>
      {fullScreen ? (
        <Box sx={{
          display: 'flex',
          width: '100%',
          height: '100vh',
          background: 'transparent',
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: '#ffffffbf',
        }}>
          <CircularProgress color="inherit" size={25} />
          {/* You can add other content for fullScreen here */}
        </Box>
      ) : (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress color="inherit" size={25} />
          {/* You can add other content for non-fullScreen here */}
        </Box>
      )}
    </>
  );
}