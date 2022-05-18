import React, { useEffect, useState } from 'react'
import { Col, Row, FormGroup } from "shards-react";
import { getBase64, getFileExtension } from '../../utils.js'
import { Button } from "shards-react";
import avatar from '../../styles/images/avatar-users.png'
import { UpdateUserProfile } from './ProfileService';
import { CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';


const useStyles = makeStyles(() => ({
    buttonProgress: {
        position: 'absolute',
        top: '87%',
        left: '72%',
        marginTop: -12,
        marginLeft: -12,
    },

}))

const errors = {
    message: "",
};
const UpdateProfileModal = ({ open, closeUpdatemodal }) => {

    var [user, setuser] = useState({

        name: '',
        adminId_Enc: '',
        contactNo: '',
        dateOfBirth: '',
        imageURL: '',
        email : ""
    })

    const [image, setImage] = useState({ pic: '' });
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const handleChange = ({ target: { name, value } }) => {
        let temp = { ...user }
        temp[name] = value
        setuser(temp)

    }
    const [message, setMessage] = useState(errors)

    const clearState = () => {
        setMessage({ ...errors });
    };

    const handleSubmit = () => {
        setLoading(true)
        UpdateUserProfile({
            ...user,
        }).then(({ data }) => {
            debugger;
            setLoading(false);
            console.log(data);

        })

    }


    const handleRemovePic = () => {
        setImage({
            ...image,
            pic: null
        });
        setuser({ ...user, imageURL: "" });
    }


    const handleFileSelect = (event) => {

        let file = event.target.files[0];
        var ext = getFileExtension(file);
        if (ext === "png" || ext === "jpeg" || ext === "jpg" || ext === "gif") {

            clearState();
            const reader = new FileReader();
            var url = reader.readAsDataURL(file);

            reader.onloadend = function (e) {
                setImage({
                    ...image,
                    pic: [reader.result]
                });
            }.bind(this);


            getBase64(file)
                .then(result => {
                    file["base64"] = result;
                    console.log("File Is", file.base64);
                    var ImageURL = file.base64.split(',')
                    setuser({ ...user, imageURL: ImageURL[1] })

                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {

            setMessage({ message: "Only PNG, JPEG, JPG format is allowed." })

        }
    }
    useEffect(() => {

        const users = JSON.parse(localStorage.getItem("users"));
        setuser({ email: users.email, imageURL: users.avatar, name: users.name, contactNo: users.cellno, dateOfBirth: users.dob, adminId_Enc: users.admin_Id })
        setImage({ pic: users.avatar });
        console.log(user.imageURL);

    }, [])


    return (
        <div  >
            <Dialog open={open} onClose={closeUpdatemodal} aria-labelledby="customized-dialog-title" maxWidth={'lg'}>

                <DialogContent maxWidth={'lg'}>
                    <ValidatorForm onSubmit={handleSubmit}>
                        <div >
                            <div className="d-flex justify-content-between">
                                <p className="Modal-title">Edit Profile</p>
                            </div>

                            <div className="image-area">
                                {image.pic === null || image.pic === "" ?
                                    <img className="modal-avatar" src={avatar}></img> :
                                    <img className="modal-avatar" src={image.pic}></img>
                                }
                                <span className="remove-image" style={{ display: "inline" }} onClick={handleRemovePic}><i className="material-icons">close</i></span>


                                <div className="btn btn-secondary upload-btn" >
                                    Upload Photo
                                    <input onChange={handleFileSelect} className="uploadbtn" type="file" name="file" />
                                </div>

                            </div>
                            <Row>
                                <Col sm="12" md="12" lg="12" >
                                    <p style={{ paddingTop: '12px', marginBottom: '-40px', color: 'red', fontSize: '15px' }}>{errors.message}</p>
                                </Col>
                            </Row>

                            <div className="modal-text-content" style={{ paddingTop: '40px' }}>

                                <div >
                                    <Row>
                                        <Col sm="12" md="6" lg="4" >
                                            <FormGroup>
                                                <label >Name</label>
                                                <TextValidator
                                                    onChange={handleChange}
                                                    autoComplete='off'
                                                    name="name"
                                                    required
                                                    placeholder="Full Name"
                                                    variant="outlined"
                                                    value={user.name}
                                                    className="mb-2" />
                                            </FormGroup>
                                        </Col>

                                        <Col sm="12" md="6" lg="4" >
                                            <FormGroup>
                                                <label>Mobile</label>
                                                <TextValidator onChange={handleChange}
                                                    autoComplete='off'
                                                    name="contactNo"
                                                    placeholder="Full Name"
                                                    value={user.contactNo}
                                                    variant="outlined"
                                                    required
                                                    className="mb-2" />
                                            </FormGroup>
                                        </Col>

                                        <Col sm="12" md="6" lg="4" >
                                            <FormGroup>
                                                <label>Email</label>
                                                <TextValidator
                                                    onChange={handleChange}
                                                    autoComplete='off'
                                                    name="email"
                                                    placeholder="Email"
                                                    value={user.email}
                                                    className="mb-2"
                                                    variant="outlined"
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col sm="12" md="6" lg="4" >
                                            <FormGroup>
                                                <label>Date of Birth</label>

                                                <TextValidator
                                                    id="date"
                                                    type="date"
                                                    variant="outlined"
                                                    defaultValue="2017-05-24"
                                                    className="mb-2"
                                                    // className={classes.textField}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </FormGroup>
                                        </Col>

                                    </Row>

                                </div>

                            </div>

                            <div className="modal-head-content">

                                <div className="d-flex justify-content-around">
                                    <Button pill theme="danger" onClick={() => closeUpdatemodal()} className="modal-down-btn">Cancel</Button>
                                    {/* <Button pill className="modal-down-btn" onClick={() => handleSubmit()}>Save</Button> */}
                                    <div className="relative">
                                        <Button
                                            pill
                                            className="modal-down-btn"
                                            disabled={loading}
                                            // onClick={() => handleSubmit()}
                                            type="submit"
                                        >
                                            Add
                                        </Button>
                                        {loading && (
                                            <CircularProgress
                                                size={24}
                                                className={
                                                    classes.buttonProgress
                                                }
                                            />
                                        )}
                                    </div>

                                </div>

                            </div>
                        </div>
                    </ValidatorForm>
                </DialogContent>

            </Dialog>
        </div>
    )
}

export default UpdateProfileModal