"use client"

import { useState } from "react"
import { useResume } from "../../contexts/resume-context"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Checkbox } from "../../components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Plus, Briefcase, Trash2 } from "lucide-react"
import type { Experience } from "../../types/resume"

export function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResume()
  const [showAddForm, setShowAddForm] = useState(false)
  const [newExperience, setNewExperience] = useState<Omit<Experience, "id">>({
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: [""],
  })

  const handleAddExperience = () => {
    if (newExperience.company && newExperience.position) {
      addExperience({
        ...newExperience,
        id: Date.now().toString(),
        description: newExperience.description.filter((desc) => desc.trim() !== ""),
      })
      setNewExperience({
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: [""],
      })
      setShowAddForm(false)
    }
  }

  const updateDescription = (index: number, value: string) => {
    const newDesc = [...newExperience.description]
    newDesc[index] = value
    setNewExperience({ ...newExperience, description: newDesc })
  }

  const addDescriptionPoint = () => {
    setNewExperience({
      ...newExperience,
      description: [...newExperience.description, ""],
    })
  }

  const removeDescriptionPoint = (index: number) => {
    const newDesc = newExperience.description.filter((_, i) => i !== index)
    setNewExperience({ ...newExperience, description: newDesc })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Work Experience
        </CardTitle>
        <CardDescription>Add your work experience, starting with the most recent position</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Existing Experience */}
        {resumeData.experience.map((exp, index) => (
          <div key={exp.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{exp.position}</h3>
                <p className="text-gray-600">
                  {exp.company} • {exp.location}
                </p>
                <p className="text-sm text-gray-500">
                  {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeExperience(exp.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <ul className="list-disc list-inside space-y-1">
                {exp.description.map((desc, i) => (
                  <li key={i} className="text-sm text-gray-700">
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {/* Add New Experience */}
        {!showAddForm ? (
          <Button variant="outline" onClick={() => setShowAddForm(true)} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Work Experience
          </Button>
        ) : (
          <div className="border rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                  placeholder="Google"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position *</Label>
                <Input
                  id="position"
                  value={newExperience.position}
                  onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                  placeholder="Software Engineer"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newExperience.location}
                onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
                placeholder="San Francisco, CA"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="month"
                  value={newExperience.startDate}
                  onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="month"
                  value={newExperience.endDate}
                  onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                  disabled={newExperience.current}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="current"
                checked={newExperience.current}
                onCheckedChange={(checked) => setNewExperience({ ...newExperience, current: checked as boolean })}
              />
              <Label htmlFor="current">I currently work here</Label>
            </div>

            <div className="space-y-2">
              <Label>Job Description</Label>
              {newExperience.description.map((desc, index) => (
                <div key={index} className="flex gap-2">
                  <Textarea
                    value={desc}
                    onChange={(e) => updateDescription(index, e.target.value)}
                    placeholder="Describe your responsibilities and achievements..."
                    rows={2}
                  />
                  {newExperience.description.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeDescriptionPoint(index)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addDescriptionPoint} className="w-full bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Add Description Point
              </Button>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddExperience}>Add Experience</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
