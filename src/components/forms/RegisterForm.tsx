"use client";

import React, { useState } from "react";
import ResponsiveSection from "@/components/responsive/section/ResponsiveSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    repeatPassword: "",
    consent: false,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    repeatPassword: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      username: "",
      password: "",
      repeatPassword: "",
    };

    if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "at least 2 characters long.";
    }
    if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "at least 2 characters long.";
    }
    if (formData.username.trim().length < 5) {
      newErrors.username = "at least 5 characters long.";
    }
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      newErrors.email = "Valid email address needed.";
    }
    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match.";
    }
    if (formData.password.length < 8) {
      newErrors.password = "at least 8 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      alert(JSON.stringify(formData, null, 2));
    }
  };

  return (
    <ResponsiveSection>
      <div className="w-1/4 mx-auto">
        <form className="flex flex-col" onSubmit={handleRegister}>
          <div className="flex flex-row justify-between items-center">
            <Label htmlFor="firstName" className="mb-2">
              First Name
            </Label>
            {errors.firstName && (
              <span className="text-red-500 text-sm">{errors.firstName}</span>
            )}
          </div>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="enter your first name"
            className="mb-4"
            onChange={handleFormChange}
          />

          <Label htmlFor="lastName" className="mb-2">
            Last Name
          </Label>
          {errors.lastName && (
            <span className="text-red-500 text-sm">{errors.lastName}</span>
          )}
          <Input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="enter your last name"
            className="mb-4"
            onChange={handleFormChange}
          />

          <Label htmlFor="email" className="mb-2">
            Email
          </Label>
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
          <Input
            id="email"
            name="email"
            type="text"
            placeholder="enter your email"
            className="mb-4"
            onChange={handleFormChange}
          />

          <Label htmlFor="phone" className="mb-2">
            Phone
          </Label>
          <Input
            id="phone"
            name="phone"
            type="text"
            placeholder="enter your phone number"
            className="mb-4"
            onChange={handleFormChange}
          />

          <Label htmlFor="username" className="mb-2">
            Username
          </Label>
          {errors.username && (
            <span className="text-red-500 text-sm">{errors.username}</span>
          )}
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="enter your username"
            className="mb-4"
            onChange={handleFormChange}
          />

          <Label htmlFor="password" className="mb-2">
            Password
          </Label>
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password}</span>
          )}
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="mb-4"
            onChange={handleFormChange}
          />

          <Input
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            placeholder="Enter your password again"
            className="mb-2"
            onChange={handleFormChange}
          />
          {errors.repeatPassword && (
            <span className="text-red-500 text-sm">
              {errors.repeatPassword}
            </span>
          )}

          <div className="w-full items-center flex flex-col lg:flex-row gap-4 mt-4">
            <Button type="submit" size={"lg"} className="text-white">
              Register
            </Button>
            <a href="/login" className="alert text-white text-sm">
              Have an account already? Login here.
            </a>
          </div>
        </form>
      </div>
    </ResponsiveSection>
  );
};

export default RegisterForm;
