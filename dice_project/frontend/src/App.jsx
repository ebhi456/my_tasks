import { useState } from "react";

const API = "/api";

function App() {
  const [value, setValue] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [error, setError] = useState("");
  const [spinCount, setSpinCount] = useState(0);

  async function spinDice() {
    if (rolling) return;

    setRolling(true);
    setError("");

    try {
      const response = await fetch(`${API}/spin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Spin request failed");
      }

      const data = await response.json();

      // Keep the animation long enough to make the spin visible.
      await new Promise((resolve) => setTimeout(resolve, 900));

      setValue(data.result);
      setSpinCount((count) => count + 1);
    } catch {
      setError("Unable to contact the dice service.");
    } finally {
      setRolling(false);
    }
  }

  return (
    <div className="page">
      <header className="header">
        <div className="brand">
          <div className="brand-icon">2</div>
          <div>
            <div className="brand-title">TWO-SIDED DICE</div>
            <div className="brand-caption">Decision Utility Platform</div>
          </div>
        </div>

        <div className="online">
          <span />
          ONLINE
        </div>
      </header>

      <main className="main">
        <section className="intro">
          <div className="eyebrow">CONTROLLED RANDOM SELECTION</div>
          <h1>Spin.<br /><em>Select.</em></h1>
          <p>
            A two-sided dice engine designed to return exactly one of two
            possible values: <strong>1</strong> or <strong>2</strong>.
          </p>
        </section>

        <section className="dice-area">
          <div
            className={`dice ${rolling ? "rolling" : ""}`}
            aria-label={`Dice result ${value}`}
          >
            <div className={`face face-${value}`}>
              <span className="number">{rolling ? "?" : value}</span>
            </div>
          </div>

          <div className="result-text" aria-live="polite">
            {rolling ? (
              <>
                <span className="result-label">GENERATING RESULT</span>
                <strong>SPINNING...</strong>
              </>
            ) : (
              <>
                <span className="result-label">CURRENT RESULT</span>
                <strong>{value}</strong>
              </>
            )}
          </div>

          <button
            className="spin-button"
            onClick={spinDice}
            disabled={rolling}
          >
            <span>{rolling ? "SPINNING" : "SPIN DICE"}</span>
            <b>↻</b>
          </button>

          {error && <div className="error">{error}</div>}
        </section>

        <section className="possible">
          <div>
            <span className="result-label">POSSIBLE VALUES</span>
            <strong>Only 1 or 2</strong>
          </div>

          <div className="values">
            <div className={value === 1 && !rolling ? "active" : ""}>1</div>
            <div className={value === 2 && !rolling ? "active" : ""}>2</div>
          </div>

          <div className="counter">
            SPINS<br />
            <strong>{spinCount}</strong>
          </div>
        </section>

        <footer>
          <span>Two-Sided Dice v1.0.0</span>
          <span>API · FastAPI · Docker</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
