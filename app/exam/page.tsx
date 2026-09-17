"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { QUESTIONS, type Question } from "@/lib/questions";

const LETTERS = "ABCD";
const EXAM_LENGTH = 10;
const EXAM_SECONDS = 15 * 60;
const PASS_MARK = 70;

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

type Phase = "intro" | "running" | "results";

export default function ExamPage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [remaining, setRemaining] = useState(EXAM_SECONDS);
  const [warn, setWarn] = useState<string | null>(null);
  const submitRef = useRef<(force: boolean) => void>(() => {});

  function start() {
    const qs = shuffle(QUESTIONS).slice(0, EXAM_LENGTH);
    setQuestions(qs);
    setAnswers(new Array(qs.length).fill(null));
    setRemaining(EXAM_SECONDS);
    setWarn(null);
    setPhase("running");
  }

  function submit(force: boolean) {
    const blank = answers.filter((a) => a === null).length;
    if (blank > 0 && !force) {
      setWarn(
        `${blank} question${blank > 1 ? "s" : ""} still unanswered. Unanswered questions count as wrong.`,
      );
      return;
    }
    setPhase("results");
  }
  submitRef.current = submit;

  useEffect(() => {
    if (phase !== "running") return;
    const t = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(t);
          submitRef.current(true);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  const score = useMemo(() => {
    if (phase !== "results") return { correct: 0, pct: 0 };
    const correct = questions.reduce((n, q, i) => (answers[i] === q.answer ? n + 1 : n), 0);
    return { correct, pct: Math.round((correct / questions.length) * 100) };
  }, [phase, questions, answers]);

  if (phase === "intro") {
    return (
      <main className="wrap narrow">
        <h1>Mock exam</h1>
        <p className="lede">
          {EXAM_LENGTH} questions, 15 minutes. Keep your NASCLA guide handy — the real exam is
          open book, and finding the answer fast is half the skill. Unanswered questions count
          as wrong.
        </p>
        <button className="btn brass" onClick={start}>Start mock exam</button>
        <p className="fine" style={{ marginTop: "1rem" }}>
          Length and timing here are placeholders until the current Prov bulletin confirms the
          real question count and time limit.
        </p>
      </main>
    );
  }

  if (phase === "running") {
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    return (
      <main className="wrap narrow">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem", flexWrap: "wrap" }}>
          <h1 style={{ margin: 0 }}>Mock exam</h1>
          <p className="fine" style={{ margin: 0 }}>
            Time left{" "}
            <strong style={{ fontFamily: "var(--display)", fontSize: "1.5rem", color: "var(--navy)" }}>
              {m}:{String(s).padStart(2, "0")}
            </strong>
          </p>
        </div>

        <div style={{ display: "grid", gap: "1.25rem", marginTop: "1.5rem" }}>
          {questions.map((q, n) => (
            <fieldset key={q.id} style={{ border: 0, borderBottom: "1px solid var(--line)", padding: "0 0 1.2rem", margin: 0 }}>
              <legend style={{ fontWeight: 500, fontSize: "1.05rem", padding: 0, marginBottom: ".7rem" }}>
                <span style={{ fontFamily: "var(--display)", fontWeight: 600, color: "var(--brass-dk)", fontSize: "1.3rem", marginRight: ".5rem" }}>
                  {n + 1}
                </span>
                {q.q}
              </legend>
              {q.choices.map((c, i) => (
                <label
                  key={i}
                  style={{
                    display: "flex", gap: ".6rem", alignItems: "center",
                    padding: ".55rem .7rem", border: "1px solid var(--line)",
                    background: answers[n] === i ? "#eef1f6" : "#fff",
                    borderColor: answers[n] === i ? "var(--navy)" : "var(--line)",
                    borderRadius: 4, marginBottom: ".45rem", cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name={`q${n}`}
                    checked={answers[n] === i}
                    onChange={() => {
                      setWarn(null);
                      setAnswers((prev) => {
                        const next = prev.slice();
                        next[n] = i;
                        return next;
                      });
                    }}
                    style={{ accentColor: "var(--navy)", width: 18, height: 18, flex: "none" }}
                  />
                  <span>{c}</span>
                </label>
              ))}
            </fieldset>
          ))}
        </div>

        {warn && (
          <div className="msg err" role="alert" style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ flex: "1 1 14rem" }}>{warn}</span>
            <button className="btn ghost sm" onClick={() => submit(true)}>Submit anyway</button>
          </div>
        )}

        <button className="btn brass" style={{ marginTop: "1.2rem" }} onClick={() => submit(false)}>
          Submit exam
        </button>
      </main>
    );
  }

  const missed = questions
    .map((q, i) => ({ q, pick: answers[i] }))
    .filter(({ q, pick }) => pick !== q.answer);

  return (
    <main className="wrap narrow">
      <h1>Results</h1>
      <p style={{ fontFamily: "var(--display)", fontSize: "4rem", fontWeight: 600, lineHeight: 1, margin: ".5rem 0" }}>
        {score.pct}%
      </p>
      <p>
        {score.pct >= PASS_MARK
          ? `You cleared the practice pass mark with ${score.correct} of ${questions.length}.`
          : `${score.correct} of ${questions.length}. The practice pass mark is ${PASS_MARK}%. Review the misses below, then run it again.`}
      </p>

      <h2 style={{ marginTop: "2rem" }}>Review your misses</h2>
      {missed.length === 0 ? (
        <p>No misses. Keep it sharp in the study feed.</p>
      ) : (
        missed.map(({ q, pick }) => (
          <div key={q.id} style={{ borderTop: "1px solid var(--line)", padding: "1rem 0" }}>
            <p style={{ fontWeight: 500, marginBottom: ".35rem" }}>{q.q}</p>
            <p style={{ marginBottom: ".35rem" }}>
              Your answer: {pick === null ? "Left blank" : `${LETTERS[pick]} — ${q.choices[pick]}`}
            </p>
            <p style={{ marginBottom: ".5rem" }}>
              Correct: <strong>{LETTERS[q.answer]} — {q.choices[q.answer]}</strong>
            </p>
            <p className="ref">Look it up: <strong>{q.ref}</strong></p>
          </div>
        ))
      )}

      <button className="btn brass" style={{ marginTop: "1.5rem" }} onClick={start}>
        Take another
      </button>
    </main>
  );
}
