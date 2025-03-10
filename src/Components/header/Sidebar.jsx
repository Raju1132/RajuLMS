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
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import QueueIcon from "@mui/icons-material/Queue";
import DvrIcon from "@mui/icons-material/Dvr";
import SchoolIcon from "@mui/icons-material/School";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {
  HeaderContain,
  HeaderTitle,
  SideBarHeadContain,
  SideBarList,
} from "../../style/header/Header";
import { useSelector, useDispatch } from "react-redux";
import { useMatches } from "../../style/theme";
import { setDrawer } from "../../features/DrawerSlice";
import { setRole } from "../../features/RoleSlice";
import Marquee from "react-fast-marquee";
import { Roles } from "../../utils/constants";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from '@mui/icons-material/Home';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { matches } = useMatches();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const drawer = useSelector((state) => state.drawer);
  const currentRole = useSelector((state) => state.role);

  // Effect to handle responsive drawer
  useEffect(() => {
    if (matches) {
      setDrawerOpen(false);
    }
  }, [location, matches]);

  useEffect(() => {
    setDrawerOpen(!matches);
  }, [matches]);

  const [drawerOpen, setDrawerOpen] = useState(() => !matches);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Effect to synchronize drawer state with Redux
  useEffect(() => {
    if (matches) {
      dispatch(setDrawer(true));
    } else {
      dispatch(setDrawer(!drawerOpen));
    }
  }, [drawerOpen, dispatch, matches]);

  // Navigation links based on role
  const adminNavLinks = [
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
          label: "Training Material",
          link: "/trainig-material",
          icon: <QueueIcon />,
        },
        {
          label: "Questionnaire",
          link: "/questionnaire",
          icon: <DescriptionIcon />,
        },
      ],
    },
    {
      label: "Manage User",
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
    {
      label: "Support",
      link: "/support",
      icon: <SupportAgentOutlinedIcon />,
    },
    { label: "Log Out", link: "/", icon: <LogoutOutlinedIcon /> },
  ];

  const userNavLinks = [
    { label: "Dashboard", link: "/student-dashboard", icon: <DashboardIcon /> },
    { label: "Results", link: "/result", icon: <ChecklistRtlIcon /> },
    { label: "Analytics", link: "/analytics", icon: <AnalyticsIcon /> },
    {
      label: "Support",
      link: "/support",
      icon: <SupportAgentOutlinedIcon />,
    },
    { label: "User Profile", link: "/profile", icon: <PersonIcon /> },
    { label: "Log Out", link: "/", icon: <LogoutOutlinedIcon /> },
  ];

  // Select nav links based on current role
  const navLinks = currentRole === Roles.Admin ? adminNavLinks : userNavLinks;

  const handleToggle = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const headerTitle = "Learning Management System";

  const handleLinkClick = (event, link) => {
    if (link.label === "Log Out") {
      event.preventDefault();
      // Reset role to default on logout
      dispatch(setRole(Roles.Admin));
      localStorage.clear();
      navigate("/");
    }
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
          <HeaderTitle variant="h6">
            <Marquee gradient={false} speed={30}>
              {headerTitle}
            </Marquee>
          </HeaderTitle>
          <button className="NotificationIcon">
            <NotificationsActiveIcon />
            <span className="NotificationCount"> 10</span>
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
        open={drawerOpen}
        ModalProps={{
          disableBackdropClick: true,
        }}
      >
        <SideBarHeadContain>
          <div className="SideBar">
            <IconButton sx={{ padding: "0" }}>
              <AccountCircle fontSize="large" />
            </IconButton>

            <div className="user_name_text">
              <span>{userData?.userName || "Manthan-It-Solutions"}</span>
              <span>{currentRole}</span>
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
                    <Link
                      to={link.link}
                      onClick={(e) => handleLinkClick(e, link)}
                      style={{ textDecoration: "none", color: "inherit" }}
                      className="LinkSideBar"
                    >
                      {link.icon}
                      <ListItemText primary={link.label} />
                    </Link>
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
