import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { blue } from "@material-ui/core/colors";
import { ErrorSharp } from "@material-ui/icons";
import {
  GetAllTrackingRequests,
  AcceptTrackingRequest,
  GetActiveRiders,
} from "../config/services";
import useAuth from "../Authentication/useAuth";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  loader: {
    display: "flex",
  },
});

const RequestModal = ({ open, handleClose }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [loader, setloader] = useState(false);
  const [found, setfound] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [listOfTrackingRequests, setListOfTrackingRequests] = useState([]);

  const GetAllRequest = () => {
    setloader(true);
    try {
      GetAllTrackingRequests().then(({ data }) => {
        debugger;
        setloader(false);
        if (data.message !== "Data Not Found!") {
          setListOfTrackingRequests(data.data);
          setfound(true);
        } else {
          setfound(false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  async function trackingRequestAccepted(trackingRequest) {
    const data = {
      id: trackingRequest.mappingID,
      riderId: trackingRequest.riderId,
      viewerId: 0,
      riderDetailId: trackingRequest.riderDetailID,
      isAccepted: true,
    };

    try {
      AcceptTrackingRequest(data).then((response) => {
        if (response.data.message === "View Request Updated") {
          GetAllRequest();
          return true;
        }
      });
    } catch (error) {
      console.log(ErrorSharp);
    }
  }

  useEffect(() => {
    GetAllRequest();
  }, []);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        List of Tracking Request
      </DialogTitle>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {found ? (
              listOfTrackingRequests.map((trackingRequest, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Avatar alt="Rider Image" src={trackingRequest.picture} />
                  </TableCell>
                  <TableCell>{trackingRequest.fullName}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => trackingRequestAccepted(trackingRequest)}
                    >
                      Accept
                    </Button>
                    <Button variant="contained" color="secondary">
                      Decline
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow style={{ textAlign: "center" }}>
                {loader ? (
                  <CircularProgress className={classes.loader} />
                ) : (
                  <TableCell colSpan={12} style={{ textAlign: "center" }}>
                    {!found ? "No Records Found." : null}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[5, 15, 25]}
        component="div"
        count={listOfTrackingRequests.totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Dialog>
  );
};

export default RequestModal;
