"use client";

import React, { useState, useEffect } from "react";
import { Edit3 } from "lucide-react";
import AddAppointmentModal from "@/components/modals/AddAppointmentModal";
import EditAppointmentModal from "@/components/modals/EditAppointmentModal";

// Interface baseada no schema Prisma
interface Atendimento {
  id: string;
  data: string;
  observacoes: string;
  pacienteId: string;
  psicologoId: string;
  paciente: {
    id: string;
    nome: string;
    email: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

// Mock de atendimentos do psicólogo logado
const mockAtendimentos: Atendimento[] = [
  {
    id: "1",
    data: "2025-06-20T14:00:00Z",
    observacoes: "Sessão inicial",
    pacienteId: "pac1",
    psicologoId: "psi1",
    paciente: {
      id: "pac1",
      nome: "Lucas Souza",
      email: "lucas@email.com",
    },
    createdAt: "2025-06-01T10:00:00Z",
    updatedAt: "2025-06-10T10:00:00Z",
  },
  {
    id: "2",
    data: "2025-06-22T16:00:00Z",
    observacoes: "Terapia de rotina",
    pacienteId: "pac2",
    psicologoId: "psi1",
    paciente: {
      id: "pac2",
      nome: "Marina Lima",
      email: "marina@email.com",
    },
    createdAt: "2025-06-02T10:00:00Z",
    updatedAt: "2025-06-11T10:00:00Z",
  },
];

export default function PsychologistAppointmentsPage() {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal de novo atendimento
  const [showNewModal, setShowNewModal] = useState(false);
  
  // Modal de edição
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<{
    id: string;
    data: string;
    observacoes: string;
    valor: number;
    descricao: string;
  } | null>(null);

  useEffect(() => {
    // Simular fetch
    setTimeout(() => {
      setAtendimentos(mockAtendimentos);
      setLoading(false);
    }, 600);
  }, []);

  const handleCreate = () => {
    setShowNewModal(true);
  };

  const handleCloseModal = () => {
    setShowNewModal(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingAppointment(null);
  };

  const handleEditAppointment = (atendimento: Atendimento) => {
    setEditingAppointment({
      id: atendimento.id,
      data: atendimento.data,
      observacoes: atendimento.observacoes,
      valor: 150, // Valor padrão, você pode ajustar conforme necessário
      descricao: atendimento.paciente 
        ? `Consulta com ${atendimento.paciente.nome}` 
        : "Horário disponível"
    });
    setShowEditModal(true);
  };

  const handleAddAppointment = (data: {
    data: string;
    observacoes: string;
    valor: number;
    descricao: string;
  }) => {
    setAtendimentos((atendimentos) => [
      ...atendimentos,
      {
        id: (Math.random() * 100000).toFixed(0),
        data: data.data,
        observacoes: data.observacoes,
        pacienteId: "",
        psicologoId: "psi1",
        paciente: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);
  };

  const handleUpdateAppointment = (data: {
    data: string;
    observacoes: string;
    valor: number;
    descricao: string;
  }) => {
    if (!editingAppointment) return;
    
    setAtendimentos((atendimentos) =>
      atendimentos.map((atendimento) =>
        atendimento.id === editingAppointment.id
          ? {
              ...atendimento,
              data: data.data,
              observacoes: data.observacoes,
              updatedAt: new Date().toISOString(),
            }
          : atendimento
      )
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Meus Atendimentos
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Gerencie seus horários disponíveis e consultas agendadas
          </p>
        </div>
        <button
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          onClick={handleCreate}
        >
          Novo Atendimento
        </button>
      </div>

      {/* Modal de novo atendimento */}
      <AddAppointmentModal
        open={showNewModal}
        onClose={handleCloseModal}
        onCreate={handleAddAppointment}
      />

      {/* Modal de edição */}
      <EditAppointmentModal
        open={showEditModal}
        onClose={handleCloseEditModal}
        onUpdate={handleUpdateAppointment}
        appointment={editingAppointment}
      />

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-2"></div>
          <span className="text-gray-600">Carregando atendimentos...</span>
        </div>
      ) : atendimentos.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum atendimento cadastrado
          </h3>
          <p className="text-gray-600">
            Crie horários disponíveis para que pacientes possam agendar.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {atendimentos
            .sort(
              (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
            )
            .map((atendimento) => (
              <div
                key={atendimento.id}
                className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <div className="text-lg font-semibold text-gray-800">
                    {atendimento.paciente
                      ? `Consulta com ${atendimento.paciente.nome}`
                      : "Horário disponível"}
                  </div>
                  <div className="text-gray-600 text-sm mt-1">
                    {new Date(atendimento.data).toLocaleString("pt-BR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </div>
                  <div className="text-gray-500 text-xs mt-1">
                    {atendimento.observacoes}
                  </div>
                  {atendimento.paciente && (
                    <div className="text-xs text-gray-500 mt-1">
                      Paciente: {atendimento.paciente.nome} (
                      {atendimento.paciente.email})
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <button
                    onClick={() => handleEditAppointment(atendimento)}
                    className="flex items-center gap-2 px-3 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 font-medium text-sm"
                    title="Editar atividade"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  {/* Aqui você pode adicionar botão de excluir se desejar */}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}