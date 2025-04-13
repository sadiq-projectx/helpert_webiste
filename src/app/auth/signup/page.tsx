"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TextInput from "@/components/ui/TextInput";
import TextButton from "@/components/ui/buttons/TextButton";
import SocialLoginWidget from "@/components/ui/SocialLoginWidget";
import { signUpUser } from "@/services/api/auth/authService";
import { AxiosError } from "axios";
import { validateEmail, validatePassword, validateConfirmPassword } from "@/utils/validators";
import { useTheme } from "@/contexts/ThemeConfig";

interface ErrorResponse {
  message?: string;
  [key: string]: any;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const router = useRouter();
  const { themeColors } = useTheme();

  // Validate form fields
  const validateForm = () => {
    const errors: ValidationErrors = {};
    
    // Only validate fields that have been touched
    if (touched.email) {
      errors.email = validateEmail(email);
    }
    
    if (touched.password) {
      errors.password = validatePassword(password);
    }
    
    if (touched.confirmPassword) {
      errors.confirmPassword = validateConfirmPassword(confirmPassword, password);
    }

    setValidationErrors(errors);
    
    // Form is valid if all fields are valid and not empty
    const isEmailValid = !errors.email && email.length > 0;
    const isPasswordValid = !errors.password && password.length > 0;
    const isConfirmPasswordValid = !errors.confirmPassword && confirmPassword.length > 0;
    
    setIsFormValid(isEmailValid && isPasswordValid && isConfirmPasswordValid);
  };

  // Handle field blur (when user leaves the field)
  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  useEffect(() => {
    validateForm();
  }, [email, password, confirmPassword, touched]);

  // Handle form submission
  const handleSignUp = async () => {
    // Mark all fields as touched when submitting
    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
    });
    
    // Validate all fields
    const errors: ValidationErrors = {};
    errors.email = validateEmail(email);
    errors.password = validatePassword(password);
    errors.confirmPassword = validateConfirmPassword(confirmPassword, password);
    
    setValidationErrors(errors);
    
    // Check if form is valid
    const isEmailValid = !errors.email && email.length > 0;
    const isPasswordValid = !errors.password && password.length > 0;
    const isConfirmPasswordValid = !errors.confirmPassword && confirmPassword.length > 0;
    
    const isFormValid = isEmailValid && isPasswordValid && isConfirmPasswordValid;
    setIsFormValid(isFormValid);
    
    if (!isFormValid) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await signUpUser(email, password);
      console.log("Sign-up successful:", response);
      router.push("/auth/complete-profile");
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      console.error("Sign-up error:", err.response?.data || err.message);
      setErrorMessage(err.response?.data?.message || "Failed to sign up. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-4">
            Create an Account
          </h1>
          <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
            Join Helpert – Connect with experts, learn new skills, and grow your knowledge!
          </p>
        </div>

        {errorMessage && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={(e) => {
          e.preventDefault();
          handleSignUp();
        }} className="space-y-6">
          <TextInput
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur("email")}
            placeholder="Enter your email"
            error={validationErrors.email}
            required
          />

          <TextInput
            id="password"
            label="Password"
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => handleBlur("password")}
            placeholder="Create a password"
            error={validationErrors.password}
            required
            suffix={
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {isPasswordVisible ? "Hide" : "Show"}
              </button>
            }
          />

          <TextInput
            id="confirm-password"
            label="Confirm Password"
            type={isConfirmPasswordVisible ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => handleBlur("confirmPassword")}
            placeholder="Confirm your password"
            error={validationErrors.confirmPassword}
            required
            suffix={
              <button
                type="button"
                onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {isConfirmPasswordVisible ? "Hide" : "Show"}
              </button>
            }
          />

          <div className="text-xs text-gray-500 dark:text-gray-400">
            Password must be at least 8 characters long and contain at least one number
          </div>

          <TextButton
            text={isLoading ? "Creating Account..." : "Create Account"}
            onClick={handleSignUp}
            textColor="white"
            backgroundColor={isFormValid ? themeColors.primaryColor : "blue-400"}
            className={`w-full py-3 font-semibold ${isLoading ? "cursor-not-allowed opacity-70" : ""}`}
            disabled={!isFormValid || isLoading}
          />
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              or Sign Up with
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <SocialLoginWidget />
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/auth/signin")}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}