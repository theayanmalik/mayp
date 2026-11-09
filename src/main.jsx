import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight, Github, Linkedin, Mail, Download, BrainCircuit, Database, Layers, CheckCircle2, Code2, ScanFace,
  Sun, Moon, Menu, X, Search, Command, Copy, Check, FileText, ShieldCheck, Award, GraduationCap, Trophy, Send,
  ChevronRight, Sparkles, Server, Cloud, Building2, Eye, Loader2, Play, Newspaper, Quote, Camera, Maximize2,
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useInView, useReducedMotion } from 'motion/react';
import { GH, LI, EMAIL, roles, stats, projects, experience, skills, certs, education, press, milestones } from './data.js';
import './style.css';

const SECTIONS = [['work', 'Work'], ['experience', 'Experience'], ['milestones', 'Milestones'], ['skills', 'Skills'], ['credentials', 'Credentials'], ['about', 'About'], ['contact', 'Contact']];
const projectIcons = { genflash: BrainCircuit, recsys: Database, tracker: Layers, election: CheckCircle2, complaints: Code2, deepfake: ScanFace };
const skillIcons = { 'AI & ML': BrainCircuit, 'Languages & Web': Code2, 'DevOps & Cloud': Cloud, 'Data & Enterprise': Server };

/* ---------- hooks ---------- */
function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'); } catch { return 'dark'; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);
  return [theme, () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))];
}

function useActiveSection() {
  const [active, setActive] = useState('');
  useEffect(() => {
    const els = SECTIONS.map(([id]) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => e.isIntersecting && setActive(e.target.id));
    }, { rootMargin: '-45% 0px -50% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(text => {
    navigator.clipboard?.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); });
  }, []);
  return [copied, copy];
}

/* ---------- small components ---------- */
function Spotlight({ as: Tag = 'div', className = '', children, ...rest }) {
  const onMove = e => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return <Tag className={'spot ' + className} onMouseMove={onMove} {...rest}>{children}</Tag>;
}

function Reveal({ children, delay = 0, className }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function Counter({ value, decimals = 0, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) { setN(value); return; }
    let raf, start;
    const tick = t => {
      start ??= t;
      const p = Math.min((t - start) / 1600, 1);
      setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);
  return <span ref={ref}>{n.toFixed(decimals)}{suffix}</span>;
}

function Typer({ words }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [text, setText] = useState(reduce ? words[0] : '');
  const [del, setDel] = useState(false);
  useEffect(() => {
    if (reduce) return;
    const word = words[i % words.length];
    let t;
    if (!del && text === word) t = setTimeout(() => setDel(true), 1700);
    else if (del && text === '') { setDel(false); setI(i + 1); }
    else t = setTimeout(() => setText(del ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)), del ? 35 : 70);
    return () => clearTimeout(t);
  }, [text, del, i, words, reduce]);
  return <span className="typer">{text}<span className="caret" aria-hidden /></span>;
}

function SectionHead({ kicker, title, em, desc, children }) {
  return (
    <Reveal className="section-head">
      <div>
        <div className="kicker">{kicker}</div>
        <h2>{title} <em>{em}</em></h2>
        {desc && <p>{desc}</p>}
      </div>
      {children}
    </Reveal>
  );
}

/* ---------- hero neural canvas ---------- */
function NeuralCanvas() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const c = ref.current; const ctx = c.getContext('2d');
    let w, h, raf, nodes = [];
    const mouse = { x: -999, y: -999 };
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const resize = () => {
      const r = c.getBoundingClientRect(); w = r.width; h = r.height;
      c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(70, (w * h) / 6500));
      nodes = Array.from({ length: count }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.6 + .8 }));
    };
    const accent = () => getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || '179,243,108';
    const draw = () => {
      const a = accent();
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        if (!reduce) { n.x += n.vx; n.y += n.vy; if (n.x < 0 || n.x > w) n.vx *= -1; if (n.y < 0 || n.y > h) n.vy *= -1; }
        const dx = n.x - mouse.x, dy = n.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 110 && !reduce) { n.x += dx / d * .9; n.y += dy / d * .9; }
      }
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const p = nodes[i], q = nodes[j], d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 120) { ctx.strokeStyle = `rgba(${a},${(1 - d / 120) * .35})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
      }
      for (const n of nodes) {
        const near = Math.hypot(n.x - mouse.x, n.y - mouse.y) < 160;
        ctx.fillStyle = `rgba(${a},${near ? 1 : .7})`; ctx.beginPath(); ctx.arc(n.x, n.y, near ? n.r + 1.2 : n.r, 0, Math.PI * 2); ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    const onMove = e => { const r = c.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; if (reduce) draw(); };
    const onLeave = () => { mouse.x = mouse.y = -999; };
    resize(); draw();
    const ro = new ResizeObserver(() => { resize(); if (reduce) draw(); }); ro.observe(c);
    c.addEventListener('pointermove', onMove); c.addEventListener('pointerleave', onLeave);
    const mo = new MutationObserver(() => reduce && draw()); mo.observe(document.documentElement, { attributes: true });
    return () => { cancelAnimationFrame(raf); ro.disconnect(); mo.disconnect(); c.removeEventListener('pointermove', onMove); c.removeEventListener('pointerleave', onLeave); };
  }, [reduce]);
  return <canvas ref={ref} className="neural" aria-hidden />;
}

/* ---------- modal shell ---------- */
function Modal({ open, onClose, children, label, wide }) {
  useEffect(() => {
    if (!open) return;
    const onKey = e => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={e => e.target === e.currentTarget && onClose()}>
          <motion.div role="dialog" aria-modal="true" aria-label={label} className={'modal' + (wide ? ' wide' : '')}
            initial={{ opacity: 0, y: 30, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: .98 }} transition={{ duration: .25 }}>
            <button className="icon-btn modal-close" onClick={onClose} aria-label="Close"><X size={18} /></button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- command palette ---------- */
function CommandPalette({ open, setOpen, actions }) {
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const inputRef = useRef(null);
  const list = useMemo(() => actions.filter(a => (a.label + ' ' + a.group).toLowerCase().includes(q.toLowerCase())), [q, actions]);
  useEffect(() => { if (open) { setQ(''); setIdx(0); setTimeout(() => inputRef.current?.focus(), 30); } }, [open]);
  useEffect(() => setIdx(0), [q]);
  const run = a => { setOpen(false); setTimeout(a.run, 60); };
  const onKey = e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx(i => Math.min(i + 1, list.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setIdx(i => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && list[idx]) run(list[idx]);
  };
  let lastGroup = '';
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="overlay palette-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={e => e.target === e.currentTarget && setOpen(false)}>
          <motion.div className="palette" role="dialog" aria-label="Command palette" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="palette-input"><Search size={17} /><input ref={inputRef} value={q} onChange={e => setQ(e.target.value)} onKeyDown={onKey} placeholder="Jump to a section, project or action…" aria-label="Search commands" /><kbd>ESC</kbd></div>
            <div className="palette-list" role="listbox">
              {list.length === 0 && <div className="palette-empty">No results for “{q}”</div>}
              {list.map((a, i) => {
                const head = a.group !== lastGroup ? (lastGroup = a.group) : null;
                return (
                  <React.Fragment key={a.label}>
                    {head && <div className="palette-group">{head}</div>}
                    <button role="option" aria-selected={i === idx} className={'palette-item' + (i === idx ? ' active' : '')} onMouseEnter={() => setIdx(i)} onClick={() => run(a)}>
                      <a.icon size={16} /> <span>{a.label}</span> <ChevronRight size={14} className="pi-arrow" />
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
            <div className="palette-foot"><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> select</span></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- sections ---------- */
function Projects({ onOpen }) {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'AI / ML', 'Full Stack', 'Systems'];
  const visible = projects.filter(p => filter === 'All' || p.groups.includes(filter));
  return (
    <section className="section wrap" id="work">
      <SectionHead kicker="02 / SELECTED WORK" title="Projects with" em="substance." desc="AI applications, full-stack products and systems work. Open any card for the problem, approach and architecture.">
        <div className="filters" role="tablist" aria-label="Filter projects">
          {filters.map(f => (
            <button key={f} role="tab" aria-selected={filter === f} className={'chip' + (filter === f ? ' active' : '')} onClick={() => setFilter(f)}>
              {f}<span className="chip-count">{f === 'All' ? projects.length : projects.filter(p => p.groups.includes(f)).length}</span>
            </button>
          ))}
        </div>
      </SectionHead>
      <motion.div layout className="project-grid">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => {
            const Icon = projectIcons[p.id];
            return (
              <motion.div layout key={p.id} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .3 }} className={i === 0 && filter === 'All' ? 'feature' : ''}>
                <Spotlight as="button" className="project-card" style={{ '--pc': p.accent }} onClick={() => onOpen(p)} aria-label={`Open case study: ${p.title}`}>
                  <div className="pc-top"><span>{p.category}</span><span className="pc-num">/{p.num}</span></div>
                  <div className="pc-visual">
                    <div className="pc-grid" />
                    <div className="pc-icon"><Icon /></div>
                    <div className="pc-flow">{p.flow.slice(0, 4).map((f, k) => <span key={f} style={{ animationDelay: `${k * .25}s` }}>{f}</span>)}</div>
                    {p.metric && <div className="pc-metric"><b>{p.metric.value}</b><small>{p.metric.label}</small></div>}
                  </div>
                  <div className="pc-body">
                    <h3>{p.title}</h3>
                    <h4>{p.subtitle}</h4>
                    <p>{p.desc}</p>
                    <div className="tags">{p.tags.slice(0, 5).map(t => <span key={t}>{t}</span>)}</div>
                    <div className="pc-foot"><span className="pc-cta">View case study <ArrowUpRight size={15} /></span>{p.links.length > 0 && <span className="pc-src"><Github size={14} /> Source</span>}</div>
                  </div>
                </Spotlight>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function CaseStudy({ project, onClose }) {
  const p = project;
  return (
    <Modal open={!!p} onClose={onClose} label={p ? p.title + ' case study' : ''} wide>
      {p && (
        <div className="case" style={{ '--pc': p.accent }}>
          <div className="case-kicker">{p.category}{p.period ? ' · ' + p.period : ''}</div>
          <h2>{p.title}</h2>
          <p className="case-sub">{p.subtitle}</p>
          {p.metric && <div className="case-metric"><b>{p.metric.value}</b><span>{p.metric.label}</span></div>}
          {p.image && <div className="case-photo"><img src={p.image} alt={p.title + ' in use'} loading="lazy" /></div>}
          <div className="case-cols">
            <div><h5>The problem</h5><p>{p.problem}</p><h5>What I built</h5><p>{p.desc}</p></div>
            <div><h5>Approach</h5><ul>{p.approach.map(a => <li key={a}><CheckCircle2 size={15} />{a}</li>)}</ul></div>
          </div>
          <h5>Architecture flow</h5>
          <div className="case-flow">
            {p.flow.map((f, i) => (
              <React.Fragment key={f}>
                <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 + i * .08 }}>{f}</motion.span>
                {i < p.flow.length - 1 && <i aria-hidden />}
              </React.Fragment>
            ))}
          </div>
          <h5>Stack</h5>
          <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
          <div className="case-actions">
            {p.links.map(l => <a key={l.href} className="btn primary" href={l.href} target="_blank" rel="noreferrer"><Github size={16} /> {l.label} on GitHub</a>)}
            {!p.links.length && <span className="muted">Repository not public yet.</span>}
          </div>
        </div>
      )}
    </Modal>
  );
}

function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <section className="section alt" id="experience">
      <div className="wrap">
        <SectionHead kicker="03 / CAREER" title="Where I've" em="worked." desc="Production AI data operations, freelance engineering and enterprise systems." />
        <div className="timeline" ref={ref}>
          <div className="tl-rail"><motion.div className="tl-fill" style={{ scaleY }} /></div>
          {experience.map((e, i) => (
            <Reveal key={e.role} delay={i * .05} className="tl-item">
              <span className="tl-dot" />
              <div className="tl-date">{e.period}<small>{e.place}</small></div>
              <Spotlight className="tl-card">
                <h3>{e.role}</h3>
                <strong>{e.org}</strong>
                <ul>{e.points.map(pt => <li key={pt}>{pt}</li>)}</ul>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const keys = Object.keys(skills);
  const [tab, setTab] = useState(keys[0]);
  return (
    <section className="section wrap" id="skills">
      <SectionHead kicker="05 / CAPABILITIES" title="One foundation." em="Many possibilities." desc="Broad engineering fundamentals with a focus on practical, AI-enabled software." />
      <div className="skills">
        <div className="skill-tabs" role="tablist" aria-label="Skill categories">
          {keys.map(k => {
            const Icon = skillIcons[k];
            return (
              <button key={k} role="tab" aria-selected={tab === k} className={'skill-tab' + (tab === k ? ' active' : '')} onClick={() => setTab(k)}>
                {tab === k && <motion.span layoutId="skill-pill" className="skill-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <Icon size={18} /><span>{k}</span><small>{skills[k].length}</small>
              </button>
            );
          })}
        </div>
        <Spotlight className="skill-panel">
          <AnimatePresence mode="wait">
            <motion.div key={tab} className="skill-cloud" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .2 }}>
              {skills[tab].map((s, i) => (
                <motion.span key={s} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .03 }}>{s}</motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </Spotlight>
      </div>
      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {[...Array(2)].flatMap((_, r) => ['Python', 'TypeScript', 'React', 'Next.js', 'FastAPI', 'Django', 'LangChain', 'LangGraph', 'PostgreSQL', 'Docker', 'AWS', 'GitHub Actions', 'Supabase', 'Redis', 'Gemini', 'OpenAI', 'SAP ABAP', 'ServiceNow', 'Linux', 'Grafana'].map(t => <span key={r + t}>{t}</span>))}
        </div>
      </div>
    </section>
  );
}

function Credentials({ onPreview }) {
  const kinds = ['All', ...new Set(certs.map(c => c.kind))];
  const [kind, setKind] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const list = certs.filter(c => kind === 'All' || c.kind === kind);
  const shown = showAll || kind !== 'All' ? list : list.filter(c => c.featured);
  const verified = certs.filter(c => c.verify).length;
  return (
    <section className="section alt" id="credentials">
      <div className="wrap">
        <SectionHead kicker="06 / CREDENTIALS" title="Certified &" em="always learning." desc={`${certs.length} documents and credentials — ${verified} with issuer verification links. Preview any document in place.`}>
          <div className="filters">{kinds.map(k => <button key={k} className={'chip' + (kind === k ? ' active' : '')} onClick={() => setKind(k)}>{k}</button>)}</div>
        </SectionHead>
        <motion.div layout className="cert-grid">
          <AnimatePresence mode="popLayout">
            {shown.map(c => (
              <motion.div layout key={c.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <Spotlight className="cert">
                  <div className="cert-head"><span className="cert-icon">{c.kind === 'Education' ? <GraduationCap size={19} /> : <Award size={19} />}</span>{c.verify && <span className="badge"><ShieldCheck size={13} /> Verifiable</span>}</div>
                  <strong>{c.name}</strong>
                  <small>{c.issuer} · {c.kind}</small>
                  <div className="cert-actions">
                    {c.file && <button onClick={() => onPreview(c)}><Eye size={14} /> Preview</button>}
                    {c.verify && <a href={c.verify} target="_blank" rel="noreferrer"><ShieldCheck size={14} /> Verify</a>}
                  </div>
                </Spotlight>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {kind === 'All' && <div className="center"><button className="btn ghost" onClick={() => setShowAll(!showAll)}>{showAll ? 'Show featured only' : `View all ${certs.length} credentials`}</button></div>}
      </div>
    </section>
  );
}

function CertPreview({ cert, onClose }) {
  const src = cert && '/certificates/' + cert.file;
  const isPdf = cert?.file?.endsWith('.pdf');
  return (
    <Modal open={!!cert} onClose={onClose} label={cert ? cert.name : ''} wide>
      {cert && (
        <div className="preview">
          <div className="preview-head"><div><h3>{cert.name}</h3><small>{cert.issuer}</small></div>
            <div className="preview-actions">
              {cert.verify && <a className="btn ghost sm" href={cert.verify} target="_blank" rel="noreferrer"><ShieldCheck size={15} /> Verify</a>}
              <a className="btn ghost sm" href={src} target="_blank" rel="noreferrer"><ArrowUpRight size={15} /> Open</a>
            </div>
          </div>
          <div className="preview-frame">{isPdf ? <iframe src={src + '#view=FitH&toolbar=0'} title={cert.name} /> : <img src={src} alt={cert.name} loading="lazy" />}</div>
        </div>
      )}
    </Modal>
  );
}

function Intro({ videoRef }) {
  const [playing, setPlaying] = useState(false);
  const play = () => { const v = videoRef.current; if (v) { v.play(); } };
  return (
    <section className="section wrap" id="intro">
      <div className="intro">
        <Reveal className="intro-video-wrap">
          <div className={'intro-video' + (playing ? ' playing' : '')}>
            <video ref={videoRef} src="/media/intro.mp4" poster="/media/ayan-portrait.jpg" preload="metadata" playsInline controls={playing}
              onPlay={() => setPlaying(true)} onPause={e => e.currentTarget.ended && setPlaying(false)} onEnded={() => setPlaying(false)} aria-label="Video introduction by Md Ayan Parwez" />
            {!playing && (
              <button className="intro-play" onClick={play} aria-label="Play my video introduction">
                <span className="intro-play-btn"><Play size={26} fill="currentColor" /></span>
                <span className="intro-play-label"><b>Watch my intro</b><small>41 sec · sound on</small></span>
              </button>
            )}
          </div>
        </Reveal>
        <Reveal delay={.1} className="intro-copy">
          <div className="kicker">01 / INTRO</div>
          <h2>Hello, I'm Ayan.<br /><em>Let me introduce myself.</em></h2>
          <p className="lead">A software engineer from IIIT Bhagalpur who likes turning messy real-world problems into dependable systems — from RAG pipelines and AI products to the platform that ran my college's first online election.</p>
          <ul className="intro-points">
            <li><Building2 size={17} /><span><b>Amazon</b> — Associate, ML Data Operations (GO-AI)</span></li>
            <li><Newspaper size={17} /><span><b>In the news</b> — co-built IIIT Bhagalpur's online election portal</span></li>
            <li><ShieldCheck size={17} /><span><b>Certified</b> — SAP ABAP Cloud, ServiceNow CAD & CSA</span></li>
          </ul>
          <div className="hero-btns">
            <a className="btn primary" href="#milestones">See milestones <ArrowUpRight size={16} /></a>
            <a className="btn ghost" href={LI} target="_blank" rel="noreferrer"><Linkedin size={16} /> Connect on LinkedIn</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Milestones({ onView }) {
  return (
    <section className="section wrap" id="milestones">
      <SectionHead kicker="04 / MILESTONES" title="Proof, not" em="just promises." desc="Real moments behind the résumé — software used by an entire campus, press coverage and the people I've built with." />
      <div className="press-grid">
        {press.map((p, i) => (
          <Reveal key={p.outlet} delay={i * .08}>
            <Spotlight as="button" className="press-card" onClick={() => onView({ img: p.img, title: `${p.outlet} · ${p.date}`, caption: p.headline })} aria-label={`View ${p.outlet} article`}>
              <div className="press-thumb"><img src={p.img} alt={`${p.outlet} newspaper clipping`} loading="lazy" /><span className="press-zoom"><Maximize2 size={15} /></span></div>
              <div className="press-body">
                <div className="press-meta"><Newspaper size={14} /> {p.outlet} <span>·</span> {p.date}</div>
                <h3>{p.headline}</h3>
                <p><Quote size={14} className="q" />{p.quote}</p>
              </div>
            </Spotlight>
          </Reveal>
        ))}
      </div>
      <div className="gallery">
        {milestones.map((m, i) => (
          <Reveal key={m.title} delay={i * .06} className={'g-item' + (m.tall ? ' tall' : '')}>
            <button className="g-card" onClick={() => onView(m)} aria-label={`View photo: ${m.title}`}>
              <img src={m.img} alt={m.title} loading="lazy" />
              <span className="g-tag"><Camera size={12} /> {m.tag}</span>
              <span className="g-cap"><b>{m.title}</b><small>{m.caption}</small></span>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Lightbox({ item, onClose }) {
  return (
    <Modal open={!!item} onClose={onClose} label={item ? item.title : ''} wide>
      {item && (
        <div className="preview">
          <div className="preview-head"><div><h3>{item.title}</h3><small>{item.caption}</small></div></div>
          <div className="preview-frame photo"><img src={item.img} alt={item.title} /></div>
        </div>
      )}
    </Modal>
  );
}

function About() {
  return (
    <section className="section wrap" id="about">
      <div className="about">
        <Reveal>
          <div className="kicker">07 / ABOUT</div>
          <h2>Curious by nature.<br /><em>Engineer by practice.</em></h2>
          <p className="lead">I'm a Computer Science graduate from IIIT Bhagalpur, currently an Associate in ML Data Operations at Amazon. I bring core software-engineering rigour, production AI data experience and a habit of hunting down system bottlenecks.</p>
          <p>Whether it's an intuitive frontend, a robust backend microservice, an agentic AI / RAG pipeline or a deep-dive into data, I take end-to-end ownership and aim for dependable, measurable results. At Amazon I perform root-cause analysis and audit high-volume ML workflows — work that keeps quality and edge cases front of mind when I build my own software.</p>
        </Reveal>
        <div className="about-side">
          <Reveal delay={.1}>
            <Spotlight className="info-card">
              <h5><GraduationCap size={16} /> Education</h5>
              {education.map(e => (
                <div className="edu" key={e.school}><div><strong>{e.school}</strong><span>{e.detail}</span>{e.note && <small>{e.note}</small>}</div><em>{e.period}</em></div>
              ))}
            </Spotlight>
          </Reveal>
          <Reveal delay={.2}>
            <Spotlight className="info-card">
              <h5><Trophy size={16} /> Achievements</h5>
              <div className="ach"><b>96.99</b><span>JEE Mains national percentile — top ~3% of 900,000+ candidates</span></div>
              <div className="ach"><b>In print</b><span>Co-lead developer of IIIT Bhagalpur’s first online election portal — featured in Dainik Bhaskar & Hindustan</span></div>
              <div className="ach"><b>700+</b><span>Data structures & algorithms problems solved on LeetCode</span></div>
              <div className="ach"><b>CAD · CSA · ABAP</b><span>ServiceNow and SAP enterprise certifications</span></div>
            </Spotlight>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [state, setState] = useState('idle');
  const [copied, copy] = useCopy();
  const submit = async e => {
    e.preventDefault();
    setState('sending');
    try {
      const res = await fetch('/__forms.html', {
        method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(e.target)).toString(),
      });
      if (!res.ok) throw new Error(res.status);
      setState('sent'); e.target.reset();
    } catch { setState('error'); }
  };
  return (
    <section className="contact" id="contact">
      <div className="wrap contact-grid">
        <Reveal>
          <div className="kicker">08 / CONTACT</div>
          <h2>Have something<br /><em>worth building?</em></h2>
          <p>Open to software engineering, AI application, backend and full-stack roles — and interesting freelance work.</p>
          <div className="contact-links">
            <button className="contact-row" onClick={() => copy(EMAIL)}><Mail size={18} /><span>{EMAIL}</span>{copied ? <Check size={16} className="ok" /> : <Copy size={16} />}</button>
            <a className="contact-row" href={LI} target="_blank" rel="noreferrer"><Linkedin size={18} /><span>linkedin.com/in/ayan-parwez-2a47a51a9</span><ArrowUpRight size={16} /></a>
            <a className="contact-row" href={GH} target="_blank" rel="noreferrer"><Github size={18} /><span>github.com/theayanmalik</span><ArrowUpRight size={16} /></a>
            <a className="contact-row" href="/resume.pdf" download><FileText size={18} /><span>Résumé (PDF)</span><Download size={16} /></a>
          </div>
        </Reveal>
        <Reveal delay={.1}>
          <Spotlight as="form" className="form" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit}>
            <input type="hidden" name="form-name" value="contact" />
            <p className="hp"><label>Leave empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
            <div className="form-row">
              <label><span>Name</span><input name="name" required placeholder="Your name" autoComplete="name" /></label>
              <label><span>Email</span><input name="email" type="email" required placeholder="you@company.com" autoComplete="email" /></label>
            </div>
            <label><span>Topic</span>
              <select name="topic" defaultValue="Full-time role">
                <option>Full-time role</option><option>Freelance project</option><option>Collaboration</option><option>Just saying hi</option>
              </select>
            </label>
            <label><span>Message</span><textarea name="message" required rows={5} placeholder="Tell me about the role or project…" /></label>
            <button className="btn primary block" disabled={state === 'sending'}>
              {state === 'sending' ? <><Loader2 size={16} className="spin" /> Sending…</> : <>Send message <Send size={16} /></>}
            </button>
            <div className="form-status" aria-live="polite">
              {state === 'sent' && <span className="ok"><CheckCircle2 size={15} /> Thanks — your message was sent. I'll reply soon.</span>}
              {state === 'error' && <span className="err">Something went wrong. Please email me directly instead.</span>}
            </div>
          </Spotlight>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- app ---------- */
function App() {
  const [theme, toggleTheme] = useTheme();
  const active = useActiveSection();
  const [menu, setMenu] = useState(false);
  const [palette, setPalette] = useState(false);
  const [project, setProject] = useState(null);
  const [cert, setCert] = useState(null);
  const [photo, setPhoto] = useState(null);
  const videoRef = useRef(null);
  const watchIntro = useCallback(() => { document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); setTimeout(() => videoRef.current?.play().catch(() => {}), 650); }, []);
  const [scrolled, setScrolled] = useState(false);
  const [, copy] = useCopy();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  useEffect(() => {
    const onKey = e => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPalette(p => !p); } };
    const onScroll = () => setScrolled(scrollY > 20);
    addEventListener('keydown', onKey); addEventListener('scroll', onScroll, { passive: true });
    return () => { removeEventListener('keydown', onKey); removeEventListener('scroll', onScroll); };
  }, []);
  useEffect(() => { if (palette) { const k = e => e.key === 'Escape' && setPalette(false); addEventListener('keydown', k); return () => removeEventListener('keydown', k); } }, [palette]);

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const actions = useMemo(() => [
    ...SECTIONS.map(([id, label]) => ({ group: 'Navigate', label, icon: ChevronRight, run: () => go(id) })),
    ...projects.map(p => ({ group: 'Projects', label: p.title, icon: projectIcons[p.id], run: () => setProject(p) })),
    { group: 'Actions', label: 'Watch video introduction', icon: Play, run: watchIntro },
    { group: 'Actions', label: 'Copy email address', icon: Copy, run: () => copy(EMAIL) },
    { group: 'Actions', label: 'Download résumé', icon: Download, run: () => { const a = document.createElement('a'); a.href = '/resume.pdf'; a.download = ''; a.click(); } },
    { group: 'Actions', label: 'Toggle light / dark theme', icon: theme === 'dark' ? Sun : Moon, run: toggleTheme },
    { group: 'Links', label: 'Open GitHub', icon: Github, run: () => open(GH, '_blank') },
    { group: 'Links', label: 'Open LinkedIn', icon: Linkedin, run: () => open(LI, '_blank') },
  ], [theme, toggleTheme, copy, watchIntro]);

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} />
      <div className="bg-grid" aria-hidden /><div className="glow glow-a" aria-hidden /><div className="glow glow-b" aria-hidden />
      <header className={'topbar' + (scrolled ? ' scrolled' : '')}>
        <div className="wrap topbar-inner">
          <a className="brand" href="#home" aria-label="Home"><span className="brand-mark">AP<span>.</span></span><span className="brand-label">MD AYAN PARWEZ<br />SOFTWARE & AI ENGINEER</span></a>
          <nav className={'nav' + (menu ? ' open' : '')} aria-label="Primary">
            {SECTIONS.map(([id, label]) => (
              <a key={id} href={'#' + id} onClick={() => setMenu(false)} className={active === id ? 'active' : ''}>
                {active === id && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <span>{label}</span>
              </a>
            ))}
          </nav>
          <div className="actions">
            <button className="kbd-btn" onClick={() => setPalette(true)} aria-label="Open command palette"><Command size={14} /><span>K</span></button>
            <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle colour theme">{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</button>
            <a className="btn primary sm hide-sm" href="#contact">Let's talk <ArrowUpRight size={15} /></a>
            <button className="icon-btn mobile" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero wrap" id="home">
          <div className="hero-grid">
            <div className="hero-copy">
              <motion.div className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><span className="pulse" /> Associate, ML Data Ops @ Amazon · Open to SDE / AI roles</motion.div>
              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1, duration: .7, ease: [0.22, 1, 0.36, 1] }}>
                Engineering<br /><span className="grad">what's next.</span>
              </motion.h1>
              <motion.p className="hero-lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }}>
                I'm <strong>Md Ayan Parwez</strong>, a software engineer from IIIT Bhagalpur building <Typer words={roles} />
              </motion.p>
              <motion.div className="hero-btns" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45 }}>
                <a className="btn primary" href="#work">Explore my work <ArrowUpRight size={17} /></a>
                <button className="btn ghost" onClick={watchIntro}><Play size={15} fill="currentColor" /> Watch intro</button>
                <a className="btn ghost" href="/resume.pdf" download>Résumé <Download size={16} /></a>
                <button className="btn ghost" onClick={() => setPalette(true)}><Sparkles size={16} /> Quick jump <kbd>⌘K</kbd></button>
              </motion.div>
              <div className="socials">
                <a href={GH} target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
                <a href={LI} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a>
                <a href={'mailto:' + EMAIL}><Mail size={17} /> Email</a>
              </div>
            </div>
            <motion.div className="hero-visual" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .2, duration: .8 }}>
              <NeuralCanvas />
              <button className="portrait" onClick={watchIntro} aria-label="Watch my video introduction">
                <span className="portrait-ring" aria-hidden />
                <img src="/media/ayan-portrait.jpg" alt="Md Ayan Parwez" width="663" height="800" fetchpriority="high" />
                <span className="portrait-play"><Play size={13} fill="currentColor" /> Watch intro</span>
              </button>
              <div className="float-card fc-code">
                <span className="fc-label"><span className="pulse sm" /> pipeline.py</span>
<pre>{`async def answer(query):
    docs = await retrieve(query, k=5)
    ctx  = rerank(docs, query)
    return await llm(query, ctx)`}</pre>
              </div>
              <div className="float-card fc-stat"><Building2 size={18} /><div><b>Amazon</b><small>GO-AI Operations</small></div></div>
              <div className="float-card fc-mem"><small>RAM usage</small><div className="mem-bar"><span /></div><b>1.5 GB → &lt;200 MB</b></div>
            </motion.div>
          </div>
          <div className="stats">
            {stats.map(s => <div key={s.label} className="stat"><strong><Counter {...s} /></strong><span>{s.label}</span></div>)}
          </div>
        </section>

        <Intro videoRef={videoRef} />
        <Projects onOpen={setProject} />
        <Experience />
        <Milestones onView={setPhoto} />
        <Skills />
        <Credentials onPreview={setCert} />
        <About />
        <Contact />
      </main>

      <footer className="footer wrap">
        <span>© {new Date().getFullYear()} Md Ayan Parwez</span>
        <span className="muted">Built with React, Motion & Netlify · Press <kbd>⌘K</kbd> to navigate</span>
        <a href="#home">Back to top ↑</a>
      </footer>

      <CommandPalette open={palette} setOpen={setPalette} actions={actions} />
      <CaseStudy project={project} onClose={() => setProject(null)} />
      <CertPreview cert={cert} onClose={() => setCert(null)} />
      <Lightbox item={photo} onClose={() => setPhoto(null)} />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
