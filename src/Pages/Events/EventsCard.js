import React from 'react';
import { connect } from 'react-redux';
import EventModal from '../../Components/Modals/EventModal';

class EventsCard extends React.Component {
    state = { 
        showEventModal: false,
        eventToEdit: {}
     }

     handleOpenEventModal = (id, name, description, startingDate, endingDate, location, type, file) => {
        const eventAux = {
            id: id,
            name: name,
            description: description,
            startingDate: startingDate,
            endingDate: endingDate,
            location: location,
            type: type.name,
            file: file
        }
        this.setState({ eventToEdit: eventAux});
        //console.log(eventAux.type);
        console.log("Teste: " + JSON.stringify(eventAux));
        this.setState({showEventModal: true})
        console.log("");
    }

    handleCloseEventModal = () => {
        this.setState({showEventModal: false})
    }


    
    //Calcula quantos dias falta para o evento
    calculateDifferenceInDays = (startingDate, endingDate) => {
        const oneDay = 24 * 60 * 60 * 1000;
        const start = new Date(startingDate.slice(0, 10));
        const end = new Date(endingDate.slice(0, 10));
        const diffInDays = Math.round(Math.abs((start - end) / oneDay));

        return diffInDays;
    }

    //Passar o tipo recebido da BD para texto
    getTypeText = (type) => {

        switch(type.id) {
            case 1:
                type = "Conference";
                break;
            case 2:
                type = "Festival";
                break;
            case 3:
                type = "Concert";
                break;
            case 4:
                type = "Fundraiser";
                break;
            case 5:
                type = "Party";
                break;
            case 6:
                type = "Other";
                break;
            default:
                type = "Other";
                break;
        }
        return type;
    }

    render() {

        const { loggedIn } = this.props;

        return (
            <>
            <div key={this.props.element.id} className="col-sm d-flex">
                <div className="card rounded-8 d-flex mt-2" style={{width: '26rem'}}>
                    <img className="card-img-top event-image" src={'https://ewp-api-app.azurewebsites.net/img/'+this.props.element.ficheiro} alt="Card image cap"/>
                    <div className="card-body">
                        <h3 className="card-title d-flex justify-content-center">{this.props.element.name}</h3>
                        <p className="h7 card-text d-flex justify-content-center mt-2">{this.props.element.description}</p>
                        <small className="text-muted d-flex justify-content-center">{this.calculateDifferenceInDays(this.props.element.startingDate, this.props.element.endingDate)} days until the event</small>
                    </div>
                    <ul className="list-group list-group-flush d-flex">
                        <li className="list-group-item">
                            <div className="d-flex justify-content-between">
                                <h5 className="mb-1">Starting date:</h5>
                                <p className="mb-1">{this.props.element.startingDate}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h5 className="mb-1 mt-1">Ending date:</h5>
                                <p className="mb-1 mt-1">{this.props.element.endingDate}</p>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className="d-flex justify-content-between"> 
                                <h6 className="mb-1 mt-1">Location:</h6>
                                <p className="mb-1 mt-1">{this.props.element.location}</p>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className="d-flex justify-content-between"> 
                                <h6 className="mb-1 mt-1">Event type:</h6>
                                <p className="mb-1 mt-1">{this.getTypeText(this.props.element.type)}</p>
                            </div>
                        </li>
                    </ul>
                    <div className="card-body d-flex justify-content-center button">
                    {!this.props.isMyEvent && (
                    <button type="button" className="btn btn-outline-info btn-sm" onClick={ !loggedIn ? this.props.handleOpenLoginModal : () => this.props.getTickets(this.props.element.id)}>Buy tickets</button>
                    )}
                    {this.props.isMyEvent && (
                        <>
                            <button type="button" className="btn btn-warning btn-sm" style={{ marginRight: '0.5rem' }} onClick={() => this.handleOpenEventModal(this.props.element.id, this.props.element.name, this.props.element.description, this.props.element.startingDate, this.props.element.endingDate, this.props.element.location, this.props.element.type, this.props.element.ficheiro)}>More Details</button> 

                        </>

                    )}
                    </div>
                </div>
            </div>
            <EventModal event={this.state.eventToEdit} showEventModal={this.state.showEventModal} handleCloseEventModal={this.handleCloseEventModal}></EventModal>
            </>
        );
    }
}


const mapStateToProps = (state) => ({
    loggedIn: state.loggedIn
  });

export default connect(mapStateToProps, null)(EventsCard);
