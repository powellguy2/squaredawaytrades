"use client";

import { useMemo, useState } from "react";
import QuestionCard from "@/components/QuestionCard";
import { QUESTIONS, type Question } from "@/lib/questions";

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

type Slot = { key: string; question: Question; isReview: boolean };

export default function StudyPage() {
  const initial = useMemo(
    () => shuffle(QUESTIONS).map((q, i) => ({ key: `${q.id}-${i}`, question: q, isReview: false })),
    [],
  );
  const [slots, setSlots] = useState<Slot[]>(initial);
  const [seen, setSeen] = useState(0);
  const [right, setRight] = useState(0);

  function handleAnswer(slot: Slot, index: number, correct: boolean) {
    setSeen((n) => n + 1);
    if (correct) {
      setRight((n) => n + 1);
      return;
    }
    // Requeue the missed question a few cards later.
    setSlots((prev) => {
      const next = prev.slice();
      const at = Math.min(index + 4, next.length);
      next.splice(at, 0, {
        key: `${slot.question.id}-r-${Date.now()}`,
        question: slot.question,
        isReview: true,
      });
      return next;
    });
  }

  const pct = seen === 0 ? 0 : Math.round((right / seen) * 100);

  return (
    <main className="wrap narrow">
      <h1>Study feed</h1>
      <div className="stats">
        <div>
          <p className="stat">{seen}</p>
          <p className="fine">Answered</p>
        </div>
        <div>
          <p className="stat">{seen === 0 ? "—" : `${pct}%`}</p>
          <p className="fine">Accuracy this session</p>
        </div>
      </div>
      <p className="fine">
        Progress resets when you reload — accounts and saved progress arrive with the next build.
      </p>
      <div style={{ display: "grid", gap: "1.5rem", marginTop: "1.5rem" }}>
        {slots.map((s, i) => (
          <QuestionCard
            key={s.key}
            question={s.question}
            isReview={s.isReview}
            onAnswer={(correct) => handleAnswer(s, i, correct)}
          />
        ))}
      </div>
    </main>
  );
}
