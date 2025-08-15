export interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  website?: string
  linkedin?: string
  github?: string
  profileImage?: string
  summary: string
}

export interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  gpa?: string
  achievements?: string[]
}

export interface Skill {
  id: string
  name: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  category: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  url?: string
  github?: string
  startDate: string
  endDate: string
}

export interface Certificate {
  id: string
  name: string
  issuer: string
  date: string
  url?: string
}

export interface Language {
  id: string
  name: string
  proficiency: "Basic" | "Conversational" | "Fluent" | "Native"
}

export interface ResumeData {
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  certificates: Certificate[]
  languages: Language[]
}

export interface ResumeTemplate {
  id: string
  name: string
  description: string
  colorScheme: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
  }
  preview: string
}
