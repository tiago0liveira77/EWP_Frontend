import React from 'react';
import LoginModal from './Modals/LoginModal';
import CreateAccountModal from './Modals/CreateAccountModal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { connect } from 'react-redux';
import { logout } from '../Redux/isLoggedInSlice';
import CreateEventsModal from './Modals/CreateEventsModal';
import OffCanvas from './OffCanvas';
import { BsPersonFill } from 'react-icons/bs';

class NavBar extends React.Component {
  state = {
    showCanvas: false,
  };


  handleOpenLoginModal = () => {
    this.setState({ showLoginModal: true });
  };

  handleOpenCreateAccountModal = () => {
    this.setState({ showCreateAccountModal: true });
  };

  handleLogOut = () => {
      fetch('https://ewp-api-app.azurewebsites.net/auth/logout', {
        method: 'POST',
        credentials: "include"
      })
        .then(response => {
          if (response.ok) {
             console.log('Logout successful');
             this.setState({ showCanvas: false });
             this.props.logout();
             // Perform any additional actions after successful logout
          } else {
            console.error('Logout failed');
            // Handle logout failure, display error message, etc.
          }
        })
        .catch(error => {
          console.error('Error occurred during logout', error);
          // Handle error, display error message, etc.
      });
    
    
  };

  handleCanvas = () => {
    this.setState({ showCanvas: true });
  }

  render() {
    const { loggedIn, userInfo } = this.props;

    return (
      <>
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand>Event Wallet Passport</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/Events/events">Events</Nav.Link>
                <Nav.Link href="/bands">Bands</Nav.Link>
              </Nav>
              {loggedIn && (
                  <div className="d-flex align-items-center">
                    <p className="h7 me-3 mb-0"> Welcome back <b>{userInfo.name}</b></p>
                    <Button variant="secondary" className="rounded-circle me-2" onClick={this.handleCanvas}> <BsPersonFill/> </Button>
                  </div>
              )}
              {!loggedIn && (
                <div className="d-flex">
                  <Button variant="success" className="me-2" onClick={this.handleOpenLoginModal}> Sign in </Button>
                  <Button variant="light" onClick={this.handleOpenCreateAccountModal}> Get Started </Button>

                </div>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <LoginModal showModal={this.state.showLoginModal} handleCloseModal={() => this.setState({ showLoginModal: false })} />
        <CreateAccountModal showCreateAccountModal={this.state.showCreateAccountModal} handleCloseCreateAccountModal={() => this.setState({ showCreateAccountModal: false })}/>
        <OffCanvas handleLogOut={this.handleLogOut} showCanvas={this.state.showCanvas} handleCloseCanvas={() => this.setState({ showCanvas: false })}  ></OffCanvas>


      </>
    );
  }
}


//Usado para obter o state dos objetos
const mapStateToProps = (state) => ({
  loggedIn: state.loggedIn,
  userInfo: state.userInfo
});

//Usado para alterar o state dos objetos
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
