<div align="center">
  <h1>🧠 PsicoApp</h1>
  <p><strong>Plataforma moderna para gestão de consultórios de psicologia</strong></p>
  
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black" alt="React" />
</div>

---

## 📋 Sobre o Projeto

O **PsicoApp** é uma plataforma completa para gestão de consultórios de psicologia, desenvolvida com as mais modernas tecnologias web. A aplicação oferece funcionalidades específicas tanto para psicólogos quanto para pacientes, proporcionando uma experiência integrada e eficiente.

### ✨ Principais Funcionalidades

#### Para Psicólogos 👨‍⚕️
- **Dashboard Completo**: Visão geral de métricas e performance
- **Gestão de Pacientes**: Cadastro, edição e acompanhamento
- **Agenda de Atendimentos**: Agendamento e controle de sessões
- **Relatórios Financeiros**: Controle de receitas e pagamentos
- **Status dos Pacientes**: Acompanhamento de evolução e progresso

#### Para Pacientes 👤
- **Dashboard Personalizado**: Visão do seu progresso
- **Consulta de Psicólogos**: Busca e seleção de profissionais
- **Agendamento Online**: Marcação de consultas com pagamento via PIX
- **Registro de Atividades**: Acompanhamento de atividades diárias
- **Controle de Humor**: Registro e histórico de estados emocionais

## 🚀 Tecnologias Utilizadas

- **[Next.js 14](https://nextjs.org/)** - Framework React com App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utilitário
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones
- **[Recharts](https://recharts.org/)** - Gráficos e visualizações
- **[Framer Motion](https://www.framer.com/motion/)** - Animações suaves

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm, yarn, pnpm ou bun

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/psico-app.git
cd psico-app
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.local.example .env.local
```

Edite o arquivo `.env.local` com suas configurações:
```env
# Banco de dados
DATABASE_URL="sua_url_do_banco"

# Autenticação
NEXTAUTH_SECRET="sua_chave_secreta"
NEXTAUTH_URL="http://localhost:3000"

# Pagamentos (PIX)
PIX_API_KEY="sua_chave_api_pix"
```

### 4. Execute o servidor de desenvolvimento
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 14)
│   ├── dashboard/         # Páginas do dashboard
│   │   ├── activities/    # Gestão de atividades
│   │   ├── appointments/  # Agendamentos
│   │   ├── financial/     # Relatórios financeiros
│   │   ├── mood/         # Controle de humor
│   │   ├── patients/     # Gestão de pacientes
│   │   └── psychologists/ # Busca de psicólogos
│   ├── globals.css       # Estilos globais
│   └── layout.tsx        # Layout raiz
├── components/            # Componentes reutilizáveis
│   ├── cards/            # Cards (Appointment, Activity, etc.)
│   ├── modals/           # Modais da aplicação
│   ├── Sidebar/          # Navegação lateral
│   └── MobileSidebar/    # Navegação mobile
└── lib/                  # Utilitários e configurações
```

## 🎨 Componentes Principais

### Cards Informativos
- **[`AppointmentCard`](src/components/cards/AppointmentCard.tsx)** - Exibição de agendamentos
- **[`ActivityCard`](src/components/cards/ActivityCard.tsx)** - Registro de atividades

### Modais Interativos
- **[`ScheduleAppointmentModal`](src/components/modals/ScheduleAppointmentModal.tsx)** - Agendamento com PIX
- **[`EditAppointmentModal`](src/components/modals/EditAppointmentModal.tsx)** - Edição de consultas
- **[`ViewPsychologistModal`](src/components/modals/ViewPsychologistModal.tsx)** - Perfil de psicólogos

### Sistema de Navegação
- **[`Sidebar`](src/components/Sidebar/Sidebar.tsx)** - Navegação desktop
- **[`MobileSidebar`](src/components/MobileSidebar/MobileSidebar.tsx)** - Navegação responsiva

## 📊 Funcionalidades Especiais

### 💰 Sistema de Pagamentos
- Integração PIX com QR Code
- Verificação automática de pagamentos
- Relatórios financeiros detalhados

### 📈 Dashboard Analytics
- Gráficos de evolução de pacientes
- Métricas de performance
- Indicadores de satisfação

### 😊 Controle de Humor
- Registro diário de estados emocionais
- Visualização em gráficos temporais
- Sistema de avaliação por escalas

### 📱 Design Responsivo
- Interface adaptável para desktop e mobile
- Componentes otimizados para touch
- Navegação intuitiva em todos os dispositivos

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm run build
npx vercel --prod
```

### Docker
```bash
docker build -t psico-app .
docker run -p 3000:3000 psico-app
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

- **WhatsApp**: [(16) 99999-9999](https://wa.me/5516999999999)
- **Email**: [suporte@psicoapp.com.br](mailto:suporte@psicoapp.com.br)

---

<div align="center">
  <p>Desenvolvido com ❤️ para a comunidade de psicologia</p>
</div>