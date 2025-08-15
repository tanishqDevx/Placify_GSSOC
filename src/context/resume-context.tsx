"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type {
  ResumeData,
  PersonalInfo,
  Experience,
  Education,
  Skill,
  Project,
  Certificate,
  Language,
  ResumeTemplate,
} from "../types/resume"
import { resumeTemplates } from "../lib/resume-templates"

interface ResumeContextType {
  resumeData: ResumeData
  selectedTemplate: ResumeTemplate
  setSelectedTemplate: (template: ResumeTemplate) => void
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void
  addExperience: (experience: Experience) => void
  updateExperience: (id: string, experience: Partial<Experience>) => void
  removeExperience: (id: string) => void
  addEducation: (education: Education) => void
  updateEducation: (id: string, education: Partial<Education>) => void
  removeEducation: (id: string) => void
  addSkill: (skill: Skill) => void
  updateSkill: (id: string, skill: Partial<Skill>) => void
  removeSkill: (id: string) => void
  addProject: (project: Project) => void
  updateProject: (id: string, project: Partial<Project>) => void
  removeProject: (id: string) => void
  addCertificate: (certificate: Certificate) => void
  updateCertificate: (id: string, certificate: Partial<Certificate>) => void
  removeCertificate: (id: string) => void
  addLanguage: (language: Language) => void
  updateLanguage: (id: string, language: Partial<Language>) => void
  removeLanguage: (id: string) => void
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

const initialResumeData: ResumeData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    profileImage: "",
    summary: "",
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certificates: [],
  languages: [],
}

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>(resumeTemplates[0])

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }))
  }

  const addExperience = (experience: Experience) => {
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, experience],
    }))
  }

  const updateExperience = (id: string, experience: Partial<Experience>) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, ...experience } : exp)),
    }))
  }

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }))
  }

  const addEducation = (education: Education) => {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, education],
    }))
  }

  const updateEducation = (id: string, education: Partial<Education>) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, ...education } : edu)),
    }))
  }

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }

  const addSkill = (skill: Skill) => {
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }))
  }

  const updateSkill = (id: string, skill: Partial<Skill>) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, ...skill } : s)),
    }))
  }

  const removeSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }))
  }

  const addProject = (project: Project) => {
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, project],
    }))
  }

  const updateProject = (id: string, project: Partial<Project>) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...project } : p)),
    }))
  }

  const removeProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }))
  }

  const addCertificate = (certificate: Certificate) => {
    setResumeData((prev) => ({
      ...prev,
      certificates: [...prev.certificates, certificate],
    }))
  }

  const updateCertificate = (id: string, certificate: Partial<Certificate>) => {
    setResumeData((prev) => ({
      ...prev,
      certificates: prev.certificates.map((c) => (c.id === id ? { ...c, ...certificate } : c)),
    }))
  }

  const removeCertificate = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((c) => c.id !== id),
    }))
  }

  const addLanguage = (language: Language) => {
    setResumeData((prev) => ({
      ...prev,
      languages: [...prev.languages, language],
    }))
  }

  const updateLanguage = (id: string, language: Partial<Language>) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.map((l) => (l.id === id ? { ...l, ...language } : l)),
    }))
  }

  const removeLanguage = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l.id !== id),
    }))
  }

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        selectedTemplate,
        setSelectedTemplate,
        updatePersonalInfo,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        updateSkill,
        removeSkill,
        addProject,
        updateProject,
        removeProject,
        addCertificate,
        updateCertificate,
        removeCertificate,
        addLanguage,
        updateLanguage,
        removeLanguage,
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider")
  }
  return context
}
