const skillCategories = [
  {
    name: 'Languages',
    skills: ['Python', 'Java', 'C', 'C++', 'C#', 'JavaScript', 'HTML/CSS', 'Scala', 'SQL'],
  },
  {
    name: 'Frameworks',
    skills: [
      'React',
      'Next.js',
      'Node.js',
      '.NET',
      'WPF (MVVM)',
      'Tailwind CSS',
      'Apache Spark',
      'Hive',
      'Hadoop',
    ],
  },
  {
    name: 'Systems & Real-Time',
    skills: ['WebSockets', 'Server-Sent Events', 'Yjs CRDT', 'Redis pub/sub', 'Monaco Editor'],
  },
  {
    name: 'Databases',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'HDF5'],
  },
  {
    name: 'Cloud / DevOps',
    skills: [
      'AWS',
      'Azure',
      'GCP',
      'Docker',
      'CI/CD',
      'Vercel',
      'Google Cloud Run',
      'GitHub Actions',
    ],
  },
  {
    name: 'Tools',
    skills: [
      'Git',
      'VS Code',
      'Vim',
      'IntelliJ',
      'Eclipse',
      'PyCharm',
      'Jupyter Notebook',
      'Anaconda',
      'Visual Studio',
    ],
  },
]

function Skills() {
  return (
    <section id="skills" className="section-padding bg-dark-alt">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">
          Skills
        </h2>
        <div className="row g-4">
          {skillCategories.map((cat, i) => (
            <div
              key={i}
              className="col-md-6"
              data-aos="fade-up"
              data-aos-delay={i * 80}
            >
              <div className="skill-category-card">
                <p className="skill-category-name">{cat.name}</p>
                <div className="d-flex flex-wrap gap-2">
                  {cat.skills.map((skill, j) => (
                    <span key={j} className="badge skill-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
