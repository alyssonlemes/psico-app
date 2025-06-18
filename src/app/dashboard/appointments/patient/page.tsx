'use client';

import React, { useState, useEffect } from 'react';
import AppointmentCard from '@/components/cards/AppointmentCard';
import { Calendar, Clock, CheckCircle, Filter } from 'lucide-react';

// Interface atualizada baseada no schema Prisma
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

// Dados mockados - apenas atendimentos pagos/confirmados
const mockConfirmedAppointments: Appointment[] = [
  {
    id: '1',
    data: '2025-06-08T14:00:00Z', // Passado
    observacoes: 'Sessão de acompanhamento - Ansiedade',
    pacienteId: 'pac1',
    psicologoId: 'psi1',
    psicologo: {
      id: 'psi1',
      nome: 'Dra. Ana Silva',
      crp: '06/12345',
      email: 'ana@email.com'
    },
    pagamentos: [
      {
        id: 'pag1',
        valor: 150.00,
        data: '2025-06-07T10:00:00Z',
        dataVencimento: '2025-06-08T14:00:00Z',
        parcela: 1,
        status: 'Pago',
        atendimentoId: '1'
      }
    ],
    createdAt: '2025-06-05T10:00:00Z',
    updatedAt: '2025-06-07T10:00:00Z'
  },
  {
    id: '2',
    data: '2025-06-22T16:00:00Z', // Futuro
    observacoes: 'Terapia cognitivo-comportamental',
    pacienteId: 'pac1',
    psicologoId: 'psi2',
    psicologo: {
      id: 'psi2',
      nome: 'Dr. Carlos Mendes',
      crp: '06/54321',
      email: 'carlos@email.com'
    },
    pagamentos: [
      {
        id: 'pag2',
        valor: 180.00,
        data: '2025-06-10T09:30:00Z',
        dataVencimento: '2025-06-22T16:00:00Z',
        parcela: 1,
        status: 'Pago',
        atendimentoId: '2'
      }
    ],
    createdAt: '2025-06-09T10:00:00Z',
    updatedAt: '2025-06-10T09:30:00Z'
  },
  {
    id: '3',
    data: '2025-06-29T11:00:00Z', // Futuro
    observacoes: 'Primeira consulta - Avaliação psicológica',
    pacienteId: 'pac1',
    psicologoId: 'psi3',
    psicologo: {
      id: 'psi3',
      nome: 'Dra. Maria Santos',
      crp: '06/98765',
      email: 'maria@email.com'
    },
    pagamentos: [
      {
        id: 'pag3',
        valor: 200.00,
        data: '2025-06-10T14:20:00Z',
        dataVencimento: '2025-06-29T11:00:00Z',
        parcela: 1,
        status: 'Pago',
        atendimentoId: '3'
      }
    ],
    createdAt: '2025-06-09T10:00:00Z',
    updatedAt: '2025-06-10T14:20:00Z'
  },
  {
    id: '4',
    data: '2025-06-05T15:30:00Z', // Passado
    observacoes: 'Sessão de acompanhamento - Depressão',
    pacienteId: 'pac1',
    psicologoId: 'psi1',
    psicologo: {
      id: 'psi1',
      nome: 'Dra. Ana Silva',
      crp: '06/12345',
      email: 'ana@email.com'
    },
    pagamentos: [
      {
        id: 'pag4',
        valor: 150.00,
        data: '2025-06-04T16:45:00Z',
        dataVencimento: '2025-06-05T15:30:00Z',
        parcela: 1,
        status: 'Pago',
        atendimentoId: '4'
      }
    ],
    createdAt: '2025-06-03T10:00:00Z',
    updatedAt: '2025-06-04T16:45:00Z'
  }
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'todos' | 'proximos' | 'realizados'>('todos');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        
        // TODO: Substituir por chamada real da API
        // const response = await fetch('/api/atendimentos/confirmados?pacienteId=pac1');
        // const data = await response.json();
        
        // Simular delay da API
        setTimeout(() => {
          setAppointments(mockConfirmedAppointments);
          setLoading(false);
        }, 800);
      } catch (err: any) {
        setError(err.message || 'Erro ao buscar atendimentos confirmados');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Filtrar atendimentos por data
  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.data);
    const now = new Date();
    
    switch (filter) {
      case 'proximos':
        return appointmentDate >= now;
      case 'realizados':
        return appointmentDate < now;
      case 'todos':
      default:
        return true;
    }
  });

  // Ordenar por data (próximos primeiro, depois por ordem cronológica)
  const sortedAppointments = filteredAppointments.sort((a, b) => {
    const dateA = new Date(a.data);
    const dateB = new Date(b.data);
    
    if (filter === 'proximos') {
      return dateA.getTime() - dateB.getTime(); // Crescente para próximos
    } else {
      return dateB.getTime() - dateA.getTime(); // Decrescente para realizados
    }
  });

  // Função para determinar se o atendimento é próximo (nas próximas 24h)
  const isUpcoming = (dateString: string) => {
    const appointmentDate = new Date(dateString);
    const now = new Date();
    const diffHours = (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return diffHours > 0 && diffHours <= 24;
  };

  // Contar atendimentos por categoria
  const counts = {
    todos: appointments.length,
    proximos: appointments.filter(a => new Date(a.data) >= new Date()).length,
    realizados: appointments.filter(a => new Date(a.data) < new Date()).length
  };

  // Configuração dos filtros
  const filterOptions = [
    { key: 'todos', label: 'Todos', count: counts.todos, icon: Calendar },
    { key: 'proximos', label: 'Próximos', count: counts.proximos, icon: Clock },
    { key: 'realizados', label: 'Realizados', count: counts.realizados, icon: CheckCircle }
  ];

  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <div className="mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Meus Atendimentos</h1>
          <p className="text-sm text-gray-600 mt-1">Consultas agendadas e pagas</p>
        </div>
        <div className="flex justify-center items-center h-48 md:h-64">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 md:h-6 md:w-6 border-b-2 border-blue-600"></div>
            <p className="text-sm md:text-base text-gray-600">Carregando seus atendimentos confirmados...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <div className="mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Meus Atendimentos</h1>
          <p className="text-sm text-gray-600 mt-1">Consultas agendadas e pagas</p>
        </div>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          <p className="font-medium text-sm md:text-base">Erro ao carregar atendimentos</p>
          <p className="text-xs md:text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Meus Atendimentos</h1>
            <p className="text-sm text-gray-600 mt-1">
              Consultas agendadas e pagas
            </p>
          </div>
          
          {/* Filtro Mobile - Botão Toggle */}
          <div className="sm:hidden">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium w-full justify-center"
            >
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
              <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                {counts[filter]}
              </span>
            </button>
          </div>
        </div>

        {/* Filtros Mobile - Dropdown */}
        {showMobileFilters && (
          <div className="mt-4 space-y-2 sm:hidden">
            {filterOptions.map(({ key, label, count, icon: Icon }) => (
              <button
                key={key}
                onClick={() => {
                  setFilter(key as any);
                  setShowMobileFilters(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  filter === key
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  filter === key 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Filtros Desktop */}
        <div className="hidden sm:flex space-x-2 mt-4">
          {filterOptions.map(({ key, label, count, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                filter === key
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden md:inline">{label}</span>
              <span className="md:hidden">{label.charAt(0)}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                filter === key 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lista de atendimentos */}
      {sortedAppointments.length === 0 ? (
        <div className="text-center py-8 md:py-12">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
            {filter === 'todos' && 'Nenhum atendimento encontrado'}
            {filter === 'proximos' && 'Nenhum atendimento próximo'}
            {filter === 'realizados' && 'Nenhum atendimento realizado'}
          </h3>
          <p className="text-sm md:text-base text-gray-600 px-4">
            {filter === 'todos' && 'Seus atendimentos confirmados aparecerão aqui.'}
            {filter === 'proximos' && 'Suas próximas consultas aparecerão aqui.'}
            {filter === 'realizados' && 'Seu histórico de consultas aparecerá aqui.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3 md:space-y-4">
          {sortedAppointments.map((appointment) => {
            const upcoming = isUpcoming(appointment.data);
            return (
              <div key={appointment.id} className="relative">
                {upcoming && (
                  <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 z-10">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
                      Em breve
                    </span>
                  </div>
                )}
                <div className="transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                  <AppointmentCard
                    appointment={appointment}
                    showActions={false} // Apenas visualização, sem ações
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Summary fixo no mobile */}
      {sortedAppointments.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 sm:hidden bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-20">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {filter === 'todos' && `${counts.todos} atendimentos`}
              {filter === 'proximos' && `${counts.proximos} próximos`}
              {filter === 'realizados' && `${counts.realizados} realizados`}
            </span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-gray-800 font-medium">Total: {filteredAppointments.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}