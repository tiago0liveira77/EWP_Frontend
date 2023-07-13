import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

class CreateAccountModal extends React.Component {
    state = { name: '', 
    email: '', 
    password: '', 
    confirmPassword: '', 
    cellphone: '', 
    accountype: '',  
    createAccountSuccess: false, 
    createAccountFailed: false, 
    nameInvalid: false, 
    emailInvalid: false, 
    passwordLengthInvalid: false, 
    passwordMatchInvalid: false,
    phoneInvalid: false,
    accountTypeInvalid: false,
    loading: false // Add loading state
    }

    componentDidUpdate(prevProps) {
        // Check if the showModal prop has changed (modal is being opened)
        if (this.props.showCreateAccountModal !== prevProps.showCreateAccountModal && this.props.showCreateAccountModal) {
          // Clear the ticket details and buyTicketSuccess state when the modal is opened
          this.setState({
            name: '', 
            email: '', 
            password: '', 
            confirmPassword: '', 
            cellphone: '', 
            accountype: '',  
            createAccountSuccess: false, 
            createAccountFailed: false, 
            nameInvalid: false, 
            emailInvalid: false, 
            passwordLengthInvalid: false, 
            passwordMatchInvalid: false,
            phoneInvalid: false,
            accountTypeInvalid: false,
            loading: false
          });
        }
      }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    validateInputData = () => {
        var createAccount = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^9[1236]\d{7}$/;

        this.setState({nameInvalid: false, emailInvalid: false, passwordLengthInvalid: false, passwordMatchInvalid: false, phoneInvalid: false});

        //validar nome de utilizador
        var name = this.state.name;
        console.log(name);
        if(name.length<1 || name.length>50){
            this.setState({nameInvalid: true})
            createAccount = false;
        }
        //validar email do utilizador
        var email = this.state.email;
        console.log(email);
        if(!emailRegex.test(email)){
            this.setState({emailInvalid: true})
            createAccount = false;
        }
        //Validar password
        var password = this.state.password;
        console.log(password);
        if(password.length<8 || password.length>20){
            this.setState({passwordLengthInvalid: true});
            createAccount = false;
        }else{
            //Confirmar password
            var confirmPassword = this.state.confirmPassword;
            if(!(password===confirmPassword)){
                this.setState({passwordMatchInvalid: true});
                createAccount = false;
            }
        }
        //Telemovel
        var cellphone = this.state.cellphone;
        console.log(cellphone);
        if(!phoneRegex.test(cellphone)){
            this.setState({phoneInvalid: true});
            createAccount = false;
        }
        //Tipo de conta
        var accountype = this.state.accountype;
        console.log(accountype);
        if(accountype==0){
            this.setState({accountTypeInvalid: true});
            createAccount = false;
        }
        
        if (createAccount === true) {
            this.setState({ loading: true });
            this.createAccount(name, email, password, cellphone, accountype)
        }   
        
    }

    generateSevenDigitUUID = () => {
        const chars = '0123456789abcdef';
        let uuid = '';
    
        for (let i = 0; i < 7; i++) {
          const randomIndex = Math.floor(Math.random() * chars.length);
          uuid += chars[randomIndex];
        }
    
        return uuid;
      };

    createAccount = (name, email, password, cellphone, accountype) => {
       
        const createAccount = {
            userName: this.generateSevenDigitUUID(),
            name: name,
            email: email,
            password: password,
            cellphone: cellphone,
            accountype: accountype,
        };
        
        fetch('https://ewp-api-app.azurewebsites.net/Auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(createAccount),
        })
        .then(response => response.json())
          .then(result => {
            console.log(result.result);
            this.setState({ createAccountSuccess: result.result });
            if (!result.result) {
              this.setState({createAccountFailed: true});
            } else {
              this.props.handleCloseCreateAccountModal();
            }
          })
          .finally(() => {
            this.setState({ loading: false });
          });
    

        
      }
      

    closeAllModals = () => {
        this.setState({ showCreateAccountModal: false, createAccountSuccess: false });
    }

    render() {
        return (
            <div>
            <Modal centered show={this.state.createAccountSuccess} onHide={() => { this.closeAllModals() }}>
                <Modal.Header closeButton>
                    <Modal.Title>Account created successfully</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Login now to start using your account!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { this.closeAllModals() }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

           <Modal centered backdrop="static" show={this.props.showCreateAccountModal} onHide={() => { this.props.handleCloseCreateAccountModal() }}>
                <Modal.Header closeButton>
                    <Modal.Title>Create account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Name:
                    <input name="name" value={this.state.name} onChange={this.handleInputChange} className="form-control mb-2" placeholder="Name" />
                    {this.state.nameInvalid && (
                        <Alert variant="danger" className="mt-2">
                            Name invalid, needs to be at least 1 character minimum and 50 characters maximum.
                        </Alert>
                    )}
                    Email:
                    <input  name="email" value={this.state.email} onChange={this.handleInputChange} className="form-control mb-2" placeholder="Email" />
                    {this.state.emailInvalid && (
                        <Alert variant="danger" className="mt-2">
                            Email invalid, needs to be a valid email.
                        </Alert>
                    )}
                    Password:
                    <input name="password" value={this.state.password} onChange={this.handleInputChange} type="password" className="form-control mb-2" placeholder="Password" />
                    {this.state.passwordLengthInvalid && (
                        <Alert variant="danger" className="mt-2">
                            The password needs to be at least 8 characters and maximum 20.
                         </Alert>
                    )}
                    Confirm password:
                    <input name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleInputChange} type="password" className="form-control mb-2" placeholder="Confirm password" />
                    {this.state.passwordMatchInvalid && (
                        <Alert variant="danger" className="mt-2">
                            The passwords need to match.
                        </Alert>
                    )}
                    Cellphone:
                    <input name="cellphone" value={this.state.cellphone} onChange={this.handleInputChange} className="form-control mb-2" placeholder="Cellphone" />
                    {this.state.phoneInvalid && (
                        <Alert variant="danger" className="mt-2">
                            The phone needs to be a valid portuguese phone number, without the indicative included.
                        </Alert>
                    )}

                    Account type:
                    <select name="accountype" className="form-select mb-2" aria-label="Default select example" onChange={this.handleInputChange}>
                        <option disabled selected value="0">Account type</option>
                        <option name="accountype" value="1">Client</option>
                        <option name="accountype" value="2">Enterprise</option>
                    </select>
                    {this.state.accountTypeInvalid && (
                        <Alert variant="danger" className="mt-2">
                            You need to choose at least one account type.
                        </Alert>
                    )}

                    {this.state.loading && (
                    <div className="mt-2 d-flex align-items-center justify-content-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
        )}          
                    {this.state.createAccountFailed && (
                        <Alert variant="danger" className="mt-2">
                            There was an error creating your account. Please try again later.
                         </Alert>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={this.validateInputData}>
                        Create account
                    </Button>
                    <Button variant="secondary" onClick={() => { this.props.handleCloseCreateAccountModal() }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>
        );
    }
}

export default CreateAccountModal;