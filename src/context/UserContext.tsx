import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth, useUser as useClerkUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "@/lib/api";

export interface User {
  id: string | number | null;
  email_addresses?: Array<any>;
  first_name?: string | null;
  last_name?: string | null;
  full_name?: string | null;
  is_admin?: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem("sb_user");
      return raw ? (JSON.parse(raw) as User) : null;
    } catch (e) {
      return null;
    }
  });
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const { user: clerkUser, isLoaded: isClerkUserLoaded } = useClerkUser();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      if (!isLoaded) return;
      // NOTE: Do not rely on Clerk client-side public metadata for final
      // admin decisions. Always defer to the server-merged `/me` result
      // which persists and returns `is_admin` from the trusted DB.
      if (!isSignedIn) {
        if (mounted) {
          setUser(null);
          try {
            localStorage.removeItem("sb_user");
          } catch (e) {}
        }
        return;
      }

      try {
        // Get a token from Clerk to send to backend for verification
        const token = await getToken();
        console.debug("[UserContext] Clerk token:", token);
        const res = await fetch(`${API_BASE}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.debug("[UserContext] /me response status:", res.status);
        if (!res.ok) {
          try {
            const text = await res.text();
            console.debug("[UserContext] /me response body:", text);
          } catch (e) {
            console.debug("[UserContext] /me response body: <unreadable>");
          }
          if (mounted) setUser(null);
          return;
        }
        const data = await res.json();
        if (mounted) {
          setUser(data);
          try {
            localStorage.setItem("sb_user", JSON.stringify(data));
          } catch (e) {}
          // If the backend confirms this user is an admin, redirect them
          // to the admin UI immediately after login (server-verified).
          if (data && data.is_admin) {
            try {
              navigate("/admin");
            } catch (e) {
              // ignore navigation failures
            }
          }
        }
      } catch (err) {
        if (mounted) setUser(null);
      }
    };

    fetchUser();

    return () => {
      mounted = false;
    };
  }, [isLoaded, isSignedIn, getToken]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
