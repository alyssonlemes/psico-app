'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Activity,
  Heart,
  Smile,
  BarChart,
  Wallet,
  MessageCircle,
  Mail,
} from 'lucide-react';

type UserRole = 'Psicologo' | 'Paciente';

interface User {
  id: string;
  name: string;
  role: UserRole;
}

const allMenuItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard size={18} />,
    roles: ['Psicologo', 'Paciente'],
  },
  {
    name: 'Pacientes',
    href: '/dashboard/patients',
    icon: <Users size={18} />,
    roles: ['Psicologo'],
  },
  {
    name: 'Psicólogos',
    href: '/dashboard/psychologists',
    icon: <Heart size={18} />,
    roles: ['Paciente'],
  },
  {
    name: 'Atendimentos',
    href: '', // será definido dinamicamente
    icon: <CalendarDays size={18} />,
    roles: ['Psicologo', 'Paciente'],
  },
  {
    name: 'Atividades',
    href: '/dashboard/activities',
    icon: <Activity size={18} />,
    roles: ['Paciente'],
  },
  {
    name: 'Humor',
    href: '/dashboard/mood',
    icon: <Smile size={18} />,
    roles: ['Paciente'],
  },
  {
    name: 'Status',
    href: '/dashboard/patient-status',
    icon: <BarChart size={18} />,
    roles: ['Psicologo'],
  },
  {
    name: 'Financeiro',
    href: '/dashboard/financial',
    icon: <Wallet size={18} />,
    roles: ['Psicologo'],
  },
];

const supportInfo = [
  { 
    value: '(16) 99999-9999', 
    icon: <MessageCircle size={18} />,
    href: 'https://wa.me/5516999999999'
  },
  { 
    value: 'suporte@psicoapp.com.br', 
    icon: <Mail size={18} />,
    href: 'mailto:suporte@psicoapp.com.br'
  },
];

export default function Sidebar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulando usuário logado
    setUser({
      id: '1',
      name: 'João Psicólogo',
      role: 'Psicologo', // Troque para 'Paciente' para testar como paciente
    });

    // Exemplo de fetch real:
    /*
    fetch('/api/me')
      .then(res => res.json())
      .then(data => setUser(data));
    */
  }, []);

  if (!user) return null;

  // Ajusta o href de Atendimentos conforme o papel do usuário
  const filteredMenu = allMenuItems
    .filter((item) => item.roles.includes(user.role))
    .map((item) => {
      if (item.name === 'Atendimentos') {
        return {
          ...item,
          href:
            user.role === 'Psicologo'
              ? '/dashboard/appointments/psychologist'
              : '/dashboard/appointments/patient',
        };
      }
      return item;
    });

  return (
    <aside className="w-80 border-r border-gray-200 bg-white text-gray-800 min-h-screen px-4 py-6">
      <div className="flex items-center mb-10 px-2">
        <div className="w-8 h-8 bg-indigo-600 text-white flex items-center justify-center rounded-lg mr-2">
          <LayoutDashboard size={18} />
        </div>
        <h1 className="text-xl font-semibold">PsicoApp</h1>
      </div>

      <div>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 mb-2">Menu</h2>
        <ul className="space-y-1">
          {filteredMenu.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center gap-4 px-5 py-4 rounded-md text-sm hover:bg-blue-300 transition-colors"
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 mb-2">Suporte</h2>
        <div className="space-y-3">
          {supportInfo.map((item, index) => (
            <div key={index} className="px-3 py-2">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm hover:text-blue-600 transition-colors cursor-pointer group"
              >
                <span className="text-gray-600 group-hover:text-blue-600 transition-colors">
                  {item.icon}
                </span>
                <div className="text-gray-700 group-hover:text-blue-600 transition-colors">
                  {item.value}
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}