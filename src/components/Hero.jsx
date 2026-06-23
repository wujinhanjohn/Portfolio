function Hero() {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-name">
      <div className="container hero__inner">
        <p className="hero__eyebrow reveal">
          Software Engineer · Distributed Systems
        </p>
        <h1 id="hero-name" className="hero__name reveal">Wu Jinhan</h1>
        <p className="hero__subtext reveal">
          I build backend and real-time systems — microservices for 10,000+
          concurrent users, collaborative editors on WebSockets and CRDTs, and
          NAND silicon-validation tooling at Micron. Computer Science at NUS.
        </p>
        <a className="link-underline reveal" href="#work">
          See selected work <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </section>
  )
}

export default Hero
