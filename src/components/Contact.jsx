function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="container">
        <div className="text-center contact-inner">
          <h2 className="section-title mx-auto d-inline-block" data-aos="fade-up">
            Get In Touch
          </h2>
          <p
            className="contact-subtitle mt-4"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Open to opportunities, collaborations, and interesting conversations.
          </p>
          <div
            className="d-flex flex-wrap gap-3 justify-content-center mt-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <a href="mailto:wujinhanjohn@gmail.com" className="btn btn-cyan-glow btn-lg">
              wujinhanjohn@gmail.com
            </a>
            <a
              href="https://github.com/WuJinhan1"
              className="btn btn-outline-cyan btn-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub: WuJinhan1
            </a>
          </div>
          <p
            className="contact-note mt-5"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Currently writing a research paper on AI-generated music &amp; copyright law (SSCI)
          </p>
        </div>
      </div>
    </section>
  )
}

export default Contact
