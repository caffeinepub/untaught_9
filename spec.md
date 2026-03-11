# Untaught — Game Theory Domain: Second Simulations

## Current State
- Game Theory domain has 4 modules: Zero-Sum Games, Prisoner's Dilemma, Nash Equilibrium, Repeated Games
- Each module has one simulation (intro-level, turn-based, interactive)
- Flow: Lesson → Simulation → Quiz
- SimulationPage.tsx renders a single sim component per module
- App.tsx has routes: `/domain/game-theory/module/$moduleId/simulation`

## Requested Changes (Diff)

### Add
- Second simulation component for each module:
  - Module 1 Zero-Sum: `Sim1BPriceWar` — two companies set prices head-to-head; player recognises zero-sum traps
  - Module 2 Prisoner's: `Sim2BArmsRace` — two nations deciding defense vs development; geopolitical dilemma
  - Module 3 Nash Equilibrium: `Sim3BPricingGame` — two coffee shops set price High/Low; find Nash Equilibrium
  - Module 4 Repeated Games: `Sim4BSupplierTrust` — buyer-supplier trust game across 5 rounds
- Route `/domain/game-theory/module/$moduleId/simulation/2`
- `Simulation2Page.tsx` navigates to quiz on complete
- Update `SimulationPage.tsx` to navigate to simulation/2 on complete

### Modify
- `SimulationPage.tsx`: complete button goes to simulation/2
- `game-theory.ts`: add simulation2Id per module
- `App.tsx`: add simulation2 routes

### Remove
- Nothing

## Implementation Plan
1. Update game-theory.ts
2. Create 4 second sim components
3. Create Simulation2Page.tsx
4. Update SimulationPage.tsx
5. Update App.tsx
