"use client";

import { useState } from "react";
import type { Question } from "@/lib/questions";

const LETTERS = "ABCD";

export default function QuestionCard({
  question,
  onAnswer,
  isReview = false,
}: {
  question: Question;
  onAnswer?: (correct: boolean) => void;
  isReview?: boolean;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const done = picked !== null;
  const correct = picked === question.answer;

  function choose(i: number) {
    if (done) return;
    setPicked(i);
    onAnswer?.(i === question.answer);
  }

  return (
    <article className="card">
      <div className="qmeta">
        <span className="tag">{question.topic}</span>
        {isReview && <span className="tag draft">Review</span>}
      </div>
      <p className="qtext">{question.q}</p>
      <div className="choices" role="group" aria-label="Answer choices">
        {question.choices.map((c, i) => {
          let cls = "choice";
          if (done && i === question.answer) cls += " right";
          else if (done && i === picked) cls += " wrong";
          return (
            <button key={i} type="button" className={cls} onClick={() => choose(i)} disabled={done}>
              <span className="letter">{LETTERS[i]}</span>
              <span>{c}</span>
            </button>
          );
        })}
      </div>
      {done && (
        <div className={`result ${correct ? "ok" : "bad"}`} role="status">
          <p className="verdict">
            {correct ? "Correct" : `Not quite. The answer is ${LETTERS[question.answer]}.`}
          </p>
          <p>{question.why}</p>
          <p className="ref">
            Look it up: <strong>{question.ref}</strong>
          </p>
        </div>
      )}
    </article>
  );
}
