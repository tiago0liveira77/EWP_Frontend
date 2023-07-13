import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { connect } from 'react-redux';
import { login } from '../../Redux/isLoggedInSlice';
import { updateUserInfo } from '../../Redux/UserInfoSlice';

class LoginModal extends React.Component {
  state = {
    email: '',
    emailInvalid: false,
    password: '',
    passwordInvalid: false,
    loginSuccess: false,
    loginFailed: false,
    showLoginModal: false,
    loading: false, // Add loading state
  };

  componentDidUpdate(prevProps) {
    // Check if the showLoginModal prop has changed (modal is being opened)
    if (this.props.showModal !== prevProps.showModal && this.props.showModal) {
      // Clear the ticket details and buyTicketSuccess state when the modal is opened
      this.setState({
        email: '',
        emailInvalid: false,
        password: '',
        passwordInvalid: false,
        loginSuccess: false,
        loginFailed: false,
        showLoginModal: false,
        loading: false
      });
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  validateInputData = () => {
    var login = true;
    this.setState({emailInvalid: false, passwordInvalid: false});

    //validar email input do utilizador
    var email = this.state.email;
    console.log(email);
    if(!email){
        this.setState({emailInvalid: true})
        login = false;
    }
    //Validar input password
    var password = this.state.password;
    console.log(password);
    if(!password){
        this.setState({passwordInvalid: true})
        login = false;
    }

    if(login){
      this.setState({ loading: true }); // Set loading state
      this.login(email, password);
    }

  }

  login = (email, password) => {
    const loginRequest = {
      email: email,
      password: password
    };
  
    fetch("https://ewp-api-app.azurewebsites.net/Auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginRequest)
    })
      .then((response) => {
        console.log(response.getSetCookie);
        return response.json()})
      .then((result) => {
        console.log(result);
        this.setState({ loginSuccess: result.loginSuccess });
        if (result.loginSuccess === false) {
          this.setState({ loginFailed: true, loading: false });
        } else {
          console.log("teste");
          this.props.handleCloseModal();
          this.props.login();
          this.props.updateUserInfo(result.user);
        }
      });
  };

  closeAllModals = () => {
    this.setState({ loginSuccess: false, loginFailed: false, showLoginModal: false });
  };

  render() {
    return (
      <>
        <Modal centered show={this.state.loginSuccess} onHide={() => { this.closeAllModals() }}>
          <Modal.Header closeButton>
            <Modal.Title>Login successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You are now logged in!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { this.closeAllModals() }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal centered backdrop="static" show={this.props.showModal} onHide={() => { this.props.handleCloseModal() }}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column justify-content-center">
              Email: <input name="email" value={this.state.email} onChange={this.handleInputChange} className="form-control mb-2" placeholder="Email" />
              {this.state.emailInvalid && (
                        <Alert variant="danger" className="mt-2">
                            Email invalid, you need to fill this field.
                        </Alert>
                    )}
              Password: <input name="password" type="password" value={this.state.password} onChange={this.handleInputChange} className="form-control" placeholder="Password" />
              {this.state.passwordInvalid && (
                        <Alert variant="danger" className="mt-2">
                            Password invalid, you need to fill this field.
                        </Alert>
                    )}
              {this.state.loginFailed && (
                <div className="text-danger mt-2">
                  Login failed. Please check your email and password and try again.
                </div>
              )}

              {this.state.loading && (
                <div className="mt-2 d-flex align-items-center justify-content-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={this.validateInputData}>
              Login
            </Button>
            <Button variant="secondary" onClick={() => { this.props.handleCloseModal() }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.loggedIn.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  login: () => dispatch(login()),
  updateUserInfo: (userInfo) => dispatch(updateUserInfo(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
