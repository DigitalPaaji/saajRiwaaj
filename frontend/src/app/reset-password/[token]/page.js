'use client';
import React, { useState, useEffect } from "react";

export default function AuthComponent() {
  const [authTab, setAuthTab] = useState("login");
  const [linkSent, setLinkSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [form, setForm] = useState({ email: "" });

  useEffect(() => {
    // Restore timer from localStorage
    const expiry = localStorage.getItem("forgotPasswordExpiry");
    if (expiry) {
      const diff = Math.floor((Number(expiry) - Date.now()) / 1000);
      if (diff > 0) {
        setTimer(diff);
        setLinkSent(true);
      }
    }
  }, []);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            localStorage.removeItem("forgotPasswordExpiry");
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleForgotPassword = async () => {
    if (timer > 0) return; // Prevent click if timer is active

    const { email } = form;
    if (!email) {
      alert("Please enter your email first.");
      return;
    }

    // Call your API
    const { ok, message } = await forgotPassword(email); // Replace with your function
    if (ok) {
      alert("Password reset link sent! Valid for 5 minutes.");
      setLinkSent(true);
      setTimer(300);
      localStorage.setItem("forgotPasswordExpiry", Date.now() + 300000); // Save expiry timestamp
    } else {
      alert(message);
    }
  };

  return (
    <div>
      <input
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="Enter your email"
      />

      {authTab === "login" && (
        <p
          className="text-right text-sm text-blue-600 cursor-pointer"
          onClick={handleForgotPassword}
        >
          {timer > 0
            ? `Resend in ${Math.floor(timer / 60)}:${String(timer % 60).padStart(
                2,
                "0"
              )}`
            : linkSent
            ? "Resend password link"
            : "Forgot password?"}
        </p>
      )}
    </div>
  );
}
