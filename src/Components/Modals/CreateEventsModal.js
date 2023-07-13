import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';

import "react-datepicker/dist/react-datepicker.css";
import { eventWrapper } from '@testing-library/user-event/dist/utils';

class CreateEventsModal extends React.Component {
    
    state = { 
        //FACILITAR TESTES DE NOVOS EVENTOS
        event: {
            name: 'NewEventName' + Math.round(Math.random()*10000),
            description: 'NewEventDesc',
            startingDate: new Date(),
            endingDate: new Date(), 
            location: 'NewEventLocation',
            file: null, 
            eventType: 1,
        }, 
        createEventSuccess: false, 
        createEventError: false,
        nameInvalid: false, 
        descriptionInvalid: false, 
        startingDateInvalid: false, 
        endingDateInvalid: false,
        locationInvalid: false,
        fileInvalid: false,
        eventTypeInvalid: false,
        loading: false,
        
    }

    handleNameInput = (evt) => {
        var eventAux = this.state.event;
        eventAux.name = evt.target.value;
        this.setState({ event: eventAux });
    }

    handleDescriptionInput = (evt) => {
        var eventAux = this.state.event;
        eventAux.description = evt.target.value;
        this.setState({ event: eventAux });
    }

    handleLocationInput = (evt) => {
        var eventAux = this.state.event;
        eventAux.location = evt.target.value;
        this.setState({ event: eventAux });
    }

    handleFileInput = (evt) => {
        var eventAux = this.state.event;
        eventAux.file = evt.target.files[0];
        this.setState({ event: eventAux });
      };

    handleEventTypeInput = (evt) => {
        var eventAux = this.state.event;
        eventAux.eventType = evt.target.value;
        this.setState({ event: eventAux });
    }

    handleStartingDateInput = (date) => {
        var eventAux = this.state.event;
        eventAux.startingDate = date;
        this.setState({ event: eventAux });
    }

    handleEndingDateInput = (date) => {
        var eventAux = this.state.event;
        eventAux.endingDate = date;
        this.setState({ event: eventAux });
    }

    closeAllModals = () => {
        this.setState({createEventSuccess: false, createEventError: false});
    }

    createEvent = () => {
        this.setState({nameInvalid: false})
        this.setState({descriptionInvalid: false})
        this.setState({startingDateInvalid: false})
        this.setState({endingDateInvalid: false})
        this.setState({locationInvalid: false})
        this.setState({fileInvalid: false})
        this.setState({eventTypeInvalid: false})

        var createEvent = true;

        var eventAux = this.state.event;

        if(eventAux.name.length<1 || eventAux.name.length>50){
            this.setState({nameInvalid: true})
            createEvent = false;
        }

        if(eventAux.description.length<3 || eventAux.description.length>30){
            this.setState({descriptionInvalid: true});
            createEvent = false;
        }

        if(eventAux.location.length<3 || eventAux.location.length>30){
            this.setState({locationInvalid: true});
            createEvent = false;
        }

        if(eventAux.startingDate === null){
            this.setState({startingDateInvalid: true});
            createEvent = false;
        }

        if(eventAux.endingDate === null){
            this.setState({endingDateInvalid: true});
            createEvent = false;
        }

        if (eventAux.file === null){
            //this.setState({fileInvalid: true});
            //createEvent = false;
        }


        if(this.state.eventTypeInvalid===0){
            this.setState({accountTypeInvalid: true});
            createEvent = false;
        }
  
        if(createEvent === true){
            console.log("Nome: ", eventAux.name);
            console.log("Desc: ", eventAux.description);
            console.log("StartDate: ", eventAux.startingDate);
            console.log("EndDate: ", eventAux.endingDate);
            console.log("Local: ", eventAux.location);
            console.log("File: ", eventAux.file);
            console.log("EventType: ", eventAux.eventType);
            console.log("------------------------");
            console.log(eventAux);
            console.log("------------------------");
            console.log(this.state.event);
            
            const { userInfo } = this.props;

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
            formData.append('nome', eventAux.name);
            formData.append('descricao', eventAux.description);
            formData.append('startingDate', eventAux.startingDate.toLocaleString('en-US', options));
            formData.append('endingDate', eventAux.endingDate.toLocaleString('en-US', options));
            formData.append('location', eventAux.location);
            formData.append('imagem', eventAux.file);
            formData.append('eventype', eventAux.eventType);
            formData.append('email', userInfo.email);

            this.addNewEvent(formData);
        }

    }

    async addNewEvent(myForm){
        this.setState({ loading: true });
        const response = fetch('https://ewp-api-app.azurewebsites.net/api/data/addevent', {
            method: 'POST',
            body: myForm
        });

        response
            .then((res) => {
                if (res.ok) {
                    console.log('SUCESSO - REACT');
                    this.setState({ createEventSuccess: true, loading: false });
                    window.location.reload();
                } else {
                    console.error('ERROR FROM .NET:', res.text());
                    this.setState({ createEventError: true, loading: false});
                }
            })
            .catch((error) => {
                // Lógica para lidar com erros na solicitação
                console.error(error);
            });
       
    } 
            
        
    render() {
        return (
            <div>
            <Modal centered show={this.state.createEventSuccess} onHide={() => { this.closeAllModals() }}>
                <Modal.Header closeButton>
                    <Modal.Title>Event created successfully</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    A new event was added!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { this.closeAllModals() }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal centered show={this.state.createEventError} onHide={() => { this.closeAllModals() }}>
                <Modal.Header closeButton>
                    <Modal.Title>Error creating a new Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Error creating a new Event
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { this.closeAllModals() }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal centered backdrop="static" show={this.props.showCreateEventsModal} onHide={() => { this.props.handleCloseCreateEventsModal() }}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input value={this.state.event.name} onChange={this.handleNameInput} className="form-control" placeholder="Name" />
                    {this.state.nameInvalid && (
                        <Alert variant="danger" className="mt-2">
                            Name invalid, needs to be at least 1 character minimum and 50 characters maximum.
                        </Alert>
                    )}
                    <input value={this.state.event.description} onChange={this.handleDescriptionInput} className="form-control mt-3" placeholder="Description" />
                    {this.state.descriptionInvalid && (
                        <Alert variant="danger" className="mt-2">
                            Description invalid.
                        </Alert>
                    )}

                    <label>Starting Date</label>
                    <DatePicker selected={this.state.event.startingDate} onChange={(date) => this.handleStartingDateInput(date)} />
                    {this.state.startingDateInvalid && (
                        <Alert variant="danger" className="mt-2">
                            startingDate invalid.
                        </Alert>
                    )}

                    <label>Ending Date</label>
                    <DatePicker selected={this.state.event.endingDate} onChange={this.handleEndingDateInput} />
                    {this.state.endingDateInvalid && (
                        <Alert variant="danger" className="mt-2">
                            endingDate invalid.
                        </Alert>
                    )}
                    
                    <input value={this.state.event.location} onChange={this.handleLocationInput} className="form-control mt-3" placeholder="Location" />
                    {this.state.locationInvalid && (
                        <Alert variant="danger" className="mt-2">
                           Location invalid.
                        </Alert>
                    )}

                    <select className="form-select mt-3" aria-label="Default select example" onChange={this.handleEventTypeInput}>
                        <option name="editedType" value="1">Conference</option>
                        <option name="editedType" value="2">Festival</option>
                        <option name="editedType" value="3">Concert</option>
                        <option name="editedType" value="4">Fundraiser</option>
                        <option name="editedType" value="5">Party</option>
                        <option name="editedType" value="6">Other</option>
                    </select>
                    {this.state.accountTypeInvalid && (
                        <Alert variant="danger" className="mt-2">
                            You need to choose at least one account type.
                        </Alert>
                    )}

                    <input type="file" onChange={this.handleFileInput} accept="image/*" />
                    {this.state.fileInvalid && (
                        <Alert variant="danger" className="mt-2">
                           File invalid.
                        </Alert>
                    )}
                </Modal.Body>

                <Modal.Footer>
                {this.state.loading ? (
                    <div className="mt-2 d-flex align-items-center justify-content-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) :(
                    <div>
                        <Button variant="primary" onClick={this.createEvent}>
                        Create Event
                        </Button>
                        <Button variant="secondary" onClick={() => { this.props.handleCloseCreateEventsModal() }}>
                            Close
                        </Button>
                    </div>
                )}                    
                    
                </Modal.Footer>
            </Modal>
            </div>
        );
    }
}


//Usado para obter o state dos objetos
const mapStateToProps = (state) => ({
    userInfo: state.userInfo
  });
  
export default connect(mapStateToProps, null)(CreateEventsModal);
