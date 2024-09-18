import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import contactus from "../assets/contact.png";
import { toast } from 'react-toastify';

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};


export const Contact = () => {
  const [contact, setContact] = useState(defaultContactFormData);

  const { user } = useAuth();

  // Update contact state when user data changes
  useEffect(() => {
    if (user) {
      setContact({
        username: user.username || "",
        email: user.email || "",
        message: "",
      });
    }
  }, [user]);

  // Handle form input changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch ("http://localhost:3000/api/form/contact" , {  
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contact)
    });

    if (response.ok) {
      setContact(defaultContactFormData); 
      const data = await response.json();
      toast.success("Message sent successfully");
        console.log(data);
  } else {
      const errorData = await response.json(); 
      toast.error(`Login failed: ${errorData.message}`);
  }
    } catch (error) {
      console.error(error);
    }
    
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Contact us</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src={contactus} alt="contact us" />
          </div>

          {/* contact form content actual  */}
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  value={contact.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={contact.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={contact.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>

              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </section>
        </div>

        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4090.9510317775384!2d72.63615587566359!3d23.239333508203774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2b933477ba9f%3A0xe440409e66bea08a!2sLDRP%20Institute%20of%20Technology%20and%20Research!5e1!3m2!1sen!2sin!4v1725943703744!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  );
};
