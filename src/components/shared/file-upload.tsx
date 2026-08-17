"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Upload,
  X,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  File,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface UploadedFile {
  id: string
  file: File
  name: string
  size: number
  type: string
  progress?: number
  error?: string
}

interface FileUploadProps {
  accept?: string
  maxSize?: number
  maxFiles?: number
  multiple?: boolean
  files: UploadedFile[]
  onFilesAdd?: (files: File[]) => void
  onFileRemove?: (fileId: string) => void
  className?: string
  disabled?: boolean
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
}

function getFileIcon(type: string) {
  if (type.startsWith("image/")) return <FileImage className="h-5 w-5" />
  if (type.startsWith("video/")) return <FileVideo className="h-5 w-5" />
  if (type.startsWith("audio/")) return <FileAudio className="h-5 w-5" />
  if (type === "application/pdf") return <FileText className="h-5 w-5" />
  return <File className="h-5 w-5" />
}

function FileUpload({
  accept,
  maxSize = 10 * 1024 * 1024,
  maxFiles = 10,
  multiple = true,
  files,
  onFilesAdd,
  onFileRemove,
  className,
  disabled = false,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `File "${file.name}" exceeds ${formatFileSize(maxSize)} limit`
    }
    if (accept) {
      const acceptedTypes = accept.split(",").map((t) => t.trim())
      const fileType = file.type
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()

      const isAccepted = acceptedTypes.some((type) => {
        if (type.startsWith(".")) return fileExtension === type.toLowerCase()
        if (type.endsWith("/*")) return fileType.startsWith(type.replace("/*", "/"))
        return fileType === type
      })

      if (!isAccepted) {
        return `File "${file.name}" is not an accepted file type`
      }
    }
    return null
  }

  const handleFiles = React.useCallback(
    (fileList: FileList | File[]) => {
      setError(null)
      const newFiles = Array.from(fileList)

      if (files.length + newFiles.length > maxFiles) {
        setError(`Maximum ${maxFiles} files allowed`)
        return
      }

      const validFiles: File[] = []
      for (const file of newFiles) {
        const validationError = validateFile(file)
        if (validationError) {
          setError(validationError)
          return
        }
        validFiles.push(file)
      }

      if (validFiles.length > 0) {
        onFilesAdd?.(validFiles)
      }
    },
    [files.length, maxFiles, maxSize, accept, onFilesAdd]
  )

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (!disabled && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleClick = () => {
    if (!disabled) inputRef.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
      e.target.value = ""
    }
  }

  return (
    <div className={cn("space-y-3", className)}>
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        whileHover={!disabled ? { scale: 1.01 } : undefined}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 cursor-pointer",
          isDragging
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
          disabled={disabled}
        />

        <motion.div
          animate={isDragging ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-muted"
        >
          <Upload className="h-6 w-6 text-muted-foreground" />
        </motion.div>

        <div className="mt-4 space-y-1">
          <p className="text-sm font-medium">
            <span className="text-primary">Click to upload</span> or drag
            and drop
          </p>
          {accept && (
            <p className="text-xs text-muted-foreground">
              Accepted: {accept}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Max file size: {formatFileSize(maxSize)}
          </p>
        </div>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </motion.div>
      )}

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                className="flex items-center gap-3 rounded-xl border bg-card p-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  {getFileIcon(file.type)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium">{file.name}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 shrink-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        onFileRemove?.(file.id)
                      }}
                      disabled={disabled}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                    {file.error && (
                      <p className="text-xs text-destructive">{file.error}</p>
                    )}
                  </div>
                  {file.progress !== undefined && file.progress < 100 && (
                    <Progress
                      value={file.progress}
                      className="mt-2"
                      size="sm"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {files.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {files.length} file{files.length !== 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  )
}

export { FileUpload }
export type { FileUploadProps, UploadedFile }
