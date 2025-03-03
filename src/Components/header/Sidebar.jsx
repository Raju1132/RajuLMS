import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  Menu as MenuIcon,
  AccountCircle,
  Close,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DescriptionIcon from '@mui/icons-material/Description';
import DateRangeIcon from "@mui/icons-material/DateRange";
import PreviewIcon from "@mui/icons-material/Preview";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import DvrIcon from "@mui/icons-material/Dvr";
import SchoolIcon from '@mui/icons-material/School';
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddCardIcon from "@mui/icons-material/AddCard";
import {
  HeaderContain,
  HeaderTitle,
  SideBarHeadContain,
  SideBarList,
} from "../../style/header/Header";
import { useSelector, useDispatch } from "react-redux";
import { useMatches } from "../../style/theme";
import { setDrawer } from "../../features/DrawerSlice";
import Marquee from "react-fast-marquee";
import { useNavigate } from "react-router-dom";
import { Roles } from "../../utils/constants";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';


const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { matches } = useMatches();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const drawer = useSelector((state) => state.drawer);
  useEffect(() => {
    if (matches) {
      setDrawerOpen(false); // Close the drawer only when matches is true
    }
  }, [location, matches]);
  useEffect(() => {
    setDrawerOpen(!matches); // Update drawer state when matches changes
  }, [matches]);
  const [drawerOpen, setDrawerOpen] = useState(() => !matches); // To manage the visibility of the sidebar
  const [openDropdown, setOpenDropdown] = useState(null); // To track the currently open dropdown
  const RoleType = useSelector((state) => state.role); // Get the value from Redux state

  useEffect(() => {
    if (matches) {
      dispatch(setDrawer(true)); // Set drawer open/closed based on matches
    } else {
      dispatch(setDrawer(!drawerOpen));
    }
  }, [drawerOpen, dispatch, matches]);


  let navLinks = [];

  {
    RoleType === "Admin"
      ? (navLinks = [
          { label: "Dashboard", link: "/home", icon: <DashboardIcon /> },

          {
            label: "Manage",
            link: "#",
            icon: <DvrIcon />,
            sublinks: [
              {
                label: "Training",
                link: "/training",
                icon: <SchoolIcon />,
              },
              {
                label: "Questionnaire",
                link: "/questionnaire",
                icon: <DescriptionIcon />,
              },

            ],
          },
          {
            label: 
            "Manage User",
            link: "#",
            icon: <ManageAccountsIcon />,
            sublinks: [
              {
                label: "User Role",
                link: "/userrole",
                icon: <RecentActorsIcon />,
              },
            ],
          },
    
          { label: "Results", link: "/result", icon: <ChecklistRtlIcon /> },
          { label: "Analytics", link: "/analytics", icon: <AnalyticsIcon /> },
          { label: "Support", link: "/support", icon: <SupportAgentOutlinedIcon /> },
          { label: "Log Out", link: "/", icon: <LogoutOutlinedIcon /> },
        ])
      : (navLinks = [{ label: "Dashboard", link: "/home", icon: <DashboardIcon /> },

        {
          label: "Manage",
          link: "#",
          icon: <DvrIcon />,
          sublinks: [
            {
              label: "Training",
              link: "/training",
              icon: <SchoolIcon />,
            },
            {
              label: "Questionnaire",
              link: "/questionnaire",
              icon: <DescriptionIcon />,
            },

          ],
        },
        {
          label: 
          "Manage User",
          link: "#",
          icon: <ManageAccountsIcon />,
          sublinks: [
            {
              label: "User Role",
              link: "/userrole",
              icon: <RecentActorsIcon />,
            },
          ],
        },
  
        { label: "Results", link: "/result", icon: <ChecklistRtlIcon /> },
        { label: "Analytics", link: "/analytics", icon: <AnalyticsIcon /> },
        { label: "Support", link: "/support", icon: <SupportAgentOutlinedIcon /> },
        { label: "Log Out", link: "/", icon: <LogoutOutlinedIcon /> },
      ]);
  }
 

  const handleToggle = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label)); // Toggle open dropdown
  };



  // Determine the header title based on the current route
  const headerTitle =  "Learning Management System";

  const handleLinkClick = (event, link) => {
    event.preventDefault();
    localStorage.clear();
    navigate("/");
  };

  return (
    <HeaderContain className="HeaderContain">
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "white" }}
        className={`Appbar ${drawer ? "" : "DrawerOpen"}`}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2, color: "#000", fontSize: "24px" }}
            className={drawer ? "" : "MenuButton"}
          >
            <MenuIcon />
          </IconButton>
          {/* <HeaderTitle variant="h6">EasyGo Audit</HeaderTitle> */}
          <HeaderTitle variant="h6">
            <Marquee gradient={false} speed={30}>
              {headerTitle}
            </Marquee>
          </HeaderTitle>
          <button className="NotificationIcon">
            <NotificationsActiveIcon />
            <span className="NotificationCount"> 102</span>
          </button>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: 260,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 260,
            boxSizing: "border-box",
            boxShadow:
              "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
          },
        }}
        variant="persistent"
        anchor="left"
        open={drawerOpen} // Controls visibility based on state
        // onClose={toggleDrawer}
        ModalProps={{
          disableBackdropClick: true,
        }}
      >
        <SideBarHeadContain>
          <div className="SideBar">
            <IconButton sx={{ padding: "0" }}>
              <AccountCircle fontSize="large" />
            </IconButton>
              

            {/* User's Name in the center */}
            <div className="user_name_text">
              <span>{userData?.userName||"Manthan-It-Solution"}</span>
              <span>{Roles[userData?.roleType]||"Admin"}</span>
              <span>{userData?.userId}</span>
            </div>
          </div>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{ padding: "0" }}
          >
            <Close />
          </IconButton>
        </SideBarHeadContain>
        <SideBarList className="SidebarList">
          {Array.isArray(navLinks) && navLinks.length > 0 ? (
            navLinks.map((link, index) => (
              <React.Fragment key={index}>
                {/* Render top-level item */}
                {!link.sublinks ? (
                  <ListItem className="Border_top">
                    {link.label === "Log Out" ? (
                      <Link
                        to={link.link}
                        onClick={(e) => handleLinkClick(e, link)}
                        style={{ textDecoration: "none", color: "inherit" }}
                        className="LinkSideBar"
                      >
                        {link.icon}
                        <ListItemText primary={link.label} />
                      </Link>
                    ) : (
                      <Link
                        to={link.link}
                        onClick={link?.action}
                        style={{ textDecoration: "none", color: "inherit" }}
                        className="LinkSideBar"
                      >
                        {link.icon}
                        <ListItemText primary={link.label} />
                      </Link>
                    )}
                  </ListItem>
                ) : (
                  <>
                    {/* Render item with sublinks */}
                    <ListItem
                      onClick={() => handleToggle(link.label)}
                      aria-haspopup="true"
                      className="LinkSideBar Border_top"
                    >
                      {link.icon}
                      <ListItemText primary={link.label} />
                      <IconButton>
                        {openDropdown === link.label ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </IconButton>
                    </ListItem>

                    {/* Render sublinks */}
                    <Collapse
                      in={openDropdown === link.label}
                      timeout="auto"
                      unmountOnExit
                      className="ContainDropDown"
                    >
                      <List disablePadding ms={2} className="DropDown">
                        {Array.isArray(link.sublinks) &&
                        link.sublinks.length > 0 ? (
                          link.sublinks.map((sublink, subIndex) => (
                            <ListItem
                              key={`sub-${link.label}-${subIndex}`}
                              sx={{ paddingLeft: 4 }}
                            >
                              <Link
                                to={sublink.link}
                                style={{
                                  textDecoration: "none",
                                  color: "inherit",
                                }}
                                className="LinkSideBar"
                              >
                                {sublink.icon}
                                <ListItemText primary={sublink.label} />
                              </Link>
                            </ListItem>
                          ))
                        ) : (
                          <ListItem>
                            <ListItemText primary="No sublinks available" />
                          </ListItem>
                        )}
                      </List>
                    </Collapse>
                  </>
                )}
              </React.Fragment>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No nav links available" />
            </ListItem>
          )}
        </SideBarList>
      </Drawer>
    </HeaderContain>
  );
};

export default Sidebar;
