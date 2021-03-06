import './homepage.css';
// import { AiOutlineArrowRight } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
// import { Link, useHistory } from 'react-router-dom';
import { verticalModalContent } from '../../redux/vertical-modal/verticalModalReducer';

const Homepage = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="taking">
        <div className="row">
          <div className="col-md-7 bom2">
            <h1 className="grow">
              As a publisher your assets get
              <br />
              <span>booked on by agencies and brands</span>
            </h1>
            <p className="texti">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam,
              iure officiis tenetur ipsam soluta ex, perferendis nemo unde
              distinctio consequatur in, ratione debitis cupiditate alias.
              Accusantium, repellat. Magni, deleniti omnis.
            </p>
            <div className="olab">
              <button
                className="butter-start"
                onClick={() => dispatch(verticalModalContent('signup'))}
              >
                Sign Up
              </button>
              <button
                type="button"
                data-toggle="modal"
                data-target="#myModal"
                className="butter-log"
                onClick={() => dispatch(verticalModalContent('login'))}
              >
                Login
              </button>
            </div>
          </div>
          <div className="col-md-5 bom">
            <iframe
              src="https://www.youtube-nocookie.com/embed/4Z4xkMVV7PE"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; gyroscope; picture-in-picture"
              className="iframe-test"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <div className="group-clientele">
        <h2 className="clientele">Clientele</h2>
        <div className="row tiers">
          <div className="col-md-4">
            <div className="circle-client">20</div>
            <h3>Publishers</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quasi
              tempore ea eveniet sint nesciunt ipsa necessitatibus saepe
              doloribus explicabo hic, at ex repellat, nisi
            </p>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="circle-client">10</div>
            <h3>Agency</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quasi
              tempore ea eveniet sint nesciunt ipsa necessitatibus saepe
            </p>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="circle-client">19</div>
            <h3>Brands</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quasi
              tempore ea eveniet sint nesciunt ipsa necessitatibus saepe
            </p>
          </div>
        </div>
      </div>
      <footer className="taking1">
        <img
          src="https://res.cloudinary.com/adesanza/image/upload/v1624361933/zabuni/Group_bnbco9.svg"
          alt="footerpic"
          className="footer-image"
        />
        <div className="row">
          <div className="col-md-2">
            <ul>
              <h3 id="pink">COMPANY</h3>
              <li>About</li>
              <li>Press</li>
              <li>Terms & Conditions</li>
              <li>Privacy</li>
            </ul>
          </div>
          <div className="col-md-2">
            <ul>
              <h3 id="pink">CHANNELS</h3>
              <li>Taxi Tv</li>
              <li>Mobile Screens</li>
              <li>Digital Boards</li>
              <li>LED Cubes</li>
            </ul>
          </div>
          <div className="col-md-2">
            <ul>
              <h3 id="pink">SITEMAP</h3>
              <li>Cancellation</li>
              <li>Site Map</li>
              <li>Services</li>
              <li>Contact Us</li>
            </ul>
          </div>

          <div className="col-md-6 align-self-end">
            <p className="reserved">
              Copyright @ 2021, Zeeooh NG. All right reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Homepage;
