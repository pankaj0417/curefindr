import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import contact from "../../assets/contact_img.jpg";

function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .sendForm(
        "service_42q7zwi",   // Replace with EmailJS Service ID
        "template_l7vkbil",  // Replace with EmailJS Template ID
        formRef.current,
        "g9AdZn0Sq_h1asBx4"    // Replace with EmailJS Public Key
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          e.target.reset();
        },
        () => {
          setStatus("Failed to send message. Try again.");
        }
      );
  };

  return (
    <div><Navbar />
    <div id="contact" className="min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left Image */}
        <div className="hidden md:block">
          <img
            src={contact}
            alt="Contact"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contact Form */}
        <div className="p-10 md:p-12 flex dark:bg-gray-900 flex-col justify-center">
          <h2 className="text-3xl font-bold dark:text-white text-gray-800 mb-6">Contact Us</h2>

          <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-5">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              className="w-full px-4 py-3 border rounded-xl dark:text-white border-gray-600   focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="email"
              name="user_email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border rounded-xl dark:text-white border-gray-600   focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              className="w-full px-4 py-3 border rounded-xl dark:text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 hover:scale-105 cursor-pointer text-white font-semibold py-3 rounded-xl transition-all"
            >
              Send Message
            </button>
          </form>

          {status && (
            <p className="mt-4 text-center text-gray-700 font-medium">{status}</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Contact;