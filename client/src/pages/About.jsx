import { NavLink } from "react-router-dom";
import AboutimG from "../assets/about.png";
import { Analytics } from "./Analytics";
import { useAuth } from "../store/auth";

export const About = () => {

  const { user } = useAuth();
    return (
      <>
        <main>
          <section className="section-hero">
            <div className="container grid grid-two-cols">
              <div className="hero-content">
                <p>Welcome,  {user ? `${user.username} to our website.` : ' to our website.'}</p>
                <h1 className="main-heading">Why Choose Us? </h1>
                {/* <p>We care to cure your Health</p> */}
                <p>
                Comprehensive Hospital Listings: Explore a wide range of hospitals, from renowned multi-specialty centers to local clinics, all in one place.
                </p>
                <p>
                Easy Appointment Booking: No more waiting on hold or juggling schedules. Our intuitive booking system lets you secure your appointment at your convenience.
                </p>
                <p>
                Verified Reviews: Read genuine patient reviews to help you make informed decisions about where to receive care.
                </p>
                <p>
                Specialized Search Filters: Find the right hospital based on location, specialty, services, and more with our advanced search filters.
                </p>
                <p>
                Join thousands of satisfied users who trust WELLNESS विवेक for their healthcare needs. Whether you're looking for a specialist, need urgent care, or want to schedule a routine check-up, we're here to help you find the right care, at the right time.
                </p>
                <div className="btn btn-group">
                  <NavLink to="/contact">
                    <button className="btn"> Connect Now</button>
                  </NavLink>
                  <button className="btn secondary-btn">learn more</button>
                </div>
              </div>
              <div className="hero-image">
                <img
                  src={ AboutimG }
                  alt="coding buddies"
                  width="550"
                  height="550"
                />
              </div>
            </div>
          </section>
        </main>
        <Analytics />
      </>
    );
  };



 