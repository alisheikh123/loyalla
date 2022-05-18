import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import RequestModal from "../../components/RequestDialoge";
import ActiveRiderCard from "../../components/cards/ActiveRiderCard.jsx";
import MapComponent from "../../components/Map.jsx";
import SOSCard from "../../components/cards/SOSCard.jsx";
import useAuth from "../../Authentication/useAuth";
import { MapKey } from "../../config";
import { GetActiveRiders } from "../../config/services";
import "./dashboard.css";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isLive, setisLive] = useState(false);
  const [dialog, setdialog] = useState(false);
  const { logout } = useAuth();
  const [activeRiders, setActiveRiders] = useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setdialog(true);
  };
  const handleDialogClose = () => {
    setdialog(false);
    GetRider();
  };

  const GetRider = () => {
    setisLive(false);
    GetActiveRiders().then((data) => {
      setisLive(true);
      if (data.data.message === "Data Fetched Successfully!") {
        setActiveRiders(data.data.data);
      } else {
      }
    });
  };

  useEffect(() => {
    GetRider();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{ backgroundColor: "#FF525F" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {/* <div className={classes.drawerHeader}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="48"
            viewBox="0 0 232 48"
          >
            <g
              id="Group_4892"
              data-name="Group 4892"
              transform="translate(-78 -101.141)"
            >
              <path
                id="Path_1970"
                data-name="Path 1970"
                d="M0-.266H83.843v4.9H0Z"
                transform="translate(78 134.506)"
                fill="#ff525f"
              />
              <text
                id="Trackkar"
                transform="translate(147 139.141)"
                fill="#ff525f"
                fontSize="40"
                fontFamily="SF UI Display"
                fontWeight="700"
              >
                <tspan x="0" y="0">
                  Trackkar
                </tspan>
              </text>
            </g>
          </svg>
        </div> */}
        <List>
          <ListItem>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickOpen}
            >
              Tracking Requests
            </Button>
            <IconButton onClick={logout}>
              <ExitToAppIcon />
            </IconButton>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </ListItem>
        </List>
        <Divider />
        <h2>Active Riders: {activeRiders.length}</h2>
        {isLive ? <ActiveRiderCard data={activeRiders} /> : null}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div>
          <MapComponent
            googleMapURL={MapKey}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `500px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            center={{ lat: 0, lng: 0 }}
            zoom={3}
            data={activeRiders}
          />
        </div>
        <div>
          <SOSCard data={activeRiders} />
        </div>
      </main>
      {dialog ? (
        <RequestModal
          open={dialog}
          handleClose={handleDialogClose}
        ></RequestModal>
      ) : null}
    </div>
  );
}
