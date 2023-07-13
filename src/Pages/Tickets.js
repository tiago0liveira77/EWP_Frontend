import React from 'react';
import NavBar from '../Components/NavBar';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { Button } from 'react-bootstrap';

class Tickets extends React.Component {
    state = {
        ticketList: [],
        loading: true
    };

    componentDidMount() {
        const { userInfo } = this.props;

        fetch(`https://ewp-api-app.azurewebsites.net/api/data/getUserTickets?email=${encodeURIComponent(userInfo.email)}`)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                this.setState({ ticketList: result, loading: false });
            });
    }

    render() {
        const { ticketList, loading } = this.state;

        return (
            <>
                <NavBar />
                <div className="container mt-4">
                    <h2>My Tickets</h2>

                    {loading ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : (
                        <>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Event</th>
                                    {/* Add more table headers as needed */}
                                </tr>
                            </thead>
                            <tbody>
                                {ticketList.map(ticket => (
                                    <tr key={ticket.id}>
                                        <td>{ticket.nome}</td>
                                        <td>{ticket.description}</td>
                                        <td>{ticket.price} €</td>
                                        <td>{ticket.event.name}</td>
                                        {/* Add more table cells for each ticket property */}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <a href="/Events/events" className="text-decoration-none">
                            <Button variant="btn btn-info" onClick={this.handleOpenCreateEventsModal}> Buy more tickets </Button>
                        </a>
                        
                        </>
                    )}
                </div>
            </>
        );
    }
}

// Used to get the state of the objects
const mapStateToProps = (state) => ({
    userInfo: state.userInfo
});

export default connect(mapStateToProps, null)(Tickets);
