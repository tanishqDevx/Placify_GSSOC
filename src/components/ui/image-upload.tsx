"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { Alert, AlertDescription } from "./alert"
import { Progress } from "../../components/ui/progress"
import { Upload, X, Camera, AlertCircle } from "lucide-react"
import { cn } from "../../lib/utils"

interface ImageUploadProps {
  value?: string
  onChange: (value: string) => void
  className?: string
  maxSize?: number // in MB
  acceptedTypes?: string[]
}

export function ImageUpload({
  value,
  onChange,
  className,
  maxSize = 5,
  acceptedTypes = ["image/jpeg", "image/png", "image/webp"],
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(value || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `File type not supported. Please use ${acceptedTypes.join(", ")}`
    }
    if (file.size > maxSize * 1024 * 1024) {
      return `File size too large. Maximum size is ${maxSize}MB`
    }
    return null
  }

  const processImage = useCallback(
    async (file: File) => {
      const validationError = validateFile(file)
      if (validationError) {
        setError(validationError)
        return
      }

      setError(null)
      setIsUploading(true)
      setUploadProgress(0)

      try {
        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval)
              return 90
            }
            return prev + 10
          })
        }, 100)

        // Create image preview
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string

          // Create an image element to get dimensions
          const img = new Image()
          img.onload = () => {
            // Create canvas for image processing
            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d")

            if (!ctx) return

            // Set canvas size (max 800x800 for optimization)
            const maxSize = 800
            let { width, height } = img

            if (width > height) {
              if (width > maxSize) {
                height = (height * maxSize) / width
                width = maxSize
              }
            } else {
              if (height > maxSize) {
                width = (width * maxSize) / height
                height = maxSize
              }
            }

            canvas.width = width
            canvas.height = height

            // Draw and compress image
            ctx.drawImage(img, 0, 0, width, height)
            const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.8)

            setPreviewImage(compressedDataUrl)
            onChange(compressedDataUrl)
            setUploadProgress(100)

            setTimeout(() => {
              setIsUploading(false)
              setUploadProgress(0)
            }, 500)
          }
          img.src = result
        }
        reader.readAsDataURL(file)
      } catch (err) {
        setError("Failed to process image. Please try again.")
        setIsUploading(false)
        setUploadProgress(0)
      }
    },
    [maxSize, acceptedTypes, onChange],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        processImage(files[0])
      }
    },
    [processImage],
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        processImage(files[0])
      }
    },
    [processImage],
  )

  const handleRemoveImage = () => {
    setPreviewImage(null)
    onChange("")
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={cn("space-y-4", className)}>
      <Label className="text-sm font-medium">Profile Photo</Label>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {previewImage ? (
        <Card className="relative">
          <CardContent className="p-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src={previewImage || "/placeholder.svg"}
                  alt="Profile preview"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={triggerFileSelect}>
                  <Camera className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card
          className={cn(
            "border-2 border-dashed transition-colors cursor-pointer",
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileSelect}
        >
          <CardContent className="p-8">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Upload your photo</h3>
                <p className="text-sm text-gray-500">Drag and drop your image here, or click to browse</p>
                <p className="text-xs text-gray-400">Supports JPG, PNG, WebP up to {maxSize}MB</p>
              </div>

              <Button variant="outline" className="bg-transparent">
                <Upload className="h-4 w-4 mr-2" />
                Choose File
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Processing image...</span>
            <span className="text-gray-600">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(",")}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}
