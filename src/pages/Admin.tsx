import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useAuth, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "@/lib/api";

const Admin = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const { getToken, isLoaded } = useAuth();
  const clerk = useClerk();
  const navigate = useNavigate();
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        // require Clerk token to call protected admin endpoints
        const token = await getToken();
        const res = await fetch(`${API_BASE}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 403) {
          // Not an admin: surface an error but do not navigate away
          setError("Access denied to admin endpoints");
          setUsers([]);
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (e: any) {
        setError(e.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    // Only try loading when auth is ready; any signed-in user can view this page
    if (!isLoaded) return;
    if (!user) {
      // if not signed in, navigate to login
      navigate("/login");
      return;
    }
    // If the signed-in user is not an admin, avoid calling admin endpoints
    // to prevent unnecessary 403 responses; show an access-denied banner instead.
    if (user && !user.is_admin) {
      setError("Access denied to admin endpoints");
      setUsers([]);
      setLoading(false);
      return;
    }

    // Admin users: load protected resources
    load();
  }, [isLoaded, user]);

  const doSync = async () => {
    setSyncing(true);
    setError(null);
    try {
      const token = await getToken();
      const res = await fetch(`${API_BASE}/admin/sync-users`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 403) {
        setError("Access denied to sync users");
        return;
      }
      if (!res.ok) throw new Error("Sync failed");
      const summary = await res.json();
      // reload users after sync
      const listRes = await fetch(`${API_BASE}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await listRes.json();
      setUsers(data);
      // optionally surface summary
      console.debug("sync summary", summary);
    } catch (e: any) {
      setError(e.message || "Unknown error");
    } finally {
      setSyncing(false);
    }
  };

  const doLogout = async () => {
    try {
      await clerk.signOut();
    } catch (e) {
      console.error(e);
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen p-8 bg-background">
      <h1 className="text-2xl font-bold mb-4">Admin — Users</h1>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">Admin — manage users</div>
        <div className="flex items-center space-x-2">
          <button
            className="px-3 py-1 rounded bg-muted hover:opacity-90"
            onClick={doLogout}
          >
            Logout
          </button>
          <button
            className="px-3 py-1 rounded bg-primary text-white disabled:opacity-50"
            onClick={doSync}
            disabled={syncing || !user?.is_admin}
            title={!user?.is_admin ? "Admin only" : undefined}
          >
            {syncing ? "Syncing..." : "Sync users"}
          </button>
        </div>
      </div>

      {loading && <div>Loading...</div>}
      {error && (
        <div className="mb-4 border rounded p-3 bg-red-50 border-red-200 text-destructive">
          {error}
        </div>
      )}
      {!loading && !error && (
        <div className="overflow-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="text-left p-2 border-b">ID</th>
                <th className="text-left p-2 border-b">Email</th>
                <th className="text-left p-2 border-b">First</th>
                <th className="text-left p-2 border-b">Last</th>
                <th className="text-left p-2 border-b">Full Name</th>
                <th className="text-left p-2 border-b">Created At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="p-2 border-b">{u.id}</td>
                  <td className="p-2 border-b">{u.email}</td>
                  <td className="p-2 border-b">{u.first_name}</td>
                  <td className="p-2 border-b">{u.last_name}</td>
                  <td className="p-2 border-b">{u.full_name}</td>
                  <td className="p-2 border-b">{u.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
