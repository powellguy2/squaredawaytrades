import Link from "next/link";
import SignupForm from "@/components/SignupForm";
import QuestionCard from "@/components/QuestionCard";
import { QUESTIONS } from "@/lib/questions";

export default function Home() {
  const sample = QUESTIONS[0];
  return (
    <main>
      <section className="wrap hero">
        <div>
          <h1>Get squared away for your Tennessee contractor exam.</h1>
          <p className="lede">
            Practice questions you scroll through on breaks, in the truck, or between jobs.
            Every answer points you to the statute or NASCLA guide section, and the ones you
            miss come back until they stick.
          </p>
          <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", margin: "1.5rem 0 1rem" }}>
            <Link className="btn brass" href="/study">Start studying free</Link>
            <Link className="btn ghost" href="/exam">Try a mock exam</Link>
          </div>
          <p className="fine">
            Tennessee Business and Law exam, required for nearly every contractor
            classification. Limited Licensed Electrician and General Contractor banks are next.
          </p>
        </div>
        <div>
          <p className="fine" style={{ marginBottom: ".5rem" }}>Try one</p>
          <QuestionCard question={sample} />
        </div>
      </section>

      <section className="wrap narrow" style={{ paddingTop: 0 }}>
        <SignupForm />
      </section>

      <section className="wrap" style={{ paddingTop: 0 }}>
        <h2>How it works</h2>
        <div className="stats">
          <div>
            <h3>Scroll the feed</h3>
            <p className="fine">One question at a time. Tap an answer, see why it&apos;s right,
            and where to find it in the book.</p>
          </div>
          <div>
            <h3>Close the gaps</h3>
            <p className="fine">Missed questions come back. Your readiness score climbs as you
            get them right.</p>
          </div>
          <div>
            <h3>Sit a mock exam</h3>
            <p className="fine">Timed practice builds the stamina and lookup speed the real
            exam demands.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
