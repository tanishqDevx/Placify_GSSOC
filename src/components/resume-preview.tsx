"use client"

import type React from "react"

import { useResume } from "../contexts/resume-context"
import { Button } from "../components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { TemplateRenderer } from "../components/templates/template-renderer"
import { Download, Printer, Eye, Share2, FileText } from "lucide-react"
import { useState } from "react"

interface ResumePreviewProps {
  trigger?: React.ReactNode
}

export function ResumePreview({ trigger }: ResumePreviewProps) {
  const { resumeData, selectedTemplate } = useResume()
  const [isExporting, setIsExporting] = useState(false)

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = async () => {
    setIsExporting(true)
    try {
      // In a real application, you would use a library like jsPDF or Puppeteer
      // For now, we'll use the browser's print functionality to save as PDF
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        const resumeElement = document.getElementById("resume-preview-content")
        if (resumeElement) {
          printWindow.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName} - Resume</title>
                <style>
                  body { margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
                  @media print {
                    body { margin: 0; }
                    .no-print { display: none !important; }
                  }
                  @page { margin: 0.5in; }
                </style>
              </head>
              <body>
                ${resumeElement.innerHTML}
              </body>
            </html>
          `)
          printWindow.document.close()
          printWindow.focus()
          setTimeout(() => {
            printWindow.print()
            printWindow.close()
          }, 250)
        }
      }
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName} - Resume`,
          text: "Check out my professional resume",
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const isResumeEmpty = () => {
    return (
      !resumeData.personalInfo.firstName &&
      !resumeData.personalInfo.lastName &&
      resumeData.experience.length === 0 &&
      resumeData.education.length === 0 &&
      resumeData.skills.length === 0
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Eye className="h-4 w-4" />
            Preview Resume
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Resume Preview - {selectedTemplate.name}
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare} className="bg-transparent">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint} className="bg-transparent">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button
                size="sm"
                onClick={handleDownloadPDF}
                disabled={isExporting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Download className="h-4 w-4 mr-2" />
                {isExporting ? "Generating..." : "Download PDF"}
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {isResumeEmpty() ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Resume Data</h3>
                <p className="text-gray-600 mb-4">Start by filling out your personal information and experience.</p>
                <Button variant="outline">Go Back to Forms</Button>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <div id="resume-preview-content" className="bg-white">
                <TemplateRenderer data={resumeData} template={selectedTemplate} />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
