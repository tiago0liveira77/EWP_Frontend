import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'
import Button from 'react-bootstrap/Button';

class BuyTicketsModal extends React.Component {
  state = {
    ticketDetails: [], // Holds the details of the selected ticket
    buyTicketSuccess: false // Indicates whether the ticket purchase was successful
  }

  componentDidUpdate(prevProps) {
    // Check if the showModal prop has changed (modal is being opened)
    if (this.props.showModal !== prevProps.showModal && this.props.showModal) {
      // Clear the ticket details and buyTicketSuccess state when the modal is opened
      this.setState({
        ticketDetails: [],
        buyTicketSuccess: false
      });
    }
  }

  // Callback function to show ticket details when a ticket is selected from the dropdown
  showTicketDetails = (selectedOption) => {
    // Clear the ticket details before fetching new details
    this.setState({ ticketDetails: null });

    // Find the selected ticket from the ticket list using its ID
    const selectedTicket = this.props.ticketList.find(ticket => ticket.id === selectedOption.value);

    // Update the ticket details in the state
    this.setState({ ticketDetails: selectedTicket });
  }

  // Function to buy a ticket
  buyTicket = () => {
    const ticketId = this.state.ticketDetails.id;
    const userEmail = this.props.userEmail;

    const buyTicket = {
      ticketId: ticketId,
      email: userEmail,
    };

    fetch('https://ewp-api-app.azurewebsites.net/api/data/buyTicket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buyTicket),
    })
      .then(response => {
        if (response.ok) {
          this.setState({ buyTicketSuccess: true });
          this.props.handleCloseModal();
        } else {
          this.setState({ buyTicketSuccess: false });
        }
      });
  }

  render() {
    return (
      <>
        {/* Modal for displaying ticket purchase success */}
        <Modal centered show={this.state.buyTicketSuccess} onHide={() => { this.setState({ buyTicketSuccess: false }) }}>
          <Modal.Header closeButton>
            <Modal.Title>Ticket bought successfully</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Check your profile to view your tickets!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick = {() => { window.location.href = '/tickets' }}>
             Access my tickets
            </Button>
            <Button variant="secondary" onClick={() => { this.setState({ buyTicketSuccess: false }) }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal for buying tickets */}
        <Modal centered backdrop="static" show={this.props.showModal} onHide={this.props.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Buy Tickets</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Dropdown to select a ticket */}
            <Select
              options={Object.values(this.props.ticketList).map((ticket) => ({
                value: ticket.id,
                label: ticket.nome
              }))}
              onChange={this.showTicketDetails}
            />

            {/* Render ticket details if a ticket is selected */}
            {this.state.ticketDetails.id &&
              <div className="my-4">
                <h4>{this.state.ticketDetails.nome}</h4>
                <p><strong>Description:</strong> {this.state.ticketDetails.description}</p>
                <p><strong>Price:</strong> {this.state.ticketDetails.price} €</p>
                <p><strong>Available:</strong> {this.state.ticketDetails.selling > 0 ? 'Yes' : 'No'}</p>
              </div>
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.buyTicket}>Buy</Button>
            <Button variant="secondary" onClick={this.props.handleCloseModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default BuyTicketsModal;
