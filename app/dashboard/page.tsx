"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import {
  FileText,
  Upload,
  Search,
  Clock,
  Filter,
  Users,
  AlertTriangle,
  CheckCircle,
  Eye,
  Edit,
  Trash2,
  ChevronDown,
  Download,
  Share2,
  Star,
  MoreHorizontal,
  FolderPlus,
  FileUp,
  Settings,
} from "lucide-react"

// Componentes UI
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

// Componentes personalizados
import { DocumentAnalytics } from "@/components/dashboard/document-analytics"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { StorageUsage } from "@/components/dashboard/storage-usage"
import { TeamActivity } from "@/components/dashboard/team-activity"
import { DocumentPreview } from "@/components/dashboard/document-preview"
import { DocumentUploader } from "@/components/dashboard/document-uploader"
import { SearchDocuments } from "@/components/dashboard/search-documents"
import { DocumentFilters } from "@/components/dashboard/document-filters"

export default function DashboardPage() {
  const supabase = createClientComponentClient()
  const [loading, setLoading] = useState(true)
  const [documents, setDocuments] = useState([])
  const [recentDocuments, setRecentDocuments] = useState([])
  const [pendingDocuments, setPendingDocuments] = useState([])
  const [stats, setStats] = useState({
    totalDocuments: 0,
    pendingReview: 0,
    recentlyUploaded: 0,
    storageUsed: 0,
    storageLimit: 10, // GB
    documentsByType: [],
    documentsByCategory: [],
    activityTimeline: [],
  })
  const [showUploader, setShowUploader] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    dateRange: "all",
    status: "all",
  })

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true)
      try {
        // Intentar obtener documentos recientes
        try {
          const { data: recentDocs, error: recentError } = await supabase
            .from("documents")
            .select("*, categories(*), tags(*), created_by(full_name, avatar_url)")
            .order("created_at", { ascending: false })
            .limit(5)

          if (!recentError) {
            setRecentDocuments(recentDocs || [])
          } else {
            console.log("Error fetching recent documents:", recentError)
            setRecentDocuments([])
          }
        } catch (error) {
          console.log("Error in recent documents query:", error)
          setRecentDocuments([])
        }

        // Intentar obtener documentos pendientes
        try {
          const { data: pendingDocs, error: pendingError } = await supabase
            .from("documents")
            .select("*, categories(*), tags(*), created_by(full_name, avatar_url)")
            .eq("status", "pending")
            .order("created_at", { ascending: false })
            .limit(5)

          if (!pendingError) {
            setPendingDocuments(pendingDocs || [])
          } else {
            console.log("Error fetching pending documents:", pendingError)
            setPendingDocuments([])
          }
        } catch (error) {
          console.log("Error in pending documents query:", error)
          setPendingDocuments([])
        }

        // Simulamos datos de estadísticas para la demo
        setStats({
          totalDocuments: 247,
          pendingReview: 18,
          recentlyUploaded: 32,
          storageUsed: 4.7,
          storageLimit: 10,
          documentsByType: [
            { type: "PDF", count: 120 },
            { type: "DOCX", count: 45 },
            { type: "XLSX", count: 35 },
            { type: "PPTX", count: 28 },
            { type: "JPG", count: 19 },
          ],
          documentsByCategory: [
            { category: "Contratos", count: 78 },
            { category: "Facturas", count: 65 },
            { category: "Informes", count: 42 },
            { category: "Presentaciones", count: 32 },
            { category: "Legal", count: 30 },
          ],
          activityTimeline: [
            { date: "2023-05-10", uploads: 12, views: 45, edits: 8 },
            { date: "2023-05-09", uploads: 8, views: 32, edits: 5 },
            { date: "2023-05-08", uploads: 15, views: 50, edits: 10 },
            { date: "2023-05-07", uploads: 6, views: 28, edits: 4 },
            { date: "2023-05-06", uploads: 10, views: 38, edits: 7 },
          ],
        })

        // Usar datos de ejemplo para la demo
        setDocuments([...sampleDocuments, ...samplePendingDocuments])
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        // Usar datos de ejemplo para la demo
        setRecentDocuments(sampleDocuments)
        setPendingDocuments(samplePendingDocuments)
        setDocuments([...sampleDocuments, ...samplePendingDocuments])
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [supabase])

  const handleSearch = (query) => {
    setSearchQuery(query)
    // Implementar búsqueda en tiempo real con Supabase
  }

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }))
    // Aplicar filtros a los documentos
  }

  const handleDocumentPreview = (document) => {
    setSelectedDocument(document)
    // Abrir previsualización del documento
  }

  const handleDocumentUpload = async (files) => {
    setShowUploader(false)
    // Implementar lógica de carga con Supabase Storage
    // Incluir análisis automático de documentos y asignación de etiquetas
  }

  return (
    <div className="container mx-auto px-4 py-8 text-foreground">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Panel de Control</h1>
          <p className="text-muted-foreground">Gestión documental inteligente</p>
        </div>
        <div className="flex space-x-4">
          <Dialog open={showUploader} onOpenChange={setShowUploader}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Upload className="mr-2 h-4 w-4" />
                Subir documento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Subir nuevo documento</DialogTitle>
                <DialogDescription>
                  Arrastra archivos o haz clic para seleccionarlos. El sistema analizará automáticamente el contenido.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <DocumentUploader onUpload={handleDocumentUpload} />
              </div>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleFilterChange("type", "pdf")}>Tipo: PDF</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange("type", "docx")}>Tipo: DOCX</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange("status", "pending")}>
                Estado: Pendiente
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange("status", "approved")}>
                Estado: Aprobado
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange("dateRange", "week")}>Última semana</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange("dateRange", "month")}>Último mes</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10 w-[300px]"
              placeholder="Buscar documentos..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total documentos</p>
                <h3 className="text-3xl font-bold text-foreground">{stats.totalDocuments}</h3>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                <span className="text-green-500 dark:text-green-400">↑ 12%</span> desde el mes pasado
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pendientes de revisión</p>
                <h3 className="text-3xl font-bold text-foreground">{stats.pendingReview}</h3>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                <span className="text-red-500 dark:text-red-400">↑ 5%</span> desde la semana pasada
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Subidos recientemente</p>
                <h3 className="text-3xl font-bold text-foreground">{stats.recentlyUploaded}</h3>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <Upload className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                <span className="text-green-500 dark:text-green-400">↑ 18%</span> desde la semana pasada
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Almacenamiento usado</p>
                <h3 className="text-3xl font-bold text-foreground">{stats.storageUsed} GB</h3>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <HardDrive className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={(stats.storageUsed / stats.storageLimit) * 100} className="h-2" />
              <p className="text-sm text-muted-foreground mt-1">
                {Math.round((stats.storageUsed / stats.storageLimit) * 100)}% de {stats.storageLimit} GB
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna izquierda - Documentos y análisis */}
        <div className="lg:col-span-2 space-y-8">
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="recent">Documentos recientes</TabsTrigger>
              <TabsTrigger value="pending">Pendientes de revisión</TabsTrigger>
              <TabsTrigger value="favorites">Favoritos</TabsTrigger>
              <TabsTrigger value="all">Todos los documentos</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Documentos recientes</CardTitle>
                  <CardDescription>Los últimos documentos subidos o modificados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Nombre</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tipo</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Categoría</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Fecha</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Estado</th>
                          <th className="text-right py-3 px-4 font-medium text-muted-foreground">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading
                          ? Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <tr key={i} className="border-b">
                                  <td colSpan={6} className="py-3 px-4">
                                    <div className="h-8 bg-muted rounded animate-pulse"></div>
                                  </td>
                                </tr>
                              ))
                          : recentDocuments.map((doc) => (
                              <tr key={doc.id} className="border-b hover:bg-muted/50">
                                <td className="py-3 px-4">
                                  <div className="flex items-center">
                                    <DocumentTypeIcon type={doc.type} className="mr-3" />
                                    <div>
                                      <p className="font-medium text-foreground">{doc.name}</p>
                                      <p className="text-xs text-muted-foreground">
                                        Por: {doc.created_by?.full_name || "Usuario"}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <Badge variant="outline">{doc.type}</Badge>
                                </td>
                                <td className="py-3 px-4">
                                  <Badge variant="secondary">{doc.category?.name || "Sin categoría"}</Badge>
                                </td>
                                <td className="py-3 px-4 text-sm text-muted-foreground">
                                  {new Date(doc.created_at).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4">
                                  <DocumentStatusBadge status={doc.status} />
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <div className="flex justify-end space-x-2">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDocumentPreview(doc)}
                                          >
                                            <Eye className="h-4 w-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Previsualizar</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>

                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button variant="ghost" size="icon">
                                            <Download className="h-4 w-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Descargar</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>

                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          <Edit className="mr-2 h-4 w-4" />
                                          <span>Editar</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Share2 className="mr-2 h-4 w-4" />
                                          <span>Compartir</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Star className="mr-2 h-4 w-4" />
                                          <span>Añadir a favoritos</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          <span>Eliminar</span>
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-muted-foreground">Mostrando 5 de {stats.totalDocuments} documentos</p>
                  <Button variant="outline" size="sm">
                    Ver todos
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Documentos pendientes de revisión</CardTitle>
                  <CardDescription>Documentos que requieren tu aprobación o revisión</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Nombre</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Solicitante</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Fecha solicitud</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Prioridad</th>
                          <th className="text-right py-3 px-4 font-medium text-muted-foreground">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading
                          ? Array(5)
                              .fill(0)
                              .map((_, i) => (
                                <tr key={i} className="border-b">
                                  <td colSpan={5} className="py-3 px-4">
                                    <div className="h-8 bg-muted rounded animate-pulse"></div>
                                  </td>
                                </tr>
                              ))
                          : pendingDocuments.map((doc) => (
                              <tr key={doc.id} className="border-b hover:bg-muted/50">
                                <td className="py-3 px-4">
                                  <div className="flex items-center">
                                    <DocumentTypeIcon type={doc.type} className="mr-3" />
                                    <div>
                                      <p className="font-medium text-foreground">{doc.name}</p>
                                      <p className="text-xs text-muted-foreground">{doc.type}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex items-center">
                                    <Avatar className="h-8 w-8 mr-2">
                                      <AvatarImage src={doc.created_by?.avatar_url || "/placeholder.svg"} />
                                      <AvatarFallback>{doc.created_by?.full_name?.charAt(0) || "U"}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-foreground">{doc.created_by?.full_name || "Usuario"}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-sm text-muted-foreground">
                                  {new Date(doc.created_at).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4">
                                  <PriorityBadge priority={doc.priority || "medium"} />
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <div className="flex justify-end space-x-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="border-green-500 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950"
                                    >
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Aprobar
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="border-red-500 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950"
                                    >
                                      <AlertTriangle className="mr-2 h-4 w-4" />
                                      Rechazar
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => handleDocumentPreview(doc)}>
                                      <Eye className="mr-2 h-4 w-4" />
                                      Ver
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-muted-foreground">
                    Mostrando 5 de {stats.pendingReview} documentos pendientes
                  </p>
                  <Button variant="outline" size="sm">
                    Ver todos
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="favorites" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Documentos favoritos</CardTitle>
                  <CardDescription>Tus documentos marcados como favoritos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2">
                    {loading ? (
                      Array(5)
                        .fill(0)
                        .map((_, i) => <div key={i} className="h-16 bg-muted rounded animate-pulse"></div>)
                    ) : (
                      <div className="text-center py-8">
                        <Star className="h-12 w-12 text-muted mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-foreground">No tienes documentos favoritos</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Marca documentos como favoritos para acceder rápidamente a ellos
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Todos los documentos</CardTitle>
                  <CardDescription>Explora y gestiona todos tus documentos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <DocumentFilters onFilterChange={handleFilterChange} />
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Nombre</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tipo</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Categoría</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Fecha</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Estado</th>
                          <th className="text-right py-3 px-4 font-medium text-muted-foreground">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading
                          ? Array(10)
                              .fill(0)
                              .map((_, i) => (
                                <tr key={i} className="border-b">
                                  <td colSpan={6} className="py-3 px-4">
                                    <div className="h-8 bg-muted rounded animate-pulse"></div>
                                  </td>
                                </tr>
                              ))
                          : documents.slice(0, 10).map((doc) => (
                              <tr key={doc.id} className="border-b hover:bg-muted/50">
                                <td className="py-3 px-4">
                                  <div className="flex items-center">
                                    <DocumentTypeIcon type={doc.type} className="mr-3" />
                                    <div>
                                      <p className="font-medium text-foreground">{doc.name}</p>
                                      <p className="text-xs text-muted-foreground">
                                        Por: {doc.created_by?.full_name || "Usuario"}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <Badge variant="outline">{doc.type}</Badge>
                                </td>
                                <td className="py-3 px-4">
                                  <Badge variant="secondary">{doc.category?.name || "Sin categoría"}</Badge>
                                </td>
                                <td className="py-3 px-4 text-sm text-muted-foreground">
                                  {new Date(doc.created_at).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4">
                                  <DocumentStatusBadge status={doc.status} />
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <div className="flex justify-end space-x-2">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDocumentPreview(doc)}
                                          >
                                            <Eye className="h-4 w-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Previsualizar</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>

                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button variant="ghost" size="icon">
                                            <Download className="h-4 w-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Descargar</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>

                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          <Edit className="mr-2 h-4 w-4" />
                                          <span>Editar</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Share2 className="mr-2 h-4 w-4" />
                                          <span>Compartir</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Star className="mr-2 h-4 w-4" />
                                          <span>Añadir a favoritos</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                          <Trash2 className="mr-2 h-4 w-4" />
                                          <span>Eliminar</span>
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      Anterior
                    </Button>
                    <Button variant="outline" size="sm">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      Siguiente
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">Mostrando 10 de {stats.totalDocuments} documentos</p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Análisis de documentos</CardTitle>
              <CardDescription>Distribución y estadísticas de tus documentos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-medium mb-4 text-foreground">Documentos por tipo</h4>
                  <div className="h-64">
                    <DocumentAnalytics
                      data={stats.documentsByType}
                      type="pie"
                      colors={["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]}
                    />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-4 text-foreground">Documentos por categoría</h4>
                  <div className="h-64">
                    <DocumentAnalytics data={stats.documentsByCategory} type="bar" colors={["#3b82f6"]} />
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-sm font-medium mb-4 text-foreground">Actividad de documentos (últimos 5 días)</h4>
                <div className="h-64">
                  <DocumentAnalytics
                    data={stats.activityTimeline}
                    type="line"
                    colors={["#3b82f6", "#10b981", "#f59e0b"]}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Columna derecha - Actividad y herramientas */}
        <div className="space-y-8">
          {/* Previsualización de documento */}
          {selectedDocument && (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedDocument.name}</CardTitle>
                    <CardDescription>
                      {selectedDocument.type} • {new Date(selectedDocument.created_at).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedDocument(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <DocumentPreview document={selectedDocument} />
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartir
                  </Button>
                </div>
                <Button variant="default" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
              </CardFooter>
            </Card>
          )}

          {/* Búsqueda avanzada */}
          <Card>
            <CardHeader>
              <CardTitle>Búsqueda avanzada</CardTitle>
              <CardDescription>Encuentra documentos por contenido, metadatos o etiquetas</CardDescription>
            </CardHeader>
            <CardContent>
              <SearchDocuments onSearch={handleSearch} />
            </CardContent>
          </Card>

          {/* Actividad reciente */}
          <Card>
            <CardHeader>
              <CardTitle>Actividad reciente</CardTitle>
              <CardDescription>Últimas acciones en el sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                Ver todo el historial
              </Button>
            </CardFooter>
          </Card>

          {/* Uso de almacenamiento */}
          <Card>
            <CardHeader>
              <CardTitle>Uso de almacenamiento</CardTitle>
              <CardDescription>Distribución del espacio utilizado</CardDescription>
            </CardHeader>
            <CardContent>
              <StorageUsage
                used={stats.storageUsed}
                total={stats.storageLimit}
                breakdown={[
                  { type: "PDF", size: 2.1, color: "#3b82f6" },
                  { type: "DOCX", size: 0.8, color: "#10b981" },
                  { type: "XLSX", size: 0.5, color: "#f59e0b" },
                  { type: "PPTX", size: 0.9, color: "#ef4444" },
                  { type: "Otros", size: 0.4, color: "#8b5cf6" },
                ]}
              />
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                Gestionar almacenamiento
              </Button>
            </CardFooter>
          </Card>

          {/* Actividad del equipo */}
          <Card>
            <CardHeader>
              <CardTitle>Actividad del equipo</CardTitle>
              <CardDescription>Miembros activos del equipo</CardDescription>
            </CardHeader>
            <CardContent>
              <TeamActivity />
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                Ver todos los miembros
              </Button>
            </CardFooter>
          </Card>

          {/* Acciones rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                  <FolderPlus className="h-6 w-6 mb-2" />
                  <span>Nueva carpeta</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                  <FileUp className="h-6 w-6 mb-2" />
                  <span>Subir archivo</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                  <Users className="h-6 w-6 mb-2" />
                  <span>Compartir</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                  <Settings className="h-6 w-6 mb-2" />
                  <span>Configuración</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Diálogo de previsualización de documento */}
      {selectedDocument && (
        <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedDocument.name}</DialogTitle>
              <DialogDescription>
                {selectedDocument.type} • {new Date(selectedDocument.created_at).toLocaleDateString()}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <DocumentPreview document={selectedDocument} fullSize />
            </div>
            <DialogFooter>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Descargar
              </Button>
              <Button>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// Componentes auxiliares
function DocumentTypeIcon({ type, className = "" }) {
  const iconMap = {
    pdf: <FileText className={`h-8 w-8 text-red-500 ${className}`} />,
    docx: <FileText className={`h-8 w-8 text-blue-500 ${className}`} />,
    xlsx: <FileText className={`h-8 w-8 text-green-500 ${className}`} />,
    pptx: <FileText className={`h-8 w-8 text-orange-500 ${className}`} />,
    jpg: <FileText className={`h-8 w-8 text-purple-500 ${className}`} />,
    png: <FileText className={`h-8 w-8 text-purple-500 ${className}`} />,
  }

  return iconMap[type.toLowerCase()] || <FileText className={`h-8 w-8 text-gray-500 ${className}`} />
}

function DocumentStatusBadge({ status }) {
  const statusMap = {
    pending: (
      <Badge
        variant="outline"
        className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800"
      >
        Pendiente
      </Badge>
    ),
    approved: (
      <Badge
        variant="outline"
        className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
      >
        Aprobado
      </Badge>
    ),
    rejected: (
      <Badge
        variant="outline"
        className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
      >
        Rechazado
      </Badge>
    ),
    draft: (
      <Badge
        variant="outline"
        className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
      >
        Borrador
      </Badge>
    ),
  }

  return statusMap[status] || <Badge variant="outline">Desconocido</Badge>
}

function PriorityBadge({ priority }) {
  const priorityMap = {
    high: <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-300">Alta</Badge>,
    medium: (
      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300">
        Media
      </Badge>
    ),
    low: (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300">
        Baja
      </Badge>
    ),
  }

  return (
    priorityMap[priority] || (
      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300">Normal</Badge>
    )
  )
}

function HardDrive(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" x2="2" y1="12" y2="12"></line>
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
      <line x1="6" x2="6.01" y1="16" y2="16"></line>
      <line x1="10" x2="10.01" y1="16" y2="16"></line>
    </svg>
  )
}

function X(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18"></path>
      <path d="m6 6 12 12"></path>
    </svg>
  )
}

// Datos de ejemplo para la demo
const sampleDocuments = [
  {
    id: 1,
    name: "Informe_Trimestral_Q2_2023.pdf",
    type: "PDF",
    category: { name: "Informes" },
    created_at: "2023-05-10T10:30:00Z",
    status: "approved",
    created_by: { full_name: "Juan Pérez", avatar_url: "" },
  },
  {
    id: 2,
    name: "Contrato_Servicios_TechCorp.docx",
    type: "DOCX",
    category: { name: "Contratos" },
    created_at: "2023-05-09T14:20:00Z",
    status: "pending",
    created_by: { full_name: "Ana Martínez", avatar_url: "" },
  },
  {
    id: 3,
    name: "Presentacion_Proyecto_Alpha.pptx",
    type: "PPTX",
    category: { name: "Presentaciones" },
    created_at: "2023-05-08T09:15:00Z",
    status: "approved",
    created_by: { full_name: "Carlos López", avatar_url: "" },
  },
  {
    id: 4,
    name: "Factura_Mayo_2023.xlsx",
    type: "XLSX",
    category: { name: "Facturas" },
    created_at: "2023-05-07T16:45:00Z",
    status: "approved",
    created_by: { full_name: "Laura Gómez", avatar_url: "" },
  },
  {
    id: 5,
    name: "Manual_Usuario_v2.pdf",
    type: "PDF",
    category: { name: "Manuales" },
    created_at: "2023-05-06T11:30:00Z",
    status: "draft",
    created_by: { full_name: "Miguel Sánchez", avatar_url: "" },
  },
]

const samplePendingDocuments = [
  {
    id: 6,
    name: "Propuesta_Comercial_Cliente_XYZ.pdf",
    type: "PDF",
    category: { name: "Propuestas" },
    created_at: "2023-05-10T09:20:00Z",
    status: "pending",
    priority: "high",
    created_by: { full_name: "Ana Martínez", avatar_url: "" },
  },
  {
    id: 7,
    name: "Acuerdo_Confidencialidad.docx",
    type: "DOCX",
    category: { name: "Legal" },
    created_at: "2023-05-09T15:10:00Z",
    status: "pending",
    priority: "high",
    created_by: { full_name: "Carlos López", avatar_url: "" },
  },
  {
    id: 8,
    name: "Plan_Marketing_Q3.pptx",
    type: "PPTX",
    category: { name: "Marketing" },
    created_at: "2023-05-08T14:30:00Z",
    status: "pending",
    priority: "medium",
    created_by: { full_name: "Laura Gómez", avatar_url: "" },
  },
  {
    id: 9,
    name: "Presupuesto_Proyecto_Beta.xlsx",
    type: "XLSX",
    category: { name: "Finanzas" },
    created_at: "2023-05-07T10:45:00Z",
    status: "pending",
    priority: "medium",
    created_by: { full_name: "Miguel Sánchez", avatar_url: "" },
  },
  {
    id: 10,
    name: "Informe_Auditoria_Interna.pdf",
    type: "PDF",
    category: { name: "Auditoría" },
    created_at: "2023-05-06T16:20:00Z",
    status: "pending",
    priority: "low",
    created_by: { full_name: "Juan Pérez", avatar_url: "" },
  },
]
