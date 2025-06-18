import React, { useState, useEffect } from 'react';
import { X, Calendar, DollarSign, User, QrCode, Copy, CheckCircle } from 'lucide-react';

interface Psicologo {
  id: string;
  nome: string;
  crp: string;
  email: string;
  telefone: string;
}

interface AtendimentoDisponivel {
  id: string;
  data: string;
  observacoes: string;
  psicologoId: string;
  psicologo: Psicologo;
  valor: number;
}

interface ScheduleAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  psychologist?: {
    id: string;
    nome: string;
    crp: string;
  };
  psicologoId?: string;
  pacienteId?: string;
}

const ScheduleAppointmentModal: React.FC<ScheduleAppointmentModalProps> = ({
  isOpen,
  onClose,
  psychologist,
  psicologoId,
  pacienteId = 'paciente123'
}) => {
  const [step, setStep] = useState<'select' | 'payment' | 'pix' | 'confirmation'>('select');
  const [atendimentosDisponiveis, setAtendimentosDisponiveis] = useState<AtendimentoDisponivel[]>([]);
  const [atendimentoSelecionado, setAtendimentoSelecionado] = useState<AtendimentoDisponivel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pixCode, setPixCode] = useState<string>('');
  const [paymentId, setPaymentId] = useState<string>('');
  const [statusChecking, setStatusChecking] = useState(false);

  const currentPsicologoId = psychologist?.id || psicologoId;

  useEffect(() => {
    if (isOpen) {
      carregarAtendimentosDisponiveis();
    }
  }, [isOpen, currentPsicologoId]);

  // Polling para verificar status do pagamento automaticamente
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (step === 'pix' && paymentId) {
      setStatusChecking(true);
      
      // Verificar status a cada 3 segundos
      interval = setInterval(async () => {
        try {
          // TODO: Implementar chamada real da API
          /*
          const response = await fetch(`/api/pagamento/status/${paymentId}`);
          const { status } = await response.json();
          
          if (status === 'approved') {
            setStatusChecking(false);
            clearInterval(interval);
            await confirmarAgendamento();
            setStep('confirmation');
          } else if (status === 'rejected' || status === 'cancelled') {
            setStatusChecking(false);
            clearInterval(interval);
            setError('Pagamento foi rejeitado ou cancelado');
            setStep('payment');
          }
          */

          // Mock para demonstração - simula pagamento aprovado após 8 segundos
          const mockPaymentApproved = Math.random() > 0.7; // 30% chance a cada verificação
          
          if (mockPaymentApproved) {
            setStatusChecking(false);
            clearInterval(interval);
            await confirmarAgendamento();
            setStep('confirmation');
          }
        } catch (err) {
          console.error('Erro ao verificar status do pagamento:', err);
        }
      }, 3000); // Verificar a cada 3 segundos
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [step, paymentId]);

  const carregarAtendimentosDisponiveis = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Substituir por chamada real da API
      // const response = await fetch(`/api/atendimentos/disponiveis?psicologoId=${currentPsicologoId}`);
      
      const atendimentos = currentPsicologoId ? [
        {
          id: '1',
          data: '2025-06-15T14:00:00Z',
          observacoes: 'Primeira consulta - Avaliação inicial',
          psicologoId: currentPsicologoId,
          psicologo: {
            id: currentPsicologoId,
            nome: psychologist?.nome || 'Psicólogo',
            crp: psychologist?.crp || 'CRP não informado',
            email: 'email@example.com',
            telefone: '(11) 99999-9999'
          },
          valor: 150
        },
        {
          id: '2',
          data: '2025-06-16T10:00:00Z',
          observacoes: 'Sessão de terapia cognitivo-comportamental',
          psicologoId: currentPsicologoId,
          psicologo: {
            id: currentPsicologoId,
            nome: psychologist?.nome || 'Psicólogo',
            crp: psychologist?.crp || 'CRP não informado',
            email: 'email@example.com',
            telefone: '(11) 99999-9999'
          },
          valor: 180
        },
        {
          id: '3',
          data: '2025-06-17T16:30:00Z',
          observacoes: 'Atendimento online',
          psicologoId: currentPsicologoId,
          psicologo: {
            id: currentPsicologoId,
            nome: psychologist?.nome || 'Psicólogo',
            crp: psychologist?.crp || 'CRP não informado',
            email: 'email@example.com',
            telefone: '(11) 99999-9999'
          },
          valor: 200
        }
      ] : [];
      
      setAtendimentosDisponiveis(atendimentos);
    } catch (err) {
      setError('Erro ao carregar atendimentos disponíveis');
    } finally {
      setLoading(false);
    }
  };

  const selecionarAtendimento = (atendimento: AtendimentoDisponivel) => {
    setAtendimentoSelecionado(atendimento);
    setStep('payment');
  };

  const gerarPix = async () => {
    if (!atendimentoSelecionado) return;

    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Implementar chamada real da API
      /*
      const response = await fetch('/api/pagamento/pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          atendimentoId: atendimentoSelecionado.id,
          pacienteId,
          valor: atendimentoSelecionado.valor,
          descricao: `Consulta com ${atendimentoSelecionado.psicologo.nome}`
        }),
      });
      const { pixCode, qrCode, paymentId } = await response.json();
      */
      
      // Mock temporário
      const mockPixCode = `00020126830014BR.GOV.BCB.PIX013640c4d3f2-12d5-4d3e-9d3e-123456789abc5204000053039865802BR5915CLINICA EXEMPLO6009SAO PAULO62070503***6304${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      const mockPaymentId = `payment_${Date.now()}`;
      
      setPixCode(mockPixCode);
      setPaymentId(mockPaymentId);
      setStep('pix');
    } catch (err) {
      setError('Erro ao gerar PIX');
    } finally {
      setLoading(false);
    }
  };

  const confirmarAgendamento = async () => {
    if (!atendimentoSelecionado) return;

    try {
      // TODO: Implementar chamada real da API para confirmar agendamento
      /*
      const response = await fetch('/api/atendimentos/confirmar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          atendimentoId: atendimentoSelecionado.id,
          pacienteId,
          paymentId
        }),
      });
      
      if (!response.ok) {
        throw new Error('Erro ao confirmar agendamento');
      }
      */
      
      console.log('Agendamento confirmado automaticamente após pagamento PIX');
    } catch (err) {
      setError('Erro ao confirmar agendamento');
      throw err;
    }
  };

  const copiarPixCode = () => {
    navigator.clipboard.writeText(pixCode);
  };

  const resetModal = () => {
    setStep('select');
    setAtendimentoSelecionado(null);
    setPixCode('');
    setPaymentId('');
    setStatusChecking(false);
    setError(null);
    onClose();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (!isOpen) return null;

  const getStepTitle = () => {
    switch (step) {
      case 'select': return 'Selecionar Atendimento';
      case 'payment': return 'Confirmar Dados';
      case 'pix': return 'Aguardando Pagamento PIX';
      case 'confirmation': return 'Agendamento Confirmado';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={resetModal}
    >
      <div 
        className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">{getStepTitle()}</h2>
          <button
            onClick={resetModal}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Step 1: Seleção de Atendimento */}
          {step === 'select' && (
            <div>
              <div className="mb-4">
                <p className="text-gray-700">
                  Selecione um dos atendimentos disponíveis abaixo:
                </p>
              </div>

              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="space-y-3">
                  {atendimentosDisponiveis.map((atendimento) => (
                    <div
                      key={atendimento.id}
                      className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors"
                      onClick={() => selecionarAtendimento(atendimento)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <User className="w-4 h-4 text-gray-600" />
                            <span className="font-medium text-gray-800">{atendimento.psicologo.nome}</span>
                            <span className="text-sm text-gray-600">CRP: {atendimento.psicologo.crp}</span>
                          </div>
                          
                          <div className="flex items-center space-x-3 mb-2">
                            <Calendar className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">
                              {formatDate(atendimento.data)}
                            </span>
                          </div>

                          {atendimento.observacoes && (
                            <p className="text-sm text-gray-600 mt-2">
                              {atendimento.observacoes}
                            </p>
                          )}
                        </div>

                        <div className="text-right">
                          <div className="flex items-center space-x-1 text-green-600 font-semibold">
                            <span>{formatCurrency(atendimento.valor)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {atendimentosDisponiveis.length === 0 && !loading && (
                    <div className="text-center py-8 text-gray-600">
                      Nenhum atendimento disponível no momento.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Confirmação dos Dados */}
          {step === 'payment' && atendimentoSelecionado && (
            <div>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-3 text-gray-800">Resumo do Atendimento</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Psicólogo:</span>
                    <span className="text-gray-800">{atendimentoSelecionado.psicologo.nome}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Data e Hora:</span>
                    <span className="text-gray-800">{formatDate(atendimentoSelecionado.data)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-700">Valor:</span>
                    <span className="text-gray-800">{formatCurrency(atendimentoSelecionado.valor)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Forma de Pagamento:</span>
                    <span className="flex items-center space-x-1 text-gray-800">
                      <span>🏦</span>
                      <span>PIX</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setStep('select')}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Voltar
                </button>
                <button
                  onClick={gerarPix}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <QrCode className="w-4 h-4" />
                      <span>Gerar PIX</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Pagamento PIX - Aguardando automaticamente */}
          {step === 'pix' && atendimentoSelecionado && (
            <div className="text-center">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2 text-gray-800">Pague com PIX</h3>
                <p className="text-gray-700">
                  Escaneie o QR Code ou copie o código PIX abaixo
                </p>
                <p className="text-sm text-blue-600 mt-2">
                  {statusChecking ? '🔄 Aguardando confirmação do pagamento...' : 'Faça o pagamento para continuar'}
                </p>
              </div>

              {/* QR Code */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6 inline-block">
                <div className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded">
                  <QrCode className="w-24 h-24 text-gray-500" />
                  <span className="ml-2 text-gray-600">QR Code PIX</span>
                </div>
              </div>

              {/* Código PIX */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-800">
                  Ou copie o código PIX:
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={pixCode}
                    readOnly
                    className="flex-1 p-2 border border-gray-300 rounded-md bg-gray-50 text-sm font-mono text-gray-700"
                  />
                  <button
                    onClick={copiarPixCode}
                    className="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center space-x-1"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copiar</span>
                  </button>
                </div>
              </div>

              {/* Valor e Status */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(atendimentoSelecionado.valor)}
                </div>
                
                {statusChecking ? (
                  <div className="flex items-center justify-center space-x-2 mt-3">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <p className="text-sm text-blue-700">
                      Verificando pagamento automaticamente...
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-700 mt-1">
                    Após o pagamento, o agendamento será confirmado automaticamente
                  </p>
                )}
              </div>

              {/* Botão Voltar */}
              <div className="flex justify-center">
                <button
                  onClick={() => setStep('payment')}
                  disabled={statusChecking}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Voltar
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmação */}
          {step === 'confirmation' && atendimentoSelecionado && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Agendamento Confirmado!
              </h3>
              
              <p className="text-gray-700 mb-6">
                Seu pagamento foi processado automaticamente e o atendimento foi agendado com sucesso. Você receberá uma confirmação por email.
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h4 className="font-medium mb-3 text-gray-800">Detalhes do Agendamento</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Psicólogo:</span>
                    <span className="text-gray-800">{atendimentoSelecionado.psicologo.nome}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Data e Hora:</span>
                    <span className="text-gray-800">{formatDate(atendimentoSelecionado.data)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Valor Pago:</span>
                    <span className="text-gray-800">{formatCurrency(atendimentoSelecionado.valor)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Forma de Pagamento:</span>
                    <span className="text-gray-800">PIX</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Status:</span>
                    <span className="text-green-600 font-medium">✅ Confirmado</span>
                  </div>
                </div>
              </div>

              <button
                onClick={resetModal}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Fechar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleAppointmentModal;