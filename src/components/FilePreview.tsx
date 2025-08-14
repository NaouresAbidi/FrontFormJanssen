import { X, Download, FileText, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileItem } from "./FileTree"; // Assuming FileItem definition is here
import { useToast } from "@/hooks/use-toast";

interface FilePreviewProps {
  file: FileItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FilePreview = ({ file, isOpen, onClose }: FilePreviewProps) => {
  const { toast } = useToast();

  if (!file || !file.url) { // Ensure file and file.url exist
      // If file.url is missing, it's not a viewable file (e.g., a folder)
      // or there was an issue constructing the URL.
      if (file && file.type === 'folder') {
          // You might want to handle folders differently, e.g., show folder details
          // For now, it will just return null if no file or no URL.
      }
      return null;
  }

  const handleDownload = () => {
    if (file.url) {
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
        title: "Download failed",
        description: "File URL not available for download.",
        variant: "destructive",
      });
    }
  };

  const isImage = file.extension && ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(file.extension.toLowerCase());
  const isPdf = file.extension?.toLowerCase() === 'pdf';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"> {/* Add flex-col for better layout */}
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center space-x-3">
            {isImage ? (
              <ImageIcon className="w-5 h-5 text-success" />
            ) : (
              <FileText className="w-5 h-5 text-muted-foreground" />
            )}
            <div>
              <DialogTitle className="text-lg">{file.name}</DialogTitle>
              <p className="text-sm text-muted-foreground">{file.size || 'N/A'}</p> {/* Use N/A for size if not available */}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </Button>
        </DialogHeader>

        {/* This div will now contain the actual preview elements */}
        <div className="flex-1 overflow-auto p-2 bg-muted rounded-lg flex items-center justify-center">
          {isImage ? (
            // Display actual image using <img> tag
            <img
              src={file.url}
              alt={`Preview of ${file.name}`}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Prevent infinite loop if fallback image also fails
                target.src = '/placeholder-image.png'; // Fallback image if original fails
                toast({
                  title: "Image Load Error",
                  description: "Could not load image preview. It might be corrupted or missing.",
                  variant: "destructive",
                });
              }}
            />
          ) : isPdf ? (
            // Embed PDF using <object> or <iframe>
            // <object> is generally preferred for PDFs for more control
            <object
              data={file.url}
              type="application/pdf"
              width="100%"
              height="100%"
              className="min-h-[60vh] w-full" // Ensure it takes up space
            >
              {/* Fallback for browsers that don't support <object> or PDF embedding */}
              <p className="text-center text-muted-foreground p-4">
                Your browser does not support PDF embedding.{" "}
                <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Click here to download the PDF.
                </a>
              </p>
            </object>
          ) : (
            // Fallback for other file types
            <div className="text-center">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">File preview not available for this type.</p>
              <p className="text-sm text-muted-foreground mt-2">
                You can still download the file.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};