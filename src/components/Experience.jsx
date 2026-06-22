const experiences = [
  {
    title: 'Software Engineer',
    company: 'Micron Technology, Inc.',
    period: 'Jan 2025 – Jun 2025',
    location: 'Singapore',
    bullets: [
      'Led design and implementation of a high-performance WPF MVVM application in C#, automating NAND silicon validation workflows and cutting waveform loading latency by 80% through architectural decisions around data access and rendering.',
      'Replaced a $1,000-per-license external dependency by engineering an in-house waveform visualization platform — full ownership from design through production deployment.',
      'Built scalable automation pipelines in Python with HDF5.net to process large waveform datasets, reducing manual data handling time by 10 seconds per cycle and improving overall analysis throughput.',
    ],
  },
  {
    title: 'Fullstack Engineer',
    company: 'MyEdututor',
    period: 'May 2024 – Aug 2024',
    location: 'Remote (Minneapolis–Saint Paul, MN)',
    bullets: [
      'Led full-cycle development and deployment of MyEdututor\'s core MVP on a scalable tech stack — from architecture decisions to launch — serving an initial cohort of 80–100 students and shortening time-to-market by 30%.',
      'Improved mobile engagement from 2 to 5 sessions per user per week by implementing mobile-first layouts and responsive UI components.',
      'Built and integrated 15+ reusable React components with associated state workflows, cutting front-end iteration time by 40% and standardizing UI patterns across 3+ core pages.',
    ],
  },
  {
    title: 'Student Researcher',
    company: 'ZY Therapeutics Inc.',
    period: 'Jun 2021 – Jul 2021',
    location: 'Research Triangle Park, NC',
    bullets: [
      'Built a React website for the SN Viability/Cytotoxicity Kit, increasing online engagement by 100% and driving a 50% rise in customer inquiries.',
      'Conducted 50+ experimental assays assessing cytotoxicity on human kidney cells, generating data that informed product improvement and regulatory documentation.',
      'Analyzed concentration-dependent toxicity levels with specialized assays, determining transfection efficacy thresholds and enhancing assay sensitivity by 35%.',
    ],
  },
]

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-head reveal">
          <p className="section-head__label">Experience</p>
        </div>

        <div className="exp">
          {experiences.map((exp) => (
            <article className="exp__item reveal" key={exp.company}>
              <div className="exp__meta">
                <p className="exp__period">{exp.period}</p>
                <p className="exp__company">{exp.company}</p>
                <p className="exp__location">{exp.location}</p>
              </div>
              <div className="exp__main">
                <h3 className="exp__role">{exp.title}</h3>
                <ul className="exp__bullets">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
