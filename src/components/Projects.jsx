const projects = [
  {
    name: 'CollabLab / PeerPrep',
    period: 'Aug 2025 – Dec 2025',
    description:
      'A peer-interview prep platform of five microservices that match two users in real time and drop them into a shared coding session. Built with React and Next.js, Redis + Server-Sent Events for matching, and WebSockets + Yjs CRDTs for collaboration.',
    tech: ['React', 'Next.js', 'Redis', 'WebSockets', 'Yjs CRDT', 'MongoDB'],
    github: 'https://github.com/CS3219-AY2526Sem1/cs3219-ay2526s1-project-g18',
  },
  {
    name: 'AI Copyright & Music — SSCI Paper',
    period: 'Dec 2025 – Mar 2025',
    description:
      'A research paper arguing that statistical music models are tools, not authors, so copyright should track human creative control. Analyzes autoregressive and diffusion architectures and proposes a "sufficient creative control" test for AI-assisted music.',
    tech: ['Academic Research', 'ML Architecture Analysis'],
    // TODO: in progress — no public link yet. Replace with the published paper / DOI when available.
    github: 'https://github.com/WuJinhan1',
  },
  {
    name: 'Chess Eval',
    period: 'Jun 2026 - Jun 2026',
    description:
      'A Python wrapper around the Stockfish engine that analyzes my games and annotates each move with evaluations and feedback to highlight mistakes and improvements.',
    tech: ['Python', 'Stockfish', 'Game Analysis'],
    github: 'https://github.com/wujinhanjohn/Chess_eval',
  },
  {
    name: 'AI Chess Bot',
    period: 'May 2024 – Aug 2024',
    description:
      'A chess engine with a Pygame GUI that selects moves via minimax with alpha-beta pruning. Uses Zobrist hashing, transposition tables, and bitboards to cut redundant search by 40%.',
    tech: ['Python', 'Pygame', 'Minimax', 'Alpha-Beta Pruning'],
    // TODO: points to the profile, not the repo. Replace with the AI Chess Bot repository URL.
    github: 'https://github.com/WuJinhan1',
  },
  {
    name: 'Modicate — East Indie Developers',
    period: 'Aug 2021 – May 2022',
    description:
      'A top-down shooter built in Unity (C#) with a React marketing site on Firebase, shipped by a team of five. The launch site drew 80+ students and educators in its first week.',
    tech: ['Unity', 'C#', 'React', 'Firebase'],
    // TODO: points to the profile, not the repo. Replace with the Modicate repo / live site URL.
    github: 'https://github.com/WuJinhan1',
  },
]

function Projects() {
  return (
    <section id="work" className="section" aria-labelledby="work-label">
      <div className="container">
        <div className="section-head reveal">
          <h2 id="work-label" className="section-head__label">Work</h2>
        </div>

        <div className="work">
          {projects.map((proj, i) => (
            <a
              className="work__link reveal"
              href={proj.github}
              target="_blank"
              rel="noopener noreferrer"
              key={proj.name}
            >
              <span className="work__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="work__body">
                <span className="work__title">{proj.name}</span>
                <span className="work__period">{proj.period}</span>
                <span className="work__desc">{proj.description}</span>
                <span className="work__tags">
                  {proj.tech.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </span>
              </span>
              <span className="work__arrow" aria-hidden="true">
                &#8599;
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
