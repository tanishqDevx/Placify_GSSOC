"use client"

import { useResume } from "../../context/resume-context"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { ImageUpload } from "../../components/ui/image-upload"
import { User } from "lucide-react"

export function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResume()
  const { personalInfo } = resumeData

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Personal Information
        </CardTitle>
        <CardDescription>Add your basic contact information and professional summary</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ImageUpload
          value={personalInfo.profileImage}
          onChange={(value) => updatePersonalInfo({ profileImage: value })}
          maxSize={5}
          acceptedTypes={["image/jpeg", "image/png", "image/webp"]}
        />

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={personalInfo.firstName}
              onChange={(e) => updatePersonalInfo({ firstName: e.target.value })}
              placeholder="John"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={personalInfo.lastName}
              onChange={(e) => updatePersonalInfo({ lastName: e.target.value })}
              placeholder="Doe"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
              placeholder="john.doe@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={personalInfo.location}
            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
            placeholder="New York, NY"
          />
        </div>

        {/* Optional Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              value={personalInfo.website}
              onChange={(e) => updatePersonalInfo({ website: e.target.value })}
              placeholder="https://johndoe.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              type="url"
              value={personalInfo.linkedin}
              onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              type="url"
              value={personalInfo.github}
              onChange={(e) => updatePersonalInfo({ github: e.target.value })}
              placeholder="https://github.com/johndoe"
            />
          </div>
        </div>

        {/* Professional Summary */}
        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary *</Label>
          <Textarea
            id="summary"
            value={personalInfo.summary}
            onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
            placeholder="Write a brief professional summary highlighting your key skills and experience..."
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  )
}
