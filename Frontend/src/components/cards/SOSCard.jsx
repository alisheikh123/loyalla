import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import PersonPinCircleOutlinedIcon from "@material-ui/icons/PersonPinCircleOutlined";
import PlayArrowOutlinedIcon from "@material-ui/icons/PlayArrowOutlined";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";
import app from "../../config/firebase.js";
import { getDatabase, ref, get, child, onCreate } from "firebase/database";
import "./activeRiders.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "fit-content",
    textAlign: "left",
    boxShadow: "0px 12px 22px #00000029",
    border: "3px solid #FF525F",
    borderRadius: "15px",
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
    color: "#FF646F",
    minWidth: "auto",
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
}));

var alerts = [];

const SOSCard = ({ data }) => {
  const classes = useStyles();
  const [sosList, setSosList] = useState([]);
  const [isLive, setisLive] = useState(false);
  const firebase_db = ref(getDatabase(app));

  const GetSOS = () => {
    if (data.length > 0) {
      data.map((item, index) => {
        get(child(firebase_db, `alert/${item.riderId}/${item.riderDetailID}`))
          .then((snapshot) => {
            var res = snapshot.val();
            Object.values(res).map((alert, index) => {
              console.log(alert);
              alerts.push({
                id: item.riderId,
                audio: alert.audio,
                date_time: alert.date_time,
                image1: alert.image1,
                image2: alert.image2,
                lat: alert.lat,
                longt: alert.longt,
                phone_no: alert.phone_no,
                userName: alert.userName,
              });
            });
            console.log(alerts);
            setSosList(alerts);
          })
          .catch((error) => {
            console.log(error);
          });
        alerts = [];
      });
    }
  };

  useEffect(() => {
    GetSOS();
    setisLive(true);
  }, [data]);

  return (
    <div className="sos-alerts">
      {isLive &&
        sosList.map((sos, index) => (
          <Card className={classes.root} key={index}>
            <CardHeader
              title={sos.userName}
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  <PersonOutlineOutlinedIcon className={classes.icon} />
                </Avatar>
              }
              className={classes.header}
            />
            <CardContent>
              <Typography component="h5" color="error">
                Help! It's an emergency.
              </Typography>
            </CardContent>
            <CardActions>
              <Button className="primary" className={classes.actions}>
                <PersonPinCircleOutlinedIcon />
              </Button>
              <Button className="primary" className={classes.actions}>
                <PlayArrowOutlinedIcon />
              </Button>
              <Button className="primary" className={classes.actions}>
                <ForumOutlinedIcon />
              </Button>
              <Button className="primary" className={classes.actions}>
                <CallOutlinedIcon />
              </Button>
            </CardActions>
          </Card>
        ))}
    </div>
  );
};
export default SOSCard;
