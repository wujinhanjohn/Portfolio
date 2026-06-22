const socials = [
  { label: 'GitHub · WuJinhan1', href: 'https://github.com/WuJinhan1' },
  { label: 'GitHub · wujinhanjohn', href: 'https://github.com/wujinhanjohn' },
]

function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-head reveal">
          <p className="section-head__label">Contact</p>
        </div>

        <div className="reveal">
          <p className="contact__lead">
            I&apos;m looking for full-time software engineering roles in backend,
            distributed systems, and real-time infrastructure, starting 2026.
          </p>

          <a className="contact__email" href="mailto:wujinhanjohn@gmail.com">
            wujinhanjohn@gmail.com
          </a>

          <div className="contact__socials">
            {socials.map((social) => (
              <a
                className="contact__social"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                key={social.href}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
