import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export interface User {
  id: string | number | null;
  email_addresses?: Array<any>;
  first_name?: string | null;
  last_name?: string | null;
  full_name?: string | null;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      if (!isLoaded) return;
      if (!isSignedIn) {
        if (mounted) setUser(null);
        return;
      }

      try {
        // Get a token from Clerk to send to backend for verification
        const token = await getToken();
        console.debug("[UserContext] Clerk token:", token);
        const res = await fetch("http://localhost:8000/me", {
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
          // If the user is an admin, redirect them to /admin instead of dashboard
          try {
            if (data?.is_admin) {
              const current = window.location.pathname;
              if (current !== "/admin") {
                navigate("/admin");
              }
            }
          } catch (e) {
            console.debug("redirect failed", e);
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
