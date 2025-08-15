"use client"

import { useState } from "react"
import { useResume } from "../../contexts/resume-context"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Plus, Award, Trash2, ExternalLink } from "lucide-react"
import type { Certificate } from "../../types/resume"

export function CertificatesForm() {
  const { resumeData, addCertificate, removeCertificate } = useResume()
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCertificate, setNewCertificate] = useState<Omit<Certificate, "id">>({
    name: "",
    issuer: "",
    date: "",
    url: "",
  })

  const handleAddCertificate = () => {
    if (newCertificate.name && newCertificate.issuer && newCertificate.date) {
      addCertificate({
        ...newCertificate,
        id: Date.now().toString(),
      })
      setNewCertificate({
        name: "",
        issuer: "",
        date: "",
        url: "",
      })
      setShowAddForm(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          Certificates & Certifications
        </CardTitle>
        <CardDescription>Add your professional certifications and achievements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Existing Certificates */}
        {resumeData.certificates.map((cert) => (
          <div key={cert.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{cert.name}</h3>
                <p className="text-gray-600">{cert.issuer}</p>
                <p className="text-sm text-gray-500 mt-1">Issued: {cert.date}</p>

                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm mt-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Certificate
                  </a>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeCertificate(cert.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {/* Add New Certificate */}
        {!showAddForm ? (
          <Button variant="outline" onClick={() => setShowAddForm(true)} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Certificate
          </Button>
        ) : (
          <div className="border rounded-lg p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="certName">Certificate Name *</Label>
              <Input
                id="certName"
                value={newCertificate.name}
                onChange={(e) => setNewCertificate({ ...newCertificate, name: e.target.value })}
                placeholder="AWS Certified Solutions Architect"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="issuer">Issuing Organization *</Label>
              <Input
                id="issuer"
                value={newCertificate.issuer}
                onChange={(e) => setNewCertificate({ ...newCertificate, issuer: e.target.value })}
                placeholder="Amazon Web Services"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="issueDate">Issue Date *</Label>
                <Input
                  id="issueDate"
                  type="month"
                  value={newCertificate.date}
                  onChange={(e) => setNewCertificate({ ...newCertificate, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="certUrl">Certificate URL</Label>
                <Input
                  id="certUrl"
                  type="url"
                  value={newCertificate.url}
                  onChange={(e) => setNewCertificate({ ...newCertificate, url: e.target.value })}
                  placeholder="https://certificate-url.com"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddCertificate}>Add Certificate</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {resumeData.certificates.length === 0 && !showAddForm && (
          <p className="text-gray-500 text-center py-8">
            No certificates added yet. Click "Add Certificate" to get started.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
