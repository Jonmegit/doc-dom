"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react"

export function DocumentUploader({ onUpload }) {
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})
  const [uploadStatus, setUploadStatus] = useState({})
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles])
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files)
      setFiles((prevFiles) => [...prevFiles, ...droppedFiles])
    }
  }

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setUploading(true)

    // Inicializar progreso para cada archivo
    const initialProgress = {}
    const initialStatus = {}
    files.forEach((file, index) => {
      initialProgress[index] = 0
      initialStatus[index] = "uploading"
    })
    setUploadProgress(initialProgress)
    setUploadStatus(initialStatus)

    // Simular carga de archivos
    for (let i = 0; i < files.length; i++) {
      // Simular progreso
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress((prev) => ({ ...prev, [i]: progress }))
        await new Promise((resolve) => setTimeout(resolve, 200))
      }

      // Simular éxito o error aleatorio
      const success = Math.random() > 0.2 // 80% de probabilidad de éxito
      setUploadStatus((prev) => ({ ...prev, [i]: success ? "success" : "error" }))
    }

    // Esperar un momento antes de finalizar
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Llamar al callback con los archivos que se cargaron correctamente
    const successfulFiles = files.filter((_, index) => uploadStatus[index] === "success")
    onUpload(successfulFiles)

    setUploading(false)
    setFiles([])
    setUploadProgress({})
    setUploadStatus({})
  }

  return (
    <div className="space-y-4">
      <div
        className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple />
        <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">Arrastra archivos aquí o haz clic para seleccionar</h3>
        <p className="text-sm text-gray-500">Soporta PDF, Word, Excel, PowerPoint, imágenes y más</p>
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Archivos seleccionados ({files.length})</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center space-x-3">
                  <File className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium truncate max-w-xs">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {uploading ? (
                    <>
                      {uploadStatus[index] === "uploading" && (
                        <div className="w-24">
                          <Progress value={uploadProgress[index]} className="h-2" />
                        </div>
                      )}
                      {uploadStatus[index] === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {uploadStatus[index] === "error" && <AlertCircle className="h-5 w-5 text-red-500" />}
                    </>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveFile(index)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setFiles([])
                setUploadProgress({})
                setUploadStatus({})
              }}
              disabled={uploading}
            >
              Cancelar
            </Button>
            <Button onClick={handleUpload} disabled={uploading || files.length === 0}>
              {uploading ? "Subiendo..." : "Subir archivos"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
