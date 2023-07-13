import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import Select from 'react-select'
import Spinner from 'react-bootstrap/Spinner';

class TicketModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //showTicketModal: false,
      tickets: [],
      requestDone: false,
      ticketDetails: [],
      editing: false,
      editedName: '',
      editedDesc: '',
      editedPrice: '',
      editedSelling: '',
      loading: false,
    };
  }


  handleCancel = () => {
    this.setState({ editing: false });
  };

  handleEdit = () => {
    this.setState({
      editing: true,
      editedName: this.state.ticketDetails.nome,
      editedDesc: this.state.ticketDetails.description,
      editedPrice: this.state.ticketDetails.price,
      editedSelling: this.state.ticketDetails.selling,
    });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  getTickets = id => {
    fetch(`/api/data/getTickets?id=${encodeURIComponent(id)}`)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.setState({ tickets: result});
        if(result.length>0){
          
        }else{
          
        }
      })
  };

  addTicket = () => {
    this.setState({ loading: true });
    const newTicketId = Math.floor(Math.random() * 100000) + 1
    const newTicket = {
      id: newTicketId,
      nome: "Default Ticket",
      description:"Default Ticket Description",
      price: 999,
      selling: 999,
      event: null,
      eventFK: this.props.eventId,
      listaPulseiras: [],
      listaUtilizadores: [],
    };
    this.setState((prevState) => ({
      tickets: [...prevState.tickets, newTicket],
    }));

    delete newTicket.id;

    fetch('https://ewp-api-app.azurewebsites.net/api/data/NewTicket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTicket),
    })
      .then(response => {
        if (response.ok) {
          this.setState({ loading: false});
        } else {
          this.setState({ loading: false });
        }
      });

  };

  handleDelete = () => {
    this.setState({ loading: true });
    fetch(`https://ewp-api-app.azurewebsites.net/api/data/deleteticket/${this.state.ticketDetails.id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        this.setState({ loading: false });
        console.log('Ticket removido com sucesso');
        window.location.reload();
        // Atualize a lista de eventos ou faça outras ações necessárias
      } else {
        this.setState({ loading: false });
        console.error('Erro ao remover Ticket:', response.statusText);
      }
    });
  }
  // Callback function to show ticket details when a ticket is selected from the dropdown
  showTicketDetails = (selectedOption) => {
    // Clear the ticket details before fetching new details
    this.setState({ ticketDetails: null });

    // Find the selected ticket from the ticket list using its ID
    const selectedTicket = this.state.tickets.find(ticket => ticket.id === selectedOption.value);
    // Update the ticket details in the state
    this.setState({ ticketDetails: selectedTicket });
  }

  handleSave = () => {
    this.setState({ loading: true });
    const editedEvent = this.state.ticketDetails;

    editedEvent.nome = this.state.editedName;
    editedEvent.description = this.state.editedDesc;
    editedEvent.price = this.state.editedPrice;
    editedEvent.selling = this.state.editedSelling;

    this.setState({ticketDetails: editedEvent});

    fetch('https://ewp-api-app.azurewebsites.net/api/data/EditTicket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedEvent),
    })
      .then(response => {
        if (response.ok) {
          this.setState({ loading: false, editing: false });
        } else {
          console.log("ERROR");
          this.setState({ loading: false });
        }
      });

    
    console.log(this.state.ticketDetails);
    //this.setState({ showTicketModal: false });
    
  };

  render() {
    let {tickets } = this.state;

    if(this.props.showTicketModal && !this.state.requestDone){
      this.getTickets(this.props.eventId)
      this.setState({ requestDone: true });
    }

    return (
        <Modal show={this.props.showTicketModal} onHide={(this.props.handleCloseTicketModal)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Ticket</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          {!this.state.editing ? (
          <Select
              options={Object.values(tickets).map((ticket) => ({
                value: ticket.id,
                label: ticket.nome
              }))}
              onChange={this.showTicketDetails}
            />
          ) : null}

            {/* Render ticket details if a ticket is selected */}
            {this.state.ticketDetails.id &&
              <div className="my-4">
                <div>
                  <h5 className="mb-3">Name:</h5>
                  {this.state.editing ? (
                    <Form.Control
                      type="text"
                      name="editedName"
                      value={this.state.editedName}
                      onChange={this.handleInputChange}
                    />
                  ) : (
                    <p>{this.state.ticketDetails.nome}</p>
                  )}
                </div>

                <div>
                  <h5 className="mb-3">Description:</h5>
                  {this.state.editing ? (
                    <Form.Control
                      type="text"
                      name="editedDesc"
                      value={this.state.editedDesc}
                      onChange={this.handleInputChange}
                    />
                  ) : (
                    <p>{this.state.ticketDetails.description}</p>
                  )}
                </div>

                <div>
                  <h5 className="mb-3">Price:</h5>
                  {this.state.editing ? (
                    <Form.Control
                      type="text"
                      name="editedPrice"
                      value={this.state.editedPrice}
                      onChange={this.handleInputChange}
                    />
                  ) : (
                    <p>{this.state.ticketDetails.price}</p>
                  )}
                </div>

                <div>
                  <h5 className="mb-3">Selling:</h5>
                  {this.state.editing ? (
                    <Form.Control
                      type="text"
                      name="editedSelling"
                      value={this.state.editedSelling}
                      onChange={this.handleInputChange}
                    />
                  ) : (
                    <p>{this.state.ticketDetails.selling}</p>
                  )}
                </div>
             
              </div>
            }

      
          </Modal.Body>
          <Modal.Footer>

          {this.state.loading ? (
                    <div className="mt-2 d-flex align-items-center justify-content-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) :(
                  <>
                    {this.state.editing ? (
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
                          <Button variant="success" onClick={this.addTicket}>
                            Add Ticket
                          </Button>
                          <Button variant="warning" onClick={this.handleEdit}>
                            Edit Ticket
                          </Button>
                          <Button variant="danger" onClick={this.handleDelete}>
                            Remove Ticket
                          </Button>
                        </>
                      )}
                  </>
                )}
          </Modal.Footer>
        </Modal>
    );
  }
}

export default TicketModal;
