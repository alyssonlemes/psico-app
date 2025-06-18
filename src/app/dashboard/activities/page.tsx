'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Activity, Star } from 'lucide-react';
import AddActivityModal from '@/components/modals/AddActivityModal';
import ActivityCard from '@/components/cards/ActivityCard';

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

// Simulação de fetch inicial
const mockAtividades: Atividade[] = [
  {
    id: '1',
    tipo: 'Exercício',
    descricao: 'Caminhada no parque por 30 minutos',
    data: new Date().toISOString(),
    impacto: 4,
    pacienteId: 'paciente1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    tipo: 'Trabalho',
    descricao: 'Reunião importante com a equipe',
    data: new Date().toISOString(),
    impacto: 3,
    pacienteId: 'paciente1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    tipo: 'Social',
    descricao: 'Almoço com amigos',
    data: new Date(Date.now() - 86400000).toISOString(),
    impacto: 5,
    pacienteId: 'paciente1',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '4',
    tipo: 'Relaxamento',
    descricao: 'Meditação de 15 minutos',
    data: new Date(Date.now() - 86400000).toISOString(),
    impacto: 4,
    pacienteId: 'paciente1',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

export default function ActivitiesPage() {
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Atividade | null>(null);

  useEffect(() => {
    fetchAtividades();
  }, []);

  const fetchAtividades = async () => {
    setLoading(true);
    try {
      // Aqui você trocará pelo fetch real da API
      setTimeout(() => {
        setAtividades(mockAtividades);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
      setLoading(false);
    }
  };

  const handleActivityAdded = (novaAtividade: Atividade) => {
    if (editingActivity) {
      // Editando atividade existente
      setAtividades(prev => prev.map(a => 
        a.id === editingActivity.id ? { ...novaAtividade, id: editingActivity.id } : a
      ));
      setEditingActivity(null);
    } else {
      // Adicionando nova atividade
      setAtividades(prev => [novaAtividade, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleEditActivity = (atividade: Atividade) => {
    setEditingActivity(atividade);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingActivity(null);
  };

  const atividadesHoje = atividades.filter(atividade => {
    const hoje = new Date().toISOString().split('T')[0];
    const dataAtividade = atividade.data.split('T')[0];
    return dataAtividade === hoje;
  });

  const impactoMedio = atividades.length > 0 
    ? (atividades.reduce((acc, a) => acc + a.impacto, 0) / atividades.length).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Minhas Atividades</h1>
              <p className="mt-2 text-gray-600">Registre e acompanhe o impacto das suas atividades diárias</p>
            </div>
            <button 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="w-5 h-5 mr-2" />
              Nova Atividade
            </button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Atividades Hoje</p>
                <p className="text-3xl font-bold text-gray-900">{atividadesHoje.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Impacto Médio</p>
                <p className="text-3xl font-bold text-gray-900">{impactoMedio}/5</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Registrado</p>
                <p className="text-3xl font-bold text-gray-900">{atividades.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Atividades */}
        <div className="space-y-6">
          {/* Atividades de Hoje */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Atividades de Hoje
              </h2>
            </div>

            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">Carregando atividades...</p>
              </div>
            ) : atividadesHoje.length === 0 ? (
              <div className="p-8 text-center">
                <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma atividade registrada hoje</h3>
                <p className="text-gray-600 mb-6">Comece registrando sua primeira atividade do dia.</p>
                <button 
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Registrar Atividade
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {atividadesHoje.map((atividade) => (
                  <ActivityCard 
                    key={atividade.id} 
                    atividade={atividade}
                    onEdit={handleEditActivity}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Atividades Anteriores */}
          {atividades.filter(a => {
            const hoje = new Date().toISOString().split('T')[0];
            const dataAtividade = a.data.split('T')[0];
            return dataAtividade !== hoje;
          }).length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-gray-600" />
                  Atividades Anteriores
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {atividades
                  .filter(a => {
                    const hoje = new Date().toISOString().split('T')[0];
                    const dataAtividade = a.data.split('T')[0];
                    return dataAtividade !== hoje;
                  })
                  .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
                  .map((atividade) => (
                    <ActivityCard 
                      key={atividade.id} 
                      atividade={atividade}
                      onEdit={handleEditActivity}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AddActivityModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onActivityAdded={handleActivityAdded}
        editingActivity={editingActivity}
      />
    </div>
  );
}