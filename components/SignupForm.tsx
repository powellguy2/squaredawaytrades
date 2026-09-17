"use client";

import { useEffect, useRef, useState } from "react";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");
  const website = useRef(""); // honeypot
  const mountedAt = useRef<number>(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setMsg("");
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          website: website.current,
          elapsedMs: Date.now() - mountedAt.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("ok");
        setMsg("You're on the list. We'll email you when the full bank goes live.");
        setEmail("");
      } else {
        setStatus("err");
        setMsg(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("err");
      setMsg("Couldn't reach the server. Check your connection and try again.");
    }
  }

  if (status === "ok") {
    return (
      <div className="card">
        <h3>You&apos;re in.</h3>
        <p className="msg ok" role="status">
          {msg}
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 style={{ marginBottom: ".6rem" }}>Get early access</h3>
      <p className="fine" style={{ marginBottom: "1rem" }}>
        We&apos;re not charging yet. Leave your email and you&apos;ll be first in when the
        reviewed question bank opens, with a founding-student discount.
      </p>
      <form onSubmit={submit} noValidate>
        <label className="field" htmlFor="email">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        {/* Honeypot: hidden from people, irresistible to bots. */}
        <div className="hp" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            onChange={(e) => (website.current = e.target.value)}
          />
        </div>
        <button
          className="btn brass wide"
          type="submit"
          disabled={status === "sending"}
          style={{ marginTop: ".9rem" }}
        >
          {status === "sending" ? "Joining…" : "Join the list"}
        </button>
      </form>
      {status === "err" && (
        <p className="msg err" role="alert">
          {msg}
        </p>
      )}
      <p className="fine" style={{ marginTop: "1rem", marginBottom: 0 }}>
        We only email about launch and early access. No sharing, no selling, unsubscribe anytime.
      </p>
    </div>
  );
}
