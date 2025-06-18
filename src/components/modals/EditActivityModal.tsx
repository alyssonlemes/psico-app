import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

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

interface EditActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivityUpdated: (atividade: Atividade) => void;
  activity: Atividade;
}

const tiposAtividade = [
  'Exercício',
  'Trabalho',
  'Social',
  'Lazer',
  'Estudo',
  'Autocuidado',
  'Outro'
];

export default function EditActivityModal({
  isOpen,
  onClose,
  onActivityUpdated,
  activity
}: EditActivityModalProps) {
  const [formData, setFormData] = useState({
    tipo: activity.tipo,
    descricao: activity.descricao,
    impacto: activity.impacto
  });

  // Formatar a data da atividade original
  const dataOriginal = new Date(activity.data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const getImpactoColor = (impacto: number) => {
    if (impacto <= 2) return 'text-red-800 bg-red-50';
    if (impacto <= 3) return 'text-yellow-800 bg-yellow-50';
    return 'text-green-800 bg-green-50';
  };

  const getImpactoText = (impacto: number) => {
    if (impacto <= 2) return 'Negativo';
    if (impacto <= 3) return 'Neutro';
    return 'Positivo';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const atividadeAtualizada: Atividade = {
      ...activity, // Mantém todos os dados originais
      tipo: formData.tipo,
      descricao: formData.descricao,
      impacto: formData.impacto,
      updatedAt: new Date().toISOString(), // Apenas atualiza o updatedAt
    };

    onActivityUpdated(atividadeAtualizada);
    onClose();
  };

  // Atualizar form quando activity mudar
  useEffect(() => {
    setFormData({
      tipo: activity.tipo,
      descricao: activity.descricao,
      impacto: activity.impacto
    });
  }, [activity]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Editar Atividade
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Tipo de Atividade *
              </label>
              <select
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                required
              >
                <option value="">Selecione um tipo</option>
                {tiposAtividade.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Data Original
              </label>
              <div className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 flex items-center">
                <span className="font-medium">{dataOriginal}</span>
                <span className="ml-2 text-sm text-gray-500">(Não editável)</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Descrição *
            </label>
            <textarea
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Descreva sua atividade..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Impacto no Humor (1-5)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="1"
                max="5"
                value={formData.impacto}
                onChange={(e) => setFormData({ ...formData, impacto: parseInt(e.target.value) })}
                className="flex-1"
              />
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getImpactoColor(formData.impacto)}`}>
                {formData.impacto} - {getImpactoText(formData.impacto)}
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Salvar Alterações
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}