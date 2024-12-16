"use client";

import { useState, useRef, useEffect } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">(
    "idle"
  );
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    services: "",
  });
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (
    messageContent: string,
    formPayload: typeof formData | null = null
  ) => {
    if (!messageContent.trim() && !formPayload) return;

    if (!formPayload) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: messageContent.trim() },
      ]);
      setInput("");
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageContent.trim(),
          context,
          formData: formPayload,
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Something went wrong." },
      ]);

      if (data.context) {
        setContext(data.context);
        setShowForm(data.context.nextAction === "collectDetails");
      }
    } catch (error) {
      console.log("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error. Try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async () => {
    // Ensure the `formData` object exists and has the required fields
    const { name, phone, email, services } = formData;

    // Validate form fields
    if (!name || !phone || !email || !services) {
      alert("Please fill out all fields.");
      return;
    }

    setFormStatus("sending"); // Set form to sending state

    try {
      // Send the form data to the chatbot API
      await sendMessage("formSubmitted", formData);

      // Add a success message to the chat history
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `<p>Thank you! We've received your details:<br/>Name: ${name}, Phone: ${phone}, Email: ${email}, Services: ${services}.</p><p>A team member will contact you shortly.</p>`,
        },
      ]);

      // Reset the form data and status
      setFormData({ name: "", phone: "", email: "", services: "" });
      setFormStatus("sent");

      // Reset the form status after a short delay
      setTimeout(() => {
        setFormStatus("idle");
        setShowForm(false);
      }, 500); // Add a delay for smoother UX
    } catch (error) {
      console.error("Error submitting form:", error); // Log the error for debugging
      alert("Failed to submit the form. Please try again."); // Notify the user
      setFormStatus("idle"); // Reset form status to idle on error
    }
  };

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content:
          "Glad you're here, I'm Mike Sullivan, Blooming Brands Ai assistant. How can I help you today?",
      },
    ]);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-[400px] p-6 bg-gray-900 text-white h-[600px] flex flex-col">
      <h1 className="text-lg font-bold mb-4">
        Blooming Brands - Assistant Chat
      </h1>
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto mb-4 p-4 border rounded bg-gray-800"
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block p-2 rounded ${
                msg.role === "user"
                  ? "bg-green-500 text-black"
                  : "bg-gray-700 text-white"
              }`}
              dangerouslySetInnerHTML={{ __html: msg.content }}
            />
          </div>
        ))}
        {isLoading && <div className="text-gray-400">I&apos;m typing...</div>}
      </div>
      {showForm && (
        <div className="p-4 bg-gray-700 rounded mb-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="w-full mb-2 p-2 rounded bg-gray-800"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className="w-full mb-2 p-2 rounded bg-gray-800"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full mb-2 p-2 rounded bg-gray-800"
          />
          <input
            type="text"
            name="services"
            value={formData.services}
            onChange={handleInputChange}
            placeholder="Services"
            className="w-full mb-2 p-2 rounded bg-gray-800"
          />
          <button
            onClick={handleFormSubmit}
            className={`w-full p-2 mt-2 rounded ${
              formStatus === "idle"
                ? "bg-green-500"
                : "bg-gray-500 cursor-not-allowed"
            }`}
            disabled={formStatus === "sending"}
          >
            {formStatus === "idle"
              ? "Submit"
              : formStatus === "sending"
                ? "Sending..."
                : "Sent!"}
          </button>
        </div>
      )}
      <div className="flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded bg-gray-800"
          placeholder="Type a message..."
          disabled={isLoading}
        />
        <button
          onClick={() => sendMessage(input)}
          className="ml-2 p-2 rounded bg-green-500"
          disabled={isLoading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
