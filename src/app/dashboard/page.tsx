"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Dados mockados para simulação
const mockUser = { tipo: "paciente", nome: "João" }; // Troque para "paciente" para testar

// Pacientes por mês (últimos 6 meses)
const mockPacientesPorMes = [
  { name: "Jan", pacientes: 3 },
  { name: "Fev", pacientes: 4 },
  { name: "Mar", pacientes: 5 },
  { name: "Abr", pacientes: 6 },
  { name: "Mai", pacientes: 4 },
  { name: "Jun", pacientes: 7 },
];

// Humores cadastrados no mês atual (exemplo: Junho)
const mockHumoresMesAtual = [
  { name: "Feliz", value: 8 },
  { name: "Triste", value: 3 },
  { name: "Ansioso", value: 5 },
  { name: "Animado", value: 2 },
  { name: "Cansado", value: 1 },
];

// Dados do paciente continuam iguais
const mockConsultas = [
  { name: "Jan", consultas: 2 },
  { name: "Fev", consultas: 1 },
  { name: "Mar", consultas: 3 },
  { name: "Abr", consultas: 4 },
  { name: "Mai", consultas: 2 },
  { name: "Jun", consultas: 5 },
];

const mockHumores = [
  { name: "Feliz", value: 5 },
  { name: "Triste", value: 2 },
  { name: "Ansioso", value: 3 },
  { name: "Animado", value: 4 },
  { name: "Cansado", value: 1 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

export default function DashboardHomePage() {
  const [user, setUser] = useState<{ tipo: string; nome: string } | null>(null);
  const [consultas, setConsultas] = useState<any[]>([]);
  const [humores, setHumores] = useState<any[]>([]);
  const [pacientesPorMes, setPacientesPorMes] = useState<any[]>([]);
  const [humoresMesAtual, setHumoresMesAtual] = useState<any[]>([]);

  useEffect(() => {
    setUser(mockUser);

    if (mockUser.tipo === "paciente") {
      setConsultas(mockConsultas);
      setHumores(mockHumores);
    } else if (mockUser.tipo === "psicologo") {
      setPacientesPorMes(mockPacientesPorMes);
      setHumoresMesAtual(mockHumoresMesAtual);
    }
  }, []);

  if (!user) return <div>Carregando...</div>;

  return (
    <div className="w-full min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Home</h1>
      <p className="mb-8 text-gray-600">Bem-vindo ao dashboard, {user.nome}.</p>

      {user.tipo === "paciente" ? (
        <div className="flex flex-col lg:flex-row gap-8 w-full h-[80vh]">
          <div className="flex-1 bg-white rounded-xl shadow-lg p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Consultas por mês</h2>
            <div className="flex-1 min-h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={consultas}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="consultas" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-xl shadow-lg p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-purple-700">Humores cadastrados</h2>
            <div className="flex-1 flex items-center justify-center min-h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={humores}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    innerRadius="40%"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {humores.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 w-full h-[80vh]">
          <div className="flex-1 bg-white rounded-xl shadow-lg p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Pacientes por mês (últimos 6 meses)</h2>
            <div className="flex-1 min-h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pacientesPorMes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="pacientes" fill="#6366f1" radius={[8, 8, 0, 0]}>
                    {pacientesPorMes.map((entry, index) => (
                      <Cell key={`cell-bar-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-xl shadow-lg p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-purple-700">Humores cadastrados no mês atual</h2>
            <div className="flex-1 flex items-center justify-center min-h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={humoresMesAtual}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    innerRadius="40%"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {humoresMesAtual.map((entry, index) => (
                      <Cell key={`cell-pie-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}