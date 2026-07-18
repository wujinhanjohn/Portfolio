const projects = [
  {
    name: 'Earnings Vol Trader',
    period: 'Jun 2026 -  Present',
    description:
      'A semi-automated earnings-volatility options system for Interactive Brokers. It screens tickers through three gates, constructs an at-the-money calendar spread for those that pass, runs risk checks, and submits to a paper account only after explicit typed approval, with reduce-only, limit-only automated exits.',
    tech: ['Python', 'IBKR API', 'Options'],
    github: 'https://github.com/wujinhanjohn/earnings-vol-trader',
  },
  {
    name: 'CollabLab / PeerPrep',
    period: 'Aug 2025 – Dec 2025',
    description:
      'A peer-interview prep platform of five microservices that match two users in real time and drop them into a shared coding session. Built with React and Next.js, Redis + Server-Sent Events for matching, and WebSockets + Yjs CRDTs for collaboration.',
    tech: ['React', 'Next.js', 'Redis', 'WebSockets', 'Yjs CRDT', 'MongoDB'],
    github: 'https://github.com/CS3219-AY2526Sem1/cs3219-ay2526s1-project-g18',
  },
  {
    name: 'Chess Engine',
    period: 'May 2024 - Present',
    description:
      'A complete chess game in Python and Pygame with full legal move generation - castling, en passant, promotion, and mate detection - validated against known perft counts. Includes an AI opponent using minimax with alpha-beta pruning and piece-square tables.',
    tech: ['Python', 'Pygame', 'Minimax'],
    github: 'https://github.com/wujinhanjohn/Chess-engine',
  },
  {
    name: 'Kalshi Snapshot',
    period: 'May 2026',
    description:
      'A CLI tool that pulls a complete point-in-time snapshot of every public event and market from the Kalshi prediction-market REST API and writes analysis-ready outputs, including a per-market feature table with prices, liquidity buckets, and time to expiry.',
    tech: ['Python', 'REST API', 'pandas'],
    github: 'https://github.com/wujinhanjohn/Kalshi-Snapshot',
  },
  {
    name: 'Music Finder',
    period: 'May 2026',
    description:
      'Connects to your Spotify account with a browser-side PKCE flow and recommends similar tracks from within a chosen playlist, ranking them against a base track using cosine similarity over artist, album, title tokens, and duration.',
    tech: ['FastAPI', 'Spotify API', 'Python'],
    github: 'https://github.com/wujinhanjohn/music-finder',
  },
  {
    name: 'Stock Research',
    period: 'Jun 2026',
    description:
      'A single-page stock research tool: enter a ticker and get a balanced research note covering both the bull and bear case.',
    tech: ['TypeScript', 'Next.js'],
    github: 'https://github.com/wujinhanjohn/Stock-Research',
  },
  {
    name: 'Kubernetes Controller',
    period: 'Jun 2026',
    description:
      'A Kubebuilder-based operator that introduces a WebApp custom resource and continuously reconciles each one into a standard Deployment, so a stateless web service can be declared with just an image, replica count, and port.',
    tech: ['Go', 'Kubernetes', 'Kubebuilder'],
    github: 'https://github.com/wujinhanjohn/kubernetes-controller',
  },
  {
    name: 'Market Scanner',
    period: 'Apr 2026 - May 2026',
    description:
      'A read-only Polymarket arbitrage scanner that detects mutually exclusive outcome sets priced below their guaranteed payout. Every reported edge is net of taker fees and order-book depth, each scan is snapshotted to SQLite, and a replay tool backtests which arbs actually survived.',
    tech: ['Python', 'SQLite', 'Polymarket CLOB'],
    github: 'https://github.com/wujinhanjohn/Market-Scanner',
  },
  {
    name: 'Transfer',
    period: 'Jun 2026',
    description:
      'A shell utility that downloads a YouTube video as an MP3 with yt-dlp, embeds metadata and thumbnail art via ffmpeg, and imports the result straight into Apple Music through AppleScript.',
    tech: ['Shell', 'yt-dlp', 'ffmpeg'],
    github: 'https://github.com/wujinhanjohn/Transfer',
  },
  {
    name: 'Zetamac Trainer',
    period: 'Jun - Jul2026',
    description:
      'A client-only Zetamac-style mental-math trainer that logs every solve to IndexedDB, surfaces your slowest problem buckets by median solve time, and weights practice mode toward them. No backend - deployed as a static site on Cloudflare Pages.',
    tech: ['React', 'TypeScript', 'Vite', 'Dexie'],
    github: 'https://github.com/wujinhanjohn/zetamac',
  },
  {
    name: 'Chess Eval',
    period: 'Jun 2026',
    description:
      'A web app that analyzes games from my own chess account with Stockfish and annotates each move with evaluations and feedback to highlight mistakes and improvements.',
    tech: ['TypeScript', 'React', 'Stockfish'],
    github: 'https://github.com/wujinhanjohn/Chess_eval',
  },
  {
    name: 'ENTSO Trading',
    period: 'Jun 2026',
    description:
      'A daily fair-value model for the German power market built on ENTSO-E load, wind, and solar forecasts, with residual load as the headline feature. Translates an hourly day-ahead price forecast into a prompt forward-curve view with a tradable signal, conformal prediction bands, and explicit invalidation logic.',
    tech: ['Python', 'ENTSO-E API', 'Quantile Models'],
    github: 'https://github.com/wujinhanjohn/ENTSO-trading',
  },
  {
    name: 'AI Copyright & Music: SSCI Paper',
    period: 'Dec 2025 – Mar 2025',
    description:
      'A research paper arguing that statistical music models are tools, not authors, so copyright should track human creative control. Analyzes autoregressive and diffusion architectures and proposes a "sufficient creative control" test for AI-assisted music.',
    tech: ['Academic Research', 'ML Architecture Analysis'],
    // TODO: in progress - no public link yet. Replace with the published paper / DOI when available.
    github: 'https://github.com/WuJinhan1',
  },
  {
    name: 'Modicate: East Indie Developers',
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
