"use client"

import type { ResumeData, ResumeTemplate } from "../../types/resume"
import { Badge } from "../../components/ui/badge"
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink } from "lucide-react"

interface ModernTemplateProps {
  data: ResumeData
  template: ResumeTemplate
  className?: string
}

export function ModernTemplate({ data, template, className = "" }: ModernTemplateProps) {
  const { personalInfo, experience, education, skills, projects, certificates, languages } = data
  const { colorScheme } = template

  const formatDate = (date: string) => {
    if (!date) return ""
    const [year, month] = date.split("-")
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${monthNames[Number.parseInt(month) - 1]} ${year}`
  }

  return (
    <div className={`bg-white shadow-lg max-w-4xl mx-auto ${className}`}>
      <div className="grid md:grid-cols-3 min-h-screen">
        {/* Left Sidebar */}
        <div className="md:col-span-1 p-6" style={{ backgroundColor: colorScheme.primary }}>
          <div className="text-white space-y-6">
            {/* Profile Image */}
            {personalInfo.profileImage && (
              <div className="text-center">
                <img
                  src={personalInfo.profileImage || "/placeholder.svg"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white/20"
                />
              </div>
            )}

            {/* Contact Info */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold uppercase tracking-wide">Contact</h2>
              <div className="space-y-2 text-sm">
                {personalInfo.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <span className="break-all">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 flex-shrink-0" />
                    <span className="break-all">{personalInfo.website.replace(/^https?:\/\//, "")}</span>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 flex-shrink-0" />
                    <span>LinkedIn</span>
                  </div>
                )}
                {personalInfo.github && (
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4 flex-shrink-0" />
                    <span>GitHub</span>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-bold uppercase tracking-wide">Skills</h2>
                <div className="space-y-3">
                  {Array.from(new Set(skills.map((skill) => skill.category))).map((category) => (
                    <div key={category}>
                      <h3 className="font-medium text-sm uppercase tracking-wide mb-2 opacity-90">{category}</h3>
                      <div className="space-y-1">
                        {skills
                          .filter((skill) => skill.category === category)
                          .map((skill) => (
                            <div key={skill.id} className="text-sm">
                              <div className="flex justify-between items-center mb-1">
                                <span>{skill.name}</span>
                                <span className="text-xs opacity-75">{skill.level}</span>
                              </div>
                              <div className="w-full bg-white/20 rounded-full h-1">
                                <div
                                  className="bg-white rounded-full h-1 transition-all"
                                  style={{
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
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-bold uppercase tracking-wide">Languages</h2>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <div key={lang.id} className="text-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{lang.name}</span>
                        <span className="text-xs opacity-75">{lang.proficiency}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Content */}
        <div className="md:col-span-2 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2" style={{ color: colorScheme.primary }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            {personalInfo.summary && <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>}
          </div>

          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide" style={{ color: colorScheme.primary }}>
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6">
                    <div
                      className="absolute left-0 top-2 w-3 h-3 rounded-full"
                      style={{ backgroundColor: colorScheme.accent }}
                    />
                    <div
                      className="absolute left-1.5 top-5 w-0.5 h-full"
                      style={{ backgroundColor: colorScheme.accent }}
                    />
                    <div className="pb-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold" style={{ color: colorScheme.text }}>
                            {exp.position}
                          </h3>
                          <p className="font-medium" style={{ color: colorScheme.secondary }}>
                            {exp.company} • {exp.location}
                          </p>
                        </div>
                        <span
                          className="text-sm font-medium px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: `${colorScheme.accent}20`,
                            color: colorScheme.primary,
                          }}
                        >
                          {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                        </span>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {exp.description.map((desc, index) => (
                          <li key={index}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide" style={{ color: colorScheme.primary }}>
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="relative pl-6">
                    <div
                      className="absolute left-0 top-2 w-3 h-3 rounded-full"
                      style={{ backgroundColor: colorScheme.accent }}
                    />
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold" style={{ color: colorScheme.text }}>
                          {edu.degree} in {edu.field}
                        </h3>
                        <p className="text-gray-600">
                          {edu.institution} • {edu.location}
                        </p>
                        {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                      </div>
                      <span
                        className="text-sm font-medium px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: `${colorScheme.accent}20`,
                          color: colorScheme.primary,
                        }}
                      >
                        {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide" style={{ color: colorScheme.primary }}>
                Projects
              </h2>
              <div className="grid gap-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 rounded-lg border-l-4"
                    style={{
                      backgroundColor: `${colorScheme.accent}10`,
                      borderColor: colorScheme.accent,
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold" style={{ color: colorScheme.text }}>
                        {project.name}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {formatDate(project.startDate)} - {formatDate(project.endDate)}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies.map((tech, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
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
                          className="flex items-center gap-1 text-sm hover:underline"
                          style={{ color: colorScheme.primary }}
                        >
                          <ExternalLink className="h-3 w-3" />
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          className="flex items-center gap-1 text-sm hover:underline"
                          style={{ color: colorScheme.primary }}
                        >
                          <Github className="h-3 w-3" />
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certificates */}
          {certificates.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide" style={{ color: colorScheme.primary }}>
                Certificates
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="p-3 rounded-lg" style={{ backgroundColor: `${colorScheme.accent}10` }}>
                    <h3 className="font-semibold" style={{ color: colorScheme.text }}>
                      {cert.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{cert.issuer}</p>
                    <p className="text-gray-500 text-xs">{formatDate(cert.date)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
