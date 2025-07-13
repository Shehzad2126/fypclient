import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const baseURL = import.meta.env.REACT_APP_BACKEND_BASE_URL;
const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      const response = await axios.post(
        `${baseURL}/users/forgot-password`,

        { email }
      );

      alert(response.data.message || "OTP has been sent to your email.");
      setStep(2);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to send OTP.");
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!enteredCode) {
      alert("Please enter the code.");
      return;
    }

    try {
      const response = await axios.post(
        `${baseURL}/users/verify-otp`,

        {
          email,
          otp: enteredCode,
        }
      );

      alert(response.data.message || "Code verified successfully.");
      setStep(3);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "OTP verification failed.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        `${baseURL}/users/reset-password`,

        {
          email,
          password: newPassword,
          confirmPassword,
        }
      );

      alert(response.data.message || "Password reset successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to reset password.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-center bg-no-repeat bg-cover">
      <form
        onSubmit={
          step === 1
            ? handleSendCode
            : step === 2
            ? handleVerifyCode
            : handleResetPassword
        }
        className="p-6 bg-white rounded-lg shadow-lg w-96 dark:bg-gray-300 dark:text-black"
      >
        {step === 1 && (
          <>
            <h2 className="mb-4 text-2xl font-bold text-center text-green-800">
              Forgot Password
            </h2>
            <p className="mb-4 text-sm text-center text-gray-600">
              Enter your email to receive a verification code.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full py-2 text-white bg-green-900 rounded-lg hover:bg-green-800"
            >
              Send Code
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="mb-4 text-2xl font-bold text-center text-green-800">
              Verify Code
            </h2>
            <p className="mb-4 text-sm text-center text-gray-600">
              Enter the 6-digit code sent to your email.
            </p>
            <input
              type="text"
              maxLength="6"
              value={enteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
              placeholder="Enter code"
              className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full py-2 text-white bg-green-900 rounded-lg hover:bg-green-800"
            >
              Verify Code
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="mb-4 text-2xl font-bold text-center text-green-800">
              Reset Password
            </h2>
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full py-2 text-white bg-green-900 rounded-lg hover:bg-green-800"
            >
              Reset Password
            </button>
          </>
        )}

        <p className="mt-4 text-sm text-center text-gray-700 dark:text-black">
          Back to{" "}
          <a
            href="/login"
            className="font-semibold text-green-700 hover:underline"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
