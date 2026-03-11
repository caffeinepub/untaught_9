import { useState } from "react";

const AMBER = "0.72 0.18 75";

type Scenario = "A" | "B" | null;

// Simulated negotiation sequences
const SCENARIO_A = {
  label: "Scenario A — Buyer anchors first",
  messages: [
    {
      from: "You (Seller)",
      text: "I'm selling my laptop. It's in great condition.",
    },
    { from: "Buyer", text: "I'd offer £80 for it." },
    {
      from: "You (Seller)",
      text: "That's quite low — I was thinking more like £220.",
    },
    { from: "Buyer", text: "I could stretch to £120, that's my limit." },
    { from: "You (Seller)", text: "How about £150, and we have a deal?" },
    { from: "Buyer", text: "Deal — £150." },
  ],
  finalPrice: 150,
  whoAnchored: "Buyer",
  anchorValue: 80,
};

const SCENARIO_B = {
  label: "Scenario B — Seller anchors first",
  messages: [
    {
      from: "You (Seller)",
      text: "I'm selling my laptop. It's worth £350 — excellent condition.",
    },
    { from: "Buyer", text: "That's a bit much. I'd say £200?" },
    { from: "You (Seller)", text: "I could come down to £320." },
    { from: "Buyer", text: "£240 is the most I'd pay." },
    { from: "You (Seller)", text: "Let's meet at £280." },
    { from: "Buyer", text: "Alright — £280." },
  ],
  finalPrice: 280,
  whoAnchored: "Seller",
  anchorValue: 350,
};

export function Sim2Anchoring() {
  const [active, setActive] = useState<Scenario>(null);

  const scenario =
    active === "A" ? SCENARIO_A : active === "B" ? SCENARIO_B : null;

  return (
    <div className="space-y-5">
      <p className="text-foreground text-sm leading-relaxed">
        You're selling a second-hand laptop. Watch how the first number said
        shapes the entire negotiation.
      </p>

      {/* Toggle */}
      <div className="flex gap-3">
        {(["A", "B"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setActive(s)}
            data-ocid={`be_sim2.scenario${s}.toggle`}
            className="flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all"
            style={{
              borderColor:
                active === s
                  ? `oklch(${AMBER} / 0.6)`
                  : "oklch(0.28 0.01 275 / 0.5)",
              backgroundColor:
                active === s ? `oklch(${AMBER} / 0.12)` : "transparent",
              color: active === s ? `oklch(${AMBER})` : "oklch(0.7 0.01 275)",
            }}
          >
            {s === "A" ? "Buyer Opens First" : "Seller Opens First"}
          </button>
        ))}
      </div>

      {/* Conversation */}
      {scenario && (
        <div className="space-y-4">
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: `oklch(${AMBER})` }}
          >
            {scenario.label}
          </p>

          <div className="rounded-lg border border-border/50 bg-card divide-y divide-border/30">
            {scenario.messages.map((msg, i) => {
              const isSeller = msg.from.includes("Seller");
              return (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: static ordered content
                  key={i}
                  className="px-4 py-3 flex gap-3"
                >
                  <span
                    className="shrink-0 text-xs font-semibold uppercase tracking-wide mt-0.5 w-24"
                    style={{
                      color: isSeller
                        ? `oklch(${AMBER})`
                        : "oklch(0.68 0.01 275)",
                    }}
                  >
                    {msg.from}
                  </span>
                  <p className="text-sm text-foreground">{msg.text}</p>
                </div>
              );
            })}
          </div>

          {/* Result */}
          <div
            className="rounded-lg p-4"
            style={{
              backgroundColor: `oklch(${AMBER} / 0.08)`,
              border: `1px solid oklch(${AMBER} / 0.25)`,
            }}
          >
            <p className="font-semibold text-foreground mb-1">
              Final price:{" "}
              <span style={{ color: `oklch(${AMBER})` }}>
                £{scenario.finalPrice}
              </span>
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {scenario.whoAnchored} anchored with £{scenario.anchorValue}. The
              entire negotiation played out in the shadow of that first number.
            </p>
            <div
              className="rounded-md px-3 py-2 text-sm font-medium"
              style={{
                backgroundColor: `oklch(${AMBER} / 0.12)`,
                color: `oklch(${AMBER})`,
              }}
            >
              Key pattern: The first number said shapes every number that
              follows.
            </div>
          </div>

          {/* Comparison note */}
          {active && (
            <p className="text-xs text-muted-foreground">
              Same laptop. Same seller. Same buyer. The £
              {SCENARIO_B.finalPrice - SCENARIO_A.finalPrice} gap between
              outcomes is explained entirely by who anchored first. Try the
              other scenario.
            </p>
          )}
        </div>
      )}

      {!scenario && (
        <div className="rounded-lg border border-border/40 bg-card/50 p-8 text-center">
          <p className="text-muted-foreground text-sm">
            Select a scenario above to see the negotiation play out.
          </p>
        </div>
      )}
    </div>
  );
}
