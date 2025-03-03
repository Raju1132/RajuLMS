import React from 'react';
import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';
import { useLocation } from 'react-router-dom';
import {  Typography, Link, IconButton } from '@mui/material';
import { FooterContain } from '../../style/footer/Footer';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';




// am footer links
// const footeLinks = [
//   { label: 'Home', link: '/home', icon: <HomeIcon /> },
//   { label: 'Visit Plan', link: '/visitplan', icon: <CalendarMonthIcon /> },
//   { label: 'Analytics', link: '/analytics', icon: <TrendingUpIcon /> },
//   { label: 'Support', link: '/support', icon: <SupportAgentIcon /> },
// ];
// ho footer links
const footerLinks = [
  { label: 'Home', link: '/hohome', icon: <HomeIcon /> },
  { label: 'Visit Plan', link: '/visitplan', icon: <CalendarMonthIcon /> },
  { label: 'Analytics', link: '/analytics', icon: <TrendingUpIcon /> },
  { label: 'Support', link: '/support', icon: <SupportAgentIcon /> },
];

const Footer = () => {
  const location = useLocation();

  return (
    <FooterContain>
      <Grid container spacing={2} sx={{ padding: '0 10px' }}>
        {footerLinks.map((item, index) => (
          <Grid item key={index} xs={3}>
            <Link
              href={item.link}
              color="inherit"
              underline="hover"
              className={location.pathname === item.link ? 'active' : ''}
            >
              <IconButton>{item.icon}</IconButton>
              <Typography variant="body2">{item.label}</Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </FooterContain>
  );
};

export default Footer;
