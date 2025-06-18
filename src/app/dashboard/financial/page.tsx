"use client";

import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
  Legend
} from 'recharts';
import { CalendarDays, DollarSign, TrendingUp, Users, Target, Clock } from 'lucide-react';

// Interfaces baseadas no schema Prisma
interface Pagamento {
  id: string;
  valor: number;
  data: string;
  dataVencimento: string;
  parcela: number;
  status: 'Pago';
  atendimentoId: string;
  atendimento: {
    id: string;
    data: string;
    paciente: {
      nome: string;
    };
  };
}

interface FinancialSummary {
  receitaTotal: number;
  receitaMensal: number;
  receitaSemanalMedia: number;
  totalConsultas: number;
  valorMedioConsulta: number;
  consultasMes: number;
}

// Mock de dados financeiros
const mockPagamentos: Pagamento[] = [
  {
    id: '1',
    valor: 150,
    data: '2025-06-01T00:00:00Z',
    dataVencimento: '2025-06-01T00:00:00Z',
    parcela: 1,
    status: 'Pago',
    atendimentoId: 'at1',
    atendimento: {
      id: 'at1',
      data: '2025-06-01T14:00:00Z',
      paciente: { nome: 'João Silva' }
    }
  },
  {
    id: '2',
    valor: 150,
    data: '2025-06-02T00:00:00Z',
    dataVencimento: '2025-06-02T00:00:00Z',
    parcela: 1,
    status: 'Pago',
    atendimentoId: 'at2',
    atendimento: {
      id: 'at2',
      data: '2025-06-02T16:00:00Z',
      paciente: { nome: 'Maria Santos' }
    }
  },
  {
    id: '3',
    valor: 150,
    data: '2025-06-05T00:00:00Z',
    dataVencimento: '2025-06-05T00:00:00Z',
    parcela: 1,
    status: 'Pago',
    atendimentoId: 'at3',
    atendimento: {
      id: 'at3',
      data: '2025-06-05T10:00:00Z',
      paciente: { nome: 'Carlos Lima' }
    }
  },
  {
    id: '4',
    valor: 150,
    data: '2025-05-15T00:00:00Z',
    dataVencimento: '2025-05-15T00:00:00Z',
    parcela: 1,
    status: 'Pago',
    atendimentoId: 'at4',
    atendimento: {
      id: 'at4',
      data: '2025-05-15T14:00:00Z',
      paciente: { nome: 'Ana Costa' }
    }
  },
  {
    id: '5',
    valor: 150,
    data: '2025-05-20T00:00:00Z',
    dataVencimento: '2025-05-20T00:00:00Z',
    parcela: 1,
    status: 'Pago',
    atendimentoId: 'at5',
    atendimento: {
      id: 'at5',
      data: '2025-05-20T16:00:00Z',
      paciente: { nome: 'Pedro Oliveira' }
    }
  },
  {
    id: '6',
    valor: 150,
    data: '2025-04-10T00:00:00Z',
    dataVencimento: '2025-04-10T00:00:00Z',
    parcela: 1,
    status: 'Pago',
    atendimentoId: 'at6',
    atendimento: {
      id: 'at6',
      data: '2025-04-10T09:00:00Z',
      paciente: { nome: 'Luiza Ferreira' }
    }
  },
  {
    id: '7',
    valor: 150,
    data: '2025-04-25T00:00:00Z',
    dataVencimento: '2025-04-25T00:00:00Z',
    parcela: 1,
    status: 'Pago',
    atendimentoId: 'at7',
    atendimento: {
      id: 'at7',
      data: '2025-04-25T15:00:00Z',
      paciente: { nome: 'Rafael Moreira' }
    }
  }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'];

export default function FinancialReportsPage() {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [summary, setSummary] = useState<FinancialSummary>({
    receitaTotal: 0,
    receitaMensal: 0,
    receitaSemanalMedia: 0,
    totalConsultas: 0,
    valorMedioConsulta: 0,
    consultasMes: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular fetch
    setTimeout(() => {
      setPagamentos(mockPagamentos);
      
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      
      const receitaTotal = mockPagamentos.reduce((sum, p) => sum + p.valor, 0);
      
      const receitaMensal = mockPagamentos
        .filter(p => {
          const paymentDate = new Date(p.data);
          return paymentDate.getMonth() === currentMonth && 
                 paymentDate.getFullYear() === currentYear;
        })
        .reduce((sum, p) => sum + p.valor, 0);
      
      const consultasMes = mockPagamentos
        .filter(p => {
          const paymentDate = new Date(p.data);
          return paymentDate.getMonth() === currentMonth && 
                 paymentDate.getFullYear() === currentYear;
        }).length;

      // Calcular média semanal dos últimos 30 dias
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(now.getDate() - 30);
      
      const recentPayments = mockPagamentos.filter(p => {
        const paymentDate = new Date(p.data);
        return paymentDate >= thirtyDaysAgo;
      });
      
      const receitaSemanalMedia = recentPayments.reduce((sum, p) => sum + p.valor, 0) / 4;

      setSummary({
        receitaTotal,
        receitaMensal,
        receitaSemanalMedia,
        totalConsultas: mockPagamentos.length,
        valorMedioConsulta: receitaTotal / mockPagamentos.length || 0,
        consultasMes
      });
      
      setLoading(false);
    }, 1000);
  }, []);

  // Preparar dados para gráficos
  const monthlyRevenue = React.useMemo(() => {
    const monthlyData: { [key: string]: { receita: number; consultas: number } } = {};
    
    pagamentos.forEach(pagamento => {
      const date = new Date(pagamento.data);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { receita: 0, consultas: 0 };
      }
      monthlyData[monthKey].receita += pagamento.valor;
      monthlyData[monthKey].consultas += 1;
    });
    
    return Object.entries(monthlyData)
      .map(([month, data]) => ({
        month: new Date(month + '-01').toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }),
        receita: data.receita,
        consultas: data.consultas
      }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }, [pagamentos]);

  const patientDistribution = React.useMemo(() => {
    const patientCount: { [key: string]: number } = {};
    
    pagamentos.forEach(pagamento => {
      const patientName = pagamento.atendimento.paciente.nome;
      patientCount[patientName] = (patientCount[patientName] || 0) + 1;
    });
    
    return Object.entries(patientCount)
      .map(([name, count]) => ({
        name,
        consultas: count,
        receita: count * 150 // Assumindo valor fixo por simplicidade
      }))
      .sort((a, b) => b.consultas - a.consultas)
      .slice(0, 5); // Top 5 pacientes
  }, [pagamentos]);

  const weeklyRevenue = React.useMemo(() => {
    const weeklyData: { [key: string]: number } = {};
    
    pagamentos.forEach(pagamento => {
      const date = new Date(pagamento.data);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const weekKey = weekStart.toISOString().split('T')[0];
      weeklyData[weekKey] = (weeklyData[weekKey] || 0) + pagamento.valor;
    });
    
    return Object.entries(weeklyData)
      .map(([week, revenue]) => ({
        semana: new Date(week).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        receita: revenue
      }))
      .sort((a, b) => a.semana.localeCompare(b.semana))
      .slice(-8); // Últimas 8 semanas
  }, [pagamentos]);

  const dailyConsultations = React.useMemo(() => {
    const dailyData: { [key: string]: number } = {};
    
    pagamentos.forEach(pagamento => {
      const date = new Date(pagamento.data);
      const dayKey = date.toISOString().split('T')[0];
      dailyData[dayKey] = (dailyData[dayKey] || 0) + 1;
    });
    
    return Object.entries(dailyData)
      .map(([day, count]) => ({
        dia: new Date(day).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        consultas: count
      }))
      .sort((a, b) => a.dia.localeCompare(b.dia))
      .slice(-14); // Últimos 14 dias
  }, [pagamentos]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-2"></div>
          <span className="text-gray-600">Carregando relatórios financeiros...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Relatórios Financeiros</h1>
        <p className="text-sm text-gray-600 mt-1">
          Acompanhe suas receitas e performance de consultas
        </p>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Receita Total</p>
              <p className="text-2xl font-bold text-green-600">
                R$ {summary.receitaTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Receita Mensal</p>
              <p className="text-2xl font-bold text-blue-600">
                R$ {summary.receitaMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Média Semanal</p>
              <p className="text-2xl font-bold text-purple-600">
                R$ {summary.receitaSemanalMedia.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <Target className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Consultas Totais</p>
              <p className="text-2xl font-bold text-indigo-600">{summary.totalConsultas}</p>
            </div>
            <Users className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Consultas este Mês</p>
              <p className="text-2xl font-bold text-orange-600">{summary.consultasMes}</p>
            </div>
            <CalendarDays className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valor Médio</p>
              <p className="text-2xl font-bold text-teal-600">
                R$ {summary.valorMedioConsulta.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <Clock className="w-8 h-8 text-teal-600" />
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Receita Mensal */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Receita Mensal</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `R$ ${value}`} />
              <Tooltip formatter={(value) => [`R$ ${value}`, 'Receita']} />
              <Area type="monotone" dataKey="receita" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Pacientes */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top 5 Pacientes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={patientDistribution} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="consultas" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Receita Semanal */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Receita Semanal</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="semana" />
              <YAxis tickFormatter={(value) => `R$ ${value}`} />
              <Tooltip formatter={(value) => [`R$ ${value}`, 'Receita']} />
              <Bar dataKey="receita" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Consultas Diárias */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Consultas Diárias (Últimos 14 dias)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyConsultations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="consultas" stroke="#F59E0B" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}