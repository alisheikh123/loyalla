import React, { useEffect, useState } from "react";
import { Container, Row} from "shards-react";
import { CreateMeeting } from '../../MeetingServices.js'
import './style.css';
import {Grid } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import history from '../../history.js';
import useAuth from '../../Authentication/useAuth'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DashboardOverview = () => {

  const [connect, setconnect] = useState(false);
  const [data, setdata] = useState({});
  const [join, setJoin] = useState(false);
  const [meeting, setMeeting] = useState({
    title : '',
    body : '',
    action : '',
  });
  const { user } = useAuth()


  const handleClose = () => {
    setJoin(false);
  };

  const handleHostMeetup = (action) => {
    setconnect(true)
    localStorage.setItem('MeetupLink', JSON.stringify(data));

    action === 1 ? history.push('/Live_Srceen') : history.push('/Group_Meeting')
    
  };


  const handleMeetup = (action) => {

    CreateMeeting(user.enc_uid).then(({ data }) => {
      debugger;
      if (data.message === "Meeting Successfully Created.") {
        action === 1  ? 
        setMeeting({title : "Group Meeting" , body : "You can now host your meeting." , action : "Meeting"}) : 
        setMeeting({title : "Share Screen" , body : "You can now share your screen." , action : "ShareScreen"}) ;

        setJoin(true)
        setdata(data.data);
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {


  }, [])


  return (
    <Container fluid className="main-content-container">

      {/* <Row noGutters className="page-header py-4"> */}
      {/* <PageTitle title="Combined Performance" className="text-sm-left mb-3" /> */}
      {/* </Row> */}
      <div className="main-dash-card">
        <Grid container spacing={2} className="m-0">

          <div className="col-lg-5 col-12">
            <Row>
              {/* <div> */}
              {/* <Grid item className="p-2" sm={6}> */}
              <div className="dash-card bubble card-1">
                <i className="material-icons dash-icon-clock">query_builder</i>
                <div>
                  <h1>Schedule Meeting</h1>
                  <span>plan your meetings</span>
                </div>
              </div>
              {/* </Grid> */}
              {/* <Grid item className="p-2" sm={6}> */}
              <div className="dash-card bubble card-2">
                <i className="material-icons dash-icon-plus">add_box</i>
                <div>
                  <h1>Join Meeting</h1>
                  <span>via invitation link</span>
                </div>
              </div>
              {/* </Grid> */}
              {/* </div> */}
              {/* <div> */}
              {/* <Grid item className="p-2" sm={6}> */}
              <div className="dash-card bubble card-3"  onClick={()=>handleMeetup(1)}>
                <i className="material-icons dash-icon-video">videocam</i>
                <div>
                  <h1>Host Meeting</h1>
                  <span>set up meeting now</span>
                </div>
              </div>
              {/* </Grid> */}
              {/* <Grid item className="p-2" sm={6}> */}
              <div className="dash-card bubble card-4" onClick={()=>handleMeetup(2)}>
                <i className="material-icons dash-icon-screen">screen_share</i>
                <div>
                  <h1>Screen Sharing</h1>
                  <span>share your screen only</span>
                </div>
              </div>
              {/* </Grid> */}
              {/* </div> */}
            </Row>
          </div>


          <div className="col-lg-7 col-12">
            <div class="right-block"></div>
          </div>

        </Grid>

      </div>

      {/* ----------------------------- Join Dialog ------------------------ */}

      <Dialog
        open={join}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className="main-dialog"
      >
        {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
        <DialogContent className="custom-dialog">

          <h1 className="custom-dialoge-heading"><span class="tapered">{meeting.title}</span></h1>

          <DialogContentText id="alert-dialog-slide-description" className="dialog-content">

            {meeting.body}

          </DialogContentText>

          <div class="form-group mt-4" style={{ textAlign: 'center' }}>
            {meeting.action === "ShareScreen" ?
            <button onClick={()=>handleHostMeetup(1)}>Share Screen Now</button> :
            <button onClick={()=>handleHostMeetup(2)}>Host Meeting Now</button>
            }
          </div>

        </DialogContent>
      </Dialog>
    </Container>

  )
}

export default DashboardOverview;

