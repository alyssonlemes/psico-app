"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Image from "next/image";

// --- Interfaces (Keep as they are) ---
interface LoginPayload {
  email: string;
  senha: string;
}
interface LoginResponse {
  access_token: string;
}
interface BaseRegisterPayload {
  name: string;
  email: string;
  senha: string;
  cpf: string;
  telefone: string;
}
interface PatientRegisterPayload extends BaseRegisterPayload {
  dataNascimento: string;
}
interface PsychologistRegisterPayload extends BaseRegisterPayload {
  crp: string;
}
interface RegisterResponse {
  id: string /* other fields... */;
}
// --------------------------------------

type UserType = "patient" | "psychologist";
type AuthMode = "login" | "register";

export default function AuthPage() {
  // --- State Variables (Keep as they are) ---
  const [userType, setUserType] = useState<UserType>("patient");
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [name, setName] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [crp, setCrp] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // -----------------------------------------

  // --- Helper Functions (Keep as they are) ---
  const clearForm = () => {
    setEmail("");
    setSenha("");
    setName("");
    setConfirmSenha("");
    setCpf("");
    setTelefone("");
    setCrp("");
    setDataNascimento("");
    setError(null);
  };
  const toggleAuthMode = () => {
    setAuthMode(authMode === "login" ? "register" : "login");
    clearForm();
  };
  // -------------------------------------------

  // --- API Call Handlers (Keep as they are, including simulated login) ---
  const handleLogin = async () => {
    alert("Login simulado! (API desativada)");
    // Actual API call commented out as per previous step
    // const payload: LoginPayload = { email, senha };
    // const response = await api.post<LoginResponse, LoginPayload>('/auth', payload);
    // if (response.access_token) {
    //   localStorage.setItem('authToken', response.access_token);
    //   router.push('/dashboard');
    // } else {
    //   throw new Error('Login successful, but no access token received.');
    // }
  };
  const handleRegister = async () => {
    if (senha !== confirmSenha) throw new Error("Passwords do not match.");
    let endpoint: string;
    let payload: PatientRegisterPayload | PsychologistRegisterPayload;
    if (userType === "patient") {
      endpoint = "/patients";
      payload = { name, email, senha, cpf, telefone, dataNascimento };
    } else {
      endpoint = "/doctors"; // Confirm this endpoint
      payload = { name, email, senha, cpf, telefone, crp };
    }
    await api.post<RegisterResponse, typeof payload>(endpoint, payload);
    alert("Registration successful! Please log in.");
    setAuthMode("login");
    clearForm();
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (authMode === "login") await handleLogin();
      else await handleRegister();
    } catch (err: any) {
      setError(
        err.message || `An error occurred during ${authMode}. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };
  // ----------------------------------------------------------------------

  // --- Render Structure using the generated illustration ---
  return (
    <div className="flex min-h-screen w-screen bg-white">
      {/* Left Side: Illustration with light blue background */}
      <div className="hidden lg:flex w-1/2 h-screen relative bg-blue-50">
        <Image
          src="/auth-image.png"
          alt="Authentication Illustration"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Side: Form Area with white background */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-sm">
          <h1 className="mb-6 text-left text-3xl font-bold text-gray-900">
            {authMode === "login" ? "Login" : "Register"}
          </h1>

          {/* User Type Selection (Register only - Minimal Style) */}
          {authMode === "register" && (
            <div className="mb-6">
              <p className="block text-sm font-medium text-gray-700 mb-2">
                Registering as:
              </p>
              <div className="flex space-x-4">
                {/* Simple Radio Buttons */}
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="patient"
                    checked={userType === "patient"}
                    onChange={() => setUserType("patient")}
                    className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    disabled={loading}
                  />
                  <span
                    className={`text-sm ${
                      userType === "patient"
                        ? "text-gray-900 font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    Patient
                  </span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="psychologist"
                    checked={userType === "psychologist"}
                    onChange={() => setUserType("psychologist")}
                    className="form-radio h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    disabled={loading}
                  />
                  <span
                    className={`text-sm ${
                      userType === "psychologist"
                        ? "text-gray-900 font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    Psychologist
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* --- Auth Form (Cleaned Inputs/Button based on new image) --- */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Registration Fields */}
            {authMode === "register" && (
              <>
                <CleanInput
                  label="Full Name"
                  type="text"
                  id="name"
                  value={name}
                  onChange={setName}
                  required
                  disabled={loading}
                />
                <CleanInput
                  label="CPF"
                  type="text"
                  id="cpf"
                  value={cpf}
                  onChange={setCpf}
                  required
                  disabled={loading}
                />
                <CleanInput
                  label="Phone"
                  type="tel"
                  id="telefone"
                  value={telefone}
                  onChange={setTelefone}
                  required
                  disabled={loading}
                />
                {userType === "patient" && (
                  <CleanInput
                    label="Date of Birth"
                    type="date"
                    id="dataNascimento"
                    value={dataNascimento}
                    onChange={setDataNascimento}
                    required
                    disabled={loading}
                  />
                )}
                {userType === "psychologist" && (
                  <CleanInput
                    label="CRP"
                    type="text"
                    id="crp"
                    value={crp}
                    onChange={setCrp}
                    required
                    disabled={loading}
                  />
                )}
              </>
            )}

            {/* Common Fields */}
            <CleanInput
              label="Email"
              type="email"
              id="email"
              value={email}
              onChange={setEmail}
              required
              disabled={loading}
            />
            <CleanInput
              label="Password"
              type="password"
              id="senha"
              value={senha}
              onChange={setSenha}
              required
              disabled={loading}
            />

            {/* Confirm Password (Register only) */}
            {authMode === "register" && (
              <CleanInput
                label="Confirm Password"
                type="password"
                id="confirmSenha"
                value={confirmSenha}
                onChange={setConfirmSenha}
                required
                disabled={loading}
              />
            )}

            {/* Error Message */}
            {error && (
              <p className="text-xs text-red-600 text-center pt-1">{error}</p>
            )}

            {/* Submit Button (Cleaned Style based on new image) */}
            <div className="pt-2">
              <button
                type="submit"
                className={`w-full rounded-md px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 ${
                  loading ? "cursor-not-allowed opacity-70" : ""
                }`}
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : authMode === "login"
                  ? "Login"
                  : "Register"}
              </button>
            </div>
          </form>
          {/* ------------------------------------------------------------- */}

          {/* Toggle Auth Mode (Cleaned Style based on new image) */}
          <p className="mt-6 text-center text-sm text-gray-600">
            {authMode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              onClick={toggleAuthMode}
              className="font-medium text-blue-600 hover:underline focus:outline-none"
              disabled={loading}
            >
              {authMode === "login" ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// --- Reusable Input Component for the new Cleaner Style ---
interface CleanInputProps {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
}

function CleanInput({
  label,
  type,
  id,
  value,
  onChange,
  required = false,
  disabled = false,
}: CleanInputProps) {
  return (
    <div>
      {/* Label is now used as placeholder, but kept for accessibility */}
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={label} // Use label as placeholder
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        // Style matching the reference image: simple border, padding
        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={disabled}
      />
    </div>
  );
}
// ----------------------------------------------------------
