import { useState } from "react";
import "../css/ContactUs.css"


const ContactUs = () => {

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !name || !phone || !subject || !message) {
            setError('Please fill in all fields');
        }
    };


    return (

        <>
            {/* <p>Hello, {}</p> */}
            <div className="container">
                <div className="contact-box">
                    <div className="contact-left">
                        <h3>Connect With Us</h3>
                        {error && <p className="error">{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="contact-row">
                                <div className="contact-group">
                                    <label>Name</label>
                                    <input type="text" placeholder="Your Name" name="name" value={name} onChange={(e) => setName(e?.target?.value)} />
                                </div>
                                <div className="contact-group">
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        placeholder="Your Phone No."
                                        name="phone"
                                        value={phone} onChange={(e) => setPhone(e?.target?.value)}
                                    />
                                </div>
                            </div>
                            <div className="contact-row">
                                <div className="contact-group">
                                    <label>Email</label>
                                    <input type="email" placeholder="Your email" name="email" value={email} onChange={(e) => setEmail(e?.target?.value)} />
                                </div>
                                <div className="contact-group">
                                    <label className="input-lab">Subject</label>
                                    <input
                                        type="text"
                                        placeholder="Please write Subject here"
                                        className="input-message"
                                        name="message"
                                        value={subject} onChange={(e) => setSubject(e?.target?.value)}
                                    />
                                </div>
                            </div>
                            <label>Message</label>
                            <textarea rows="5" placeholder="your message..." value={message} onChange={(e) => setMessage(e?.target?.value)}></textarea>

                            <button type="submit">Send</button>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
}


export default ContactUs