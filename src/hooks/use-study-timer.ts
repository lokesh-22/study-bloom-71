import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/clerk-react";

export function useStudyTimer(enabled: boolean) {
  const { getToken, isLoaded } = useAuth();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || !isLoaded) return;
    let stopped = false;

    async function sendHeartbeat(useBeacon = false) {
      try {
        const token = await getToken();
        const url = "http://localhost:8000/study/ping";
        if (useBeacon && navigator.sendBeacon) {
          const blob = new Blob([JSON.stringify({ ts: Date.now() })], { type: "application/json" });
          navigator.sendBeacon(url, blob);
          return;
        }
        await fetch(url, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({ ts: Date.now() }),
        });
      } catch (e) {
        // silently ignore; failure to record is non-fatal
        console.error("heartbeat failed", e);
      }
    }

    const heartbeat = () => {
      if (document.visibilityState !== "visible") return;
      if (!document.hasFocus()) return;
      sendHeartbeat();
    };

    // first ping immediately
    sendHeartbeat();
    timerRef.current = window.setInterval(heartbeat, 30000);

    const onVisibility = () => {
      if (document.visibilityState === "visible") heartbeat();
      else sendHeartbeat(true);
    };
    const onBeforeUnload = () => {
      sendHeartbeat(true);
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      stopped = true;
      if (timerRef.current) clearInterval(timerRef.current);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("beforeunload", onBeforeUnload);
      sendHeartbeat(true);
    };
  }, [enabled, isLoaded, getToken]);
}
