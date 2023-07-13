import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import { updateUserInfo } from '../../Redux/UserInfoSlice';
import Spinner from 'react-bootstrap/Spinner';
import "react-datepicker/dist/react-datepicker.css";
import TicketModal from './TicketModal';

class EventModal extends React.Component {
  state = {
    showTicketModal: false,
    editing: false,
    editedName: '',
    editedDesc: '',
    editedStartingDate: new Date(),
    editedEndingDate: new Date(),
    editedLocation: '',
    editedType: '',
    editedFile: null,
    loading: false,
  };

  handleOpenTicketModal = () => {
    this.setState({showTicketModal: true})
}

handleCloseTicketModal = () => {
    this.setState({showTicketModal: false})
}

  handleStartingDateInput = (date) => {
    this.setState({ editedStartingDate: date });
  }

  handleEndingDateInput = (date) => {
    this.setState({ editedEndingDate: date });
}

handleFileInput = (evt) => {
  const file = evt.target.files[0];
  this.setState({ editedFile: file });
};


  handleEdit = () => {


    this.setState({
      editing: true,
      editedName: this.props.event.name,
      editedDesc: this.props.event.description,
      editedStartDate: this.props.event.startingDate,
      editedEndDate: this.props.event.endingDate,
      editedLocation: this.props.event.location,
      editedType: this.props.event.type,
      editedFile: this.props.event.editedFile,
    });
  };

  handleDelete = () => {
    fetch(`https://ewp-api-app.azurewebsites.net/api/data/deleteevent/${this.props.event.id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        console.log('Evento removido com sucesso');
        window.location.reload();
        // Atualize a lista de eventos ou faça outras ações necessárias
      } else {
        console.error('Erro ao remover evento:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Erro ao remover evento:', error);
    });
  }
  

  handleSave = () => {
    const { editing, editedName, editedDesc, editedStartingDate, editedEndingDate, editedLocation, editedType, editedFile, loading } = this.state;
    const { event } = this.props;

    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
    };

    const formData = new FormData();
    formData.append('eventId', this.props.event.id);
    formData.append('nome', editedName);
    formData.append('descricao', editedDesc);
    formData.append('startingDate', editedStartingDate.toLocaleString('en-US', options));
    formData.append('endingDate', editedEndingDate.toLocaleString('en-US', options));
    formData.append('location', editedLocation);
    formData.append('imagem', editedFile);
    formData.append('eventype', editedType);

    this.setState({ loading: true });
        const response = fetch('https://ewp-api-app.azurewebsites.net/api/data/changeevent', {
            method: 'POST',
            body: formData
        });

        response
            .then((res) => {
                if (res.ok) {
                    console.log('SUCESSO - REACT');
                    //this.setState({ createEventSuccess: true, loading: false });
                    window.location.reload();
                } else {
                    console.error('ERROR FROM .NET:', res.text());
                    //this.setState({ createEventError: true, loading: false});
                }
            })
            .catch((error) => {
                // Lógica para lidar com erros na solicitação
                console.error(error);
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
    const { editing, editedName, editedDesc, editedStartingDate, editedEndingDate, editedLocation, editedType, editedFile, loading } = this.state;

    return (
      <>
        <Modal centered show={this.props.showEventModal} onHide={this.props.handleCloseEventModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.event.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden"></span>
              </Spinner>
            ) : (
              <>
                <div>
                  <img className="card-img-top event-image" src={'https://ewp-api-app.azurewebsites.net/img/' + this.props.event.file} alt="Card image cap" />

                </div>
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
                    <p>{this.props.event.name}</p>
                  )}
                </div>
                <div>
                  <h5 className="mb-3">Description:</h5>
                  {editing ? (
                    <Form.Control
                      type="email"
                      name="editedDesc"
                      value={editedDesc}
                      onChange={this.handleInputChange}
                    />
                  ) : (
                    <p>{this.props.event.description}</p>
                  )}
                </div>
                <div>
                  <h5 className="mb-3">Starting Date:</h5>
                  {editing ? (
                    <DatePicker
                    selected={editedStartingDate}
                    onChange={(date) => this.handleStartingDateInput(date)}
                  />
                  ) : (
                    <p>{this.props.event.startingDate}</p>
                  )}
                </div>
                <div>
                  <h5 className="mb-3">Ending Date:</h5>
                  {editing ? (
                     <DatePicker
                     selected={editedEndingDate}
                     onChange={(date) => this.handleEndingDateInput(date)}
                     />
                  ) : (
                    <p>{this.props.event.endingDate}</p>
                  )}
                </div>
                <div>
                  <h5 className="mb-3">Location:</h5>
                  {editing ? (
                    <Form.Control
                      type="text"
                      name="editedLocation"
                      value={editedLocation}
                      onChange={this.handleInputChange}
                    />
                  ) : (
                    <p>{this.props.event.location}</p>
                  )}
                </div>
                <div>
                  <h5 className="mb-3">Event Type:</h5>
                  {editing ? (
                    <Form.Control
                      as="select"
                      name="editedType"
                      value={editedType}
                      onChange={this.handleInputChange}
                    >
                     <option name="editedType" value="1">Conference</option>
                        <option name="editedType" value="2">Festival</option>
                        <option name="editedType" value="3">Concert</option>
                        <option name="editedType" value="4">Fundraiser</option>
                        <option name="editedType" value="5">Party</option>
                        <option name="editedType" value="6">Other</option>
                    </Form.Control>
                  ) : (
                    <p>{this.props.event.type}</p>
                  )}
                </div>

                <div>
                  <h5 className="mb-3">File:</h5>
                  {editing ? (
                   <input type="file" onChange={this.handleFileInput} accept="image/*" />   
                  ) : (
                    <p>{this.props.event.file}</p>
                  )}
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
              <>
                 <Button variant="success" onClick={this.handleOpenTicketModal}>
                    Manage Tickets
                </Button>
                <Button variant="warning" onClick={this.handleEdit}>
                    Edit Event
                </Button>
                <Button variant="danger" onClick={this.handleDelete}>
                    Delete Event
                </Button>
              </>
            )}
            <Button variant="secondary" onClick={this.props.handleCloseEventModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <TicketModal eventId={this.props.event.id} showTicketModal={this.state.showTicketModal} handleCloseTicketModal={this.handleCloseTicketModal}></TicketModal>
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

export default connect(mapStateToProps, mapDispatchToProps)(EventModal);
