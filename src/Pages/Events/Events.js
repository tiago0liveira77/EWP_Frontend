import React from 'react';
import LoginModal from '../../Components/Modals/LoginModal';
import NavBar from "../../Components/NavBar";
import EventsCard from './EventsCard';
import BuyTicketsModal from '../../Components/Modals/BuyTicketsModal';
import CreateEventsModal from '../../Components/Modals/CreateEventsModal';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';

class Events extends React.Component {
    state = {
      listEvents: [],
      showLoginModal: false,
      showBuyTicketsModal: false,
      showCreateEventsModal: false,
      loading: true,
      ticketList: [],
      showWarningMessageOfNoTickets: false
    };
  
    componentDidMount() {
      fetch('https://ewp-api-app.azurewebsites.net/api/data/events', {
        method: "GET",
        credentials: "include"
      }).then(response => response.json())
        .then(listEvents => this.setState({ listEvents: listEvents, loading: false }));
    }
  
    getTickets = id => {
      fetch(`/api/data/getTickets?id=${encodeURIComponent(id)}`)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          this.setState({ ticketList: result});
          if(result.length>0){
            this.handleOpenTicketsModal();
          }else{
            this.setState({showWarningMessageOfNoTickets: true});
          }
          this.handleCreateEventsModal();
        })
    };
  
    handleOpenLoginModal = () => {
      this.setState({ showLoginModal: true });
    };
  
    handleOpenTicketsModal = () => {
      this.setState({ showBuyTicketsModal: true});
    };

    handleCreateEventsModal = () => {
      this.setState({ showCreateEventsModal: true});
    };
  
    render() {
      const { listEvents, loading, showLoginModal, showBuyTicketsModal, showCreateEventsModal, ticketList } = this.state;
      const { userInfo } = this.props;
      let eventsCards = [];
      if(listEvents != null && listEvents.length!=0){
        eventsCards = listEvents.map(event => (
          <EventsCard
            key={event.id}
            element={event}
            handleOpenLoginModal={this.handleOpenLoginModal}
            getTickets={() => this.getTickets(event.id)}
          />
        ));
      }
     
  
      return (

        
        <>
        
          <NavBar />
          <div className="container mt-3">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-primary" role="status"></div>
              </div>
            ) : (
              <div className="row justify-content-md-center">{eventsCards}</div>
            )}
            <LoginModal showModal={showLoginModal} handleCloseModal={() => this.setState({ showLoginModal: false })} />
            <BuyTicketsModal userEmail={userInfo.email} showModal={showBuyTicketsModal} handleCloseModal={() => this.setState({ showBuyTicketsModal: false })} ticketList={ticketList} />
            <CreateEventsModal showModal={showCreateEventsModal} handleCloseModal={() => this.setState({ showCreateEventsModal: false })}/>
            
            <Modal centered show={this.state.showWarningMessageOfNoTickets} onHide={() => { this.setState({showWarningMessageOfNoTickets: false}) }}>
                <Modal.Header closeButton>
                    <Modal.Title>No tickets available!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    There are no tickets available for this event! Please try later.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { this.setState({showWarningMessageOfNoTickets: false}) }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>            
          </div>
        </>
      );
    }
  }
  
//Usado para obter o state dos objetos
const mapStateToProps = (state) => ({
  userInfo: state.userInfo
});

export default connect(mapStateToProps, null)(Events);