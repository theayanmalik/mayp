# 2026 Portfolio Research, Strategy & Implementation Roadmap

## Research scope and qualification

Research performed November 6, 2026, using contemporary published portfolio reviews, award listings and live site search results. These are curated references, **not** a rigorously audited list of 20 individually HTTP-tested websites. Personal sites may change. Avoid claiming that a person's employer or current stack has been independently verified.

## 20 real-world portfolio / engineering personal site references

1. Brittany Chiang — https://brittanychiang.com — clarity, recruiter navigation.
2. Bruno Simon — https://bruno-simon.com — immersive 3D; 2026 Webby technical achievement winner.
3. Josh Comeau — https://www.joshwcomeau.com — interactive technical writing.
4. Lee Robinson — https://leerob.com — projects and engineering writing.
5. Rauno Freiberg — https://rauno.me — precision interaction design.
6. Emil Kowalski — https://emilkowal.ski — micro-interaction craft.
7. Sara Soueidan — https://www.sarasoueidan.com — accessibility expertise.
8. Sarah Drasner — https://sarah.dev — work and teaching.
9. Cassie Evans — https://www.cassie.codes — creative frontend demos.
10. Cassidy Williams — https://cassidoo.co — personal publishing.
11. Addy Osmani — https://addyosmani.com — technical authority.
12. Sindre Sorhus — https://sindresorhus.com — open source proof.
13. Ahmad Shadeed — https://ishadeed.com — practical CSS case studies.
14. Kevin Powell — https://www.kevinpowell.co — teaching as evidence.
15. Kent C. Dodds — https://kentcdodds.com — content and software education.
16. Lynn Fisher — https://lynnandtonic.com — distinctive personal design.
17. Adham Dannaway — https://www.adhamdannaway.com — dual-skill storytelling.
18. Robby Leonardi — https://www.rleonardi.com/interactive-resume/ — interactive resume.
19. David DeSandro — https://desandro.com — creative software demos.
20. Adam Argyle — https://nerdy.dev — practical frontend experiments.

**Verification:** These are published references and known canonical URLs, not individually confirmed live HTTP checks. Check reachability before treating them as audited links. Not all are AI engineers; that is intentional, because the most useful patterns often come from design engineers, educators and open-source maintainers. No unsupported employer affiliation is asserted.

## Top 10 design lessons for this portfolio

1. Brittany Chiang — recruiter-first scan.
2. Lee Robinson — engineering proof + writing.
3. Josh Comeau — interactive explanations.
4. Rauno Freiberg — careful motion and restraint.
5. Emil Kowalski — purposeful micro-interactions.
6. Bruno Simon — technical wow-factor (selectively).
7. Sara Soueidan — accessibility as a quality signal.
8. Sindre Sorhus — demonstrable public work.
9. Ahmad Shadeed — annotated case studies.
10. Adham Dannaway — immediate positioning.

## Technology comparison

| Option | Strength | Trade-off | Decision |
|---|---|---|---|
| React + Vite | Lightweight SPA, straightforward deployment | Less built-in SEO/content architecture | Used in initial deliverable |
| Next.js + TypeScript | SSR/SSG, routing, metadata, API routes | More infrastructure complexity | Recommended for later production expansion |
| Tailwind CSS | Fast design-system implementation | Extra setup and utility-heavy markup | Optional migration |
| Custom CSS | Full visual control, no extra runtime | Requires careful maintenance | Used in initial deliverable |
| Motion | Targeted React transitions | Can be overused | Used sparingly |
| GSAP | Complex timelines | Additional complexity | Not necessary initially |
| Three.js / R3F | Strong graphics showcase | Performance, mobile and accessibility costs | Only for an optional experiment |
| shadcn/ui | Accessible component starting points | Must be tailored to avoid generic feel | Useful for dashboards |
| Supabase | Auth, PostgreSQL, storage | Backend service dependency | For real AI demos |
| FastAPI | Python inference/API layer | Requires hosting and monitoring | For deployable ML projects |
| Vercel | Simple frontend deployments | Hosting/vendor trade-offs | Good deployment choice |

## Site architecture

- `/` — positioning, selected work, experience, expertise, credentials, about, contact.
- `/projects/genflash` — planned deep-dive: architecture, document pipeline, security, evaluations.
- `/projects/recommendation-engine` — planned benchmarks and reproducibility.
- `/projects/student-tracker` — planned demo and privacy-safe sample data.
- `/writing` — planned architecture notes and lessons learned.
- `/resume.pdf` — provided résumé.
- `/certificates/*` — provided credential artifacts.

Current deliverable implements the one-page experience. Planned routes are not falsely presented as existing.

## AI/ML project differentiation roadmap

1. GenFlash: add an architecture diagram, chunking/retrieval details, golden evaluation set, cost/latency tracking, error handling, document privacy model.
2. Recommendation engine: add a reproducible benchmark script, baseline comparison, memory traces, throughput chart, input data description.
3. Student analytics: add anonymized demonstration data, evaluation of generated feedback, human review and safety constraints.
4. Agentic research workflow (new project): build a constrained agent with tools, trace logs, approval gates, evaluation harness and failure taxonomy. **Do not list as completed yet.**
5. Production ML API (new project): FastAPI, Docker, CI, model/version tracking, drift monitoring, tests and load benchmarks. **Do not list as completed yet.**

## Recruiter-oriented evidence

Lead with a one-sentence engineering positioning statement; show 3 strongest projects immediately; put concrete design decisions and measured trade-offs inside each case study. For each GitHub repo include setup steps, tests, architecture, screenshots, limitations, license and reproducible evaluation where appropriate. Do not claim a project is production-grade solely because it uses popular tools.

## Design decisions: signal vs gimmick

Useful: responsive bento-like cards, concise motion, readable type, high-contrast theme, copyable contact, accessible project filtering, real demonstrations.

Avoid: autoplay background audio, large autoplay hero video, forced loading screens, obligatory 3D navigation, fake terminals, simulated chatbot intelligence, fake GitHub metrics and unverified uptime claims.

## SEO, accessibility and performance

- Unique page title, description, Open Graph tags; add canonical URL once domain is known.
- Use headings and semantic HTML, keyboard-operable controls, visible focus rings and descriptive link text.
- Respect `prefers-reduced-motion`, avoid autoplay sound, lazy-load heavy imagery and test mobile devices.
- For Next.js migration, generate sitemap/robots and project-specific metadata.
- Set performance targets (not claims): Lighthouse performance/accessibility >= 90 on representative mobile runs; Core Web Vitals LCP <= 2.5s, CLS <= 0.1, INP <= 200ms.
- Do not publish personal phone numbers or credential documents without consent.

## Phased implementation roadmap

**Phase 1 (delivered):** Complete visual redesign, React app, project filtering, experience, skills, credential file library, downloadable résumé, working mailto contact and responsive styling.

**Phase 2:** Validate all GitHub links, add screenshots and deployment links, audit all certificate metadata, verify benchmark claims, remove private data, run browser QA.

**Phase 3:** Build two substantive case-study pages and automated testing; add project videos and real evaluation dashboards.

**Phase 4:** Migrate to Next.js/TypeScript if needed; add structured data, sitemap, articles, analytics with consent and polished SEO.

**Phase 5:** Optional hosted AI portfolio assistant with a restricted factual knowledge base, citations, abuse controls, privacy notice and cost limits. Never invent qualifications.

## Sources consulted

- https://www.itechguides.com/21-best-developer-portfolio-examples-to-study-in-2026/
- https://colorlib.com/wp/developer-portfolios/
- https://www.gleamstudio.design/blog-post/best-portfolio-websites
- https://www.joshwcomeau.com/ (and his 'Building an Effective Dev Portfolio' PDF)
- https://winners.webbyawards.com/2026/websites-and-mobile-sites/features-design/technical-achievement/370083/brunos-portfolio
- https://bruno-simon.com/
- https://rickcreates.com/r/2026-01-21-brunos-portfolio
- https://adminlte.io/blog/react-portfolio-templates/
