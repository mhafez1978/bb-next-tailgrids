"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState, useCallback } from "react";

// Regular expressions for validation
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;
const nameRegex = /^[a-zA-Z\s]{3,}$/; // At least 3 characters, no special characters

const Modal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1); // Tracks the current step in the form

  // Add state for submission status
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    newWebsite: false,
    redesignProject: false,
    existingWebsiteUrl: "",
    businessName: "",
    goods: false,
    services: false,
    both: false,
    idealCustomers: "",
    projectType: "",
    websitePurpose: "",
    projectGoals: "",
    pagesNeeded: "",
    featuresNeeded: [] as string[],
    projectTimeframe: "",
    projectBudget: "",
    needContent: false,
    needDomain: false,
    needHosting: false,
    needMarketing: false,
    needMaintenance: false,
    needOtherServices: false,
    otherServiceDetails: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    projectScope: "",
    redesignProject: "",
    newWebsite: "",
    existingWebsiteUrl: "",
    businessName: "",
    idealCustomers: "",
    websitePurpose: "",
    projectGoals: "",
    pagesNeeded: "",
    featuresNeeded: "",
    projectTimeframe: "",
    projectBudget: "",
    needContent: "",
    needDomain: "",
    needHosting: "",
    needMarketing: "",
    needOtherServices: "",
    otherServiceDetails: "",
    projectType: "",
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
  const handleNext = useCallback(() => {
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
      (!sanitizedData.phone || !phoneRegex.test(sanitizedData.phone))
    ) {
      setErrors({ ...errors, phone: "Please enter a valid US phone number." });
      return;
    } else if (
      step === 3 &&
      (!sanitizedData.email || !emailRegex.test(sanitizedData.email))
    ) {
      setErrors({ ...errors, email: "Please provide a valid email address." });
      return;
    } else if (
      step === 4 &&
      !formData.redesignProject && // No redesign selected
      !formData.newWebsite // No new website selected
    ) {
      setErrors({
        ...errors,
        projectScope: "Please select one of the provided options.",
      });
      return;
    } else if (
      step === 5 &&
      !formData.existingWebsiteUrl &&
      formData.redesignProject
    ) {
      setErrors({
        ...errors,
        existingWebsiteUrl:
          "Domain name needed since you have an existing website.",
      });
      return;
    } else if (step === 6 && !formData.goods && !formData.services) {
      setErrors({
        ...errors,
        projectScope:
          "Please select at least one option: Goods, Services, or Both.",
      });
      return;
    } else if (step === 7 && !formData.idealCustomers) {
      setErrors({
        ...errors,
        idealCustomers: "Please select an age range for your ideal customers.",
      });
      return;
    } else if (step === 8 && !formData.websitePurpose) {
      setErrors({
        ...errors,
        websitePurpose: "Please describe the purpose of your website.",
      });
      return;
    } else if (step === 9 && !formData.projectGoals) {
      setErrors({
        ...errors,
        projectGoals: "Please describe your project goals.",
      });
      return;
    } else if (step === 10 && !formData.pagesNeeded) {
      setErrors({
        ...errors,
        pagesNeeded: "Please specify how many pages you need for the website.",
      });
      return;
    } else if (step === 12 && !formData.projectTimeframe) {
      setErrors({
        ...errors,
        projectTimeframe: "Please specify the project timeframe.",
      });
      return;
    } else if (step === 13 && !formData.projectBudget) {
      setErrors({
        ...errors,
        projectBudget: "Please provide a budget for your project.",
      });
      return;
    } else if (step === 14 && !formData.needContent) {
      setErrors({
        ...errors,
        needContent:
          "Please select whether you have content or need content creation.",
      });
      return;
    } else if (step === 15 && !formData.needDomain) {
      setErrors({
        ...errors,
        needDomain: "Please specify if you own a domain or need one.",
      });
      return;
    } else if (step === 16 && !formData.needHosting) {
      setErrors({
        ...errors,
        needHosting: "Please specify if you have hosting or need hosting.",
      });
      return;
    } else if (step === 17 && !formData.needMarketing) {
      setErrors({
        ...errors,
        needMarketing: "Please specify if you need online marketing services.",
      });
      return;
    } else if (
      step === 18 &&
      formData.needOtherServices === true &&
      !formData.otherServiceDetails
    ) {
      setErrors({
        ...errors,
        otherServiceDetails:
          "Please provide details for other services if selected.",
      });
      return;
    }

    // Clear errors and move to the next step
    setFormData(sanitizedData);
    setErrors({
      name: "",
      email: "",
      phone: "",
      projectScope: "",
      redesignProject: "",
      newWebsite: "",
      existingWebsiteUrl: "",
      businessName: "",
      idealCustomers: "",
      websitePurpose: "",
      projectGoals: "",
      pagesNeeded: "",
      featuresNeeded: "",
      projectTimeframe: "",
      projectBudget: "",
      needContent: "",
      needDomain: "",
      needHosting: "",
      needMarketing: "",
      needOtherServices: "",
      otherServiceDetails: "",
      projectType: "", // Ensure this field is reset as well
    });
    setStep((prevStep) => prevStep + 1);
  }, [formData, errors, step]);

  // Handle Back button to go to the previous step
  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    let updatedFeatures = [...formData.featuresNeeded];

    if (checked) {
      updatedFeatures.push(value);
    } else {
      updatedFeatures = updatedFeatures.filter((feature) => feature !== value);
    }

    setFormData({ ...formData, featuresNeeded: updatedFeatures });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    > // Include HTMLTextAreaElement
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleBothChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData({
      ...formData,
      goods: checked,
      services: checked,
    });
  };

  const handleConsentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsConsentChecked(e.target.checked);
    setIsSubmitEnabled(e.target.checked); // Enable submit button only when consent is checked
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/new-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmissionStatus("success");

        // Keep modal open, show success message, and after 10 seconds close the modal
        setTimeout(() => {
          resetForm(); // Reset form data and errors
          setModalOpen(false); // Close the modal
        }, 10000); // 10-second delay
      } else {
        setSubmissionStatus(`error: ${result.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionStatus("error: Network or unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      newWebsite: false,
      redesignProject: false,
      existingWebsiteUrl: "",
      businessName: "",
      goods: false,
      services: false,
      both: false,
      idealCustomers: "",
      projectType: "",
      websitePurpose: "",
      projectGoals: "",
      pagesNeeded: "",
      featuresNeeded: [] as string[],
      projectTimeframe: "",
      projectBudget: "",
      needContent: false,
      needDomain: false,
      needHosting: false,
      needMarketing: false,
      needMaintenance: false,
      needOtherServices: false,
      otherServiceDetails: "",
    });

    // Reset error states
    setErrors({
      name: "",
      email: "",
      phone: "",
      projectScope: "",
      redesignProject: "",
      newWebsite: "",
      existingWebsiteUrl: "",
      businessName: "",
      idealCustomers: "",
      websitePurpose: "",
      projectGoals: "",
      pagesNeeded: "",
      featuresNeeded: "",
      projectTimeframe: "",
      projectBudget: "",
      needContent: "",
      needDomain: "",
      needHosting: "",
      needMarketing: "",
      needOtherServices: "",
      otherServiceDetails: "",
      projectType: "",
    });

    setStep(1);

    // Reset consent and submission status
    setIsConsentChecked(false);
    setIsSubmitEnabled(false);
    setSubmissionStatus(null); // Clear the submission status message
  };

  const handleModalToggle = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setModalOpen(!modalOpen);
  };

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext]); // Add handleNext as a dependency

  return (
    <>
      <motion.button
        initial={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={handleModalToggle}
        className="w-full flex items-center justify-center py-3 px-6 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg border-2 border-blue-700 text-white text-lg font-bold hover:shadow-2xl transition-transform duration-300 transform hover:scale-110 lg:w-1/2"
      >
        Get Started Today
      </motion.button>

      {modalOpen && (
        <>
          <div className="fixed left-0 top-0 w-screen h-screen bg-black/80 z-40"></div>
          <div className="fixed left-0 top-0 flex w-screen h-screen items-center justify-center z-50">
            <div className="relative w-[30vw] min-h-[30vh] rounded-2xl bg-white p-8 text-start shadow-xl overflow-auto">
              <div className="absolute top-4 right-4 w-full text-right">
                <button
                  onClick={handleModalToggle}
                  className="text-2xl font-black text-red-800"
                >
                  X
                </button>
              </div>

              {/* Steps to ask questions */}
              {step <= 18 && (
                <>
                  <h3 className="mb-6 text-xl font-semibold text-dark pr-10">
                    {step === 1 && "Hello there, What is your full name ?"}
                    {step === 2 && "What is your phone number ?"}
                    {step === 3 && "What is your email address ?"}
                    {step === 4 &&
                      "Are you looking to re-design an existing website or build a new one ?"}
                    {step === 5 &&
                      formData.redesignProject &&
                      "What is your existing website URL or domain name ?"}
                    {step === 5 &&
                      formData.newWebsite &&
                      "What is your legal business name or what name are you doing business under ?"}

                    {step === 6 && "Do you sell Goods or Services or Both ?"}
                    {step === 7 && "Who are your ideal customers ?"}
                    {step === 8 && "What type of project do you need ? "}
                    {step === 9 &&
                      "What are your project main objectives and goals ?"}
                    {step === 10 && "How many pages do you need ?"}
                    {step === 11 &&
                      "What features or functionality your project needs to have ?"}
                    {step === 12 && "How soon do you want to start ?"}
                    {step === 13 && "What's your project budget ?"}
                    {step === 14 &&
                      "Do you have content to use or want us to curate and create your website content ?"}
                    {step === 15 &&
                      "Do you own a domain name to be used for this project ?"}
                    {step === 16 && "Do you have hosting ?"}
                    {step === 17 &&
                      "Do you need online marketing for this project ?"}
                    {step === 18 &&
                      "Do you need any other services or do you have any concerns ?"}
                  </h3>

                  <form>
                    {step === 1 && (
                      <>
                        <input
                          type="text"
                          name="name"
                          placeholder="John Doe ..."
                          className={`w-full rounded-md border px-4 py-3 mb-2 ${getInputBorderColor(
                            "name"
                          )}`}
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                        <span className="text-red-600">{errors.name}</span>
                      </>
                    )}
                    {step === 2 && (
                      <>
                        <input
                          type="text"
                          name="phone"
                          placeholder="Enter your phone number (e.g., 123-456-7890)"
                          className={`w-full rounded-md border px-4 py-3 mb-2 ${getInputBorderColor(
                            "phone"
                          )}`}
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                        <span className="text-red-600">{errors.phone}</span>
                      </>
                    )}
                    {step === 3 && (
                      <>
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter your email address ..."
                          className={`w-full rounded-md border px-4 py-3 mb-2 ${getInputBorderColor(
                            "email"
                          )}`}
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <span className="text-red-600">{errors.email}</span>
                      </>
                    )}

                    {step === 4 && (
                      <>
                        <div className="flex flex-col gap-4 justify-center">
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="projectType"
                              value="redesign"
                              checked={formData.redesignProject === true}
                              onChange={() =>
                                setFormData({
                                  ...formData,
                                  redesignProject: true, // Set redesignProject to true
                                  newWebsite: false, // Make sure newWebsite is false
                                })
                              }
                              className="form-radio"
                            />
                            <label
                              htmlFor="redesign"
                              className="cursor-pointer"
                            >
                              Re-Design Existing Website
                            </label>
                          </div>
                          <div className="flex items-center gap-2 mb-4">
                            <input
                              type="radio"
                              name="projectType"
                              value="newWebsite"
                              checked={formData.newWebsite === true}
                              onChange={() =>
                                setFormData({
                                  ...formData,
                                  newWebsite: true, // Set newWebsite to true
                                  redesignProject: false, // Make sure redesignProject is false
                                })
                              }
                              className="form-radio"
                            />
                            <label
                              htmlFor="newWebsite"
                              className="cursor-pointer"
                            >
                              New Website Project
                            </label>
                          </div>
                        </div>
                        {errors.projectScope && (
                          <span className="text-red-600">
                            {errors.projectScope}
                          </span>
                        )}
                      </>
                    )}

                    {step === 5 && (
                      <>
                        {formData.redesignProject && (
                          <>
                            <input
                              type="text"
                              name="existingWebsiteUrl"
                              placeholder="Enter your existing website URL ..."
                              className={`w-full rounded-md border px-4 py-3 mb-2 ${getInputBorderColor(
                                "existingWebsiteUrl"
                              )}`}
                              value={formData.existingWebsiteUrl}
                              onChange={handleChange}
                              required
                            />
                            <span className="text-red-600">
                              {errors.existingWebsiteUrl}
                            </span>
                          </>
                        )}
                        {formData.newWebsite && (
                          <>
                            <input
                              type="text"
                              name="businessName"
                              placeholder="Enter your business legal name ..."
                              className={`w-full rounded-md border px-4 py-3 mb-2 ${getInputBorderColor(
                                "businessName"
                              )}`}
                              value={formData.businessName}
                              onChange={handleChange}
                              required
                            />
                            <span className="text-red-600">
                              {errors.businessName}
                            </span>
                          </>
                        )}
                      </>
                    )}

                    {step === 6 && (
                      <>
                        <div className="flex flex-col gap-4 justify-center">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              name="goods"
                              value="goods"
                              checked={formData.goods}
                              onChange={handleCheckboxChange}
                              className="form-checkbox"
                            />
                            <label htmlFor="goods" className="cursor-pointer">
                              Goods
                            </label>
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              name="services"
                              value="services"
                              checked={formData.services}
                              onChange={handleCheckboxChange}
                              className="form-checkbox"
                            />
                            <label
                              htmlFor="services"
                              className="cursor-pointer"
                            >
                              Services
                            </label>
                          </div>

                          <div className="flex items-center gap-2 mb-4">
                            <input
                              type="checkbox"
                              name="both"
                              value="both"
                              checked={formData.both}
                              onChange={handleBothChange}
                              className="form-checkbox"
                            />
                            <label htmlFor="both" className="cursor-pointer">
                              Both
                            </label>
                          </div>
                        </div>

                        {errors.projectType && (
                          <span className="text-red-600">
                            {errors.projectType}
                          </span>
                        )}
                      </>
                    )}
                    {step === 7 && (
                      <>
                        <select
                          name="idealCustomers"
                          value={formData.idealCustomers}
                          onChange={handleChange}
                          className="w-full rounded-md border px-4 py-3 mb-4"
                        >
                          <option value="">Select Age Range</option>
                          <option value="18-24">18-24</option>
                          <option value="25-34">25-34</option>
                          <option value="35-44">35-44</option>
                          <option value="45-54">45-54</option>
                          <option value="55-64">55-64</option>
                          <option value="65+">65+</option>
                          <option value="Not Sure">
                            Not sure, help me find out
                          </option>
                        </select>
                        {errors.idealCustomers && (
                          <span className="text-red-600">
                            {errors.idealCustomers}
                          </span>
                        )}
                      </>
                    )}
                    {step === 8 && (
                      <>
                        <label
                          htmlFor="websitePurpose"
                          className="mb-2 block font-semibold"
                        >
                          What is the purpose of your website?
                        </label>
                        <input
                          type="text"
                          name="websitePurpose"
                          value={formData.websitePurpose}
                          placeholder="e.g., Portfolio, Business Website, Online Store, etc."
                          className={`w-full rounded-md border px-4 py-3 mb-2 ${getInputBorderColor(
                            "websitePurpose"
                          )}`}
                          onChange={handleChange}
                          required
                        />
                        {errors.websitePurpose && (
                          <span className="text-red-600">
                            {errors.websitePurpose}
                          </span>
                        )}
                      </>
                    )}
                    {step === 9 && (
                      <>
                        <label
                          htmlFor="projectGoals"
                          className="mb-2 block font-semibold"
                        >
                          What are your main project objectives and goals?
                        </label>
                        <textarea
                          name="projectGoals"
                          value={formData.projectGoals}
                          placeholder="Briefly describe your project goals"
                          className="w-full rounded-md border px-4 py-3 mb-2"
                          onChange={handleChange}
                          required
                        />
                        {errors.projectGoals && (
                          <span className="text-red-600">
                            {errors.projectGoals}
                          </span>
                        )}
                      </>
                    )}
                    {step === 10 && (
                      <>
                        <label
                          htmlFor="pagesNeeded"
                          className="mb-2 block font-semibold"
                        >
                          How many pages do you need for the website?
                        </label>
                        <input
                          type="number"
                          name="pagesNeeded"
                          value={formData.pagesNeeded}
                          placeholder="e.g., 5, 10, etc."
                          className={`w-full rounded-md border px-4 py-3 mb-2 ${getInputBorderColor(
                            "pagesNeeded"
                          )}`}
                          onChange={handleChange}
                          required
                        />
                        {errors.pagesNeeded && (
                          <span className="text-red-600">
                            {errors.pagesNeeded}
                          </span>
                        )}
                      </>
                    )}
                    {step === 11 && (
                      <>
                        <label className="mb-2 block font-semibold">
                          What features or functionality does your website need?
                        </label>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              name="featuresNeeded"
                              value="Image Slider"
                              checked={formData.featuresNeeded.includes(
                                "Image Slider"
                              )}
                              onChange={handleFeaturesChange}
                              className="form-checkbox"
                            />
                            <label htmlFor="featuresNeeded" className="ml-2">
                              Image Slider
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              name="featuresNeeded"
                              value="Online Payment"
                              checked={formData.featuresNeeded.includes(
                                "Online Payment"
                              )}
                              onChange={handleFeaturesChange}
                              className="form-checkbox"
                            />
                            <label htmlFor="featuresNeeded" className="ml-2">
                              Online Payment
                            </label>
                          </div>
                          {/* Add more feature checkboxes as needed */}
                        </div>
                        {errors.featuresNeeded && (
                          <span className="text-red-600">
                            {errors.featuresNeeded}
                          </span>
                        )}
                      </>
                    )}
                    {step === 12 && (
                      <>
                        <label
                          htmlFor="projectTimeframe"
                          className="mb-2 block font-semibold"
                        >
                          How soon do you want to start the project?
                        </label>
                        <input
                          type="text"
                          name="projectTimeframe"
                          value={formData.projectTimeframe}
                          placeholder="e.g., Immediately, 1-2 weeks, etc."
                          className={`w-full rounded-md border px-4 py-3 mb-2 ${getInputBorderColor(
                            "projectTimeframe"
                          )}`}
                          onChange={handleChange}
                          required
                        />
                        {errors.projectTimeframe && (
                          <span className="text-red-600">
                            {errors.projectTimeframe}
                          </span>
                        )}
                      </>
                    )}
                    {step === 13 && (
                      <>
                        <label
                          htmlFor="projectBudget"
                          className="mb-2 block font-semibold"
                        >
                          What&apos;s your project budget?
                        </label>
                        <input
                          type="number"
                          name="projectBudget"
                          value={formData.projectBudget}
                          placeholder="e.g., 5000, 10000"
                          className={`w-full rounded-md border px-4 py-3 mb-2 ${getInputBorderColor(
                            "projectBudget"
                          )}`}
                          onChange={handleChange}
                          required
                        />
                        {errors.projectBudget && (
                          <span className="text-red-600">
                            {errors.projectBudget}
                          </span>
                        )}
                      </>
                    )}
                    {step === 14 && (
                      <>
                        <label
                          htmlFor="needContent"
                          className="mb-2 block font-semibold"
                        >
                          Do you have content to use or want us to curate and
                          create your website content?
                        </label>
                        <select
                          name="needContent"
                          value={formData.needContent ? "true" : "false"} // Convert boolean to string for <select> value
                          onChange={
                            (e) =>
                              setFormData({
                                ...formData,
                                needContent: e.target.value === "true",
                              }) // Convert the string back to boolean
                          }
                          className="w-full rounded-md border px-4 py-3 mb-2"
                          required
                        >
                          <option value="false">I have content</option>
                          <option value="true">I need content creation</option>
                        </select>
                        {errors.needContent && (
                          <span className="text-red-600">
                            {errors.needContent}
                          </span>
                        )}
                      </>
                    )}

                    {step === 15 && (
                      <>
                        <label
                          htmlFor="needDomain"
                          className="mb-2 block font-semibold"
                        >
                          Do you own a domain name to be used for this project?
                        </label>
                        <select
                          name="needDomain"
                          value={formData.needDomain ? "true" : "false"} // Convert boolean to string for <select> value
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              needDomain: e.target.value === "true", // Convert string back to boolean
                            })
                          }
                          className="w-full rounded-md border px-4 py-3 mb-2"
                          required
                        >
                          <option value="false">I own a domain</option>
                          <option value="true">I need a domain</option>
                        </select>
                        {errors.needDomain && (
                          <span className="text-red-600">
                            {errors.needDomain}
                          </span>
                        )}
                      </>
                    )}

                    {step === 16 && (
                      <>
                        <label
                          htmlFor="needHosting"
                          className="mb-2 block font-semibold"
                        >
                          Do you have hosting for this project?
                        </label>
                        <select
                          name="needHosting"
                          value={formData.needHosting ? "true" : "false"} // Convert boolean to string for <select> value
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              needHosting: e.target.value === "true", // Convert string back to boolean
                            })
                          }
                          className="w-full rounded-md border px-4 py-3 mb-2"
                          required
                        >
                          <option value="">Select an option</option>
                          <option value="false">I have hosting</option>
                          <option value="true">I need hosting</option>
                        </select>
                        {errors.needHosting && (
                          <span className="text-red-600">
                            {errors.needHosting}
                          </span>
                        )}
                      </>
                    )}

                    {step === 17 && (
                      <>
                        <label
                          htmlFor="needMarketing"
                          className="mb-2 block font-semibold"
                        >
                          Do you need online marketing for this project?
                        </label>
                        <select
                          name="needMarketing"
                          value={formData.needMarketing ? "Yes" : "No"} // Convert boolean to string
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              needMarketing: e.target.value === "Yes", // Convert string back to boolean
                            })
                          }
                          className="w-full rounded-md border px-4 py-3 mb-2"
                          required
                        >
                          <option value="">Select an option</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>

                        {errors.needMarketing && (
                          <span className="text-red-600">
                            {errors.needMarketing}
                          </span>
                        )}
                      </>
                    )}

                    {step === 18 && (
                      <>
                        <label
                          htmlFor="needOtherServices"
                          className="mb-2 block font-semibold"
                        >
                          Do you need any other services or have any specific
                          concerns?
                        </label>
                        <select
                          name="needOtherServices"
                          value={formData.needOtherServices ? "Yes" : "No"} // Convert boolean to string
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              needOtherServices: e.target.value === "Yes", // Convert string back to boolean
                            })
                          }
                          className="w-full rounded-md border px-4 py-3 mb-2"
                        >
                          <option value="">Select an option</option>
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>

                        {/* Show text area if "Yes" is selected */}
                        {formData.needOtherServices && (
                          <textarea
                            name="otherServiceDetails"
                            value={formData.otherServiceDetails}
                            placeholder="Please provide additional details (optional)..."
                            onChange={handleChange}
                            className="w-full rounded-md border px-4 py-3 mb-2"
                          />
                        )}

                        {errors.needOtherServices && (
                          <span className="text-red-600">
                            {errors.needOtherServices}
                          </span>
                        )}
                      </>
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
              {step === 19 && (
                <div>
                  <h3 className="mb-6 text-xl font-semibold text-dark">
                    Confirm Your Information
                  </h3>
                  <div className="mb-4 text-left">
                    {/* Full Name */}
                    <p>
                      <strong>Full Name:</strong> {formData.name}
                    </p>

                    {/* Phone Number */}
                    <p>
                      <strong>Phone Number:</strong> {formData.phone}
                    </p>

                    {/* Email Address */}
                    <p>
                      <strong>Email Address:</strong> {formData.email}
                    </p>

                    {/* Business Name */}
                    <p>
                      <strong>Business Name:</strong> {formData.businessName}
                    </p>

                    {/* Project Type (Redesign or New Website) */}
                    <p>
                      <strong>Project Type:</strong>{" "}
                      {formData.redesignProject
                        ? "Re-design Existing Website"
                        : ""}
                      {formData.newWebsite ? "New Website Project" : ""}
                    </p>

                    {/* Existing Website URL (for redesign projects) */}
                    {formData.redesignProject && (
                      <p>
                        <strong>Existing Website URL:</strong>{" "}
                        {formData.existingWebsiteUrl}
                      </p>
                    )}

                    {/* Products & Services */}
                    <p>
                      <strong>Products & Services:</strong>
                      {formData.goods ? "Goods " : ""}
                      {formData.services ? "Services" : ""}
                      {formData.both ? "Both" : ""}
                    </p>

                    {/* Ideal Customers */}
                    <p>
                      <strong>Ideal Customers (Age Range):</strong>{" "}
                      {formData.idealCustomers}
                    </p>

                    {/* Website Purpose */}
                    <p>
                      <strong>Website Purpose:</strong>{" "}
                      {formData.websitePurpose}
                    </p>

                    {/* Project Goals */}
                    <p>
                      <strong>Project Goals:</strong> {formData.projectGoals}
                    </p>

                    {/* Number of Pages */}
                    <p>
                      <strong>Number of Pages:</strong> {formData.pagesNeeded}
                    </p>

                    {/* Features Needed */}
                    <p>
                      <strong>Features Needed:</strong>
                      {formData.featuresNeeded.length > 0
                        ? formData.featuresNeeded.join(", ")
                        : "None"}
                    </p>

                    {/* Timeframe & Budget */}
                    <p>
                      <strong>Timeframe & Budget:</strong>{" "}
                      {formData.projectTimeframe} / ${formData.projectBudget}
                    </p>

                    {/* Content Creation */}
                    <p>
                      <strong>Need Content Creation:</strong>{" "}
                      {formData.needContent ? "Yes" : "No"}
                    </p>

                    {/* Domain Ownership */}
                    <p>
                      <strong>Own a Domain:</strong>{" "}
                      {formData.needDomain ? "Yes" : "No"}
                    </p>

                    {/* Hosting */}
                    <p>
                      <strong>Have Hosting:</strong>{" "}
                      {formData.needHosting ? "Yes" : "No"}
                    </p>

                    {/* Online Marketing */}
                    <p>
                      <strong>Need Online Marketing:</strong>{" "}
                      {formData.needMarketing ? "Yes" : "No"}
                    </p>

                    {/* Maintenance */}
                    <p>
                      <strong>Need Maintenance:</strong>{" "}
                      {formData.needMaintenance ? "Yes" : "No"}
                    </p>

                    {/* Other Services */}
                    <p>
                      <strong>Need Other Services:</strong>{" "}
                      {formData.needOtherServices ? "Yes" : "No"}
                    </p>
                    <p>
                      <strong>Need Other Services:</strong>{" "}
                      {formData.otherServiceDetails}
                    </p>
                  </div>

                  {/* Consent checkbox */}
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

                  {/* Navigation buttons */}
                  <div className="mt-8 flex justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      type="submit"
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

                  <div className="footer mt-8">
                    {/* Conditionally display the submission status */}
                    {isSubmitting && (
                      <p className="text-blue-600">Submitting your form...</p>
                    )}

                    {submissionStatus === "success" && (
                      <p className="text-green-600">
                        Form submitted successfully!
                      </p>
                    )}

                    {submissionStatus &&
                      submissionStatus.startsWith("error") && (
                        <p className="text-red-600">
                          Error: {submissionStatus.replace("error: ", "")}
                        </p>
                      )}
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
