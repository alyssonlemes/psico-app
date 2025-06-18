"use client";

import React, { useState } from "react";
import ViewPsychologistModal from "@/components/modals/ViewPsychologistModal";
import ScheduleAppointmentModal from "@/components/modals/ScheduleAppointmentModal";

interface Psychologist {
  id: string;
  nome: string;
  crp: string;
  pacientes?: { id: string }[];
  atendimentos?: { id: string }[];
}

interface PsychologistCardProps {
  psychologist: Psychologist;
}

const PsychologistCard: React.FC<PsychologistCardProps> = ({
  psychologist,
}) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const pacientesCount = psychologist.pacientes?.length || 0;
  const atendimentosCount = psychologist.atendimentos?.length || 0;

  const handleViewProfile = () => {
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
  };

  const handleScheduleAppointment = () => {
    setIsScheduleModalOpen(true);
  };

  const handleCloseScheduleModal = () => {
    setIsScheduleModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200 hover:shadow-lg transition-shadow flex flex-col h-full">
        <div className="flex justify-between items-start flex-1">
          <div className="flex-1 mr-4 min-w-0">
            <h3 className="text-xl font-semibold text-gray-800 break-words leading-tight">
              {psychologist.nome}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              CRP: {psychologist.crp}
            </p>
          </div>

          <div className="flex space-x-4 flex-shrink-0">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-700">
                {pacientesCount}
              </p>
              <p className="text-xs text-gray-500">
                {pacientesCount === 1 ? "Paciente" : "Pacientes"}
              </p>
            </div>

            <div className="text-center">
              <p className="text-lg font-bold text-gray-700">
                {atendimentosCount}
              </p>
              <p className="text-xs text-gray-500">
                {atendimentosCount === 1 ? "Atendimento" : "Atendimentos"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex space-x-2 justify-start">
          <button
            className="px-3 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors font-medium text-sm"
            onClick={handleViewProfile}
          >
            Ver Perfil
          </button>

          <button
            className="px-3 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors font-medium text-sm"
            onClick={handleScheduleAppointment}
          >
            Agendar
          </button>
        </div>
      </div>

      <ViewPsychologistModal
        psychologist={psychologist}
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
      />

      <ScheduleAppointmentModal
        isOpen={isScheduleModalOpen}
        onClose={handleCloseScheduleModal}
        psychologist={psychologist}
        pacienteId="paciente123" // TODO: Pegar do contexto/auth
      />
    </>
  );
};

export default PsychologistCard;
