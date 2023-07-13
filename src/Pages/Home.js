import React from 'react';
import NavBar from '../Components/NavBar';
import MDBCarouselC from '../Components/MDBCarousel';
import EventsImage from '../img/landing_page_events.png';
import TicketsImage from '../img/landing_page_tickets.png';
import BandsImage from '../img/landing_page_bands.png';
import EWPImage from '../img/landing_page_ewp.png';
import dummy from '../img/dummy.png';
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

class Home extends React.Component {
  state = {}
  render() {
    return (
      <>
        <NavBar />
        <MDBCarouselC />
        <div class="container">
          <div class="row mt-5">
            <div class="col-md-4">
              <img src={EWPImage} class="img-fluid" alt="Image" />
            </div>
            <div class="col-md-8 bg-light text-center d-flex align-items-center">
              <div>
                <h2>Event Wallet Passport</h2>
                <p class="p-4">
                  <b><i>Event Wallet Passport</i></b> is the cutting-edge solution for hassle-free entry into festivals and events.
                  Gone are the days of worrying about lost or stolen tickets. With Event Wallet Passport, you can enjoy a seamless and secure experience from start to finish.
                  Imagine a world where your festival tickets are stored safely and conveniently in a digital wallet.
                  No more fumbling through pockets or bags searching for paper tickets.
                  Event Wallet Passport leverages the power of technology to bring you a new level of convenience and peace of mind.
                </p>
              </div>
            </div>
          </div>

          <div class="row mt-5">
            <div class="col-md-8 bg-light text-center d-flex align-items-center">
              <div>
                <h2>Events</h2>
                <p class="p-4">
                  Events are the heart and soul of social gatherings, bringing people together for shared experiences and memorable moments.
                  Whether it's a concert, conference, sporting event, or cultural festival, events offer a unique opportunity to immerse yourself in a world of excitement and
                  entertainment.
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <img src={EventsImage} class="img-fluid" alt="Image" />
            </div>
          </div>

          <div class="row mt-5">
            <div class="col-md-4">
              <img src={TicketsImage} class="img-fluid" alt="Image" />
            </div>
            <div class="col-md-8 bg-light text-center d-flex align-items-center">
              <div>
                <h2>Tickets</h2>
                <p class="p-4">
                  Tickets serve as the gateway to unlocking incredible experiences and gaining access to the events you're most excited about.
                  They are the keys that open the doors to a world of entertainment, adventure, and discovery.
                </p>
              </div>
            </div>
          </div>

          <div class="row mt-5">
            <div class="col-md-8 bg-light text-center d-flex align-items-center">
              <div>
                <h2>Bands</h2>
                <p class="p-4">
                  Wristbands have become a popular accessory and practical solution for various purposes, offering convenience, identification, and a touch of personal style.
                  These versatile bands are worn around the wrist and come in a variety of materials, colors, and designs.
                </p>
              </div>
            </div>
            <div class="col-md-4">
              <img src={BandsImage} class="img-fluid" alt="Image" />
            </div>
          </div>
        </div>

        <div className="bg-light text-center py-5 mt-5">
          <div className="container">
            <h2>About Us</h2>
            <p className="py-4">
              At <b>Event Access</b>, we are passionate about providing innovative solutions for event management and enhancing the overall experience for attendees. As a leading provider of wristbands and associated tickets, we strive to make every event seamless, secure, and memorable.
              With our wide range of wristbands, we offer a variety of options to suit the unique needs of different events. Our wristbands are not only stylish and customizable but also serve as powerful tools for access control, identification, and engagement. Whether it's a music festival, sporting event, conference, or any other gathering, our wristbands provide a hassle-free solution for event organizers and attendees alike.
              We understand the importance of security and efficiency in event management. That's why our wristbands incorporate advanced technologies, such as RFID (Radio Frequency Identification) and QR codes, to streamline entry processes, reduce queues, and enhance overall event security. Our wristbands can be easily scanned or verified, ensuring a smooth and seamless check-in experience for attendees.
            </p>
            <div className="social-icons d-flex justify-content-between mt-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon size="2x" icon={faFacebook} className="icon mr-2" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon size="2x" icon={faTwitter} className="icon mr-2" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon size="2x" icon={faInstagram} className="icon" />
              </a>
            </div>
          </div>
        </div>
        <footer className="bg-dark text-white py-4">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <h5>Useful links</h5>
                <div className="d-flex flex-column align-items-center">
                  <a href="/" className="text-white mb-2">Home</a>
                  <a href="/Events/events" className="text-white mb-2">Events</a>
                  <a href="/bands" className="text-white mb-2">Bands</a>
                </div>
              </div>
              <div className="col-md-6 text-center">
                <h5>Contacts:</h5>
                <ul className="list-unstyled text-center">
                  <li><span className="text-white">Address:</span> Canada de Pombal, 17-A</li>
                  <li><span className="text-white">Cellphone:</span> +351 969 230 925</li>
                  <li><span className="text-white">Email:</span> eventwalletpassport@ewp.com</li>
                </ul>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12 text-center">
                <p className="text-white">&copy; 2023 Event Wallet Passport. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default Home;
