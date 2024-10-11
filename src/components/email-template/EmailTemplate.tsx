import React from "react";

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const EmailTemplate = ({
  firstName,
  lastName,
  phone,
  email,
  message,
}: EmailTemplateProps) => {
  return (
    <>
      <div>
        <h1>Hello Vice President of Sales !</h1>
        <p>
          You have a new <b>Business Lead</b> below is the information collected
          from Blooming Brands LLC website
        </p>
        <ul>
          <li>{firstName}</li>
          <li>{lastName}</li>
          <li>{email}</li>
          <li>{phone}</li>
          <li>{message}</li>
        </ul>
      </div>
    </>
  );
};

export default EmailTemplate;
