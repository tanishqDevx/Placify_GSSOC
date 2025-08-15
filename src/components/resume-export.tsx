"use client"

import { useResume } from "../contexts/resume-context"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Download, Printer, FileText, Share2, Copy, Mail } from "lucide-react"
import { useState } from "react"

export function ResumeExport() {
  const { resumeData, selectedTemplate } = useResume()
  const [isExporting, setIsExporting] = useState(false)
  const [exportFormat, setExportFormat] = useState<"pdf" | "print">("pdf")

  const handleExport = async (format: "pdf" | "print") => {
    setIsExporting(true)
    setExportFormat(format)

    try {
      const resumeElement = document.getElementById("resume-export-content")
      if (!resumeElement) return

      if (format === "print") {
        window.print()
      } else {
        // PDF export using browser's print to PDF
        const printWindow = window.open("", "_blank")
        if (printWindow) {
          printWindow.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName} - Resume</title>
                <meta charset="utf-8">
                <style>
                  * { box-sizing: border-box; }
                  body { 
                    margin: 0; 
                    padding: 0; 
                    font-family: system-ui, -apple-system, sans-serif;
                    line-height: 1.5;
                    color: #1f2937;
                  }
                  @media print {
                    body { margin: 0; }
                    .no-print { display: none !important; }
                    .page-break { page-break-before: always; }
                  }
                  @page { 
                    margin: 0.5in; 
                    size: A4;
                  }
                  .resume-container {
                    max-width: 8.5in;
                    margin: 0 auto;
                    background: white;
                  }
                </style>
              </head>
              <body>
                <div class="resume-container">
                  ${resumeElement.innerHTML}
                </div>
              </body>
            </html>
          `)
          printWindow.document.close()
          printWindow.focus()
          setTimeout(() => {
            printWindow.print()
            printWindow.close()
          }, 500)
        }
      }
    } catch (error) {
      console.error("Export error:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    } catch (error) {
      console.error("Copy error:", error)
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
              className="w-full justify-start bg-transparent"
            >
              <Printer className="h-4 w-4 mr-2" />
              {isExporting && exportFormat === "print" ? "Opening Print..." : "Print Resume"}
            </Button>
          </CardContent>
        </Card>

        {/* Share Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Share Resume
            </CardTitle>
            <CardDescription>Share your resume with others</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" onClick={handleWebShare} className="w-full justify-start bg-transparent">
              <Share2 className="h-4 w-4 mr-2" />
              Share Link
            </Button>
            <Button variant="outline" onClick={handleCopyLink} className="w-full justify-start bg-transparent">
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
            <Button variant="outline" onClick={handleEmailShare} className="w-full justify-start bg-transparent">
              <Mail className="h-4 w-4 mr-2" />
              Email Resume
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
              <div className="text-2xl font-bold text-blue-600">{resumeData.experience.length}</div>
              <div className="text-sm text-gray-600">Work Experience</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{resumeData.education.length}</div>
              <div className="text-sm text-gray-600">Education</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{resumeData.skills.length}</div>
              <div className="text-sm text-gray-600">Skills</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{resumeData.projects.length}</div>
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

      {/* Hidden content for export */}
      <div id="resume-export-content" className="hidden">
        {/* This will be populated when exporting */}
      </div>
    </div>
  )
}
