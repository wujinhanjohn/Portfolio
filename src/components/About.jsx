const facts = [
  { term: 'Education', desc: 'B.S. Computer Science, NUS' },
  { term: 'Minor', desc: 'Statistics' },
  { term: 'Based', desc: 'Singapore' },
  { term: 'Languages', desc: 'English, Chinese (native), Japanese' },
]

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-head reveal">
          <p className="section-head__label">About</p>
        </div>

        <div className="about-grid">
          <div className="about__body reveal">
            <p>
              I&apos;m a Computer Science student at the NUS School of Computing
              with a Minor in Statistics. I work on backend performance,
              distributed systems, and real-time infrastructure — the kind of
              work where Redis, WebSockets, and CRDTs decide whether it holds up.
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
              Beyond industry work, I&apos;ve engineered microservices platforms
              for 10,000+ concurrent users and real-time collaboration layers
              built on WebSockets, Yjs CRDTs, and Redis pub/sub. Right now
              I&apos;m writing an SSCI paper on AI-generated music and copyright
              law.
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
