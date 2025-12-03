"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Globe, Github, Linkedin, PhoneCall, Twitter, Home, User, Send } from "lucide-react";
import Image from "next/image";
import Background from "@/public/Group 2372.png";
import { HeaderTag } from "./Cards";

// Smooth scroll function
const scrollToSection = (id) => {
  if (typeof window !== "undefined") {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
};

const ContactPage = ({ profile }) => {
  const {github, linkedin, twitter } = profile.personal;

  return (
    <div id="contact" className="min-h-screen w-full px-6 py-12 space-y-20">

      {/* SECTION: HEADER */}
      <section id="contact" className="max-w-4xl mx-auto">
        <HeaderTag
          title="Connect with me!"
          subtitle="Got a Project In Mind?"
          icon={<PhoneCall />}
        />

        {/* Contact Layout */}
        <div className="flex flex-col md:flex-row w-full justify-between mt-10">
          
          {/* LEFT IMAGE */}
               
          <div className="w-full md:w-1/2 flex justify-center">
                <div 
      className="inset-0 flex items-center justify-center animate-bounce"
      style={{
        animation: 'float 6s ease-in-out infinite'
      }}
    >
            <Image src={Background} width={255} height={348} alt="Contact Illustration"  /></div>
          </div>

          {/* RIGHT FORM */}
          <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <SimpleContactForm />
          </div>
        </div>
      </section>

      {/* SECTION: FOOTER */}
      <section className="justify-center" id="footer">
        <footer className="w-full py-10 rounded-xl">
          <div className="max-w-5xl mx-auto flex flex-col items-center relative">

            {/* Vertical Divider */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-px bg-white/10" />

            {/* Navigation */}
            <nav className="flex items-center gap-10 text-gray-300 mb-8 relative z-10">
              <button
                onClick={() => scrollToSection("home")}
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Home size={18} /> Home
              </button>

              <button
                onClick={() => scrollToSection("about")}
                className="flex items-center gap-2 hover:text-white transition"
              >
                <User size={18} /> About me
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Phone size={18} /> Contact
              </button>
            </nav>

            {/* Social Icons */}
            <div className="flex items-center gap-6 mb-10 relative z-10">
              {twitter && <SocialIcon icon={<Twitter size={16} />} />}
              {github && <SocialIcon icon={<Github size={16} />} />}
              {linkedin && <SocialIcon icon={<Linkedin size={16} />} />}
            </div>
          </div>
        </footer>
      </section>

    </div>
  );
};

export default ContactPage;


function SimpleContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const res = await fetch("/api/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
  }

  return (
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Row: Name + Email */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-white">Your name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-[#2D333B] text-white outline-none border border-transparent focus:border-teal-500"
              required
            />
          </div>

          <div>
            <label className="text-sm text-white">Your email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-[#2D333B] text-white outline-none border border-transparent focus:border-teal-500"
              required
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="text-sm text-white">Your Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={6}
            placeholder="Message"
            className="w-full mt-1 px-4 py-3 rounded-xl bg-[#2D333B] text-white outline-none border border-transparent focus:border-teal-500 resize-none"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="flex items-center gap-2 bg-teal-500 text-white px-6 py-3 rounded-full text-sm hover:bg-teal-600 transition"
        >
          Send Message <Send className="w-4 h-4" />
        </button>

        {status === "sending" && (
          <p className="text-yellow-400 text-sm">Sending message…</p>
        )}
        {status === "sent" && (
          <p className="text-green-400 text-sm">Message sent successfully!</p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-sm">Something went wrong.</p>
        )}
      </form>
  );
}


function SocialIcon({ icon }) {
  return (
    <div className="
      w-10 h-10 rounded-full 
      bg-white/5 
      text-gray-300 
      flex items-center justify-center
      hover:bg-white/10 hover:text-white 
      transition
    ">
      {icon}
    </div>
  );
}