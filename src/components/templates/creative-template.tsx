"use client"

import type { ResumeData, ResumeTemplate } from "../../types/resume"
import { Badge } from "../../components/ui/badge"
import { Mail, Phone, MapPin, Github, ExternalLink } from "lucide-react"

interface CreativeTemplateProps {
  data: ResumeData
  template: ResumeTemplate
  className?: string
}

export function CreativeTemplate({ data, template, className = "" }: CreativeTemplateProps) {
  const { personalInfo, experience, education, skills, projects, certificates, languages } = data
  const { colorScheme } = template

  const formatDate = (date: string) => {
    if (!date) return ""
    const [year, month] = date.split("-")
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${monthNames[Number.parseInt(month) - 1]} ${year}`
  }

  return (
    <div className={`bg-white shadow-lg max-w-4xl mx-auto overflow-hidden ${className}`}>
      {/* Creative Header with Diagonal Design */}
      <div className="relative">
        <div
          className="h-64 relative"
          style={{
            background: `linear-gradient(135deg, ${colorScheme.primary} 0%, ${colorScheme.secondary} 100%)`,
          }}
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 p-8 text-white h-full flex items-center">
            <div className="flex items-center gap-8">
              {personalInfo.profileImage && (
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-full transform rotate-6"
                    style={{ backgroundColor: colorScheme.accent }}
                  />
                  <img
                    src={personalInfo.profileImage || "/placeholder.svg"}
                    alt="Profile"
                    className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
              )}
              <div>
                <h1 className="text-5xl font-bold mb-4">
                  {personalInfo.firstName} <br />
                  <span className="text-3xl opacity-90">{personalInfo.lastName}</span>
                </h1>
                <div className="flex flex-wrap gap-6 text-sm opacity-90">
                  {personalInfo.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {personalInfo.email}
                    </div>
                  )}
                  {personalInfo.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {personalInfo.phone}
                    </div>
                  )}
                  {personalInfo.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {personalInfo.location}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Diagonal Cut */}
        <div
          className="absolute bottom-0 left-0 w-full h-8"
          style={{
            background: "white",
            clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
          }}
        />
      </div>

      <div className="px-8 py-6 -mt-4">
        {/* Professional Summary with Creative Styling */}
        {personalInfo.summary && (
          <section className="mb-8">
            <div className="relative">
              <div
                className="absolute -left-4 top-0 w-1 h-full rounded-full"
                style={{ backgroundColor: colorScheme.accent }}
              />
              <div className="pl-6">
                <h2 className="text-2xl font-bold mb-4" style={{ color: colorScheme.primary }}>
                  About Me
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">{personalInfo.summary}</p>
              </div>
            </div>
          </section>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience with Creative Timeline */}
            {experience.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: colorScheme.primary }}>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: colorScheme.accent }}
                  >
                    W
                  </div>
                  Work Experience
                </h2>
                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <div key={exp.id} className="relative">
                      <div
                        className="absolute left-4 top-8 w-0.5 h-full"
                        style={{ backgroundColor: `${colorScheme.accent}40` }}
                      />
                      <div className="flex gap-6">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-2"
                          style={{ backgroundColor: colorScheme.accent }}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div
                            className="p-6 rounded-lg shadow-sm border-l-4"
                            style={{
                              backgroundColor: `${colorScheme.accent}05`,
                              borderColor: colorScheme.accent,
                            }}
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h3 className="text-xl font-bold" style={{ color: colorScheme.text }}>
                                  {exp.position}
                                </h3>
                                <p className="font-semibold" style={{ color: colorScheme.secondary }}>
                                  {exp.company} • {exp.location}
                                </p>
                              </div>
                              <span
                                className="px-3 py-1 rounded-full text-sm font-medium"
                                style={{
                                  backgroundColor: colorScheme.accent,
                                  color: "white",
                                }}
                              >
                                {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                              </span>
                            </div>
                            <ul className="space-y-2 text-gray-700">
                              {exp.description.map((desc, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <div
                                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                                    style={{ backgroundColor: colorScheme.accent }}
                                  />
                                  {desc}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects with Creative Cards */}
            {projects.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: colorScheme.primary }}>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: colorScheme.accent }}
                  >
                    P
                  </div>
                  Featured Projects
                </h2>
                <div className="grid gap-6">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="relative p-6 rounded-xl shadow-lg border-2 hover:shadow-xl transition-shadow"
                      style={{
                        borderColor: colorScheme.accent,
                        background: `linear-gradient(135deg, white 0%, ${colorScheme.accent}05 100%)`,
                      }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold" style={{ color: colorScheme.text }}>
                          {project.name}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {formatDate(project.startDate)} - {formatDate(project.endDate)}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4">{project.description}</p>
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, index) => (
                            <Badge
                              key={index}
                              className="text-xs font-medium"
                              style={{
                                backgroundColor: colorScheme.accent,
                                color: "white",
                              }}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-4">
                        {project.url && (
                          <a
                            href={project.url}
                            className="flex items-center gap-2 text-sm font-medium hover:underline"
                            style={{ color: colorScheme.primary }}
                          >
                            <ExternalLink className="h-4 w-4" />
                            Live Demo
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            className="flex items-center gap-2 text-sm font-medium hover:underline"
                            style={{ color: colorScheme.primary }}
                          >
                            <Github className="h-4 w-4" />
                            Source Code
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Skills with Creative Progress */}
            {skills.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-3" style={{ color: colorScheme.primary }}>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: colorScheme.accent }}
                  >
                    S
                  </div>
                  Skills
                </h2>
                <div className="space-y-4">
                  {Array.from(new Set(skills.map((skill) => skill.category))).map((category) => (
                    <div key={category}>
                      <h3
                        className="font-semibold text-sm uppercase tracking-wide mb-3"
                        style={{ color: colorScheme.secondary }}
                      >
                        {category}
                      </h3>
                      <div className="space-y-3">
                        {skills
                          .filter((skill) => skill.category === category)
                          .map((skill) => (
                            <div key={skill.id}>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium">{skill.name}</span>
                                <span className="text-xs text-gray-500">{skill.level}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="h-2 rounded-full transition-all"
                                  style={{
                                    backgroundColor: colorScheme.accent,
                                    width:
                                      skill.level === "Expert"
                                        ? "100%"
                                        : skill.level === "Advanced"
                                          ? "80%"
                                          : skill.level === "Intermediate"
                                            ? "60%"
                                            : "40%",
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-3" style={{ color: colorScheme.primary }}>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: colorScheme.accent }}
                  >
                    E
                  </div>
                  Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div
                      key={edu.id}
                      className="p-4 rounded-lg border-l-4"
                      style={{
                        backgroundColor: `${colorScheme.accent}10`,
                        borderColor: colorScheme.accent,
                      }}
                    >
                      <h3 className="font-semibold" style={{ color: colorScheme.text }}>
                        {edu.degree}
                      </h3>
                      <p className="text-sm" style={{ color: colorScheme.secondary }}>
                        {edu.field}
                      </p>
                      <p className="text-sm text-gray-600">{edu.institution}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages & Certificates */}
            {(languages.length > 0 || certificates.length > 0) && (
              <div className="space-y-6">
                {languages.length > 0 && (
                  <section>
                    <h2
                      className="text-xl font-bold mb-4 flex items-center gap-3"
                      style={{ color: colorScheme.primary }}
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: colorScheme.accent }}
                      >
                        L
                      </div>
                      Languages
                    </h2>
                    <div className="space-y-2">
                      {languages.map((lang) => (
                        <div key={lang.id} className="flex justify-between items-center">
                          <span className="font-medium">{lang.name}</span>
                          <Badge
                            variant="outline"
                            className="text-xs"
                            style={{
                              borderColor: colorScheme.accent,
                              color: colorScheme.secondary,
                            }}
                          >
                            {lang.proficiency}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {certificates.length > 0 && (
                  <section>
                    <h2
                      className="text-xl font-bold mb-4 flex items-center gap-3"
                      style={{ color: colorScheme.primary }}
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: colorScheme.accent }}
                      >
                        C
                      </div>
                      Certificates
                    </h2>
                    <div className="space-y-3">
                      {certificates.map((cert) => (
                        <div
                          key={cert.id}
                          className="p-3 rounded-lg"
                          style={{ backgroundColor: `${colorScheme.accent}10` }}
                        >
                          <h3 className="font-semibold text-sm" style={{ color: colorScheme.text }}>
                            {cert.name}
                          </h3>
                          <p className="text-xs text-gray-600">{cert.issuer}</p>
                          <p className="text-xs text-gray-500">{formatDate(cert.date)}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
