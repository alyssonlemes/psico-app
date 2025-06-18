"use client";
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface EditAppointmentModalProps {
  open: boolean;
  onClose: () => void;
  onUpdate: (data: {
    data: string;
    observacoes: string;
    valor: number;
    descricao: string;
  }) => void;
  appointment: {
    data: string;
    observacoes: string;
    valor: number;
    descricao: string;
  } | null;
}

export default function EditAppointmentModal({
  open,
  onClose,
  onUpdate,
  appointment,
}: EditAppointmentModalProps) {
  const [formData, setFormData] = useState({
    data: '',
    observacoes: '',
    valor: '',
    descricao: '',
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        data: appointment.data,
        observacoes: appointment.observacoes,
        valor: appointment.valor?.toString() || '',
        descricao: appointment.descricao,
      });
    }
  }, [appointment, open]);

  if (!open || !appointment) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      data: formData.data,
      observacoes: formData.observacoes,
      valor: Number(formData.valor),
      descricao: formData.descricao,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Editar Atendimento
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Data e hora *
              </label>
              <input
                type="datetime-local"
                value={formData.data}
                onChange={e => setFormData({ ...formData, data: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Valor (R$) *
              </label>
              <input
                type="number"
                min={0}
                step="0.01"
                value={formData.valor}
                onChange={e => setFormData({ ...formData, valor: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Descrição *
            </label>
            <input
              type="text"
              value={formData.descricao}
              onChange={e => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Ex: Primeira consulta - Avaliação inicial"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Observações
            </label>
            <textarea
              value={formData.observacoes}
              onChange={e => setFormData({ ...formData, observacoes: e.target.value })}
              placeholder="Observações adicionais sobre o atendimento"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
            />
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