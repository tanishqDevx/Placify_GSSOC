"use client"

import type { ResumeData, ResumeTemplate } from "../../types/resume"
import { Badge } from "../../components/ui/badge"
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink } from "lucide-react"

interface BaseTemplateProps {
  data: ResumeData
  template: ResumeTemplate
  className?: string
}

export function BaseTemplate({ data, template, className = "" }: BaseTemplateProps) {
  const { personalInfo, experience, education, skills, projects, certificates, languages } = data
  const { colorScheme } = template

  const formatDate = (date: string) => {
    if (!date) return ""
    const [year, month] = date.split("-")
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${monthNames[Number.parseInt(month) - 1]} ${year}`
  }

  return (
    <div
      className={`bg-white shadow-lg max-w-4xl mx-auto ${className}`}
      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
    >
      {/* Header Section */}
      <div className="px-8 py-6 text-white" style={{ backgroundColor: colorScheme.primary }}>
        <div className="flex items-start gap-6">
          {personalInfo.profileImage && (
            <img
              src={personalInfo.profileImage || "/placeholder.svg"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm opacity-90">
              {personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {personalInfo.email}
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {personalInfo.phone}
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {personalInfo.location}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-4 text-sm opacity-90 mt-2">
              {personalInfo.website && (
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <span className="truncate">{personalInfo.website.replace(/^https?:\/\//, "")}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-1">
                  <Github className="h-4 w-4" />
                  GitHub
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Professional Summary */}
        {personalInfo.summary && (
          <section className="mb-6">
            <h2
              className="text-xl font-bold mb-3 pb-2 border-b-2"
              style={{ color: colorScheme.primary, borderColor: colorScheme.accent }}
            >
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2
              className="text-xl font-bold mb-4 pb-2 border-b-2"
              style={{ color: colorScheme.primary, borderColor: colorScheme.accent }}
            >
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l-4 pl-4" style={{ borderColor: colorScheme.accent }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg" style={{ color: colorScheme.text }}>
                        {exp.position}
                      </h3>
                      <p className="font-medium" style={{ color: colorScheme.secondary }}>
                        {exp.company} • {exp.location}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                    {exp.description.map((desc, index) => (
                      <li key={index}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2
              className="text-xl font-bold mb-4 pb-2 border-b-2"
              style={{ color: colorScheme.primary, borderColor: colorScheme.accent }}
            >
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="border-l-4 pl-4" style={{ borderColor: colorScheme.accent }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold" style={{ color: colorScheme.text }}>
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className="text-gray-600">
                        {edu.institution} • {edu.location}
                      </p>
                      {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      {formatDate(edu.startDate)} - {edu.current ? "Present" : formatDate(edu.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2
                className="text-xl font-bold mb-4 pb-2 border-b-2"
                style={{ color: colorScheme.primary, borderColor: colorScheme.accent }}
              >
                Skills
              </h2>
              <div className="space-y-3">
                {Array.from(new Set(skills.map((skill) => skill.category))).map((category) => (
                  <div key={category}>
                    <h3
                      className="font-medium text-sm uppercase tracking-wide mb-2"
                      style={{ color: colorScheme.secondary }}
                    >
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills
                        .filter((skill) => skill.category === category)
                        .map((skill) => (
                          <Badge
                            key={skill.id}
                            variant="secondary"
                            className="text-xs"
                            style={{
                              backgroundColor: `${colorScheme.accent}20`,
                              color: colorScheme.primary,
                              border: `1px solid ${colorScheme.accent}`,
                            }}
                          >
                            {skill.name}
                          </Badge>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section>
              <h2
                className="text-xl font-bold mb-4 pb-2 border-b-2"
                style={{ color: colorScheme.primary, borderColor: colorScheme.accent }}
              >
                Languages
              </h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center">
                    <span className="font-medium" style={{ color: colorScheme.text }}>
                      {lang.name}
                    </span>
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
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mt-6">
            <h2
              className="text-xl font-bold mb-4 pb-2 border-b-2"
              style={{ color: colorScheme.primary, borderColor: colorScheme.accent }}
            >
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="border-l-4 pl-4" style={{ borderColor: colorScheme.accent }}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold" style={{ color: colorScheme.text }}>
                      {project.name}
                    </h3>
                    <span className="text-sm text-gray-500 whitespace-nowrap">
                      {formatDate(project.startDate)} - {formatDate(project.endDate)}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.technologies.map((tech, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                          style={{
                            borderColor: colorScheme.accent,
                            color: colorScheme.secondary,
                          }}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-4 text-sm">
                    {project.url && (
                      <a
                        href={project.url}
                        className="flex items-center gap-1 hover:underline"
                        style={{ color: colorScheme.primary }}
                      >
                        <ExternalLink className="h-3 w-3" />
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        className="flex items-center gap-1 hover:underline"
                        style={{ color: colorScheme.primary }}
                      >
                        <Github className="h-3 w-3" />
                        Source
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
          <section className="mt-6">
            <h2
              className="text-xl font-bold mb-4 pb-2 border-b-2"
              style={{ color: colorScheme.primary, borderColor: colorScheme.accent }}
            >
              Certificates
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {certificates.map((cert) => (
                <div key={cert.id} className="border-l-4 pl-4" style={{ borderColor: colorScheme.accent }}>
                  <h3 className="font-semibold text-sm" style={{ color: colorScheme.text }}>
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
  )
}
