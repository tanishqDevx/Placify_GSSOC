"use client"

import { useResume } from "../contexts/resume-context"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Download, Printer, FileText, Share2, Copy, Mail, Eye } from "lucide-react"
import { useState } from "react"

export function ResumeExport() {
  const { resumeData, selectedTemplate } = useResume()
  const [isExporting, setIsExporting] = useState(false)
  const [exportFormat, setExportFormat] = useState<"pdf" | "print">("pdf")

  const generateResumeHTML = () => {
    const { personalInfo, experience, education, skills, projects } = resumeData
    
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>${personalInfo.firstName} ${personalInfo.lastName} - Resume</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                background: white;
                font-size: 11pt;
            }
            
            .resume {
                max-width: 8.5in;
                margin: 0 auto;
                padding: 0.75in;
                background: white;
                min-height: 11in;
            }
            
            .header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid ${selectedTemplate.colorScheme.primary};
            }
            
            .name {
                font-size: 32pt;
                font-weight: bold;
                color: ${selectedTemplate.colorScheme.primary};
                margin-bottom: 8px;
            }
            
            .contact-info {
                font-size: 11pt;
                color: #666;
                margin-bottom: 10px;
            }
            
            .contact-item {
                display: inline-block;
                margin: 0 15px;
            }
            
            .summary {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 20px;
                border-left: 4px solid ${selectedTemplate.colorScheme.secondary};
            }
            
            .section {
                margin-bottom: 25px;
            }
            
            .section-title {
                font-size: 14pt;
                font-weight: bold;
                color: ${selectedTemplate.colorScheme.primary};
                text-transform: uppercase;
                letter-spacing: 1px;
                border-bottom: 1px solid #ddd;
                padding-bottom: 5px;
                margin-bottom: 15px;
            }
            
            .experience-item, .education-item, .project-item {
                margin-bottom: 20px;
                padding-left: 10px;
                border-left: 2px solid ${selectedTemplate.colorScheme.accent};
                padding-bottom: 15px;
            }
            
            .item-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 5px;
            }
            
            .item-title {
                font-weight: bold;
                color: #333;
                font-size: 12pt;
            }
            
            .item-subtitle {
                color: ${selectedTemplate.colorScheme.secondary};
                font-style: italic;
                margin-bottom: 3px;
            }
            
            .item-date {
                color: #666;
                font-size: 10pt;
                white-space: nowrap;
            }
            
            .item-description {
                margin-top: 8px;
                text-align: justify;
            }
            
            .skills-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 10px;
                margin-top: 10px;
            }
            
            .skill-category {
                background: #f8f9fa;
                padding: 12px;
                border-radius: 5px;
                border-left: 3px solid ${selectedTemplate.colorScheme.secondary};
            }
            
            .skill-category-title {
                font-weight: bold;
                color: ${selectedTemplate.colorScheme.primary};
                margin-bottom: 5px;
            }
            
            .skill-list {
                color: #555;
                font-size: 10pt;
            }
            
            .achievements {
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                padding: 15px;
                border-radius: 8px;
                margin-top: 10px;
            }
            
            ul {
                padding-left: 18px;
                margin-top: 5px;
            }
            
            li {
                margin-bottom: 3px;
            }
            
            @page {
                margin: 0.5in;
                size: letter;
            }
            
            @media print {
                .resume {
                    padding: 0;
                    margin: 0;
                    max-width: none;
                    min-height: auto;
                }
                
                .no-break {
                    page-break-inside: avoid;
                }
            }
        </style>
    </head>
    <body>
        <div class="resume">
            <!-- Header -->
            <div class="header">
                <div class="name">${personalInfo.firstName} ${personalInfo.lastName}</div>
                <div class="contact-info">
                    ${personalInfo.email ? `<span class="contact-item">📧 ${personalInfo.email}</span>` : ''}
                    ${personalInfo.phone ? `<span class="contact-item">📞 ${personalInfo.phone}</span>` : ''}
                    ${personalInfo.location ? `<span class="contact-item">📍 ${personalInfo.location}</span>` : ''}
                    ${personalInfo.linkedin ? `<span class="contact-item">🔗 ${personalInfo.linkedin}</span>` : ''}
                </div>
                ${personalInfo.summary ? `
                <div class="summary">
                    <strong>Professional Summary:</strong><br>
                    ${personalInfo.summary}
                </div>
                ` : ''}
            </div>
            
            <!-- Experience -->
            ${experience.length > 0 ? `
            <div class="section">
                <h2 class="section-title">Professional Experience</h2>
                ${experience.map(exp => `
                <div class="experience-item no-break">
                    <div class="item-header">
                        <div>
                            <div class="item-title">${exp.position}</div>
                            <div class="item-subtitle">${exp.company}</div>
                        </div>
                        <div class="item-date">${exp.startDate} - ${exp.endDate || (exp.current ? 'Present' : '')}</div>
                    </div>
                    ${exp.description && exp.description.length > 0 ? `
                    <div class="item-description">
                        ${exp.description.map(desc => `<div>${desc}</div>`).join('')}
                    </div>
                    ` : ''}
                    ${exp.achievements && exp.achievements.length > 0 ? `
                    <ul>
                        ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                    ` : ''}
                </div>
                `).join('')}
            </div>
            ` : ''}
            
            <!-- Education -->
            ${education.length > 0 ? `
            <div class="section">
                <h2 class="section-title">Education</h2>
                ${education.map(edu => `
                <div class="education-item no-break">
                    <div class="item-header">
                        <div>
                            <div class="item-title">${edu.degree} in ${edu.field}</div>
                            <div class="item-subtitle">${edu.institution}</div>
                        </div>
                        <div class="item-date">${edu.startDate} - ${edu.endDate || (edu.current ? 'Present' : '')}</div>
                    </div>
                    ${edu.gpa ? `<div>GPA: ${edu.gpa}</div>` : ''}
                    ${edu.achievements && edu.achievements.length > 0 ? `
                    <ul>
                        ${edu.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                    ` : ''}
                </div>
                `).join('')}
            </div>
            ` : ''}
            
            <!-- Skills -->
            ${skills.length > 0 ? `
            <div class="section">
                <h2 class="section-title">Skills & Expertise</h2>
                <div class="skills-grid">
                    ${skills.map(skill => `
                    <div class="skill-category">
                        <div class="skill-category-title">${skill.category}</div>
                        <div class="skill-list">${skill.name} (${skill.level})</div>
                    </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            <!-- Projects -->
            ${projects.length > 0 ? `
            <div class="section">
                <h2 class="section-title">Key Projects</h2>
                ${projects.map(project => `
                <div class="project-item no-break">
                    <div class="item-header">
                        <div>
                            <div class="item-title">${project.name}</div>
                            ${project.technologies ? `<div class="item-subtitle">Technologies: ${project.technologies.join(', ')}</div>` : ''}
                        </div>
                        <div class="item-date">${project.startDate} - ${project.endDate}</div>
                    </div>
                    ${project.description ? `<div class="item-description">${project.description}</div>` : ''}
                    ${project.url ? `<div style="margin-top: 5px;"><strong>Live:</strong> <a href="${project.url}">${project.url}</a></div>` : ''}
                    ${project.github ? `<div style="margin-top: 5px;"><strong>GitHub:</strong> <a href="${project.github}">${project.github}</a></div>` : ''}
                </div>
                `).join('')}
            </div>
            ` : ''}
        </div>
    </body>
    </html>
    `
  }

  const handleExport = async (format: "pdf" | "print") => {
    setIsExporting(true)
    setExportFormat(format)

    try {
      const resumeHTML = generateResumeHTML()
      const blob = new Blob([resumeHTML], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      
      if (format === "print") {
        // Open in new window for printing
        const printWindow = window.open(url, '_blank')
        if (printWindow) {
          printWindow.addEventListener('load', () => {
            setTimeout(() => {
              printWindow.print()
            }, 500)
          })
        }
      } else {
        // Open in new window for PDF download
        const pdfWindow = window.open(url, '_blank')
        if (pdfWindow) {
          pdfWindow.addEventListener('load', () => {
            setTimeout(() => {
              pdfWindow.print() // This will open the browser's print dialog with "Save as PDF" option
            }, 500)
          })
        }
      }
    } catch (error) {
      console.error("Export error:", error)
      alert("Error generating resume. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  const handlePreview = () => {
    const resumeHTML = generateResumeHTML()
    const blob = new Blob([resumeHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    } catch (error) {
      console.error("Copy error:", error)
      alert("Could not copy link. Please copy manually.")
    }
  }

  const handleEmailShare = () => {
    const subject = encodeURIComponent(
      `${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName} - Resume`,
    )
    const body = encodeURIComponent(`Please find my resume at: ${window.location.href}`)
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName} - Resume`,
          text: "Check out my professional resume",
          url: window.location.href,
        })
      } catch (error) {
        console.error("Share error:", error)
        handleCopyLink()
      }
    } else {
      handleCopyLink()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Export Your Resume</h2>
        <p className="text-gray-600">Download, print, or share your professional resume</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Export Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download & Print
            </CardTitle>
            <CardDescription>Get your resume in different formats</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={handlePreview}
              variant="outline"
              className="w-full justify-start"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview Resume
            </Button>
            <Button
              onClick={() => handleExport("pdf")}
              disabled={isExporting}
              className="w-full justify-start bg-blue-600 hover:bg-blue-700"
            >
              <FileText className="h-4 w-4 mr-2" />
              {isExporting && exportFormat === "pdf" ? "Generating PDF..." : "Download as PDF"}
            </Button>
            <Button
              variant="outline"
              onClick={() => handleExport("print")}
              disabled={isExporting}
              className="w-full justify-start"
            >
              <Printer className="h-4 w-4 mr-2" />
              {isExporting && exportFormat === "print" ? "Opening Print..." : "Print Resume"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Resume Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Resume Summary</CardTitle>
          <CardDescription>Overview of your resume content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{resumeData.experience?.length || 0}</div>
              <div className="text-sm text-gray-600">Work Experience</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{resumeData.education?.length || 0}</div>
              <div className="text-sm text-gray-600">Education</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{resumeData.skills?.length || 0}</div>
              <div className="text-sm text-gray-600">Skills</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{resumeData.projects?.length || 0}</div>
              <div className="text-sm text-gray-600">Projects</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Template Info */}
      <Card>
        <CardHeader>
          <CardTitle>Selected Template</CardTitle>
          <CardDescription>Current template and color scheme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <div
                  className="w-4 h-4 rounded-full border border-gray-200"
                  style={{ backgroundColor: selectedTemplate.colorScheme.primary }}
                />
                <div
                  className="w-4 h-4 rounded-full border border-gray-200"
                  style={{ backgroundColor: selectedTemplate.colorScheme.secondary }}
                />
                <div
                  className="w-4 h-4 rounded-full border border-gray-200"
                  style={{ backgroundColor: selectedTemplate.colorScheme.accent }}
                />
              </div>
              <div>
                <p className="font-medium">{selectedTemplate.name}</p>
                <p className="text-sm text-gray-600">{selectedTemplate.description}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}