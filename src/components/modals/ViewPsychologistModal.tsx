import React, { useState, useEffect } from 'react';
import { Users, Stethoscope } from 'lucide-react';

interface Psychologist {
  id: string;
  nome: string;
  crp: string;
  apresentacao?: string;
  pacientes?: { id: string }[];
  atendimentos?: { id: string }[];
}

interface ViewPsychologistModalProps {
  isOpen: boolean;
  onClose: () => void;
  psychologist: Psychologist | null;
}

const ViewPsychologistModal: React.FC<ViewPsychologistModalProps> = ({
  isOpen,
  onClose,
  psychologist
}) => {
  const [animatedPacientes, setAnimatedPacientes] = useState(0);
  const [animatedAtendimentos, setAnimatedAtendimentos] = useState(0);

  useEffect(() => {
    if (isOpen && psychologist) {
      setAnimatedPacientes(0);
      setAnimatedAtendimentos(0);

      const pacientesCount = psychologist.pacientes?.length || 0;
      const atendimentosCount = psychologist.atendimentos?.length || 0;

      const duration = 1000;
      const steps = 60;
      const stepTime = duration / steps;

      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setAnimatedPacientes(Math.floor(pacientesCount * progress));
        setAnimatedAtendimentos(Math.floor(atendimentosCount * progress));

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepTime);

      return () => clearInterval(interval);
    }
  }, [isOpen, psychologist]);

  if (!isOpen || !psychologist) return null;

  const maxPacientes = 50;
  const maxAtendimentos = 200;

  const pacientesPercentage = Math.min((animatedPacientes / maxPacientes) * 100, 100);
  const atendimentosPercentage = Math.min((animatedAtendimentos / maxAtendimentos) * 100, 100);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur rounded-2xl p-8 w-full max-w-lg shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Perfil do Psicólogo</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Conteúdo */}
        <div className="space-y-6">
          <div>
            <p className="text-xl font-semibold text-gray-900">{psychologist.nome}</p>
            <p className="text-sm text-gray-500">CRP: {psychologist.crp}</p>
          </div>

          {psychologist.apresentacao && (
            <div>
              <p className="text-gray-700 leading-relaxed text-sm">{psychologist.apresentacao}</p>
            </div>
          )}

          <div className="space-y-5">
            {/* Pacientes */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>Pacientes</span>
                </div>
                <span className="text-base font-medium text-gray-800">{animatedPacientes}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-700 h-2 rounded-full transition-all"
                  style={{ width: `${pacientesPercentage}%` }}
                />
              </div>
            </div>

            {/* Atendimentos */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Stethoscope className="w-4 h-4 text-green-500" />
                  <span>Atendimentos</span>
                </div>
                <span className="text-base font-medium text-gray-800">{animatedAtendimentos}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-700 h-2 rounded-full transition-all"
                  style={{ width: `${atendimentosPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPsychologistModal;
