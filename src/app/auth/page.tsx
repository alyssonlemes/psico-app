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
    if (senha !== confirmSenha) throw new Error("As senhas não coincidem.");
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
    alert("Cadastro realizado com sucesso! Faça o login.");
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
        err.message || `Ocorreu um erro durante o ${authMode === "login" ? "login" : "cadastro"}. Tente novamente.`
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
          alt="Ilustração de Autenticação"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Side: Form Area with white background */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-sm">
          <h1 className="mb-6 text-left text-3xl font-bold text-gray-900">
            {authMode === "login" ? "Entrar" : "Cadastrar"}
          </h1>

          {/* User Type Selection (Register only - Minimal Style) */}
          {authMode === "register" && (
            <div className="mb-6">
              <p className="block text-sm font-medium text-gray-700 mb-3">
                Cadastro como:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {/* Patient Option */}
                <label className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="patient"
                    checked={userType === "patient"}
                    onChange={() => setUserType("patient")}
                    className="sr-only"
                    disabled={loading}
                  />
                  <div
                    className={`
                      flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200
                      ${
                        userType === "patient"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      }
                      ${loading ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  >
                    {/* Patient Icon */}
                    <svg
                      className={`w-5 h-5 mb-1.5 ${
                        userType === "patient" ? "text-blue-600" : "text-gray-400"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="text-xs font-medium">Paciente</span>
                    {userType === "patient" && (
                      <div className="absolute top-1.5 right-1.5">
                        <svg
                          className="w-3.5 h-3.5 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </label>

                {/* Psychologist Option */}
                <label className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="psychologist"
                    checked={userType === "psychologist"}
                    onChange={() => setUserType("psychologist")}
                    className="sr-only"
                    disabled={loading}
                  />
                  <div
                    className={`
                      flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200
                      ${
                        userType === "psychologist"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                      }
                      ${loading ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  >
                    {/* Psychologist Icon */}
                    <svg
                      className={`w-5 h-5 mb-1.5 ${
                        userType === "psychologist" ? "text-blue-600" : "text-gray-400"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    <span className="text-xs font-medium">Psicólogo</span>
                    {userType === "psychologist" && (
                      <div className="absolute top-1.5 right-1.5">
                        <svg
                          className="w-3.5 h-3.5 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* --- Auth Form (Cleaned Inputs/Button based on new image) --- */}
          <form onSubmit={handleSubmit} className={`${authMode === "register" ? "space-y-3" : "space-y-5"}`}>
            {/* Registration Fields */}
            {authMode === "register" && (
              <>
                <CleanInput
                  label="Nome Completo"
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
                  label="Telefone"
                  type="tel"
                  id="telefone"
                  value={telefone}
                  onChange={setTelefone}
                  required
                  disabled={loading}
                />
                {userType === "patient" && (
                  <CleanInput
                    label="Data de Nascimento"
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
              label="E-mail"
              type="email"
              id="email"
              value={email}
              onChange={setEmail}
              required
              disabled={loading}
            />
            <CleanInput
              label="Senha"
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
                label="Confirmar Senha"
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

            {/* Submit Button (Reduced margin for registration) */}
            <div className={`${authMode === "register" ? "pt-1" : "pt-2"}`}>
              <button
                type="submit"
                className={`w-full rounded-md px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 ${
                  loading ? "cursor-not-allowed opacity-70" : ""
                }`}
                disabled={loading}
              >
                {loading
                  ? "Processando..."
                  : authMode === "login"
                  ? "Entrar"
                  : "Cadastrar"}
              </button>
            </div>
          </form>
          {/* ------------------------------------------------------------- */}

          {/* Toggle Auth Mode (Reduced margin for registration) */}
          <p className={`text-center text-sm text-gray-600 ${authMode === "register" ? "mt-3" : "mt-6"}`}>
            {authMode === "login"
              ? "Não tem uma conta?"
              : "Já tem uma conta?"}{" "}
            <button
              onClick={toggleAuthMode}
              className="font-medium text-blue-600 hover:underline focus:outline-none"
              disabled={loading}
            >
              {authMode === "login" ? "Cadastrar" : "Entrar"}
            </button>
          </p>
          {/* ------------------------------------------------------------- */}
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