import React from 'react';
import NavBar from '../Components/NavBar';
import { Carousel } from 'react-bootstrap';
import Band1 from '../img/bands_page_band_1.png';
import Band2 from '../img/bands_page_band_2.png';
import LoginModal from '../Components/Modals/LoginModal';
import { connect } from 'react-redux';

class Bands extends React.Component {
  state = {showLoginModal: false};

  accessMyTickets = () => {
    const {loggedIn} = this.props;

    if(!loggedIn){
       this.setState({showLoginModal: true});
    }else{
      window.location.href = '/tickets';
    }
  }

  handleOpenLoginModal = () => {
    this.setState({ showLoginModal: true });
  };

  render() {

    

    return (
      <>
        {/* Navigation bar should be displayed in Bands */}
        <NavBar />
        <div className="container-fluid py-5 text-center">
          <div className="row">
            <div className="col-md-6 p-md-5">
              <Carousel fade className="rounded shadow">
                <Carousel.Item>
                  <img className="d-block w-100" src={Band1} alt="First slide" />
                  <Carousel.Caption>
                    <h3>Cards Theme Band</h3>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src={Band2} alt="Second slide" />
                  <Carousel.Caption>
                    <h3>Banana Theme Band</h3>
                  </Carousel.Caption>
                </Carousel.Item>
                </Carousel>
            </div>
            <div className="col-md-6 p-md-5">
              <div className="d-flex flex-column justify-content-center h-100">
                <div className="bg-light rounded p-4 text-center mb-5">
                  <h2 className="mb-4 fs-4 fw-bold">Bands</h2>
                  <p className="fs-5">
                    Wristbands are versatile accessories that have gained popularity in various industries and events. These bands, typically worn around the wrist, serve multiple purposes and offer a range of benefits. One common use of wristbands is as identification tools. Whether it's at festivals, conferences, or amusement parks, wristbands provide a convenient and secure way to identify attendees and grant them access to specific areas or services.
                    </p>
                </div>
                <div className="bg-light rounded p-4 text-center">
                  <h2 className="mb-4 fs-4 fw-bold">Tickets</h2>
                  <p className="fs-5">
                    Tickets are essential items that grant individuals access to a wide range of events, experiences, and services. Whether it's attending a concert, a sports game, a theater performance, or even traveling, tickets serve as the gateway to these activities, providing a tangible proof of admission.
                  </p>
                  <button type="button" className="btn btn-outline-info btn-sm mt-3" onClick={this.accessMyTickets}>Access my tickets</button>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <LoginModal showModal={this.state.showLoginModal} handleCloseModal={() => this.setState({ showLoginModal: false })} />
      </>
    );
  }
}

//Usado para obter o state dos objetos
const mapStateToProps = (state) => ({
  loggedIn: state.loggedIn
});

export default connect(mapStateToProps, null)(Bands);
