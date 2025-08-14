import { useState } from "react";
import { 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  FolderOpen, 
  FileText, 
  Image, 
  FileImage,
  File
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface FileItem {
  id: string;
  name: string;
  type: "folder" | "file";
  size?: string;
  extension?: string;
  children?: FileItem[];
  path: string;
}

interface FileTreeProps {
  data: FileItem[];
  onFileSelect: (file: FileItem) => void;
  selectedFile?: FileItem | null;
}

interface TreeNodeProps {
  item: FileItem;
  level: number;
  onFileSelect: (file: FileItem) => void;
  selectedFile?: FileItem | null;
}

const getFileIcon = (extension?: string) => {
  if (!extension) return File;
  
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];
  const docExtensions = ['pdf', 'doc', 'docx', 'txt'];
  
  if (imageExtensions.includes(extension.toLowerCase())) {
    return FileImage;
  }
  if (docExtensions.includes(extension.toLowerCase())) {
    return FileText;
  }
  return File;
};

const TreeNode = ({ item, level, onFileSelect, selectedFile }: TreeNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isSelected = selectedFile?.id === item.id;

  const handleClick = () => {
    if (item.type === "folder") {
      setIsExpanded(!isExpanded);
    }
    onFileSelect(item);
  };

  const FileIcon = item.type === "file" ? getFileIcon(item.extension) : 
                   (isExpanded ? FolderOpen : Folder);

  return (
    <div>
      <div
        className={cn(
          "flex items-center py-1.5 px-2 rounded-lg cursor-pointer transition-smooth hover:bg-sidebar-hover",
          isSelected && "bg-accent text-accent-foreground font-medium",
          "group"
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleClick}
      >
        {item.type === "folder" && (
          <div className="mr-1">
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )
            ) : (
              <div className="w-4 h-4" />
            )}
          </div>
        )}
        
        <FileIcon className={cn(
          "w-4 h-4 mr-2",
          item.type === "folder" 
            ? "text-primary" 
            : item.extension === "pdf" 
              ? "text-destructive" 
              : item.extension && ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(item.extension.toLowerCase())
                ? "text-success"
                : "text-muted-foreground"
        )} />
        
        <span className="text-sm truncate flex-1">{item.name}</span>
        
        {item.type === "file" && item.size && (
          <span className="text-xs text-muted-foreground ml-2">{item.size}</span>
        )}
      </div>
      
      {item.type === "folder" && isExpanded && hasChildren && (
        <div>
          {item.children!.map((child) => (
            <TreeNode
              key={child.id}
              item={child}
              level={level + 1}
              onFileSelect={onFileSelect}
              selectedFile={selectedFile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileTree = ({ data, onFileSelect, selectedFile }: FileTreeProps) => {
  return (
    <div className="space-y-1">
      {data.map((item) => (
        <TreeNode
          key={item.id}
          item={item}
          level={0}
          onFileSelect={onFileSelect}
          selectedFile={selectedFile}
        />
      ))}
    </div>
  );
};