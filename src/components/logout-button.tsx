"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <button onClick={handleLogout} className="btn btn-outline" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem", borderColor: "var(--surface-border)" }}>
      Salir
    </button>
  );
}
