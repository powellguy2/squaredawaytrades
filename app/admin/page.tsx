"use client";

import { useState } from "react";

type Row = { email: string; created_at: string; source: string | null };

/**
 * Admin view. The token is entered here and sent per-request; it is never
 * persisted to localStorage, so closing the tab drops it. The real
 * authorization check happens server-side in /api/admin/signups.
 */
export default function AdminPage() {
  const [token, setToken] = useState("");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function load(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/signups", { headers: { "x-admin-token": token } });
      if (!res.ok) {
        setError(res.status === 401 ? "Not authorized." : "Couldn't load the list.");
        setRows(null);
      } else {
        const data = await res.json();
        setRows(data.signups ?? []);
      }
    } catch {
      setError("Couldn't reach the server.");
    } finally {
      setLoading(false);
    }
  }

  async function downloadCsv() {
    const res = await fetch("/api/admin/signups?format=csv", { headers: { "x-admin-token": token } });
    if (!res.ok) { setError("Export failed."); return; }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "squared-away-signups.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="wrap narrow">
      <h1>Signups</h1>
      <form onSubmit={load} style={{ maxWidth: "24rem" }}>
        <label className="field" htmlFor="token">Admin token</label>
        <input
          id="token"
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          autoComplete="off"
        />
        <button className="btn brass" type="submit" disabled={loading} style={{ marginTop: ".8rem" }}>
          {loading ? "Loading…" : "Load list"}
        </button>
      </form>

      {error && <p className="msg err" role="alert">{error}</p>}

      {rows && (
        <>
          <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
            <h2 style={{ margin: 0 }}>{rows.length} on the list</h2>
            <button className="btn ghost sm" onClick={downloadCsv}>Download CSV</button>
          </div>
          <table className="data" style={{ marginTop: "1rem" }}>
            <thead>
              <tr><th>Email</th><th>Joined</th></tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.email}>
                  <td>{r.email}</td>
                  <td>{new Date(r.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </main>
  );
}
