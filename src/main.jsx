import React, { createContext, useContext, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AlertTriangle, BadgeCheck, BarChart3, Building2, Check, ChevronRight, ClipboardCheck, Download, FileText, Globe2, Layers3, LockKeyhole, Scale, ShieldCheck, Sparkles, Target, Users } from 'lucide-react';
import './styles.css';

const copy = {
  en: {
    nav: ['Platform', 'Risk Engine', 'Checklist', 'Pricing'], lang: 'RO',
    heroTitle: 'Automated EU AI Act & ISO 42001 Compliance Pre-Audit for Enterprise SaaS.',
    heroText: 'AuroraLedger helps B2B teams classify AI risk, map obligations, and generate board-ready readiness reports while keeping assessment data in the browser.',
    start: 'Start assessment', report: 'Generate report', disclaimer: 'Self-service automated assessment tool. Not regulated legal or financial advice. Billing and operations are managed by MRINTELLIGENCE & Co LTD.',
    onboarding: 'Sovereign browser workflow: your questionnaire responses, checklist comments, and report draft are processed locally in this session with zero-cloud retention for client assessment data.',
    risk: 'Risk Classification Engine', checklist: 'Compliance Checklist', pricing: 'Enterprise pricing', progress: 'Compliance readiness', comments: 'Evidence / owner comments', print: 'Print / save PDF'
  },
  ro: {
    nav: ['Platformă', 'Motor de risc', 'Checklist', 'Prețuri'], lang: 'EN',
    heroTitle: 'Pre-audit automatizat pentru EU AI Act și ISO 42001 dedicat Enterprise SaaS.',
    heroText: 'AuroraLedger ajută echipele B2B să clasifice riscul AI, să mapeze obligațiile și să genereze rapoarte executive, păstrând datele evaluării în browser.',
    start: 'Începe evaluarea', report: 'Generează raport', disclaimer: 'Instrument automatizat self-service de evaluare. Nu oferă consultanță juridică sau financiară reglementată. Facturarea și operațiunile sunt gestionate de MRINTELLIGENCE & Co LTD.',
    onboarding: 'Flux suveran în browser: răspunsurile, comentariile și raportul sunt procesate local în această sesiune, cu retenție zero-cloud pentru datele clientului.',
    risk: 'Motor clasificare risc', checklist: 'Checklist conformitate', pricing: 'Prețuri enterprise', progress: 'Grad pregătire', comments: 'Dovezi / comentarii responsabil', print: 'Tipărește / salvează PDF'
  }
};

const questions = [
  { id: 'prohibited', weight: 100, risk: 'UNACCEPTABLE RISK', q: { en: 'Does the system manipulate behavior, exploit vulnerabilities, perform social scoring, or use prohibited biometric categorization?', ro: 'Sistemul manipulează comportamentul, exploatează vulnerabilități, face scor social sau categorizare biometrică interzisă?' } },
  { id: 'biometric', weight: 55, risk: 'HIGH RISK', q: { en: 'Does it perform remote biometric identification, emotion recognition in regulated contexts, or critical access control?', ro: 'Realizează identificare biometrică la distanță, recunoaștere emoțională în contexte reglementate sau control critic de acces?' } },
  { id: 'credit', weight: 50, risk: 'HIGH RISK', q: { en: 'Is it used for credit scoring, employment, education, essential services, law enforcement, migration, or justice decisions?', ro: 'Este folosit pentru scoring de credit, angajare, educație, servicii esențiale, aplicarea legii, migrație sau justiție?' } },
  { id: 'chatbot', weight: 25, risk: 'LIMITED RISK', q: { en: 'Does it interact with users as a chatbot, generate synthetic media, or require transparency notices under Article 50?', ro: 'Interacționează ca chatbot, generează media sintetică sau necesită notificări de transparență conform Art. 50?' } },
  { id: 'internal', weight: 5, risk: 'MINIMAL RISK', q: { en: 'Is it limited to internal productivity, analytics, or low-impact recommendations with human review?', ro: 'Este limitat la productivitate internă, analiză sau recomandări cu impact redus și revizuire umană?' } }
];

const frameworks = [
  ['EU AI Act', ['Art. 9 risk management lifecycle', 'Art. 10 training, validation, and testing data governance', 'Art. 13 user transparency and instructions', 'Art. 14 human oversight controls']],
  ['ALTAI', ['Human agency and oversight', 'Technical robustness and safety', 'Privacy and data governance', 'Transparency', 'Diversity, non-discrimination, fairness', 'Societal and environmental wellbeing', 'Accountability']],
  ['UK ICO Toolkit', ['Must: define lawful basis and DPIA scope', 'Should: minimize personal data and retention', 'Could: add privacy enhancing technologies and monitoring']],
  ['ISO/IEC 42001:2023', ['AI management system context and scope', 'Leadership, policy, roles, and accountability', 'AI risk assessment and treatment process', 'Operational controls, performance evaluation, and improvement']]
];

const AppContext = createContext();
function Provider({ children }) {
  const [lang, setLang] = useState('en');
  const [answers, setAnswers] = useState({});
  const initial = frameworks.flatMap(([fw, items]) => items.map((text, i) => ({ id: `${fw}-${i}`, fw, text, done: false, comment: '' })));
  const [checks, setChecks] = useState(initial);
  const value = useMemo(() => ({ lang, t: copy[lang], setLang, answers, setAnswers, checks, setChecks }), [lang, answers, checks]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
const useApp = () => useContext(AppContext);

function classify(answers) {
  if (answers.prohibited) return { label: 'UNACCEPTABLE RISK', score: 100, tone: 'danger' };
  const score = questions.reduce((sum, q) => sum + (answers[q.id] ? q.weight : 0), 0);
  if (score >= 50) return { label: 'HIGH RISK', score, tone: 'high' };
  if (score >= 20) return { label: 'LIMITED RISK', score, tone: 'limited' };
  return { label: 'MINIMAL RISK', score, tone: 'minimal' };
}

function Header() { const { lang, setLang, t } = useApp(); return <header className="nav"><a className="brand" href="#top"><ShieldCheck/>AuroraLedger<span>.eu</span></a><nav>{t.nav.map(n => <a key={n} href={`#${n.toLowerCase().split(' ')[0]}`}>{n}</a>)}</nav><button onClick={()=>setLang(lang==='en'?'ro':'en')} className="ghost"><Globe2 size={16}/>{t.lang}</button></header>; }
function Hero() { const { t } = useApp(); return <section id="top" className="hero"><div><p className="eyebrow"><Sparkles size={16}/> Zero-cloud retention • EU-first governance</p><h1>{t.heroTitle}</h1><p className="lead">{t.heroText}</p><div className="actions"><a className="btn" href="#risk">{t.start}<ChevronRight size={18}/></a><a className="btn secondary" href="#report">{t.report}</a></div><p className="notice"><LockKeyhole size={18}/>{t.onboarding}</p></div><div className="heroCard"><BarChart3/><h3>Executive readiness cockpit</h3><div className="metric"><span>EU AI Act</span><b>Art. 5 / 6 / 50</b></div><div className="metric"><span>ISO 42001</span><b>AI Management System</b></div><div className="metric"><span>Evidence</span><b>Local-first</b></div></div></section>; }
function Landing() { const { t } = useApp(); const features = [['Risk intelligence', Target], ['Framework mapping', Layers3], ['Board reporting', FileText], ['Human oversight', Users]]; return <><section id="platform" className="grid cards">{features.map(([f,Icon])=><article className="card" key={f}><Icon/><h3>{f}</h3><p>Structured controls, traceable evidence, and enterprise-grade pre-audit workflows for SaaS AI systems.</p></article>)}</section><section id="pricing" className="pricing"><h2>{t.pricing}</h2>{['Starter Audit €490', 'Growth Governance €1,490', 'Enterprise Sovereign Custom'].map((p,i)=><div className="tier" key={p}><BadgeCheck/><b>{p}</b><span>{i===0?'Single product assessment':i===1?'Multi-team compliance workspace':'Procurement, DPA, and private deployment review'}</span></div>)}</section></>; }
function RiskEngine() { const { lang, t, answers, setAnswers } = useApp(); const result = classify(answers); return <section id="risk" className="panel"><h2><Scale/>{t.risk}</h2><div className="riskBadge" data-tone={result.tone}>{result.label}</div>{questions.map((q, i)=><label className="question" key={q.id}><span><b>{i+1}.</b> {q.q[lang]}</span><input type="checkbox" checked={!!answers[q.id]} onChange={e=>setAnswers({...answers,[q.id]:e.target.checked})}/></label>)}</section>; }
function Checklist() { const { t, checks, setChecks } = useApp(); const done = checks.filter(c=>c.done).length; const pct = Math.round(done / checks.length * 100); return <section id="checklist" className="panel"><h2><ClipboardCheck/>{t.checklist}</h2><div className="progress"><span style={{width:`${pct}%`}}/><b>{pct}% {t.progress}</b></div>{frameworks.map(([fw])=><div className="framework" key={fw}><h3>{fw}</h3>{checks.filter(c=>c.fw===fw).map(c=><div className="check" key={c.id}><label><input type="checkbox" checked={c.done} onChange={e=>setChecks(checks.map(x=>x.id===c.id?{...x,done:e.target.checked}:x))}/><span>{c.text}</span></label><textarea placeholder={t.comments} value={c.comment} onChange={e=>setChecks(checks.map(x=>x.id===c.id?{...x,comment:e.target.value}:x))}/></div>)}</div>)}</section>; }
function Report() { const { t, checks, answers } = useApp(); const result = classify(answers); const pct = Math.round(checks.filter(c=>c.done).length / checks.length * 100); return <section id="report" className="panel report"><h2><Download/>Pre-Audit Compliance Readiness Report</h2><button className="btn" onClick={()=>window.print()}>{t.print}</button><div className="sheet"><h2>AuroraLedger.eu</h2><p><b>Classification:</b> {result.label}</p><p><b>Readiness:</b> {pct}%</p><h3>Completed controls</h3><ul>{checks.filter(c=>c.done).map(c=><li key={c.id}><Check size={14}/>{c.fw}: {c.text}{c.comment && ` — ${c.comment}`}</li>)}</ul><p className="legal">{t.disclaimer}</p></div></section>; }
function Footer(){ const { t }=useApp(); return <footer><Building2/> <span>{t.disclaimer}</span></footer>; }
function App(){ return <Provider><Header/><main><Hero/><Landing/><RiskEngine/><Checklist/><Report/></main><Footer/></Provider>; }

createRoot(document.getElementById('root')).render(<App />);
