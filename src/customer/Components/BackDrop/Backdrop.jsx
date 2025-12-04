import { Backdrop } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Progress circle with label
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
       <CircularProgress
        variant="determinate"
        {...props}
        size={80} // 👈 Increase size here (default is 40)
        thickness={4.5} // optional: make it a bit thicker
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: '#fff', fontWeight: 'bold' }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const BackdropComponent = ({ open }) => {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    if (!open) return;
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);
    return () => clearInterval(timer);
  }, [open]);

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
     backgroundColor: 'rgba(85, 31, 61, 0.81)', // 20% opacity
      }}
      open={open}
    >
      <CircularProgressWithLabel  color="white" value={progress} />
    </Backdrop>
  );
};

export default BackdropComponent;
