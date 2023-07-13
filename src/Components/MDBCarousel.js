import React from 'react';
import {
    MDBCarousel,
    MDBCarouselItem,
  } from 'mdb-react-ui-kit';

class MDBCarouselC extends React.Component {
    state = {  }
    render() {
        return (
            <>
            <MDBCarousel showIndicators showControls fade>
                <MDBCarouselItem
                    className='w-100 d-block'
                    itemId={1}
                    src='https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg'
                    alt='...'
                >
                    <h5>Event Wallet Passport</h5>
                    <p>Event Wallet Passport is your next move for your events!</p>
                </MDBCarouselItem>

                <MDBCarouselItem
                    className='w-100 d-block'
                    itemId={2}
                    src='https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg'
                    alt='...'
                >
                    <h5>Events</h5>
                    <p>Register your events or view the ones we already got!</p>
                </MDBCarouselItem>

                <MDBCarouselItem
                    className='w-100 d-block'
                    itemId={3}
                    src='https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg'
                    alt='...'
                >
                    <h5>Tickets</h5>
                    <p>Buy your tickets and add them to your band!</p>
                </MDBCarouselItem>


                <MDBCarouselItem
                    className='w-100 d-block'
                    itemId={4}
                    src='https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg'
                    alt='...'
                >
                    <h5>Bands</h5>
                    <p>You still don't have a band? Don't worry, we got one for you!</p>
                </MDBCarouselItem>
            </MDBCarousel>
            </>
        );
    }
}

export default MDBCarouselC;