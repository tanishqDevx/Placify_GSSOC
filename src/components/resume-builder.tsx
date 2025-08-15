"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import { PersonalInfoForm } from "../components/forms/personal-info-form"
import { ExperienceForm } from "../components/forms/experience-form"
import { EducationForm } from "../components/forms/education-form"
import { SkillsForm } from "../components/forms/skills-form"
import { ProjectsForm } from "../components/forms/projects-form"
import { CertificatesForm } from "../components/forms/certificates-form"
import { LanguagesForm } from "../components/forms/languages-form"
import { TemplateSelection } from "../components/template-selection"
import { ResumeExport } from "../components/resume-export"
import { User, Briefcase, GraduationCap, Zap, FolderOpen, Award, Languages, Download, Palette } from "lucide-react"

const formSteps = [
  { id: "personal", label: "Personal Info", icon: User, component: PersonalInfoForm },
  { id: "experience", label: "Experience", icon: Briefcase, component: ExperienceForm },
  { id: "education", label: "Education", icon: GraduationCap, component: EducationForm },
  { id: "skills", label: "Skills", icon: Zap, component: SkillsForm },
  { id: "projects", label: "Projects", icon: FolderOpen, component: ProjectsForm },
  { id: "certificates", label: "Certificates", icon: Award, component: CertificatesForm },
  { id: "languages", label: "Languages", icon: Languages, component: LanguagesForm },
  { id: "templates", label: "Choose Template", icon: Palette, component: TemplateSelection },
  { id: "export", label: "Export Resume", icon: Download, component: ResumeExport },
]

export function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

  const CurrentFormComponent = formSteps[currentStep].component

  const handleNext = () => {
    setCompletedSteps((prev) => new Set([...prev, currentStep]))
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = ((completedSteps.size + (currentStep > 0 ? 1 : 0)) / formSteps.length) * 100

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Progress Header */}
      <div className="mb-8">
        <Progress value={progress} className="mb-4" />
        <p className="text-sm text-gray-600">
          Step {currentStep + 1} of {formSteps.length} • {Math.round(progress)}% Complete
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-2">
                {formSteps.map((step, index) => {
                  const Icon = step.icon
                  const isCompleted = completedSteps.has(index)
                  const isCurrent = index === currentStep

                  return (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStep(index)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                        isCurrent
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : isCompleted
                            ? "bg-green-50 text-green-700 hover:bg-green-100"
                            : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{step.label}</span>
                      {isCompleted && (
                        <Badge variant="secondary" className="ml-auto bg-green-100 text-green-700">
                          ✓
                        </Badge>
                      )}
                    </button>
                  )
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Form Area */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            <CurrentFormComponent />

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
                Previous
              </Button>
              <Button onClick={handleNext} disabled={currentStep === formSteps.length - 1}>
                {currentStep === formSteps.length - 1 ? "" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
