import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { updateUserInfo } from '../../Redux/UserInfoSlice';
import Spinner from 'react-bootstrap/Spinner';

class ProfileModal extends React.Component {
  state = {
    editing: false,
    editedName: '',
    editedEmail: '',
    editedCellphone: '',
    loading: false,
  };

  handleEdit = () => {
    const { userInfo } = this.props;

    this.setState({
      editing: true,
      editedName: userInfo.name,
      editedEmail: userInfo.email,
      editedCellphone: userInfo.cellphone,
    });
  };

  handleSave = () => {
    const { editedName, editedEmail, editedCellphone } = this.state;
    const { userInfo } = this.props;

    const updatedProfile = {
      name: editedName,
      email: editedEmail,
      cellphone: editedCellphone,
    };

    console.log(updatedProfile);

    this.setState({ loading: true });

    fetch('https://ewp-api-app.azurewebsites.net/api/data/changeProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProfile),
    })
      .then(response => {
        if (response.ok) {
          response.json().then(updatedUser => {
            console.log(updatedUser);
            this.setState({ editing: false, loading: false });
            this.props.updateUserInfo(updatedUser);
          });
        } else {
          console.log("failed")
        }
      })
      .catch(error => {
        console.log("error")
      });
  };

  handleCancel = () => {
    this.setState({ editing: false });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { userInfo } = this.props;
    const { editing, editedName, editedEmail, editedCellphone, loading } = this.state;

    return (
      <>
        <Modal centered show={this.props.showProfileModal} onHide={this.props.handleCloseProfileModal}>
          <Modal.Header closeButton>
            <Modal.Title>Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden"></span>
               </Spinner>
            ) : (
              <>
                <div>
                  <h5 className="mb-3">Name:</h5>
                  {editing ? (
                    <Form.Control
                      type="text"
                      name="editedName"
                      value={editedName}
                      onChange={this.handleInputChange}
                    />
                  ) : (
                    <p>{userInfo.name}</p>
                  )}
                </div>
                <div>
                  <h5 className="mb-3">Email:</h5>
                  {editing ? (
                    <Form.Control
                      type="email"
                      name="editedEmail"
                      value={editedEmail}
                      onChange={this.handleInputChange}
                    />
                  ) : (
                    <p>{userInfo.email}</p>
                  )}
                </div>
                <div>
                  <h5 className="mb-3">Cellphone:</h5>
                  {editing ? (
                    <Form.Control
                      type="text"
                      name="editedCellphone"
                      value={editedCellphone}
                      onChange={this.handleInputChange}
                    />
                  ) : (
                    <p>{userInfo.cellphone}</p>
                  )}
                </div>
                <div>
                  <h5 className="mb-3">Creation Date:</h5>
                  <p>{userInfo.creationDate}</p>
                </div>
                <div>
                  <h5 className="mb-3">Status:</h5>
                  <p> {userInfo.status === 1 ? 'Active' : 'Inactive'} </p>
                </div>
                <div>
                  <h5 className="mb-3">Client type:</h5>
                  <p> {userInfo.accessLevel === 1 ? 'Client' : 'Enterprise'} </p>
                </div>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            {editing ? (
              <>
                <Button variant="primary" onClick={this.handleSave}>
                  Save
                </Button>
                <Button variant="secondary" onClick={this.handleCancel}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="secondary" onClick={this.handleEdit}>
                Edit
              </Button>
            )}
            <Button variant="secondary" onClick={this.props.handleCloseProfileModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserInfo: (userInfo) => dispatch(updateUserInfo(userInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);
