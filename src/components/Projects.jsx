const projects = [
  {
    name: 'CollabLab / PeerPrep',
    period: 'Aug 2025 – Dec 2025',
    description:
      'A scalable microservices platform with five independent modules (User, Question, Matching, Collab, Attempt History) designed for high-concurrency workloads. The matching service uses Redis and Server-Sent Events with time-based queue relaxations at 30/75/105-second intervals, reducing wait times under peak traffic. Real-time collaboration runs on WebSockets + Yjs CRDTs with crash recovery via snapshot persistence in the Attempt History Service.',
    tech: ['React', 'Next.js', 'Redis', 'WebSockets', 'Yjs CRDT', 'MongoDB', 'SSE'],
    github: 'https://github.com/WuJinhan1',
  },
  {
    name: 'AI Copyright & Music — SSCI Paper',
    period: 'Dec 2025 – Present',
    description:
      'A research paper arguing that statistical music models are tools rather than authors, and that copyright protection should track human creative control in the generation workflow. Analyzes autoregressive and diffusion architectures to show AI outputs primarily interpolate training data. Applies Chalmers\' consciousness problem, Burrow-Giles, and Feist frameworks; proposes a "sufficient creative control" test for AI-assisted musical works.',
    tech: ['Academic Research', 'ML Architecture Analysis'],
    github: 'https://github.com/WuJinhan1',
  },
  {
    name: 'AI Chess Bot',
    period: 'May 2024 – Aug 2024',
    description:
      'A chess engine with a custom Pygame GUI and game engine. The AI uses minimax, negamax, and alpha-beta pruning to efficiently search the move tree. Zobrist hashing with transposition tables eliminates redundant computation across repeated positions, and bitboard representations compress board state for faster move generation — boosting computation efficiency by 40%.',
    tech: ['Python', 'Pygame', 'Minimax', 'Alpha-Beta Pruning', 'Zobrist Hashing'],
    github: 'https://github.com/WuJinhan1',
  },
  {
    name: 'Modicate — East Indie Developers',
    period: 'Aug 2021 – May 2022',
    description:
      'A top-down shooter built in Unity (C#) with a React + Bootstrap marketing site deployed on Firebase. Managed collaborative development via GitHub across a team of five. The site attracted 80+ students and educators in the first week of launch.',
    tech: ['Unity', 'C#', 'React', 'Bootstrap', 'Firebase'],
    github: 'https://github.com/WuJinhan1',
  },
]

function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">
          Projects
        </h2>
        <div className="row g-4">
          {projects.map((proj, i) => (
            <div
              key={i}
              className="col-md-6 col-lg-4"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="card project-card h-100">
                <div className="card-body d-flex flex-column p-4">
                  <div className="mb-3">
                    <h5 className="project-title">{proj.name}</h5>
                    <small className="project-period">{proj.period}</small>
                  </div>
                  <p className="project-desc flex-grow-1">{proj.description}</p>
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {proj.tech.map((t, j) => (
                      <span key={j} className="badge tech-badge">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={proj.github}
                    className="btn btn-outline-cyan btn-sm align-self-start"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
