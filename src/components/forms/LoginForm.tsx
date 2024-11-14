"use client";

import React, { useState } from "react";
import ResponsiveSection from "@/components/responsive/section/ResponsiveSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    //console.log({ formData });
  };
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ formData });
  };

  return (
    <>
      <ResponsiveSection>
        <div className="w-1/4 mx-auto">
          <form className="flex flex-col" onSubmit={handleLogin}>
            <Label htmlFor="username" className="mb-2">
              Username
            </Label>
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
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              className="mb-8"
              onChange={handleFormChange}
            />
            <div className="w-full items-center flex flex-col lg:flex-row gap-4">
              <Button size={"lg"} className="text-white">
                Login
              </Button>
              <a href="/register" className="alert text-white text-sm">
                Don&apos;t have an account ? Register Account today.
              </a>
            </div>
          </form>
        </div>
      </ResponsiveSection>
    </>
  );
};

export default LoginForm;
