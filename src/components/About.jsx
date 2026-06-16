function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">
          About Me
        </h2>
        <div className="row g-5 align-items-center">
          <div className="col-lg-7" data-aos="fade-right" data-aos-delay="100">
            <p className="about-bio">
              I&apos;m a Computer Science student at the NUS School of Computing with a Minor in
              Statistics, drawn to the hard problems at the intersection of performance, scale, and
              real-time systems.
            </p>
            <p className="about-bio">
              At Micron, I shipped production tooling that automated NAND silicon validation — cutting
              waveform loading latency by 80% and eliminating a $1,000-per-license external dependency
              with an in-house platform I designed and deployed end-to-end. At MyEdututor, I led
              full-cycle development of the core MVP, from architecture decisions to deployment, and
              built the component system that got us to market 30% faster.
            </p>
            <p className="about-bio">
              Beyond industry work, I&apos;ve engineered microservices platforms designed for 10,000+
              concurrent users and real-time collaboration layers built on WebSockets, Yjs CRDTs, and
              Redis pub/sub. I care about systems that are reliable under load — not just under ideal
              conditions.
            </p>
          </div>
          <div className="col-lg-5" data-aos="fade-left" data-aos-delay="200">
            <div className="card quick-stats-card">
              <div className="card-body p-4">
                <h5 className="quick-stats-title mb-4">Quick Stats</h5>
                <ul className="list-group list-group-flush quick-stats-list">
                  <li className="list-group-item">
                    <span className="stat-icon">🎓</span>
                    NUS School of Computing, Minor in Statistics
                  </li>
                  <li className="list-group-item">
                    <span className="stat-icon">📍</span>
                    Singapore
                  </li>
                  <li className="list-group-item">
                    <span className="stat-icon">🌐</span>
                    English &amp; Chinese (Native), Japanese
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
