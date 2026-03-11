import { AppFooter } from "@/components/AppFooter";
import { AppHeader } from "@/components/AppHeader";
import { Toaster } from "@/components/ui/sonner";
import { GlossaryPage } from "@/pages/GlossaryPage";
import { HomePage } from "@/pages/HomePage";
import { MyProgressPage } from "@/pages/MyProgressPage";
import { DomainChallengePage as BEDomainChallengePage } from "@/pages/behavioural-economics/DomainChallengePage";
import { DomainIntroPage as BEDomainIntroPage } from "@/pages/behavioural-economics/DomainIntroPage";
import { LessonPage as BELessonPage } from "@/pages/behavioural-economics/LessonPage";
import { ModuleListPage as BEModuleListPage } from "@/pages/behavioural-economics/ModuleListPage";
import { QuizPage as BEQuizPage } from "@/pages/behavioural-economics/QuizPage";
import { SimulationPage as BESimulationPage } from "@/pages/behavioural-economics/SimulationPage";
import { WildPage as BEWildPage } from "@/pages/behavioural-economics/WildPage";
import { DomainChallengePage } from "@/pages/game-theory/DomainChallengePage";
import { DomainIntroPage } from "@/pages/game-theory/DomainIntroPage";
import { LessonPage } from "@/pages/game-theory/LessonPage";
import { ModuleListPage } from "@/pages/game-theory/ModuleListPage";
import { QuizPage } from "@/pages/game-theory/QuizPage";
import { Simulation2Page } from "@/pages/game-theory/Simulation2Page";
import { SimulationPage } from "@/pages/game-theory/SimulationPage";
import { WildPage } from "@/pages/game-theory/WildPage";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

// ─── Root Layout ────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <AppHeader />
      <div className="flex-1">
        <Outlet />
      </div>
      <AppFooter />
      <Toaster />
    </div>
  ),
});

// ─── Core Routes ────────────────────────────────────────────────────
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const glossaryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/glossary",
  component: GlossaryPage,
});

const progressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/progress",
  component: MyProgressPage,
});

// ─── Game Theory Routes ───────────────────────────────────────────────────
const domainGameTheoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/domain/game-theory",
  component: DomainIntroPage,
});

const moduleListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/domain/game-theory/modules",
  component: ModuleListPage,
});

const lessonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/domain/game-theory/module/$moduleId/lesson",
  component: () => {
    const { moduleId } = lessonRoute.useParams();
    const id = Number.parseInt(moduleId, 10);
    if (Number.isNaN(id) || id < 1 || id > 4) return null;
    return <LessonPage moduleId={id} />;
  },
});

const simulationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/domain/game-theory/module/$moduleId/simulation",
  component: () => {
    const { moduleId } = simulationRoute.useParams();
    const id = Number.parseInt(moduleId, 10);
    if (Number.isNaN(id) || id < 1 || id > 4) return null;
    return <SimulationPage moduleId={id} />;
  },
});

const simulation2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/domain/game-theory/module/$moduleId/simulation/2",
  component: () => {
    const { moduleId } = simulation2Route.useParams();
    const id = Number.parseInt(moduleId, 10);
    if (Number.isNaN(id) || id < 1 || id > 4) return null;
    return <Simulation2Page moduleId={id} />;
  },
});

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/domain/game-theory/module/$moduleId/quiz",
  component: () => {
    const { moduleId } = quizRoute.useParams();
    const id = Number.parseInt(moduleId, 10);
    if (Number.isNaN(id) || id < 1 || id > 4) return null;
    return <QuizPage moduleId={id} />;
  },
});

const wildRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/domain/game-theory/module/$moduleId/wild",
  component: () => {
    const { moduleId } = wildRoute.useParams();
    const id = Number.parseInt(moduleId, 10);
    if (Number.isNaN(id) || id < 1 || id > 4) return null;
    return <WildPage moduleId={id} />;
  },
});

const challengeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/domain/game-theory/challenge",
  component: DomainChallengePage,
});

// ─── Behavioural Economics Routes ───────────────────────────────────────────────
const beDomainRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/domain/behavioural-economics",
  component: BEDomainIntroPage,
});

const beModuleListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/domain/behavioural-economics/modules",
  component: BEModuleListPage,
});

const beLessonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/domain/behavioural-economics/module/$moduleId/lesson",
  component: () => {
    const { moduleId } = beLessonRoute.useParams();
    const id = Number.parseInt(moduleId, 10);
    if (Number.isNaN(id) || id < 1 || id > 5) return null;
    return <BELessonPage moduleId={id} />;
  },
});

const beSimulationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/domain/behavioural-economics/module/$moduleId/simulation",
  component: () => {
    const { moduleId } = beSimulationRoute.useParams();
    const id = Number.parseInt(moduleId, 10);
    if (Number.isNaN(id) || id < 1 || id > 5) return null;
    return <BESimulationPage moduleId={id} />;
  },
});

const beQuizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/domain/behavioural-economics/module/$moduleId/quiz",
  component: () => {
    const { moduleId } = beQuizRoute.useParams();
    const id = Number.parseInt(moduleId, 10);
    if (Number.isNaN(id) || id < 1 || id > 5) return null;
    return <BEQuizPage moduleId={id} />;
  },
});

const beWildRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/domain/behavioural-economics/module/$moduleId/wild",
  component: () => {
    const { moduleId } = beWildRoute.useParams();
    const id = Number.parseInt(moduleId, 10);
    if (Number.isNaN(id) || id < 1 || id > 5) return null;
    return <BEWildPage moduleId={id} />;
  },
});

const beChallengeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/domain/behavioural-economics/challenge",
  component: BEDomainChallengePage,
});

// ─── Router ──────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  homeRoute,
  glossaryRoute,
  progressRoute,
  // Game Theory
  domainGameTheoryRoute,
  moduleListRoute,
  lessonRoute,
  simulationRoute,
  simulation2Route,
  quizRoute,
  wildRoute,
  challengeRoute,
  // Behavioural Economics
  beDomainRoute,
  beModuleListRoute,
  beLessonRoute,
  beSimulationRoute,
  beQuizRoute,
  beWildRoute,
  beChallengeRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
