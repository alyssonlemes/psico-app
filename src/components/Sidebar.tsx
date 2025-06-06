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
  { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={18} /> },
  { name: 'Pacientes', href: '/dashboard/patients', icon: <Users size={18} />, },
  { name: 'Psicólogos', href: '/dashboard/psychologists', icon: <Heart size={18} />,},
  { name: 'Consultas', href: '/dashboard/appointments', icon: <CalendarDays size={18} /> },
  { name: 'Atividades', href: '/dashboard/activities', icon: <Activity size={18} /> },
  { name: 'Humor', href: '/dashboard/mood', icon: <Smile size={18} /> },
  { name: 'Status', href: '/dashboard/patient-status', icon: <BarChart size={18} /> },
  { name: 'Financeiro', href: '/dashboard/financial', icon: <Wallet size={18} /> },
];

const supportItems = [
  { name: 'Chat', href: '/support/chat', icon: <MessageCircle size={18} /> },
  { name: 'Email', href: '/support/email', icon: <Mail size={18} /> },
];

export default function Sidebar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulando usuário logado
    setUser({
      id: '1',
      name: 'João Psicólogo',
      role: 'Psicologo', // Troque para 'patient' para testar como paciente
    });

    // Exemplo de fetch:
    /*
    fetch('/api/me')
      .then(res => res.json())
      .then(data => setUser(data));
    */
  }, []);

  if (!user) return null; // ou loading...

  const filteredMenu = allMenuItems.filter(item => {
    // Se item não tiver restrição, exibe
    if (!item.roles) return true;
    return item.roles.includes(user.role);
  });

  return (
    <aside className="w-64 border-r border-gray-200 bg-white text-gray-800 min-h-screen px-4 py-6">
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
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors"
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
        <ul className="space-y-1">
          {supportItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors"
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
