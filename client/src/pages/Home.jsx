import signImage from "../assets/Hospital.png"; 
import Image from "../assets/hos.png"; 
import { Analytics } from "./Analytics";


export const Home = () => {
    return (
        <>
            <main>
                <section className="section-hero">
                    <div className="container grid grid-two-cols">
                    <div className="hero-content">
                        <p>Explore our comprehensive wellness modules designed to empower you on your journey to better health and holistic well-being.</p>
                        <h1 className="main-heading">Welcome to WELLNESS विवेक.</h1>
                        <p>WELLNESS विवेक, our mission is to revolutionize the way you access healthcare by connecting you to top hospitals and medical professionals with just a few clicks. We aim to make healthcare accessible, convenient, and personalized for everyone, empowering you to take control of your health.</p>
                        <div className="btn btn-group">
                        <a href="/contact">
                        <button className="btn">connect now</button>
                        </a>
                        <a href="/service">
                        <button className="btn secondary-btn">learn more</button>
                        </a>
                    </div>
                    </div>

                    <div className="hero-image">
                        <img                                    
                        src={signImage}
                        alt="loginImage"
                        width="550"
                        height="550"
                        />
                    </div>
                    </div>
                </section>
            </main>
            {/* 2nd section  */}
            <Analytics />

                
            {/* 3rd section  */}
            <section className="section-hero">
            <div className="container grid grid-two-cols">
                {/* hero images  */}
                <div className="hero-image">
                <img
                    src={Image}
                    alt="coding together"
                    width="550"
                    height="550"
                />
                </div>

                <div className="hero-content">
                <p>We are here to help you</p>
                <h1 className="main-heading">Join Our Community</h1>
                <p>
                WELLNESS विवेक is your trusted platform for finding hospitals and booking appointments online. Whether you're seeking specialized care or just a routine check-up, our website allows you to browse through a comprehensive directory of hospitals, compare facilities, and book appointments with ease. We bring healthcare closer to you, ensuring that quality care is always within reach.
                </p>
                <div className="btn btn-group">
                    <a href="/contact">
                    <button className="btn">connect now</button>
                    </a>
                    <a href="/services">
                    <button className="btn secondary-btn">learn more</button>
                    </a>
                </div>
                </div>
            </div>
            </section>
        </>
    );
};
