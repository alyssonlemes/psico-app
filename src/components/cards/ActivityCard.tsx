import React from 'react';
import { Clock, Star, Edit3 } from 'lucide-react';

interface Atividade {
  id: string;
  tipo: string;
  descricao: string;
  data: string;
  impacto: number;
  pacienteId: string;
  createdAt: string;
  updatedAt: string;
}

interface ActivityCardProps {
  atividade: Atividade;
  onEdit?: (atividade: Atividade) => void;
}

export default function ActivityCard({ atividade, onEdit }: ActivityCardProps) {
  const getImpactoColor = (impacto: number) => {
    if (impacto <= 2) return 'text-red-600 bg-red-50';
    if (impacto <= 3) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getImpactoText = (impacto: number) => {
    if (impacto <= 2) return 'Negativo';
    if (impacto <= 3) return 'Neutro';
    return 'Positivo';
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {atividade.tipo}
            </span>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getImpactoColor(atividade.impacto)}`}>
              {getImpactoText(atividade.impacto)}
            </span>
            <span className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {new Date(atividade.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <p className="text-gray-900 font-medium mb-1">{atividade.descricao}</p>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < atividade.impacto ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">({atividade.impacto}/5)</span>
          </div>
        </div>
        
        {/* Botão de edição sempre visível */}
        {onEdit && (
          <div className="flex items-center ml-4">
            <button
              onClick={() => onEdit(atividade)}
              className="flex items-center gap-2 px-3 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 font-medium text-sm"
              title="Editar atividade"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}