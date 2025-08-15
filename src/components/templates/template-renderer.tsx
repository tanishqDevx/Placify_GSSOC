"use client"

import type { ResumeData, ResumeTemplate } from "../../types/resume"
import { BaseTemplate } from "./base-template"
import { ModernTemplate } from "./modern-template"
import { CreativeTemplate } from "./creative-template"

interface TemplateRendererProps {
  data: ResumeData
  template: ResumeTemplate
  className?: string
}

export function TemplateRenderer({ data, template, className }: TemplateRendererProps) {
  // Map template IDs to specific template components
  const getTemplateComponent = () => {
    switch (template.id) {
      case "modern-blue":
      case "elegant-green":
      case "minimalist-teal":
      case "cool-indigo":
      case "ocean-cyan":
        return ModernTemplate
      case "creative-purple":
      case "vibrant-orange":
      case "bold-red":
      case "soft-pink":
      case "sunset-rose":
        return CreativeTemplate
      default:
        return BaseTemplate
    }
  }

  const TemplateComponent = getTemplateComponent()

  return <TemplateComponent data={data} template={template} className={className} />
}
