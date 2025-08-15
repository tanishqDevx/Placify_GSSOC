"use client"

import { useState } from "react"
import { useResume } from "../context/resume-context"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { resumeTemplates } from "../lib/resume-templates"
import { TemplateRenderer } from "../components/templates/template-renderer"
import { Search, Palette, Eye, Check } from "lucide-react"
import type { ResumeTemplate } from "../types/resume"

export function TemplateSelection() {
  const { resumeData, selectedTemplate, setSelectedTemplate } = useResume()
  const [searchQuery, setSearchQuery] = useState("")
  const [colorFilter, setColorFilter] = useState("all")
  const [previewTemplate, setPreviewTemplate] = useState<ResumeTemplate | null>(null)

  // Filter templates based on search and color
  const filteredTemplates = resumeTemplates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesColor =
      colorFilter === "all" ||
      template.colorScheme.primary.includes(colorFilter) ||
      template.name.toLowerCase().includes(colorFilter)

    return matchesSearch && matchesColor
  })

  // Get unique color categories for filtering
  const colorCategories = [
    { value: "all", label: "All Colors" },
    { value: "blue", label: "Blue Tones" },
    { value: "green", label: "Green Tones" },
    { value: "purple", label: "Purple Tones" },
    { value: "red", label: "Red Tones" },
    { value: "orange", label: "Orange Tones" },
    { value: "gray", label: "Gray Tones" },
    { value: "teal", label: "Teal Tones" },
    { value: "pink", label: "Pink Tones" },
  ]

  const handleTemplateSelect = (template: ResumeTemplate) => {
    setSelectedTemplate(template)
  }

  // Sample data for preview when user data is empty
  const getSampleData = () => {
    if (resumeData.personalInfo.firstName || resumeData.experience.length > 0) {
      return resumeData
    }

    return {
      personalInfo: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@email.com",
        phone: "+1 (555) 123-4567",
        location: "New York, NY",
        website: "johndoe.com",
        linkedin: "linkedin.com/in/johndoe",
        github: "github.com/johndoe",
        profileImage: "/placeholder.svg?height=150&width=150",
        summary:
          "Experienced software developer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Passionate about creating scalable solutions and mentoring junior developers.",
      },
      experience: [
        {
          id: "1",
          company: "Tech Solutions Inc.",
          position: "Senior Software Developer",
          location: "New York, NY",
          startDate: "2021-03",
          endDate: "",
          current: true,
          description: [
            "Led development of microservices architecture serving 1M+ users",
            "Mentored team of 4 junior developers and improved code quality by 40%",
            "Implemented CI/CD pipelines reducing deployment time by 60%",
          ],
        },
      ],
      education: [
        {
          id: "1",
          institution: "University of Technology",
          degree: "Bachelor of Science",
          field: "Computer Science",
          location: "Boston, MA",
          startDate: "2017-09",
          endDate: "2021-05",
          current: false,
          gpa: "3.8",
          achievements: [],
        },
      ],
      skills: [
        { id: "1", name: "React", level: "Expert" as const, category: "Frontend" },
        { id: "2", name: "Node.js", level: "Advanced" as const, category: "Backend" },
        { id: "3", name: "TypeScript", level: "Advanced" as const, category: "Languages" },
        { id: "4", name: "AWS", level: "Intermediate" as const, category: "Cloud" },
      ],
      projects: [
        {
          id: "1",
          name: "E-commerce Platform",
          description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL",
          technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
          url: "https://example.com",
          github: "https://github.com/johndoe/ecommerce",
          startDate: "2023-01",
          endDate: "2023-06",
        },
      ],
      certificates: [
        {
          id: "1",
          name: "AWS Certified Solutions Architect",
          issuer: "Amazon Web Services",
          date: "2023-08",
          url: "https://aws.amazon.com/certification/",
        },
      ],
      languages: [
        { id: "1", name: "English", proficiency: "Native" as const },
        { id: "2", name: "Spanish", proficiency: "Conversational" as const },
      ],
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Choose Your Template</h2>
          <p className="text-gray-600">Select from 15+ professional resume templates</p>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={colorFilter} onValueChange={setColorFilter}>
            <SelectTrigger className="w-40">
              <Palette className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {colorCategories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedTemplate.id === template.id ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
            }`}
          >
            <CardContent className="p-4">
              {/* Template Preview */}
              <div className="relative mb-4">
                <div
                  className="w-full h-48 rounded-lg border-2 border-gray-200 overflow-hidden"
                  style={{ backgroundColor: template.colorScheme.background }}
                >
                  {/* Mini template preview */}
                  <div className="p-3 h-full flex flex-col">
                    <div
                      className="h-8 rounded mb-2 flex items-center px-2"
                      style={{ backgroundColor: template.colorScheme.primary }}
                    >
                      <div className="w-4 h-4 rounded-full bg-white/20 mr-2" />
                      <div className="flex-1 h-2 bg-white/30 rounded" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div
                        className="h-2 rounded"
                        style={{ backgroundColor: `${template.colorScheme.accent}40`, width: "80%" }}
                      />
                      <div
                        className="h-2 rounded"
                        style={{ backgroundColor: `${template.colorScheme.accent}40`, width: "60%" }}
                      />
                      <div
                        className="h-2 rounded"
                        style={{ backgroundColor: `${template.colorScheme.accent}40`, width: "90%" }}
                      />
                      <div className="flex gap-1 mt-3">
                        <div className="w-8 h-1 rounded" style={{ backgroundColor: template.colorScheme.accent }} />
                        <div className="w-6 h-1 rounded" style={{ backgroundColor: template.colorScheme.accent }} />
                        <div className="w-10 h-1 rounded" style={{ backgroundColor: template.colorScheme.accent }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selection indicator */}
                {selectedTemplate.id === template.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>

                {/* Color scheme preview */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Colors:</span>
                  <div className="flex gap-1">
                    <div
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: template.colorScheme.primary }}
                    />
                    <div
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: template.colorScheme.secondary }}
                    />
                    <div
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: template.colorScheme.accent }}
                    />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <Button
                    variant={selectedTemplate.id === template.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTemplateSelect(template)}
                    className="flex-1"
                  >
                    {selectedTemplate.id === template.id ? "Selected" : "Select"}
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setPreviewTemplate(template)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{template.name} Preview</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <TemplateRenderer
                          data={getSampleData()}
                          template={template}
                          className="transform scale-75 origin-top"
                        />
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button
                          onClick={() => {
                            handleTemplateSelect(template)
                            setPreviewTemplate(null)
                          }}
                        >
                          Use This Template
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Palette className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Selected template info */}
      {selectedTemplate && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedTemplate.colorScheme.primary }} />
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: selectedTemplate.colorScheme.secondary }}
              />
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedTemplate.colorScheme.accent }} />
            </div>
            <div>
              <p className="font-medium text-blue-900">Selected Template: {selectedTemplate.name}</p>
              <p className="text-sm text-blue-700">{selectedTemplate.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
