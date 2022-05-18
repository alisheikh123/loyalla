import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, Row, Col } from "shards-react";
import UpdateProfleModal from './UpdateProfileModal'
import avatar from '../../styles/images/avatar-users.png'

const ProfleModal = ({ open, handleclose }) => {

  const [shouldOpenDialog, setShouldOpenDialog] = useState(false)
  var [user, setuser] = useState({

    name: '',
    adminId_Enc: '',
    contactNo: '',
    dateOfBirth: '',
    imageURL: '',
    email: '',
  })
  const handleDialogClose = () => {
    setShouldOpenDialog(false)
  }
 
  useEffect(() => {
    debugger;
    const users = JSON.parse(localStorage.getItem("usersMeetup"));

    setuser({ email:users.email, imageURL: users.avatar, name: users.name, contactNo: users.cellno, dateOfBirth: users.dob, adminId_Enc: users.userId })

  }, [])

  return (
    <Modal open={open} onClose={handleclose}>
      <ModalBody>
        <div className="modal-main">
          <div className="d-flex justify-content-between">
            <p className="Modal-title">My Profile</p>
            <div>

              <button className="btn btn-default modal-top-button" onClick={() => { setShouldOpenDialog(true) }}><i className="material-icons">edit</i></button>
              <button className="btn btn-danger modal-top-button-close" onClick={() => handleclose()}><i className="material-icons" >close</i></button>

            </div>
          </div>

          <div className="d-flex justify-content-center">
            {user.imageURL === null || user.imageURL === "" ?
              <img className="modal-avatar" src={avatar}></img> :
              <img className="modal-avatar" src={user.imageURL}></img>
            }

          </div>


          <div className="modal-head-content">

            <Row>
              <Col md="4" lg="4" sm="12">
                <span>Full Name</span>
                <p>{user.name}</p>
              </Col>
              <Col md="4" lg="4" sm="12">
                <span>Mobile</span>
                <p>{user.contactNo}</p>
              </Col>
                <Col md="4" lg="4" sm="12">
                <span>Date of Birth</span>
                <p>{user.dateOfBirth}</p>
              </Col>
            </Row>
            <Row>
              <Col md="6" lg="6" sm="12">
                <span>Email</span>
                <p>{user.email}</p>
              </Col>
            </Row>
          </div>
        </div>

      </ModalBody>
      {shouldOpenDialog ?
        <UpdateProfleModal open={shouldOpenDialog} closeUpdatemodal={handleDialogClose} /> : null
      }

    </Modal>
  )
}

export default ProfleModal
