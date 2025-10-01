import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "../context/UserContext";
import { Upload, FileText, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Notes = () => {
  const { user } = useUser();
  const [documents, setDocuments] = useState<any[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [viewAll, setViewAll] = useState(false); // 👈 toggle state

  // Fetch documents
  useEffect(() => {
    const fetchDocuments = async () => {
      if (!user?.id) return;
      setLoadingDocs(true);
      try {
        const accessToken = localStorage.getItem("access_token");
        const response = await fetch(`http://localhost:8000/documents/user/${user.id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!response.ok) throw new Error("Failed to fetch documents");
        const data = await response.json();
        setDocuments(data);
      } catch {
        setDocuments([]);
      } finally {
        setLoadingDocs(false);
      }
    };
    fetchDocuments();
  }, [user?.id]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    const accessToken = localStorage.getItem("access_token");
    if (!user?.id || !accessToken) {
      toast({ title: "Upload failed", description: "User not authenticated." });
      return;
    }
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", file.name);
      formData.append("user_id", String(user.id));
      try {
        const response = await fetch("http://localhost:8000/documents/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}` },
          body: formData,
        });
        if (!response.ok) throw new Error("Upload failed");
        toast({
          title: "File uploaded successfully!",
          description: `${file.name} has been processed and added to your notes.`,
        });
      } catch {
        toast({ title: "Upload failed", description: `${file.name} could not be uploaded.` });
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(files);
  };

  // Sort + Filter docs
  const filteredDocs = [...documents]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .filter((doc) => {
      const query = searchQuery.trim().toLowerCase();
      if (!query) return true;
      const title = (doc.title || "").toString().toLowerCase();
      const summary = (doc.summary || "").toString().toLowerCase();
      const fileName = doc.file_url ? doc.file_url.split("/").pop().toLowerCase() : "";
      return title.includes(query) || summary.includes(query) || fileName.includes(query);
    });

  // Show only latest 3 unless "View All" clicked
  const displayedDocs = viewAll ? filteredDocs : filteredDocs.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Study Notes</h1>
          <p className="text-muted-foreground">
            Upload and manage your study materials. AI will automatically generate summaries and insights.
          </p>
        </div>

        {/* Upload Area */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Card
            className={`relative overflow-hidden transition-all duration-300 ${
              dragActive ? "border-primary bg-primary/5" : "border-dashed border-2 border-muted"
            }`}
          >
            <CardContent className="p-8">
              <div
                className="text-center"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-2xl flex items-center justify-center">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Upload Study Materials</h3>
                <p className="text-muted-foreground mb-4">Drag and drop files here, or click to browse</p>
                <Button
                  className="bg-gradient-primary hover:opacity-90"
                  type="button"
                  onClick={() => document.getElementById("file-upload-input")?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Browse Files
                </Button>
                <input
                  id="file-upload-input"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Documents Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Your Uploaded Documents</h2>

          {/* Search Bar */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="relative max-w-md">
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-3"
              />
            </div>
          </motion.div>

          {loadingDocs ? (
            <div className="text-muted-foreground">Loading documents...</div>
          ) : displayedDocs.length === 0 ? (
            <div className="text-muted-foreground">No documents found.</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedDocs.map((doc) => (
                  <Card
                    key={doc.id}
                    className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {doc.file_type?.toUpperCase()}
                        </span>
                      </div>
                      <CardTitle className="text-lg">
                        {doc.title || (doc.file_url ? doc.file_url.replace(/^uploaded_documents[\\\/]/, "").split("/").pop() : "")}
                      </CardTitle>
                      <CardDescription className="flex items-center text-sm">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(doc.created_at).toLocaleString()} •{" "}
                        {Math.round(doc.file_size / 1024)} KB
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                        {doc.summary || "No summary available yet."}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-full">
                          {doc.status}
                        </span>
                        <a
                          href={`/${doc.file_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 text-xs bg-primary text-white rounded-full"
                        >
                          Download
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Toggle View All / View Less */}
              {filteredDocs.length > 3 && (
                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setViewAll((prev) => !prev)}
                  >
                    {viewAll ? "View Less" : "View All"}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
