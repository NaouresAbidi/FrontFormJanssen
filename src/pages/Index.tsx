import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, FolderOpen, Shield, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-8 shadow-glow">
            <FileText className="w-8 h-8 text-primary-foreground" />
          </div>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Your Files, Organized
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A powerful file management platform that keeps your documents, images, and files 
            perfectly organized and accessible from anywhere.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-smooth px-8">
                Get Started Free
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 rounded-2xl bg-card shadow-elegant border-0">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-xl mb-4">
              <FolderOpen className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-3">Smart Organization</h3>
            <p className="text-muted-foreground">
              Organize files with nested folders and powerful search capabilities to find what you need instantly.
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-card shadow-elegant border-0">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-xl mb-4">
              <Shield className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-3">Secure Access</h3>
            <p className="text-muted-foreground">
              Your files are protected with enterprise-grade security and user authentication.
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-card shadow-elegant border-0">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-xl mb-4">
              <Zap className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-3">Lightning Fast</h3>
            <p className="text-muted-foreground">
              Preview, download, and manage your files with lightning-fast performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
