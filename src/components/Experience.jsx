const experiences = [
  {
    title: 'Software Engineer',
    company: 'Micron Technology, Inc.',
    period: 'Jan 2025 – Jun 2025',
    location: 'Singapore',
    bullets: [
      'Led the design and implementation of a high-performance WPF MVVM application in C#, automating NAND silicon validation processes and reducing waveform loading latency by 80%, significantly accelerating testing cycles.',
      'Developed an in-house waveform visualization platform, resulting in cost savings of $1,000 per license by eliminating reliance on external software solutions and streamlining internal workflows.',
      'Built scalable automation pipelines in Python with HDF5.net to process large waveform datasets, reducing manual data handling time by 10 seconds per cycle and improving overall analysis throughput.',
    ],
  },
  {
    title: 'Fullstack Engineer',
    company: 'MyEdututor',
    period: 'May 2024 – Aug 2024',
    location: 'Remote (Minneapolis–Saint Paul, MN)',
    bullets: [
      "Designed and deployed the full-stack MVP, using REST API design, MongoDB, and CI/CD pipeline, launching to an initial cohort of 80–100 students and shortening time-to-market by 30%.",
      'Improved mobile engagement (sessions per user) from 2 to 5 times per week by implementing mobile-first layouts and responsive Tailwind CSS components.',
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
