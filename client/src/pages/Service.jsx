import serviceImage from "../assets/services.png";
import { useAuth } from "../store/auth";

export const Service = () => {
    const { services } = useAuth(); 

    return (
        <section className="section-services">
            <div className="container">
                <h1 className="main-heading">Services</h1>
            </div>

            <div className="services grid grid-three-cols">
                {Array.isArray(services) && services.map((curElem, index) => {
                    const { _id, service, description, provider, price } = curElem;
                    return (
                        <div className="card" key={_id}>
                            <div className="card-img">
                                <img
                                    src={serviceImage}
                                    alt="serviceImage"
                                />
                            </div>

                            <div className="card-details">
                                <div className="grid grid-two-cols">
                                    <p>{provider}</p>
                                    <p>{price}</p>
                                </div>
                                <h2>{service}</h2>
                                <p>{description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
