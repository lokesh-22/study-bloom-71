import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "../context/UserContext";
import { useAuth } from "@clerk/clerk-react";
import { API_BASE } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken, isLoaded } = useAuth();
  const [note, setNote] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const loadNote = async () => {
    if (!id || !isLoaded) return;
    setLoading(true);
    try {
      const token = await getToken();
      const res = await fetch(`${API_BASE}/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 404) {
        toast({ title: "Not found", description: "Note not found." });
        navigate("/notes");
        return;
      }
      if (!res.ok) throw new Error("Failed to load note");
      const data = await res.json();
      setNote(data);
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Could not load note." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNote();
  }, [id, isLoaded]);

  const handleDelete = async () => {
    if (!id) return;
    if (!confirm("Delete this note? This action cannot be undone.")) return;
    try {
      const token = await getToken();
      const res = await fetch(`${API_BASE}/notes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      toast({ title: "Deleted", description: "Note deleted." });
      navigate("/notes");
    } catch (err) {
      console.error(err);
      toast({ title: "Delete failed", description: "Could not delete note." });
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!note) return <div className="p-8">No note found.</div>;

  return (
    <div className="min-h-screen bg-background p-8">
      <Card>
        <CardHeader>
          <CardTitle>{note.title || (note.location ? note.location.split(/[/\\]/).pop() : "Untitled")}</CardTitle>
          <CardDescription>{new Date(note.created_at).toLocaleString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">Status: {note.status}</p>
          <p className="mb-4">{note.summary || "No summary available yet."}</p>

          <div className="flex gap-2">
            <a
              href={note.file_url || `${API_BASE}/notes/${note.id}/download`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>Download</Button>
            </a>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
            <Button variant="outline" onClick={() => navigate("/notes")}>Back</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoteDetail;
