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
      'Improved mobile engagement from 2 to 5 sessions per user per week by implementing mobile-first layouts and responsive Tailwind CSS components.',
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
    <section id="experience" className="section-padding bg-dark-alt">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">
          Experience
        </h2>
        <div className="timeline">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="timeline-item"
              data-aos="fade-up"
              data-aos-delay={i * 120}
            >
              <div className="timeline-dot"></div>
              <div className="card timeline-card">
                <div className="card-body p-4">
                  <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
                    <div>
                      <h5 className="timeline-role">{exp.title}</h5>
                      <h6 className="timeline-company">{exp.company}</h6>
                    </div>
                    <div className="text-end flex-shrink-0">
                      <span className="badge cyan-badge mb-1 d-block">{exp.period}</span>
                      <small className="timeline-location">{exp.location}</small>
                    </div>
                  </div>
                  <ul className="timeline-bullets mb-0">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
