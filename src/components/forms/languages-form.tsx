"use client"

import { useState } from "react"
import { useResume } from "../../context/resume-context"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Plus, Languages, Trash2 } from "lucide-react"
import type { Language } from "../../types/resume"

export function LanguagesForm() {
  const { resumeData, addLanguage, removeLanguage } = useResume()
  const [showAddForm, setShowAddForm] = useState(false)
  const [newLanguage, setNewLanguage] = useState<Omit<Language, "id">>({
    name: "",
    proficiency: "Conversational",
  })

  const handleAddLanguage = () => {
    if (newLanguage.name) {
      addLanguage({
        ...newLanguage,
        id: Date.now().toString(),
      })
      setNewLanguage({
        name: "",
        proficiency: "Conversational",
      })
      setShowAddForm(false)
    }
  }

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case "Native":
        return "bg-green-100 text-green-800"
      case "Fluent":
        return "bg-blue-100 text-blue-800"
      case "Conversational":
        return "bg-yellow-100 text-yellow-800"
      case "Basic":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Languages className="h-5 w-5" />
          Languages
        </CardTitle>
        <CardDescription>Add languages you speak and your proficiency level</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Existing Languages */}
        {resumeData.languages.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {resumeData.languages.map((language) => (
              <div key={language.id} className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={`${getProficiencyColor(language.proficiency)} flex items-center gap-2`}
                >
                  {language.name} • {language.proficiency}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLanguage(language.id)}
                    className="h-4 w-4 p-0 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </Badge>
              </div>
            ))}
          </div>
        )}

        {/* Add New Language */}
        {!showAddForm ? (
          <Button variant="outline" onClick={() => setShowAddForm(true)} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Language
          </Button>
        ) : (
          <div className="border rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="languageName">Language *</Label>
                <Input
                  id="languageName"
                  value={newLanguage.name}
                  onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
                  placeholder="Spanish"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="proficiency">Proficiency Level *</Label>
                <Select
                  value={newLanguage.proficiency}
                  onValueChange={(value: any) => setNewLanguage({ ...newLanguage, proficiency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Conversational">Conversational</SelectItem>
                    <SelectItem value="Fluent">Fluent</SelectItem>
                    <SelectItem value="Native">Native</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddLanguage}>Add Language</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {resumeData.languages.length === 0 && !showAddForm && (
          <p className="text-gray-500 text-center py-8">No languages added yet. Click "Add Language" to get started.</p>
        )}
      </CardContent>
    </Card>
  )
}
