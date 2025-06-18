'use client';

import React from 'react';
import { Calendar, Clock, User, CheckCircle, Star, MessageCircle, FileText, Plus } from 'lucide-react';

// Interface base da API (não altere esta)
interface Appointment {
  id: string;
  data: string;
  observacoes: string;
  pacienteId: string;
  psicologoId: string;
  psicologo: {
    id: string;
    nome: string;
    crp: string;
    email: string;
  };
  pagamentos: Payment[];
  createdAt: string;
  updatedAt: string;
}

interface Payment {
  id: string;
  valor: number;
  data: string;
  dataVencimento: string;
  parcela: number;
  status: 'Pendente' | 'Pago';
  atendimentoId: string;
}

// Props do componente com campos opcionais
interface AppointmentCardProps {
  appointment: Appointment;
  onSchedulePayment?: (appointment: Appointment) => void;
  onScheduleNewSession?: (appointment: Appointment) => void;
  showActions?: boolean;
  // Campos extras opcionais (não vêm da API)
  avaliacao?: number;
  temAnotacoes?: boolean;
  proximaSessao?: string;
}

export default function AppointmentCard({ 
  appointment, 
  onSchedulePayment, 
  onScheduleNewSession,
  showActions = true,
  // Campos extras
  avaliacao,
  temAnotacoes,
  proximaSessao
}: AppointmentCardProps) {
  
  // Função para formatar data
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Função para formatar horário
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Função para calcular tempo relativo da sessão
  const getSessionTimeText = (dateString: string) => {
    const sessionDate = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((sessionDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    // Sessões futuras (positivo)
    if (diffInDays > 0) {
      if (diffInDays === 1) return 'Amanhã';
      if (diffInDays < 7) return `Em ${diffInDays} dias`;
      if (diffInDays < 30) return `Em ${Math.floor(diffInDays / 7)} semana${Math.floor(diffInDays / 7) > 1 ? 's' : ''}`;
      return `Em ${Math.floor(diffInDays / 30)} mês${Math.floor(diffInDays / 30) > 1 ? 'es' : ''}`;
    }
    
    // Sessão hoje
    if (diffInDays === 0) return 'Hoje';
    
    // Sessões passadas (negativo)
    const pastDays = Math.abs(diffInDays);
    if (pastDays === 1) return 'Ontem';
    if (pastDays < 7) return `${pastDays} dias atrás`;
    if (pastDays < 30) return `${Math.floor(pastDays / 7)} semana${Math.floor(pastDays / 7) > 1 ? 's' : ''} atrás`;
    return `${Math.floor(pastDays / 30)} mês${Math.floor(pastDays / 30) > 1 ? 'es' : ''} atrás`;
  };

  // Função para determinar a cor do badge baseado no tempo
  const getTimeColor = (dateString: string) => {
    const sessionDate = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((sessionDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays > 0) return 'text-blue-600 bg-blue-50'; // Futuro - azul
    if (diffInDays === 0) return 'text-green-600 bg-green-50'; // Hoje - verde
    return 'text-gray-600 bg-gray-100'; // Passado - cinza
  };

  const totalPago = appointment.pagamentos
    .filter(p => p.status === 'Pago')
    .reduce((sum, p) => sum + p.valor, 0);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-6">
        {/* Header com data e informação adicional */}
        <div className="flex items-center justify-between mb-4 h-8">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-900">
              {formatDate(appointment.data)}
            </span>
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">
              {formatTime(appointment.data)}
            </span>
          </div>
          
          {/* Informação adicional no lugar do status de pagamento */}
          <div className="flex items-center space-x-2">
            {/* Opção 1: Mostrar avaliação se existir */}
            {avaliacao && (
              <div className="flex items-center space-x-1 px-3 py-1 bg-yellow-50 rounded-full">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-yellow-700">
                  {avaliacao}/5
                </span>
              </div>
            )}
            
            {/* Opção 2: Mostrar se tem anotações */}
            {temAnotacoes && (
              <div className="flex items-center space-x-1 px-3 py-1 bg-blue-50 rounded-full">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  Com anotações
                </span>
              </div>
            )}
            
            {/* Opção 3: Tempo relativo da sessão */}
            <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${getTimeColor(appointment.data)}`}>
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">
                {getSessionTimeText(appointment.data)}
              </span>
            </div>
          </div>
        </div>

        {/* Informações do psicólogo */}
        <div className="flex items-center space-x-2 mb-4 h-6">
          <User className="w-4 h-4 text-gray-500" />
          <span className="font-medium text-gray-900">{appointment.psicologo.nome}</span>
          <span className="text-sm text-gray-600">({appointment.psicologo.crp})</span>
        </div>

        {/* Informação financeira ou próxima sessão */}
        <div className="mb-4 h-12">
          {proximaSessao ? (
            <div className="bg-green-50 p-3 rounded-md">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700 font-medium">
                  Próxima sessão: {formatDate(proximaSessao)} às {formatTime(proximaSessao)}
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">
                  Valor pago: R$ {totalPago.toFixed(2)}
                </span>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>
          )}
        </div>

        {/* Observações */}
        <div className={`${showActions ? 'mb-4' : 'mb-0'} h-6`}>
          {appointment.observacoes && (
            <p className="text-sm text-gray-700 truncate">
              <span className="font-medium">Obs:</span> {appointment.observacoes}
            </p>
          )}
        </div>

        {/* Ações */}
        {showActions && (
          <div className="flex items-center space-x-3 pt-3 border-t border-gray-100 h-12">
            <button 
              className="flex items-center space-x-1 px-3 py-1.5 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ver detalhes</span>
            </button>
            
            {onScheduleNewSession && (
              <button 
                onClick={() => onScheduleNewSession(appointment)}
                className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Nova Sessão</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}