"use client";

import React, { useState, FC, SyntheticEvent } from "react";
import Image from "next/image";

const Contact: FC = () => {
  const [status, setStatus] = useState("Send");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [buttonStatus, setButtonStatus] = useState(0); // 0 = disabled, 1 = enabled
  const [errorMessage, setErrorMessage] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);

  // Helper function for phone number validation & formatting
  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, ""); // Remove non-digits
    const match = cleaned.match(/^1?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+1 ${match[1]}-${match[2]}-${match[3]}`;
    }
    return null;
  };

  // Helper function for email validation
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Helper function to sanitize and validate the message
  const validateMessage = (message: string) => {
    const trimmedMessage = message.trim();
    if (trimmedMessage.length < 20) {
      setErrorMessage("Message should be at least 20 characters long.");
      return false;
    }
    if (trimmedMessage.length > 500) {
      setErrorMessage("Message should not exceed 500 characters.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  // Handle form submission
  const handleSendingMessage = async (e: SyntheticEvent) => {
    e.preventDefault();

    // Validate fields
    if (!firstName || !lastName || !email || !phone || !message) {
      setErrorMessage("All fields are required.");
      return;
    }

    // Validate phone number
    const formattedPhone = formatPhoneNumber(phone);
    if (!formattedPhone) {
      setErrorMessage("Please enter a valid US/Canada phone number.");
      return;
    }

    // Validate email
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Validate message
    if (!validateMessage(message)) {
      return; // Error message is already set in validateMessage function
    }

    // If all validations pass, send the message
    setStatus("Sending ...");
    setErrorMessage("");

    const formData = {
      firstName,
      lastName,
      email,
      phone: formattedPhone,
      message,
    };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Sent OK");
        setFirstName("");
        setLastName("");
        setPhone("");
        setEmail("");
        setMessage("");
        setButtonStatus(0); // Disable the button
        setShowCaptcha(false);
        setErrorMessage("");
        setStatus("Send");
      } else {
        setStatus("Sending Failed");
      }
    } catch (error) {
      setStatus("Sending Failed");
      console.error("Error sending message:", error);
    }
  };

  // Handle answer change and puzzle logic
  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userAnswer = parseInt(e.target.value);
    if (userAnswer === 3) {
      setButtonStatus(1); // Enable button when answer is correct
    } else {
      setButtonStatus(0); // Disable button if the answer is incorrect
    }
  };

  // Handle message change and show captcha when the message is long enough
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const userMessage = e.target.value;
    setMessage(userMessage);
    if (userMessage.trim().length >= 20) {
      setShowCaptcha(true);
    } else {
      setShowCaptcha(false);
      setButtonStatus(0); // Reset the button if captcha is hidden
    }
  };

  return (
    <section className="overflow-hidden bg-white dark:bg-dark">
      <div className="container mx-auto py-20">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-7/12 xl:w-6/12">
            <div className="mb-12 lg:mb-0 lg:mr-4">
              <h2 className="text-2xl font-black mb-2">Contact us</h2>
              <h3 className="mb-8">We love to hear from you</h3>

              <form onSubmit={handleSendingMessage}>
                <div className="-mx-4 flex flex-wrap">
                  <InputBox
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={firstName || ""}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <InputBox
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={lastName || ""}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <InputBox
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputBox
                    name="phone"
                    type="text"
                    placeholder="Phone"
                    value={phone || ""}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <TextArea
                    rows={6}
                    placeholder="Enter details, your message, any feedback, minimum 20 characters ..."
                    name="message"
                    value={message || ""}
                    onChange={handleMessageChange}
                  />
                  {errorMessage && (
                    <p className="text-red-600 font-bold mb-4 px-4">
                      {errorMessage}
                    </p>
                  )}
                  {showCaptcha && (
                    <div className="w-full px-4">
                      <div>
                        <p className="w-full flex flex-row gap-2 items-center mb-10 font-black text-xl text-red-600">
                          What is{" "}
                          <Image
                            src="/1.png"
                            alt="value1"
                            width={50}
                            height={50}
                          />{" "}
                          +{" "}
                          <Image
                            src="/2.png"
                            alt="value2"
                            width={50}
                            height={50}
                          />{" "}
                          =
                          <input
                            placeholder="type answer here"
                            type="text"
                            onChange={handleAnswerChange}
                          />
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="w-full px-4">
                    <button
                      type="submit"
                      className={`inline-flex rounded-lg items-center justify-center border border-transparent px-7 py-3 text-base font-medium text-white hover:bg-opacity-90 ${
                        buttonStatus === 1
                          ? "bg-primary"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                      disabled={buttonStatus !== 1}
                    >
                      {status}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <div className="map-container">
              <object
                style={{ border: "0", height: "450px", width: "100%" }}
                data="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46962.36205873985!2d-71.36814630807184!3d42.63703018146488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3a449e22c4d3f%3A0xdde5f57e7f52966b!2sLowell%2C%20MA!5e0!3m2!1sen!2sus!4v1728011505431!5m2!1sen!2sus"
              ></object>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

// Define InputBox component
interface InputBoxProps {
  type: string;
  placeholder: string;
  name: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox: FC<InputBoxProps> = ({
  type,
  placeholder,
  name,
  value,
  onChange,
}) => {
  return (
    <div className="w-full px-4 md:w-1/2">
      <div className="mb-7">
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          className="w-full border border-stroke bg-transparent px-5 py-[17px] text-body-color outline-none focus:border-primary dark:border-dark-3 dark:text-dark-6"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

// Define TextArea component
interface TextAreaProps {
  rows: number;
  placeholder: string;
  name: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: FC<TextAreaProps> = ({
  rows,
  placeholder,
  name,
  value,
  onChange,
}) => {
  return (
    <div className="w-full px-4">
      <div className="mb-7">
        <textarea
          rows={rows}
          placeholder={placeholder}
          name={name}
          value={value}
          className="w-full resize-none border border-stroke bg-transparent px-5 py-[17px] text-body-color outline-none focus:border-primary dark:border-dark-3 dark:text-dark-6"
          onChange={onChange}
        />
      </div>
    </div>
  );
};
