'use client';

import React, { useState, useEffect } from 'react';
import PsychologistCard from '@/components/cards/PsychologistCard';
import { api } from '@/lib/api';
import { Search, Users, BarChart3 } from 'lucide-react';

// Interface mínima para o que você precisa na tela
interface Psychologist {
  id: string;
  nome: string;
  crp: string;
  pacientes?: { id: string }[]; // Apenas para contar
  atendimentos?: { id: string }[]; // Apenas para contar
}

// Função auxiliar para gerar arrays de IDs para teste
const generateIds = (prefix: string, count: number) => {
  return Array.from({ length: count }, (_, i) => ({ id: `${prefix}${i + 1}` }));
};

// Dados mockados simplificados para teste
const mockPsychologists: Psychologist[] = [
  {
    id: '1',
    nome: 'Dra. Ana Silva',
    crp: '06/12345',
    pacientes: [{ id: '101' }, { id: '102' }, { id: '103' }],
    atendimentos: generateIds('a', 5) // 5 atendimentos
  },
  {
    id: '2',
    nome: 'Dr. Carlos Mendes',
    crp: '06/54321',
    pacientes: [{ id: '104' }, { id: '105' }],
    atendimentos: generateIds('b', 99) // 99 atendimentos para testar
  },
  {
    id: '3',
    nome: 'Dra. Juliana Costa',
    crp: '06/67890',
    pacientes: generateIds('p', 15), // 15 pacientes
    atendimentos: generateIds('c', 150) // 150 atendimentos para testar números altos
  },
  {
    id: '4',
    nome: 'Dr. Roberto Santos',
    crp: '06/11111',
    pacientes: generateIds('q', 8),
    atendimentos: generateIds('d', 25)
  },
  {
    id: '5',
    nome: 'Dra. Maria Fernanda',
    crp: '06/22222',
    pacientes: generateIds('r', 12),
    atendimentos: generateIds('e', 75)
  }
];

export default function PsychologistsPage() {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [filteredPsychologists, setFilteredPsychologists] = useState<Psychologist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchPsychologists = async () => {
    try {
      setLoading(true);
      
      // Usando dados mockados para teste
      setTimeout(() => {
        setPsychologists(mockPsychologists);
        setFilteredPsychologists(mockPsychologists);
        setLoading(false);
      }, 500);
      
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar psicólogos');
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredPsychologists(psychologists);
      return;
    }

    const filtered = psychologists.filter(psychologist =>
      psychologist.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      psychologist.crp.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredPsychologists(filtered);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredPsychologists(psychologists);
  };

  useEffect(() => {
    fetchPsychologists();
  }, []);

  // Busca em tempo real conforme digita
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPsychologists(psychologists);
    } else {
      const filtered = psychologists.filter(psychologist =>
        psychologist.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        psychologist.crp.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPsychologists(filtered);
    }
  }, [searchTerm, psychologists]);

  const totalPacientes = psychologists.reduce((acc, p) => acc + (p.pacientes?.length || 0), 0);
  const totalAtendimentos = psychologists.reduce((acc, p) => acc + (p.atendimentos?.length || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Psicólogos</h1>
            <p className="mt-2 text-sm text-gray-600">
              Encontre os profissionais cadastrados na plataforma
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Psicólogos</p>
                <p className="text-2xl font-bold text-gray-900">{psychologists.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-50 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Pacientes</p>
                <p className="text-2xl font-bold text-gray-900">{totalPacientes}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-50 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Atendimentos</p>
                <p className="text-2xl font-bold text-gray-900">{totalAtendimentos}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nome ou CRP..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 transition-colors duration-200"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

          </div>
          
          {/* Search Results Info */}
          {searchTerm && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  {filteredPsychologists.length === 0 ? (
                    <>Nenhum resultado encontrado para <span className="font-medium">"{searchTerm}"</span></>
                  ) : (
                    <>{filteredPsychologists.length} resultado(s) para <span className="font-medium">"{searchTerm}"</span></>
                  )}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-blue-600"></div>
              <p className="text-gray-600 font-medium">Carregando psicólogos...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <span className="text-red-700 font-medium">{error}</span>
            </div>
          </div>
        ) : filteredPsychologists.length === 0 && !searchTerm ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum psicólogo cadastrado</h3>
            <p className="text-gray-600">Aguarde enquanto os psicólogos são carregados na plataforma.</p>
          </div>
        ) : filteredPsychologists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPsychologists.map((psychologist) => (
              <div key={psychologist.id}>
                <PsychologistCard psychologist={psychologist} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}