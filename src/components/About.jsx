const facts = [
  { term: 'Education', desc: 'B.S. Computer Science, NUS' },
  { term: 'Minor', desc: 'Statistics' },
  { term: 'Based', desc: 'Singapore' },
  { term: 'Languages', desc: 'English, Chinese (native), Japanese' },
]

function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-label">
      <div className="container">
        <div className="section-head reveal">
          <h2 id="about-label" className="section-head__label">About</h2>
        </div>

        <div className="about-grid">
          <div className="about__body reveal">
            <p>
              I&apos;m a Computer Science student at the NUS School of Computing
              with a Minor in Statistics with a strong interest in backend and real‑time systems.
            </p>
            <p>
              At Micron, I shipped production tooling that automated NAND silicon
              validation — cutting waveform loading latency by 80% and
              eliminating a $1,000-per-license external dependency with an
              in-house platform I designed and deployed end-to-end. At MyEdututor,
              I led full-cycle development of the core MVP, from architecture
              decisions to deployment, and built the component system that got us
              to market 30% faster.
            </p>
            <p>
              Beyond industry work, I&apos;ve built systems like Peerprep, 
              a microservices‑based interview practice platform with real‑time 
              code collaboration using WebSockets, Yjs CRDTs, Redis, and Server 
              sent events, which supported thousands of concurrent users with high uptime. 
            </p>
          </div>

          <dl className="facts reveal">
            {facts.map((fact) => (
              <div className="facts__item" key={fact.term}>
                <dt className="facts__term">{fact.term}</dt>
                <dd className="facts__desc">{fact.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export default About
