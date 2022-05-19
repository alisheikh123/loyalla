import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import "./activeRiders.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    textAlign: "left",
  },
  btn: {
    width: "100%",
  },
  header: {
    padding: 0,
    textAlign: "justify",
  },
  typography: {
    display: "flex",
  },
  actions: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 1px 4px #00000033",
    borderRadius: "10px",
    opacity: 1,
    color: "red",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "transparent",
  },
  icon: {
    color: "#FF9098",
  },
  content: {
    display: "flex",
  },
}));

const ActiveRiderCard = ({data}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [activeRiders, setActiveRiders] = useState([]); //read user details from context

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setActiveRiders(data)
  },[data])

  return (
    <>
      {activeRiders.length !== 0 ? (
        <ul>
          {activeRiders.map((activeRider, index) => (
            <Card key={index} className={classes.root}>
              <Button
                // onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                className={classes.btn}
              >
                <div>
                  <CardHeader
                    title={activeRider.fullName}
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        <PersonOutlineOutlinedIcon className={classes.icon} />
                      </Avatar>
                    }
                    className={classes.header}
                  />
                  <CardHeader
                    title={activeRider.contact}
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        <CallOutlinedIcon className={classes.icon} />
                      </Avatar>
                    }
                    className={classes.header}
                  />
                  {/* <CardMedia
                image="/logo192.png"
                title="Rider Image"
              /> */}
                </div>
              </Button>
              <CardActions>
                <Button className="primary" className={classes.actions}>
                  Chat & Call
                </Button>
                <Button className="primary" className={classes.actions}>
                  View Location
                </Button>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <div className={classes.content}>
                    <FiberManualRecordIcon fontSize="small" color="secondary" />
                    <label>start point</label>
                  </div>
                  <div></div>
                </CardContent>
              </Collapse>
            </Card>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </>
  );
};

export default ActiveRiderCard;
