"use client"

import { useState } from "react"
import { useResume } from "../../contexts/resume-context"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Plus, Zap, Trash2 } from "lucide-react"
import type { Skill } from "../../types/resume"

export function SkillsForm() {
  const { resumeData, addSkill, removeSkill } = useResume()
  const [showAddForm, setShowAddForm] = useState(false)
  const [newSkill, setNewSkill] = useState<Omit<Skill, "id">>({
    name: "",
    level: "Intermediate",
    category: "",
  })

  const handleAddSkill = () => {
    if (newSkill.name && newSkill.category) {
      addSkill({
        ...newSkill,
        id: Date.now().toString(),
      })
      setNewSkill({
        name: "",
        level: "Intermediate",
        category: "",
      })
      setShowAddForm(false)
    }
  }

  const skillCategories = Array.from(new Set(resumeData.skills.map((skill) => skill.category)))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Skills
        </CardTitle>
        <CardDescription>Add your technical and soft skills organized by category</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Existing Skills by Category */}
        {skillCategories.map((category) => (
          <div key={category} className="space-y-3">
            <h3 className="font-semibold text-lg capitalize">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <div key={skill.id} className="flex items-center gap-1">
                    <Badge variant="secondary" className="flex items-center gap-2">
                      {skill.name} • {skill.level}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkill(skill.id)}
                        className="h-4 w-4 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </Badge>
                  </div>
                ))}
            </div>
          </div>
        ))}

        {/* Add New Skill */}
        {!showAddForm ? (
          <Button variant="outline" onClick={() => setShowAddForm(true)} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Skill
          </Button>
        ) : (
          <div className="border rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="skillName">Skill Name *</Label>
                <Input
                  id="skillName"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  placeholder="React"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skillLevel">Proficiency Level *</Label>
                <Select
                  value={newSkill.level}
                  onValueChange={(value: any) => setNewSkill({ ...newSkill, level: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="skillCategory">Category *</Label>
                <Input
                  id="skillCategory"
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                  placeholder="Programming Languages"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddSkill}>Add Skill</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {resumeData.skills.length === 0 && !showAddForm && (
          <p className="text-gray-500 text-center py-8">No skills added yet. Click "Add Skill" to get started.</p>
        )}
      </CardContent>
    </Card>
  )
}
