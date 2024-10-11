"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

// Regular expressions for validation
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;
const nameRegex = /^[a-zA-Z\s]{3,}$/; // At least 3 characters, no special characters

const Modal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1); // Tracks the current step in the form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    hasWebsite: "no",
    domain: "",
    hosting: "",
    domainRegistrar: "",
    idealCustomers: "",
    targetLocations: "",
    targetAgeGroup: "",
    customerType: "homeowners",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [isConsentChecked, setIsConsentChecked] = useState(false); // Checkbox state
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false); // Submit button state

  // Sanitize user input
  const sanitizeInput = (value: string) => value.trim();

  // Input field border color based on validation
  const getInputBorderColor = (field: string) => {
    if (errors[field as keyof typeof errors]) return "border-red-500";
    return "border-gray-300 focus:border-emerald-500";
  };

  // Handle Next button to proceed to the next step
  const handleNext = () => {
    const sanitizedData = {
      ...formData,
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
    };

    // Validation for each step
    if (
      step === 1 &&
      (!sanitizedData.name || !nameRegex.test(sanitizedData.name))
    ) {
      setErrors({
        ...errors,
        name: "Name must be at least 3 characters without special characters.",
      });
      return;
    } else if (
      step === 2 &&
      (!sanitizedData.email || !emailRegex.test(sanitizedData.email))
    ) {
      setErrors({ ...errors, email: "Please provide a valid email address." });
      return;
    } else if (
      step === 3 &&
      (!sanitizedData.phone || !phoneRegex.test(sanitizedData.phone))
    ) {
      setErrors({ ...errors, phone: "Please enter a valid US phone number." });
      return;
    }

    // Clear errors and move to next step
    setFormData(sanitizedData);
    setErrors({ name: "", email: "", phone: "" });
    setStep((prevStep) => prevStep + 1);
  };

  // Handle Back button to go to the previous step
  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  // Handle form input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle consent checkbox change
  const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsConsentChecked(e.target.checked);
    setIsSubmitEnabled(e.target.checked); // Enable submit button only when consent is checked
  };

  // Handle Submit button
  const handleSubmit = () => {
    console.log("Final Form Data:", formData);
    alert("Form submitted successfully!");
    setModalOpen(false); // Close the modal after submission
  };

  // Toggle modal open/close status
  const handleModalToggle = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setModalOpen(!modalOpen);
  };

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [modalOpen]);

  return (
    <>
      {/* Button to open the modal */}
      <motion.button
        initial={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={handleModalToggle}
        className="w-full flex items-center justify-center py-3 px-6 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg border-2 border-blue-700 text-white text-lg font-bold hover:shadow-2xl transition-transform duration-300 transform hover:scale-110 lg:w-1/2"
      >
        Get Started Today
      </motion.button>

      {/* Modal */}
      {modalOpen && (
        <>
          {/* Overlay */}
          <div className="fixed left-0 top-0 w-screen h-screen bg-black/80 z-40"></div>

          {/* Modal Content */}
          <div className="fixed left-0 top-0 flex w-screen h-screen items-center justify-center z-50">
            <div className="relative w-[30vw] min-h-[30vh] rounded-2xl bg-white p-8 text-center shadow-xl overflow-auto">
              <div className="absolute top-4 right-4 w-full text-right">
                <button
                  onClick={handleModalToggle}
                  className="text-2xl font-black text-red-800"
                >
                  X
                </button>
              </div>

              {/* Steps to ask questions */}
              {step <= 8 && (
                <>
                  <h3 className="mb-6 text-xl font-semibold text-dark">
                    {step === 1 && "What's your name?"}
                    {step === 2 && "What's your email?"}
                    {step === 3 && "What's your phone number?"}
                    {step === 4 && "Do you currently have a website?"}
                    {step === 5 && "Who are your ideal customers?"}
                    {step === 6 &&
                      "What zip codes, cities, or towns do you target?"}
                    {step === 7 && "What age group do you want to target?"}
                    {step === 8 &&
                      "Are your customers mostly renters or homeowners?"}
                  </h3>

                  <form>
                    {step === 1 && (
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name (e.g., John Doe)"
                        className={`w-full rounded-md border px-4 py-3 ${getInputBorderColor(
                          "name"
                        )}`}
                        value={formData.name}
                        onChange={handleChange}
                      />
                    )}
                    {step === 2 && (
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email (e.g., johndoe@example.com)"
                        className={`w-full rounded-md border px-4 py-3 ${getInputBorderColor(
                          "email"
                        )}`}
                        value={formData.email}
                        onChange={handleChange}
                      />
                    )}
                    {step === 3 && (
                      <input
                        type="text"
                        name="phone"
                        placeholder="Enter your phone number (e.g., 123-456-7890)"
                        className={`w-full rounded-md border px-4 py-3 ${getInputBorderColor(
                          "phone"
                        )}`}
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    )}
                    {step === 4 && (
                      <select
                        name="hasWebsite"
                        value={formData.hasWebsite}
                        onChange={handleChange}
                        className="w-full rounded-md border px-4 py-3"
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    )}
                    {step === 5 && (
                      <input
                        type="text"
                        name="idealCustomers"
                        placeholder="Describe your ideal customers"
                        className="w-full rounded-md border px-4 py-3"
                        value={formData.idealCustomers}
                        onChange={handleChange}
                      />
                    )}
                    {step === 6 && (
                      <input
                        type="text"
                        name="targetLocations"
                        placeholder="Enter zip codes, cities, or towns"
                        className="w-full rounded-md border px-4 py-3"
                        value={formData.targetLocations}
                        onChange={handleChange}
                      />
                    )}
                    {step === 7 && (
                      <input
                        type="text"
                        name="targetAgeGroup"
                        placeholder="Enter the age group you want to target"
                        className="w-full rounded-md border px-4 py-3"
                        value={formData.targetAgeGroup}
                        onChange={handleChange}
                      />
                    )}
                    {step === 8 && (
                      <select
                        name="customerType"
                        value={formData.customerType}
                        onChange={handleChange}
                        className="w-full rounded-md border px-4 py-3"
                      >
                        <option value="homeowners">Homeowners</option>
                        <option value="renters">Renters</option>
                      </select>
                    )}
                  </form>

                  {/* Navigation buttons */}
                  <div className="mt-8 flex justify-between">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
                      >
                        Back
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {/* Final Step: Confirm and Submit */}
              {step === 9 && (
                <div>
                  <h3 className="mb-6 text-xl font-semibold text-dark">
                    Confirm Your Information
                  </h3>
                  <div className="mb-4 text-left">
                    <p>
                      <strong>Name:</strong> {formData.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {formData.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {formData.phone}
                    </p>
                    <p>
                      <strong>Has Website:</strong> {formData.hasWebsite}
                    </p>
                    {formData.hasWebsite === "yes" && (
                      <>
                        <p>
                          <strong>Domain Name:</strong> {formData.domain}
                        </p>
                        <p>
                          <strong>Hosting Provider:</strong> {formData.hosting}
                        </p>
                        <p>
                          <strong>Domain Registrar:</strong>{" "}
                          {formData.domainRegistrar}
                        </p>
                      </>
                    )}
                    <p>
                      <strong>Ideal Customers:</strong>{" "}
                      {formData.idealCustomers}
                    </p>
                    <p>
                      <strong>Target Locations:</strong>{" "}
                      {formData.targetLocations}
                    </p>
                    <p>
                      <strong>Target Age Group:</strong>{" "}
                      {formData.targetAgeGroup}
                    </p>
                    <p>
                      <strong>Customer Type:</strong> {formData.customerType}
                    </p>
                  </div>

                  {/* Checkbox and Submit */}
                  <div className="mt-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={isConsentChecked}
                        onChange={handleConsentChange}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-600">
                        Opt-in consent for legal purposes
                      </span>
                    </label>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!isSubmitEnabled}
                      className={`px-6 py-2 rounded-md text-white ${
                        isSubmitEnabled
                          ? "bg-green-600 hover:bg-green-500"
                          : "bg-gray-300"
                      }`}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;

// "use client";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import React, { useEffect, useState } from "react";

// // Regular expressions for validation
// const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// const phoneRegex = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;
// const nameRegex = /^[a-zA-Z\s]{3,}$/; // At least 3 characters, no special characters

// const Modal = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [step, setStep] = useState(1);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     hasWebsite: "no",
//     domain: "",
//     hosting: "",
//     domainRegistrar: "",
//     idealCustomers: "",
//     targetLocations: "",
//     targetAgeGroup: "",
//     customerType: "homeowners",
//   });

//   const [errors, setErrors] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });

//   const [isConsentChecked, setIsConsentChecked] = useState(false); // Checkbox state
//   const [isSubmitEnabled, setIsSubmitEnabled] = useState(false); // Submit button state

//   const sanitizeInput = (value: string) => value.trim();

//   // Input field border color based on validation
//   const getInputBorderColor = (field: string) => {
//     if (errors[field as keyof typeof errors]) return "border-red-500";
//     return "border-gray-300 focus:border-emerald-500";
//   };

//   const handleNext = () => {
//     const sanitizedData = {
//       ...formData,
//       name: sanitizeInput(formData.name),
//       email: sanitizeInput(formData.email),
//       phone: sanitizeInput(formData.phone),
//     };

//     // Validation logic
//     if (
//       step === 1 &&
//       (!sanitizedData.name || !nameRegex.test(sanitizedData.name))
//     ) {
//       setErrors({
//         ...errors,
//         name: "Name must be at least 3 characters without special characters.",
//       });
//       return;
//     } else if (
//       step === 2 &&
//       (!sanitizedData.email || !emailRegex.test(sanitizedData.email))
//     ) {
//       setErrors({ ...errors, email: "Please provide a valid email address." });
//       return;
//     } else if (
//       step === 3 &&
//       (!sanitizedData.phone || !phoneRegex.test(sanitizedData.phone))
//     ) {
//       setErrors({ ...errors, phone: "Please enter a valid US phone number." });
//       return;
//     }

//     setFormData(sanitizedData);
//     setErrors({ name: "", email: "", phone: "" });
//     setStep((prevStep) => prevStep + 1);
//   };

//   const handleBack = () => {
//     setStep((prevStep) => prevStep - 1);
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setIsConsentChecked(e.target.checked);
//     setIsSubmitEnabled(e.target.checked); // Enable submit button only when consent is checked
//   };

//   const handleSubmit = () => {
//     console.log("Final Form Data:", formData);
//     alert("Form submitted successfully!");
//     setModalOpen(false);
//   };

//   // Handle Enter key press to move to the next step
//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleNext();
//     }
//   };

//   const handleMobileMenuOpenStatus = (e: React.SyntheticEvent) => {
//     e.preventDefault();
//     setModalOpen(!modalOpen);
//   };

//   useEffect(() => {
//     if (modalOpen) {
//       document.body.classList.add("overflow-hidden");
//       //console.log("Overflow hidden applied");
//     } else {
//       document.body.classList.remove("overflow-hidden");
//       //console.log("Overflow hidden removed");
//     }
//     return () => {
//       document.body.classList.remove("overflow-hidden");
//     };
//   }, [modalOpen]);

//   return (
//     <>
//       <motion.button
//         initial={{ opacity: 1, scale: 1 }}
//         animate={{ opacity: 1, scale: 1 }}
//         whileHover={{ scale: 1.2 }}
//         onClick={handleMobileMenuOpenStatus}
//         className="font-black"
//       >
//         Get Started Today
//       </motion.button>

//       {modalOpen && (
//         <div
//           className={`fixed left-0 top-0 flex h-full min-h-screen w-full items-center justify-center bg-black/80 px-4 py-5 z-50`}
//         >
//           <div className="relative w-[30vw] min-h-[30vh] rounded-2xl bg-white p-8 text-center shadow-xl overflow-auto">
//             <div className=" absolute top-4 right-4 w-full text-right">
//               <Button
//                 variant="ghost"
//                 onClick={handleMobileMenuOpenStatus}
//                 className="text-2xl font-black text-red-800s"
//               >
//                 X
//               </Button>
//             </div>
//             {step <= 8 && (
//               <>
//                 <h3 className="mb-6 text-xl font-semibold text-dark">
//                   {step === 1 && "What's your name?"}
//                   {step === 2 && "What's your email?"}
//                   {step === 3 && "What's your phone number?"}
//                   {step === 4 && "Do you currently have a website?"}
//                   {step === 5 && "Who are your ideal customers?"}
//                   {step === 6 &&
//                     "What zip codes, cities, or towns do you target?"}
//                   {step === 7 && "What age group do you want to target?"}
//                   {step === 8 &&
//                     "Are your customers mostly renters or homeowners?"}
//                 </h3>

//                 <form onKeyDown={handleKeyPress}>
//                   {/* Steps */}
//                   {step === 1 && (
//                     <div className="mb-6">
//                       <input
//                         type="text"
//                         name="name"
//                         placeholder="Enter your name (e.g., John Doe)"
//                         className={`w-full rounded-md border px-4 py-3 ${getInputBorderColor(
//                           "name"
//                         )}`}
//                         value={formData.name}
//                         onChange={handleChange}
//                       />
//                       {errors.name && (
//                         <p className="text-red-600 text-sm">{errors.name}</p>
//                       )}
//                     </div>
//                   )}

//                   {step === 2 && (
//                     <div className="mb-6">
//                       <input
//                         type="email"
//                         name="email"
//                         placeholder="Enter your email (e.g., johndoe@example.com)"
//                         className={`w-full rounded-md border px-4 py-3 ${getInputBorderColor(
//                           "email"
//                         )}`}
//                         value={formData.email}
//                         onChange={handleChange}
//                       />
//                       {errors.email && (
//                         <p className="text-red-600 text-sm">{errors.email}</p>
//                       )}
//                     </div>
//                   )}

//                   {step === 3 && (
//                     <div className="mb-6">
//                       <input
//                         type="text"
//                         name="phone"
//                         placeholder="Enter your phone number (e.g., 123-456-7890)"
//                         className={`w-full rounded-md border px-4 py-3 ${getInputBorderColor(
//                           "phone"
//                         )}`}
//                         value={formData.phone}
//                         onChange={handleChange}
//                       />
//                       {errors.phone && (
//                         <p className="text-red-600 text-sm">{errors.phone}</p>
//                       )}
//                     </div>
//                   )}

//                   {step === 4 && (
//                     <div className="mb-6">
//                       <select
//                         name="hasWebsite"
//                         value={formData.hasWebsite}
//                         onChange={handleChange}
//                         className="w-full rounded-md border px-4 py-3"
//                       >
//                         <option value="no">No</option>
//                         <option value="yes">Yes</option>
//                       </select>

//                       {formData.hasWebsite === "yes" && (
//                         <>
//                           <div className="mt-4">
//                             <input
//                               type="text"
//                               name="domain"
//                               placeholder="What's your current website domain name? (e.g., example.com)"
//                               className="w-full rounded-md border px-4 py-3"
//                               value={formData.domain}
//                               onChange={handleChange}
//                             />
//                           </div>
//                           <div className="mt-4">
//                             <input
//                               type="text"
//                               name="hosting"
//                               placeholder="Do you know where it's hosted? (e.g., Bluehost)"
//                               className="w-full rounded-md border px-4 py-3"
//                               value={formData.hosting}
//                               onChange={handleChange}
//                             />
//                           </div>
//                           <div className="mt-4">
//                             <input
//                               type="text"
//                               name="domainRegistrar"
//                               placeholder="Do you know who registered the domain? (e.g., GoDaddy)"
//                               className="w-full rounded-md border px-4 py-3"
//                               value={formData.domainRegistrar}
//                               onChange={handleChange}
//                             />
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   )}

//                   {step === 5 && (
//                     <div className="mb-6">
//                       <input
//                         type="text"
//                         name="idealCustomers"
//                         placeholder="Describe your ideal customers"
//                         className="w-full rounded-md border px-4 py-3"
//                         value={formData.idealCustomers}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   )}

//                   {step === 6 && (
//                     <div className="mb-6">
//                       <input
//                         type="text"
//                         name="targetLocations"
//                         placeholder="Enter zip codes, cities, or towns"
//                         className="w-full rounded-md border px-4 py-3"
//                         value={formData.targetLocations}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   )}

//                   {step === 7 && (
//                     <div className="mb-6">
//                       <input
//                         type="text"
//                         name="targetAgeGroup"
//                         placeholder="Enter the age group you want to target"
//                         className="w-full rounded-md border px-4 py-3"
//                         value={formData.targetAgeGroup}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   )}

//                   {step === 8 && (
//                     <div className="mb-6">
//                       <select
//                         name="customerType"
//                         value={formData.customerType}
//                         onChange={handleChange}
//                         className="w-full rounded-md border px-4 py-3"
//                       >
//                         <option value="homeowners">Homeowners</option>
//                         <option value="renters">Renters</option>
//                       </select>
//                     </div>
//                   )}

//                   {/* Step Navigation Buttons */}
//                   <div className="mt-8 flex justify-between">
//                     {step > 1 && (
//                       <button
//                         type="button"
//                         onClick={handleBack}
//                         className="px-6 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
//                       >
//                         Back
//                       </button>
//                     )}
//                     <button
//                       type="button"
//                       onClick={handleNext}
//                       className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
//                     >
//                       {step === 8 ? "Next" : "Next"}
//                     </button>
//                   </div>
//                 </form>
//               </>
//             )}

//             {step === 9 && (
//               <div>
//                 <h3 className="mb-6 text-xl font-semibold text-dark">
//                   Confirm Your Information
//                 </h3>
//                 <div className="mb-4 text-left">
//                   <p>
//                     <strong>Name:</strong> {formData.name}
//                   </p>
//                   <p>
//                     <strong>Email:</strong> {formData.email}
//                   </p>
//                   <p>
//                     <strong>Phone:</strong> {formData.phone}
//                   </p>
//                   <p>
//                     <strong>Has Website:</strong> {formData.hasWebsite}
//                   </p>
//                   {formData.hasWebsite === "yes" && (
//                     <>
//                       <p>
//                         <strong>Domain Name:</strong> {formData.domain}
//                       </p>
//                       <p>
//                         <strong>Hosting Provider:</strong> {formData.hosting}
//                       </p>
//                       <p>
//                         <strong>Domain Registrar:</strong>{" "}
//                         {formData.domainRegistrar}
//                       </p>
//                     </>
//                   )}
//                   <p>
//                     <strong>Ideal Customers:</strong> {formData.idealCustomers}
//                   </p>
//                   <p>
//                     <strong>Target Locations:</strong>{" "}
//                     {formData.targetLocations}
//                   </p>
//                   <p>
//                     <strong>Target Age Group:</strong> {formData.targetAgeGroup}
//                   </p>
//                   <p>
//                     <strong>Customer Type:</strong> {formData.customerType}
//                   </p>
//                 </div>

//                 {/* Checkbox and Submit Button */}
//                 <div className="mt-4">
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       checked={isConsentChecked}
//                       onChange={handleConsentChange}
//                       className="h-4 w-4 text-blue-600"
//                     />
//                     <span className="text-sm text-gray-600">
//                       Opt-in consent for legal purposes
//                     </span>
//                   </label>
//                 </div>

//                 <div className="mt-8 flex justify-between">
//                   <button
//                     type="button"
//                     onClick={handleBack}
//                     className="px-6 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleSubmit}
//                     disabled={!isSubmitEnabled}
//                     className={`px-6 py-2 rounded-md text-white ${
//                       isSubmitEnabled
//                         ? "bg-green-600 hover:bg-green-500"
//                         : "bg-gray-300"
//                     }`}
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Modal;
