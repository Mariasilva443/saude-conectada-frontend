import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, NavLink, useNavigate } from "react-router-dom";
import {
  Activity, CalendarDays, ClipboardList, FileBarChart, LayoutDashboard,
  LogOut, Menu, Users, UserPlus, Clock3, CheckCircle2, AlertCircle,
  Search, ChevronRight, Bell, X, Plus, UserRound, Stethoscope, Filter
} from "lucide-react";
import "./styles.css";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/agendamentos", label: "Agendamentos", icon: CalendarDays },
  { to: "/pacientes", label: "Pacientes", icon: Users },
  { to: "/fila", label: "Fila de Atendimento", icon: ClipboardList },
  { to: "/relatorios", label: "Relatórios", icon: FileBarChart },
];

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Shell />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/agendamentos" element={<Agendamentos />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/fila" element={<Fila />} />
        <Route path="/relatorios" element={<Relatorios />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function entrar(e) {
    e.preventDefault();
    if (!email || !senha) {
      setError("Preencha o e-mail/CPF e a senha.");
      return;
    }
    navigate("/dashboard");
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="brand brand-center">
          <div className="brand-mark"><Activity size={28}/></div>
          <div>
            <strong>Saúde Conectada</strong>
            <span>Gestão e Atendimento em Saúde</span>
          </div>
        </div>
        <div className="login-heading">
          <h1>Bem-vindo</h1>
          <p>Acesse o sistema para continuar.</p>
        </div>
        <form onSubmit={entrar} className="form-stack">
          <label>E-mail ou CPF
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite seu e-mail ou CPF" />
          </label>
          <label>Senha
            <div className="password-field">
              <input type={showPassword ? "text" : "password"} value={senha} onChange={e => setSenha(e.target.value)} placeholder="Digite sua senha" />
              <button type="button" className="ghost-btn" onClick={() => setShowPassword(v => !v)}>{showPassword ? "Ocultar" : "Mostrar"}</button>
            </div>
          </label>
          {error && <div className="alert error"><AlertCircle size={17}/>{error}</div>}
          <button className="primary-btn full" type="submit">Entrar</button>
          <button type="button" className="link-btn">Esqueci minha senha</button>
        </form>
        <div className="demo-note">Modo demonstração: qualquer e-mail/CPF e senha preenchidos permitem entrar.</div>
      </div>
    </div>
  );
}

function Shell() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function logout() {
    navigate("/login");
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-top">
          <div className="brand">
            <div className="brand-mark"><Activity size={24}/></div>
            <div><strong>Saúde<br/>Conectada</strong><span>APS</span></div>
          </div>
          <button className="mobile-close" onClick={() => setOpen(false)}><X/></button>
        </div>
        <nav className="nav">
          {navItems.map(({to,label,icon:Icon}) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>
              <Icon size={19}/><span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="user-mini"><div className="avatar">AM</div><div><strong>Admin</strong><span>Gestor</span></div></div>
          <button className="logout-btn" onClick={logout}><LogOut size={18}/> Sair</button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button className="menu-btn" onClick={() => setOpen(true)}><Menu/></button>
          <div className="breadcrumb">Saúde Conectada <ChevronRight size={15}/> <span>Painel</span></div>
          <div className="top-actions">
            <button className="icon-btn" title="Notificações"><Bell size={19}/><i></i></button>
            <div className="top-user"><div className="avatar small">AM</div><span>Administrador</span></div>
          </div>
        </header>
        <div className="page">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/agendamentos" element={<Agendamentos />} />
            <Route path="/pacientes" element={<Pacientes />} />
            <Route path="/fila" element={<Fila />} />
            <Route path="/relatorios" element={<Relatorios />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function PageHeader({title, subtitle, action}) {
  return <div className="page-header"><div><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>
}

function StatCard({icon:Icon, label, value, note, tone=""}) {
  return <div className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={22}/></div><div><span>{label}</span><strong>{value}</strong><small>{note}</small></div></div>
}

function Dashboard() {
  const navigate = useNavigate();
  return <div>
    <PageHeader title="Dashboard" subtitle="Visão geral dos atendimentos de hoje." action={<button className="primary-btn" onClick={() => navigate("/agendamentos")}><Plus size={18}/> Novo agendamento</button>}/>
    <div className="stats-grid">
      <StatCard icon={CalendarDays} label="Consultas agendadas" value="24" note="+8% em relação a ontem" tone="blue"/>
      <StatCard icon={CheckCircle2} label="Atendimentos realizados" value="16" note="67% da agenda" tone="green"/>
      <StatCard icon={Clock3} label="Pacientes em espera" value="05" note="Tempo médio: 18 min" tone="orange"/>
      <StatCard icon={Users} label="Novos pacientes" value="07" note="Hoje" tone="purple"/>
    </div>
    <div className="dashboard-grid">
      <section className="panel">
        <div className="panel-title"><div><h2>Agenda do dia</h2><p>Atendimentos programados</p></div><button className="text-btn" onClick={() => navigate("/agendamentos")}>Ver agenda <ChevronRight size={16}/></button></div>
        <div className="appointment-list">
          {[
            ["08:00","Maria da Silva","Clínico Geral","Realizado"],
            ["08:30","João Pereira","Enfermagem","Realizado"],
            ["09:00","Ana Santos","Pré-natal","Em atendimento"],
            ["09:30","Carlos Oliveira","Clínico Geral","Aguardando"],
            ["10:00","Francisca Lima","Hipertensão","Aguardando"],
          ].map((a,i) => <div className="appointment" key={i}><div className="time">{a[0]}</div><div className="person"><div className="avatar soft">{a[1].split(" ").map(x=>x[0]).slice(0,2).join("")}</div><div><strong>{a[1]}</strong><span>{a[2]}</span></div></div><Status text={a[3]}/></div>)}
        </div>
      </section>
      <section className="panel">
        <div className="panel-title"><div><h2>Fila de atendimento</h2><p>Atualização em tempo real</p></div><button className="icon-btn"><Filter size={17}/></button></div>
        <div className="queue-summary"><div><span>Em espera</span><strong>05</strong></div><div><span>Em atendimento</span><strong>01</strong></div></div>
        <div className="queue-list">
          {[["P001","Ana Santos","Pré-natal","Prioridade"],["N014","Carlos Oliveira","Clínico Geral","Normal"],["N015","Francisca Lima","Hipertensão","Normal"],["N016","Pedro Costa","Enfermagem","Normal"]].map((p,i)=><div className="queue-row" key={i}><b className="ticket">{p[0]}</b><div><strong>{p[1]}</strong><span>{p[2]}</span></div><span className={`priority ${p[3]==="Prioridade"?"high":""}`}>{p[3]}</span></div>)}
        </div>
      </section>
    </div>
  </div>
}

function Status({text}) {
  const cls = text === "Realizado" ? "done" : text === "Em atendimento" ? "doing" : "waiting";
  return <span className={`status ${cls}`}><i></i>{text}</span>
}

function Agendamentos() {
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState("");
  const data = [
    ["08:00","Maria da Silva","123.456.789-00","Clínico Geral","Dr. Rafael Lima","Realizado"],
    ["08:30","João Pereira","987.654.321-00","Enfermagem","Enf. Camila Souza","Realizado"],
    ["09:00","Ana Santos","321.654.987-00","Pré-natal","Dra. Juliana Alves","Em atendimento"],
    ["09:30","Carlos Oliveira","456.789.123-00","Clínico Geral","Dr. Rafael Lima","Aguardando"],
    ["10:00","Francisca Lima","654.321.987-00","Hipertensão","Dra. Juliana Alves","Aguardando"],
    ["10:30","Pedro Costa","741.852.963-00","Enfermagem","Enf. Camila Souza","Aguardando"],
  ];
  const shown = data.filter(r => r[1].toLowerCase().includes(filter.toLowerCase()) || r[3].toLowerCase().includes(filter.toLowerCase()));
  return <div>
    <PageHeader title="Agendamentos" subtitle="Gerencie consultas programadas e demandas de atendimento." action={<button className="primary-btn" onClick={() => setModal(true)}><Plus size={18}/> Novo agendamento</button>}/>
    <div className="toolbar"><div className="search"><Search size={18}/><input placeholder="Buscar paciente ou atendimento..." value={filter} onChange={e=>setFilter(e.target.value)}/></div><button className="secondary-btn"><CalendarDays size={17}/> 30/08/2026 <ChevronRight size={15}/></button></div>
    <section className="panel table-panel"><div className="panel-title"><div><h2>Agenda de hoje</h2><p>{shown.length} registros encontrados</p></div><button className="secondary-btn"><Filter size={16}/> Filtros</button></div>
      <div className="table-wrap"><table><thead><tr><th>Horário</th><th>Paciente</th><th>CPF</th><th>Atendimento</th><th>Profissional</th><th>Status</th></tr></thead><tbody>
        {shown.map((r,i)=><tr key={i}><td><b>{r[0]}</b></td><td><div className="table-person"><div className="avatar soft">{r[1].split(" ").map(x=>x[0]).slice(0,2).join("")}</div><span>{r[1]}</span></div></td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td><td><Status text={r[5]}/></td></tr>)}
      </tbody></table></div>
    </section>
    {modal && <AppointmentModal onClose={()=>setModal(false)}/>}
  </div>
}

function AppointmentModal({onClose}) {
  const [saved,setSaved] = useState(false);
  return <div className="modal-backdrop"><div className="modal">
    <div className="modal-head"><div><h2>Novo agendamento</h2><p>Preencha os dados da consulta.</p></div><button className="icon-btn" onClick={onClose}><X/></button></div>
    {saved ? <div className="success-box"><CheckCircle2 size={38}/><h3>Agendamento confirmado!</h3><p>Consulta registrada para 10:30 com Enf. Camila Souza.</p><button className="primary-btn" onClick={onClose}>Fechar</button></div> :
    <div className="form-grid"><label>Paciente<input placeholder="Nome ou CPF"/></label><label>Tipo de atendimento<select><option>Demanda programada</option><option>Demanda espontânea</option></select></label><label>Profissional<select><option>Dr. Rafael Lima</option><option>Dra. Juliana Alves</option><option>Enf. Camila Souza</option></select></label><label>Data<input type="date" defaultValue="2026-08-30"/></label><label>Horário<select><option>10:30</option><option>11:00</option><option>11:30</option></select></label><label>Observação<input placeholder="Opcional"/></label><div className="modal-actions"><button className="secondary-btn" onClick={onClose}>Cancelar</button><button className="primary-btn" onClick={()=>setSaved(true)}>Confirmar agendamento</button></div></div>}
  </div></div>
}

function Pacientes() {
  const [modal,setModal]=useState(false);
  const [search,setSearch]=useState("");
  const patients=[
    ["Maria da Silva","123.456.789-00","15/03/1985","(86) 99999-1111","Ativo"],
    ["João Pereira","987.654.321-00","22/07/1972","(86) 98888-2222","Ativo"],
    ["Ana Santos","321.654.987-00","10/11/1998","(86) 97777-3333","Ativo"],
    ["Carlos Oliveira","456.789.123-00","03/05/1960","(86) 96666-4444","Ativo"],
    ["Francisca Lima","654.321.987-00","19/09/1955","(86) 95555-5555","Ativo"],
  ];
  const shown=patients.filter(p=>p[0].toLowerCase().includes(search.toLowerCase())||p[1].includes(search));
  return <div>
    <PageHeader title="Pacientes" subtitle="Cadastre e consulte os dados básicos dos pacientes." action={<button className="primary-btn" onClick={()=>setModal(true)}><UserPlus size={18}/> Novo paciente</button>}/>
    <div className="toolbar"><div className="search"><Search size={18}/><input placeholder="Buscar por nome ou CPF..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div>
    <section className="panel table-panel"><div className="panel-title"><div><h2>Pacientes cadastrados</h2><p>Dados básicos para apoio ao atendimento.</p></div><span className="count-badge">{shown.length} pacientes</span></div>
      <div className="table-wrap"><table><thead><tr><th>Paciente</th><th>CPF</th><th>Data de nascimento</th><th>Telefone</th><th>Status</th><th></th></tr></thead><tbody>{shown.map((p,i)=><tr key={i}><td><div className="table-person"><div className="avatar soft">{p[0].split(" ").map(x=>x[0]).slice(0,2).join("")}</div><span>{p[0]}</span></div></td><td>{p[1]}</td><td>{p[2]}</td><td>{p[3]}</td><td><span className="status done"><i></i>{p[4]}</span></td><td><button className="more-btn">•••</button></td></tr>)}</tbody></table></div>
    </section>
    {modal && <PatientModal onClose={()=>setModal(false)}/>}
  </div>
}

function PatientModal({onClose}) {
  const [saved,setSaved]=useState(false);
  return <div className="modal-backdrop"><div className="modal wide">
    <div className="modal-head"><div><h2>Novo paciente</h2><p>Informe os dados básicos de identificação e contato.</p></div><button className="icon-btn" onClick={onClose}><X/></button></div>
    {saved ? <div className="success-box"><CheckCircle2 size={38}/><h3>Paciente cadastrado!</h3><p>O cadastro foi salvo e já pode ser utilizado em agendamentos.</p><button className="primary-btn" onClick={onClose}>Fechar</button></div> :
    <div className="form-grid"><label className="span-2">Nome completo<input placeholder="Digite o nome completo"/></label><label>CPF<input placeholder="000.000.000-00"/></label><label>Data de nascimento<input type="date"/></label><label>Telefone<input placeholder="(00) 00000-0000"/></label><label>E-mail<input placeholder="email@exemplo.com"/></label><label className="span-2">Endereço<input placeholder="Rua, número, bairro"/></label><div className="modal-actions"><button className="secondary-btn" onClick={onClose}>Cancelar</button><button className="primary-btn" onClick={()=>setSaved(true)}>Salvar paciente</button></div></div>}
  </div></div>
}

function Fila() {
  const [queue,setQueue]=useState([
    ["P001","Ana Santos","Pré-natal","Prioridade"],
    ["N014","Carlos Oliveira","Clínico Geral","Normal"],
    ["N015","Francisca Lima","Hipertensão","Normal"],
    ["N016","Pedro Costa","Enfermagem","Normal"],
    ["N017","José Almeida","Clínico Geral","Normal"],
  ]);
  function callNext(){ if(queue.length) setQueue(q=>q.slice(1)); }
  return <div>
    <PageHeader title="Fila de Atendimento" subtitle="Organize a ordem de chegada e acompanhe os pacientes em espera." action={<button className="primary-btn" onClick={()=>setQueue(q=>[...q,[`N${18+q.length}`,"Novo paciente","Clínico Geral","Normal"]])}><Plus size={18}/> Adicionar à fila</button>}/>
    <div className="queue-cards"><div className="queue-card"><span>Pacientes em espera</span><strong>{queue.length.toString().padStart(2,"0")}</strong></div><div className="queue-card"><span>Em atendimento</span><strong>01</strong></div><div className="queue-card"><span>Tempo médio</span><strong>18 min</strong></div></div>
    <section className="panel"><div className="panel-title"><div><h2>Fila atual</h2><p>Prioridades legais são exibidas primeiro.</p></div><button className="primary-btn" onClick={callNext} disabled={!queue.length}>Chamar próximo</button></div>
      <div className="queue-table">{queue.map((p,i)=><div className="queue-item" key={i}><span className="position">{i+1}</span><b className="ticket big">{p[0]}</b><div className="queue-person"><div className="avatar soft">{p[1].split(" ").map(x=>x[0]).slice(0,2).join("")}</div><div><strong>{p[1]}</strong><span>{p[2]}</span></div></div><span className={`priority ${p[3]==="Prioridade"?"high":""}`}>{p[3]}</span><span className="arrival"><Clock3 size={15}/> {8+i}:2{i}</span></div>)}</div>
      {queue.length===0 && <div className="empty"><CheckCircle2 size={38}/><h3>Fila vazia</h3><p>Todos os pacientes foram chamados.</p></div>}
    </section>
  </div>
}

function Relatorios() {
  const [type,setType]=useState("Atendimentos Realizados");
  const bars=[12,18,15,22,17,24,20];
  return <div>
    <PageHeader title="Relatórios" subtitle="Indicadores administrativos e assistenciais para apoio à gestão."/>
    <section className="panel filters-panel"><div className="panel-title"><div><h2>Filtros do relatório</h2><p>Defina o período e o tipo de informação.</p></div></div><div className="report-filters"><label>Tipo de relatório<select value={type} onChange={e=>setType(e.target.value)}><option>Atendimentos Realizados</option><option>Taxa de Faltas</option><option>Produtividade por Profissional</option><option>Demanda Reprimida</option><option>Tempo Médio de Espera</option></select></label><label>Data inicial<input type="date" defaultValue="2026-08-01"/></label><label>Data final<input type="date" defaultValue="2026-08-30"/></label><button className="primary-btn"><FileBarChart size={17}/> Gerar relatório</button></div></section>
    <div className="report-grid"><section className="panel"><div className="panel-title"><div><h2>{type}</h2><p>01 a 30 de agosto de 2026</p></div><button className="secondary-btn">Exportar</button></div><div className="chart"><div className="y-axis"><span>30</span><span>20</span><span>10</span><span>0</span></div><div className="bars">{bars.map((v,i)=><div className="bar-wrap" key={i}><div className="bar" style={{height:`${v*3.2}%`}}></div><span>{["24","25","26","27","28","29","30"][i]}</span></div>)}</div></div></section>
      <section className="panel indicators"><h2>Indicadores</h2><div className="indicator"><span>Taxa de ocupação</span><strong>82%</strong><small>+4,2% no período</small></div><div className="indicator"><span>Taxa de absenteísmo</span><strong>8,5%</strong><small>-1,1% no período</small></div><div className="indicator"><span>Produtividade média</span><strong>16,4</strong><small>atendimentos/profissional</small></div><div className="indicator"><span>Tempo médio de espera</span><strong>18 min</strong><small>-3 min no período</small></div></section></div>
  </div>
}

createRoot(document.getElementById("root")).render(<BrowserRouter><App /></BrowserRouter>);
