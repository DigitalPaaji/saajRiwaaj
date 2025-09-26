"use client";

import Banner from "../../components/user/InnerBanner";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://digital-paaji.onrender.com/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Your request has been submitted!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error(data.error || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit form. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Banner */}
      {/* <Banner title="Contact Us" image="/contact-banner.jpg" /> */}

      {/* Content */}
      <div className="px-4 sm:px-8 lg:px-24 xl:px-60 mx-auto my-16">
        <div className="max-w-3xl mx-auto">
          {/* Heading */}
          <h3 className="text-3xl font-semibold mb-8 text-center text-[#B67032]">
            Any Questions? <br />
            <span className="text-gray-700 font-normal">Let Us Know!</span>
          </h3>

          <ToastContainer />

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 bg-white rounded-2xl border border-[#d4af37]/40 shadow-sm hover:shadow-md transition-shadow duration-300 p-8"
          >
            {/* Name */}
            <div>
              <label className="block mb-2 font-medium">Full Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-[#d4af37]/40 px-4 py-3 bg-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium">Email *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#d4af37]/40 px-4 py-3 bg-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 font-medium">Phone *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full rounded-xl border border-[#d4af37]/40 px-4 py-3 bg-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block mb-2 font-medium">Message *</label>
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Write your message here..."
                className="w-full rounded-xl border border-[#d4af37]/40 px-4 py-3 bg-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40"
              ></textarea>
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#d4af37] text-white px-10 py-3 rounded-xl hover:bg-[#c29b2e] transition duration-300 shadow-md"
              >
                {isSubmitting ? "Submitting..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
