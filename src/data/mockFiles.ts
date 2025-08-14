import { FileItem } from "@/components/FileTree";

export const mockFileData: FileItem[] = [
  {
    id: "1",
    name: "Documents",
    type: "folder",
    path: "/Documents",
    children: [
      {
        id: "1-1",
        name: "Reports",
        type: "folder",
        path: "/Documents/Reports",
        children: [
          {
            id: "1-1-1",
            name: "Annual Report 2024.pdf",
            type: "file",
            extension: "pdf",
            size: "2.4 MB",
            path: "/Documents/Reports/Annual Report 2024.pdf"
          },
          {
            id: "1-1-2",
            name: "Marketing Analysis.pdf",
            type: "file",
            extension: "pdf",
            size: "1.8 MB",
            path: "/Documents/Reports/Marketing Analysis.pdf"
          },
          {
            id: "1-1-3",
            name: "Financial Summary.pdf",
            type: "file",
            extension: "pdf",
            size: "923 KB",
            path: "/Documents/Reports/Financial Summary.pdf"
          }
        ]
      },
      {
        id: "1-2",
        name: "Contracts",
        type: "folder",
        path: "/Documents/Contracts",
        children: [
          {
            id: "1-2-1",
            name: "Service Agreement.pdf",
            type: "file",
            extension: "pdf",
            size: "654 KB",
            path: "/Documents/Contracts/Service Agreement.pdf"
          },
          {
            id: "1-2-2",
            name: "NDA Template.pdf",
            type: "file",
            extension: "pdf",
            size: "234 KB",
            path: "/Documents/Contracts/NDA Template.pdf"
          }
        ]
      },
      {
        id: "1-3",
        name: "Meeting Notes.txt",
        type: "file",
        extension: "txt",
        size: "12 KB",
        path: "/Documents/Meeting Notes.txt"
      },
      {
        id: "1-4",
        name: "Project Proposal.docx",
        type: "file",
        extension: "docx",
        size: "1.2 MB",
        path: "/Documents/Project Proposal.docx"
      }
    ]
  },
  {
    id: "2",
    name: "Images",
    type: "folder",
    path: "/Images",
    children: [
      {
        id: "2-1",
        name: "Screenshots",
        type: "folder",
        path: "/Images/Screenshots",
        children: [
          {
            id: "2-1-1",
            name: "dashboard_mockup.png",
            type: "file",
            extension: "png",
            size: "1.5 MB",
            path: "/Images/Screenshots/dashboard_mockup.png"
          },
          {
            id: "2-1-2",
            name: "user_interface.jpg",
            type: "file",
            extension: "jpg",
            size: "892 KB",
            path: "/Images/Screenshots/user_interface.jpg"
          }
        ]
      },
      {
        id: "2-2",
        name: "Profile Pictures",
        type: "folder",
        path: "/Images/Profile Pictures",
        children: [
          {
            id: "2-2-1",
            name: "team_photo.jpg",
            type: "file",
            extension: "jpg",
            size: "3.2 MB",
            path: "/Images/Profile Pictures/team_photo.jpg"
          },
          {
            id: "2-2-2",
            name: "avatar.png",
            type: "file",
            extension: "png",
            size: "256 KB",
            path: "/Images/Profile Pictures/avatar.png"
          }
        ]
      },
      {
        id: "2-3",
        name: "company_logo.svg",
        type: "file",
        extension: "svg",
        size: "45 KB",
        path: "/Images/company_logo.svg"
      },
      {
        id: "2-4",
        name: "banner_image.webp",
        type: "file",
        extension: "webp",
        size: "567 KB",
        path: "/Images/banner_image.webp"
      }
    ]
  },
  {
    id: "3",
    name: "Downloads",
    type: "folder",
    path: "/Downloads",
    children: [
      {
        id: "3-1",
        name: "Software",
        type: "folder",
        path: "/Downloads/Software",
        children: [
          {
            id: "3-1-1",
            name: "app_installer.exe",
            type: "file",
            extension: "exe",
            size: "45 MB",
            path: "/Downloads/Software/app_installer.exe"
          },
          {
            id: "3-1-2",
            name: "update_package.zip",
            type: "file",
            extension: "zip",
            size: "12 MB",
            path: "/Downloads/Software/update_package.zip"
          }
        ]
      },
      {
        id: "3-2",
        name: "temp_file.tmp",
        type: "file",
        extension: "tmp",
        size: "1.1 MB",
        path: "/Downloads/temp_file.tmp"
      }
    ]
  },
  {
    id: "4",
    name: "Shared",
    type: "folder",
    path: "/Shared",
    children: [
      {
        id: "4-1",
        name: "Team Resources",
        type: "folder",
        path: "/Shared/Team Resources",
        children: [
          {
            id: "4-1-1",
            name: "Guidelines.pdf",
            type: "file",
            extension: "pdf",
            size: "789 KB",
            path: "/Shared/Team Resources/Guidelines.pdf"
          },
          {
            id: "4-1-2",
            name: "Brand Assets.zip",
            type: "file",
            extension: "zip",
            size: "15 MB",
            path: "/Shared/Team Resources/Brand Assets.zip"
          }
        ]
      },
      {
        id: "4-2",
        name: "shared_document.pdf",
        type: "file",
        extension: "pdf",
        size: "2.1 MB",
        path: "/Shared/shared_document.pdf"
      }
    ]
  }
];