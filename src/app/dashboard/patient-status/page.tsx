"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, User, TrendingUp, Clock } from "lucide-react";

const moodOptions = [
  { value: 1, emoji: "/angry.gif", label: "Muito Ruim", color: "bg-red-50", border: "border-red-200", textColor: "text-red-700" },
  { value: 2, emoji: "/sad.gif", label: "Ruim", color: "bg-orange-50", border: "border-orange-200", textColor: "text-orange-700" },
  { value: 3, emoji: "/neutral.gif", label: "Neutro", color: "bg-gray-50", border: "border-gray-200", textColor: "text-gray-700" },
  { value: 4, emoji: "/happy.gif", label: "Bom", color: "bg-green-50", border: "border-green-200", textColor: "text-green-700" },
  { value: 5, emoji: "/very-happy.gif", label: "Muito Bom", color: "bg-blue-50", border: "border-blue-200", textColor: "text-blue-700" },
];

interface MoodEntry {
  id: string;
  data: string;
  escala: number;
  observacoes: string;
  pacienteId: string;
}

interface Patient {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  ultimoHumor?: MoodEntry;
  totalRegistros: number;
  mediaHumor: number;
  ultimaConsulta: string;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function getTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Hoje';
  if (diffInDays === 1) return 'Ontem';
  if (diffInDays < 7) return `${diffInDays} dias atrás`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} semana${Math.floor(diffInDays / 7) > 1 ? 's' : ''} atrás`;
  return `${Math.floor(diffInDays / 30)} mês${Math.floor(diffInDays / 30) > 1 ? 'es' : ''} atrás`;
}

export default function PatientStatusPage() {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    // Simular dados dos pacientes com seus últimos humores
    const mockPatients: Patient[] = [
      {
        id: "1",
        nome: "Maria Silva",
        email: "maria@email.com",
        telefone: "(11) 99999-0001",
        ultimoHumor: {
          id: "mood1",
          data: new Date().toISOString(),
          escala: 4,
          observacoes: "Dia produtivo, me senti bem após a sessão",
          pacienteId: "1"
        },
        totalRegistros: 15,
        mediaHumor: 3.8,
        ultimaConsulta: new Date(Date.now() - 86400000 * 2).toISOString()
      },
      {
        id: "2",
        nome: "João Santos",
        email: "joao@email.com",
        telefone: "(11) 99999-0002",
        ultimoHumor: {
          id: "mood2",
          data: new Date(Date.now() - 86400000).toISOString(),
          escala: 2,
          observacoes: "Dia difícil no trabalho, me senti sobrecarregado",
          pacienteId: "2"
        },
        totalRegistros: 8,
        mediaHumor: 2.5,
        ultimaConsulta: new Date(Date.now() - 86400000 * 5).toISOString()
      },
      {
        id: "3",
        nome: "Ana Costa",
        email: "ana@email.com",
        telefone: "(11) 99999-0003",
        ultimoHumor: {
          id: "mood3",
          data: new Date(Date.now() - 86400000 * 3).toISOString(),
          escala: 5,
          observacoes: "Excelente dia! Consegui aplicar as técnicas que aprendemos",
          pacienteId: "3"
        },
        totalRegistros: 22,
        mediaHumor: 4.2,
        ultimaConsulta: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: "4",
        nome: "Carlos Oliveira",
        email: "carlos@email.com",
        telefone: "(11) 99999-0004",
        totalRegistros: 5,
        mediaHumor: 3.2,
        ultimaConsulta: new Date(Date.now() - 86400000 * 7).toISOString()
      },
      {
        id: "5",
        nome: "Lucia Ferreira",
        email: "lucia@email.com",
        telefone: "(11) 99999-0005",
        ultimoHumor: {
          id: "mood5",
          data: new Date(Date.now() - 86400000 * 2).toISOString(),
          escala: 3,
          observacoes: "Dia normal, sem grandes alterações no humor",
          pacienteId: "5"
        },
        totalRegistros: 12,
        mediaHumor: 3.5,
        ultimaConsulta: new Date(Date.now() - 86400000 * 3).toISOString()
      }
    ];
    
    setPatients(mockPatients);
  }, []);

  const getMoodData = (value: number) => {
    return moodOptions.find(mood => mood.value === value);
  };

  const totalPatients = patients.length;
  const patientsWithMoodToday = patients.filter(p => p.ultimoHumor && getTimeAgo(p.ultimoHumor.data) === 'Hoje').length;
  const averageMood = patients.length > 0 ? patients.reduce((sum, p) => sum + p.mediaHumor, 0) / patients.length : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Status dos Pacientes</h1>
          <p className="text-gray-600 mb-6">Acompanhe o humor e progresso dos seus pacientes</p>
          
          {/* Estatísticas gerais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total de Pacientes</p>
                  <p className="text-xl font-semibold text-gray-900">{totalPatients}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Registros Hoje</p>
                  <p className="text-xl font-semibold text-gray-900">{patientsWithMoodToday}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Média Geral</p>
                  <p className="text-xl font-semibold text-gray-900">{averageMood.toFixed(1)}/5</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de pacientes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient) => {
            const moodData = patient.ultimoHumor ? getMoodData(patient.ultimoHumor.escala) : null;
            
            return (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow h-80 flex flex-col"
              >
                {/* Header do paciente */}
                <div className="flex items-center gap-3 mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 truncate">{patient.nome}</h3>
                    <p className="text-sm text-gray-600 truncate">{patient.email}</p>
                  </div>
                </div>

                {/* Último humor */}
                <div className="mb-4 flex-1">
                  {patient.ultimoHumor && moodData ? (
                    <div className={`rounded-lg p-4 h-full ${moodData.color} ${moodData.border} border`}>
                      <div className="flex items-center gap-3 mb-2">
                        <Image
                          src={moodData.emoji}
                          alt={moodData.label}
                          width={32}
                          height={32}
                          draggable={false}
                        />
                        <div className="flex-1">
                          <p className={`font-medium ${moodData.textColor}`}>{moodData.label}</p>
                          <p className="text-xs text-gray-600">
                            {getTimeAgo(patient.ultimoHumor.data)}
                          </p>
                        </div>
                      </div>
                      {patient.ultimoHumor.observacoes && (
                        <p className="text-sm text-gray-700 italic line-clamp-2">
                          "{patient.ultimoHumor.observacoes}"
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-full flex items-center justify-center">
                      <p className="text-center text-gray-500 text-sm">
                        Nenhum humor registrado recentemente
                      </p>
                    </div>
                  )}
                </div>

                {/* Estatísticas do paciente */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total de registros:</span>
                    <span className="font-medium text-gray-900">{patient.totalRegistros}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Média de humor:</span>
                    <span className="font-medium text-gray-900">{patient.mediaHumor.toFixed(1)}/5</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Última consulta:</span>
                    <span className="font-medium text-gray-900 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {getTimeAgo(patient.ultimaConsulta)}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Estado vazio */}
        {patients.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum paciente encontrado</h3>
            <p className="text-gray-600">
              Você ainda não tem pacientes cadastrados
            </p>
          </div>
        )}
      </div>
    </div>
  );
}