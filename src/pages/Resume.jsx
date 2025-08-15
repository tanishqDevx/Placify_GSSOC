"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { FileText, Palette, Upload, Download } from "lucide-react"
import { ResumeProvider } from "../contexts/resume-context"
import { ResumeBuilder } from "../components/resume-builder"

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState<"welcome" | "builder">("welcome")

  return (
    <ResumeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {currentStep === "welcome" ? (
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Professional Resume Builder</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Create stunning, professional resumes in minutes with our collection of 15+ beautiful templates.
                Customize colors, add your photo, and download your perfect resume.
              </p>
              <Button
                size="lg"
                onClick={() => setCurrentStep("builder")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              >
                Start Building Your Resume
                <FileText className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Palette className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>15+ Templates</CardTitle>
                  <CardDescription>
                    Choose from a variety of professional templates with different color schemes
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Upload className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Photo Upload</CardTitle>
                  <CardDescription>Add your professional photo to make your resume stand out</CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Download className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Easy Export</CardTitle>
                  <CardDescription>Download your resume as PDF or print directly from your browser</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Template Previews</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
                {[
                  { name: "Modern Blue", color: "bg-blue-500" },
                  { name: "Elegant Green", color: "bg-green-500" },
                  { name: "Creative Purple", color: "bg-purple-500" },
                  { name: "Professional Gray", color: "bg-gray-500" },
                  { name: "Vibrant Orange", color: "bg-orange-500" },
                  { name: "Minimalist Teal", color: "bg-teal-500" },
                  { name: "Bold Red", color: "bg-red-500" },
                  { name: "Soft Pink", color: "bg-pink-500" },
                  { name: "Corporate Navy", color: "bg-blue-800" },
                  { name: "Fresh Lime", color: "bg-lime-500" },
                ].map((template, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-full h-32 ${template.color} rounded-lg mb-2 flex items-center justify-center`}>
                      <FileText className="h-8 w-8 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {template.name}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <ResumeBuilder />
        )}
      </div>
    </ResumeProvider>
  )
}
