import React from 'react';
import { BsPersonFill, BsCalendar, BsCardChecklist, BsTicket, BsBoxArrowRight  } from 'react-icons/bs';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import ProfileModal from "./Modals/ProfileModal";
import { connect } from 'react-redux';

class OffCanvas extends React.Component {
    state = {
        showProfileModal: false
    }

    handleOpenProfileModal = () => {
        console.log("Teste");
        this.setState({showProfileModal: true})
    }

    handleCloseProfileModal = () => {
        this.setState({showProfileModal: false})
    }

    render() {
        const { userInfo } = this.props;

        return (
            <>
            <Offcanvas placement="end" show={this.props.showCanvas} onHide={this.props.handleCloseCanvas}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Profile</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="d-flex flex-column">
                    <div className="flex-grow-1">  
                    <Button variant="outline-dark" className="w-100 mb-3 d-flex align-items-center" onClick={this.handleOpenProfileModal}>
                        <BsPersonFill className="me-2" size={20} />
                        <span>My Profile</span>
                    </Button>
                    {userInfo.accessLevel==2 &&
                    <Button variant="outline-dark" className="w-100 mb-3 d-flex align-items-center" href="/Events/MyEvents">
                        <BsCalendar className="me-2" size={20} />
                        <span>My Events</span>
                    </Button>}

                    {userInfo.accessLevel==1 &&
                    <Button variant="outline-dark" className="w-100 mb-3 d-flex align-items-center">
                        <BsCardChecklist className="me-2" size={20} />
                        <span>My Wristband</span>
                    </Button>}
                    {userInfo.accessLevel==1 &&
                    <a href="/tickets" className="text-decoration-none">
                    <Button variant="outline-dark" className="w-100 mb-3 d-flex align-items-center">
                        <BsTicket className="me-2" size={20} />
                        My Tickets
                    </Button>
                    </a>}
                    </div>
                    <Button variant="outline-danger" className="w-100 d-flex align-items-center" onClick={this.props.handleLogOut}>
                    <BsBoxArrowRight className="me-2" size={20} />
                    <span>Log out</span>
                    </Button>
                </Offcanvas.Body>
            </Offcanvas>
            <ProfileModal showProfileModal={this.state.showProfileModal} handleCloseProfileModal={this.handleCloseProfileModal}></ProfileModal>
            </>
        );
    }
}

//Usado para obter o state dos objetos
const mapStateToProps = (state) => ({
    userInfo: state.userInfo
  });
  
  export default connect(mapStateToProps, null)(OffCanvas);