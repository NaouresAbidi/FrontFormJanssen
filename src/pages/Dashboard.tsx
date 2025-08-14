import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Search,
  Grid3X3,
  List,
  Upload,
  User,
  Settings,
  FileText,
  Download,
  Eye,
  Folder, // Import Folder icon for directories
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileTree, FileItem } from "@/components/FileTree";
import { FilePreview } from "@/components/FilePreview";
// import { mockFileData } from "@/data/mockFiles"; // Remove this line
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Define the base URL for your backend API
const API_BASE_URL = "https://nawsystems.tech"; 
const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [backendFiles, setBackendFiles] = useState<FileItem[]>([]); // New state for fetched files
  const [loading, setLoading] = useState(true); // New state for loading indicator
  const [error, setError] = useState<string | null>(null); // New state for error handling

  const navigate = useNavigate();
  const { toast } = useToast();

  // 1. Fetch files from backend on component mount
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        setError(null); // Clear previous errors

        const response = await fetch(`${API_BASE_URL}/files`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          // Assuming backend `files` array contains just names
          const formattedFiles: FileItem[] = data.files.map((fileName: string, index: number) => {
            const ext = fileName.includes('.') ? fileName.split('.').pop() : '';
            const isFolder = !ext; // Simple check: if no extension, assume it's a folder for now. You might need more robust logic if your backend provides type.
            return {
              id: `${fileName}-${index}`, // Unique ID for key prop
              name: fileName,
              type: isFolder ? 'folder' : 'file',
              path: `/uploads/${fileName}`, // Path for display (if useful)
              extension: isFolder ? undefined : ext?.toLowerCase(),
              size: isFolder ? undefined : 'N/A', // You'd typically fetch size from backend too
              url: isFolder ? undefined : `${API_BASE_URL}/uploads/${fileName}`, // Direct URL for files
              children: isFolder ? [] : undefined, // Initialize children for folders if needed
            };
          });

          setBackendFiles(formattedFiles);
        } else {
          setError(data.message || 'Failed to fetch files from the server.');
        }
      } catch (err: any) {
        console.error("Error fetching files:", err);
        setError(`Failed to fetch files: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []); // Run once on component mount

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const handleFileSelect = (file: FileItem) => {
    setSelectedFile(file);
    // If you click a folder, filter the view to show its contents
    // For now, we'll keep the `currentFiles` logic as is, but you could implement dynamic folder Browse here.
  };

  const handleFilePreview = (file: FileItem) => {
    if (file.type === "file" && file.url) {
      setSelectedFile(file);
      setIsPreviewOpen(true);
    } else {
      toast({
        title: "Cannot preview",
        description: "This item cannot be previewed.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = (file: FileItem) => {
    if (file.type === "file" && file.url) {
      toast({
        title: "Download started",
        description: `Downloading ${file.name}...`,
      });
      // Programmatically create a link and click it to trigger download
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name; // Suggests filename for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      toast({
        title: "Cannot download",
        description: "This item is not a downloadable file.",
        variant: "destructive",
      });
    }
  };

  // Adjust getAllFiles to work with the flat list of backendFiles,
  // or rethink if you want to support nested folders dynamically from backend
  const getAllFiles = (items: FileItem[]): FileItem[] => {
    // If backend provides a flat list, this function might be simplified
    // or adjusted to reconstruct a tree if needed for FileTree component.
    return items; // For now, return as is.
  };

  // Use backendFiles instead of mockFileData
  const allFiles = getAllFiles(backendFiles);

  const filteredFiles = allFiles.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Simplified currentFiles logic for flat list from backend
  const currentFiles = searchQuery ? filteredFiles : allFiles;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold">File Manager</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-80 border-r bg-sidebar-bg h-[calc(100vh-73px)] overflow-auto">
          <div className="p-4">
            <h2 className="text-sm font-medium text-muted-foreground mb-4">
              File Explorer
            </h2>
            {/* Pass backendFiles to FileTree, if it expects a flat list or can be adapted */}
            {loading ? (
              <p>Loading file tree...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              <FileTree
                data={backendFiles} // Pass fetched data here
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
              />
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Search and View Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4 flex-1 max-w-md">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search files..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Breadcrumb */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-muted-foreground">Files</span>
                {selectedFile?.type === "folder" && (
                  <>
                    <span className="text-muted-foreground">/</span>
                    <span className="font-medium">{selectedFile.name}</span>
                  </>
                )}
              </div>
            </div>

            {/* Loading/Error States for Main Content */}
            {loading ? (
              <div className="text-center py-12">
                <p>Fetching files from server...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
              </div>
            ) : (
              // Files Grid/List
              <>
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {currentFiles.map((file) => (
                      <Card
                        key={file.id}
                        className="group hover:shadow-md transition-smooth cursor-pointer"
                        onClick={() => handleFileSelect(file)}
                      >
                        <CardContent className="p-4">
                          <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                            {file.type === 'folder' ? (
                              <Folder className="w-8 h-8 text-blue-500" /> // Folder icon
                            ) : (
                              <FileText
                                className={cn(
                                  "w-8 h-8",
                                  file.extension === "pdf" ? "text-destructive" :
                                  file.extension && ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(file.extension.toLowerCase()) ? "text-success" :
                                  "text-muted-foreground"
                                )}
                              />
                            )}
                          </div>

                          <div className="space-y-2">
                            <h3 className="font-medium text-sm truncate" title={file.name}>
                              {file.name}
                            </h3>

                            <div className="flex items-center justify-between">
                              {file.type === 'file' && (
                                <Badge variant="secondary" className="text-xs">
                                  {file.extension?.toUpperCase() || "FILE"}
                                </Badge>
                              )}
                              {file.type === 'folder' && (
                                <Badge variant="outline" className="text-xs">
                                  FOLDER
                                </Badge>
                              )}
                              <span className="text-xs text-muted-foreground">
                                {file.size || (file.type === 'folder' ? '' : 'N/A')}
                              </span>
                            </div>

                            {file.type === 'file' && ( // Only show actions for files
                              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-smooth">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleFilePreview(file);
                                  }}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDownload(file);
                                  }}
                                >
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {currentFiles.map((file) => (
                      <Card
                        key={file.id}
                        className="group hover:shadow-md transition-smooth cursor-pointer"
                        onClick={() => handleFileSelect(file)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {file.type === 'folder' ? (
                                <Folder className="w-5 h-5 text-blue-500" />
                              ) : (
                                <FileText
                                  className={cn(
                                    "w-5 h-5",
                                    file.extension === "pdf" ? "text-destructive" :
                                    file.extension && ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(file.extension.toLowerCase()) ? "text-success" :
                                    "text-muted-foreground"
                                  )}
                                />
                              )}
                              <div>
                                <h3 className="font-medium text-sm">{file.name}</h3>
                                {/* Display path only if available and useful */}
                                {file.path && <p className="text-xs text-muted-foreground">{file.path}</p>}
                              </div>
                            </div>

                            <div className="flex items-center space-x-4">
                              {file.type === 'file' && (
                                <Badge variant="secondary" className="text-xs">
                                  {file.extension?.toUpperCase() || "FILE"}
                                </Badge>
                              )}
                              {file.type === 'folder' && (
                                <Badge variant="outline" className="text-xs">
                                  FOLDER
                                </Badge>
                              )}
                              <span className="text-sm text-muted-foreground min-w-16">
                                {file.size || (file.type === 'folder' ? '' : 'N/A')}
                              </span>
                              {file.type === 'file' && ( // Only show actions for files
                                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-smooth">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleFilePreview(file);
                                    }}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDownload(file);
                                    }}
                                  >
                                    <Download className="w-4 h-4" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {currentFiles.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No files found</h3>
                    <p className="text-muted-foreground">
                      {searchQuery
                        ? "Try adjusting your search query"
                        : "This folder is empty" // Or, "No files uploaded yet."
                      }
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* File Preview Modal */}
      <FilePreview
        file={selectedFile}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
};

export default Dashboard;