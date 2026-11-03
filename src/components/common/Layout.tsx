import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useProgress } from "@/hooks/ProgressContext";
import { getActiveTopic } from "@/utils/insights";
import { cn } from "@/utils/cn";
import { Icon, type IconName } from "./Icon";

export function Layout() {
  const { snapshot, state, error } = useProgress();
  const { pathname } = useLocation();
  const activeTopic = getActiveTopic(snapshot);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const links: { to: string; label: string; icon: IconName; end?: boolean }[] =
    [
      { to: "/", label: "Home", icon: "home", end: true },
      { to: "/topics", label: "Lessons", icon: "book" },
      {
        to: activeTopic ? `/practice/${activeTopic.id}` : "/topics",
        label: "Practice",
        icon: "pencil",
      },
      { to: "/progress", label: "My Progress", icon: "chart" },
    ];

  const extraActive = (label: string) =>
    (label === "Practice" &&
      (pathname.startsWith("/practice") || pathname.startsWith("/results"))) ||
    (label === "Lessons" && pathname.startsWith("/lessons"));

  const linkClass = (active: boolean) =>
    cn(
      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition",
      active
        ? "bg-indigo-50 text-indigo-700"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    );

  return (
    <div className="min-h-screen bg-slate-50 pb-20 text-slate-800 md:pb-0">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:p-2"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <NavLink to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">
              ∑
            </span>
            <span className="leading-tight">
              <span className="block text-base font-bold text-slate-900">
                KnowKnow
              </span>
              <span className="block text-xs text-slate-500">
                Learn it. Understand it.
              </span>
            </span>
          </NavLink>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  linkClass(isActive || extraActive(l.label))
                }
              >
                <Icon name={l.icon} className="h-4 w-4" />
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {state === "error" && (
        <div
          role="alert"
          className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
        >
          <div className="mx-auto flex max-w-5xl items-start gap-2">
            <Icon
              name="alert"
              className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
            />
            <p>
              <strong>Progress can’t be saved right now.</strong> {error} You
              can still read lessons and try questions, but your results won’t
              be remembered.
            </p>
          </div>
        </div>
      )}

      <main id="main" className="mx-auto max-w-5xl px-4 py-6 sm:py-8">
        <Outlet />
      </main>

      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white md:hidden"
        aria-label="Main"
      >
        <ul className="mx-auto grid max-w-md grid-cols-4">
          {links.map((l) => (
            <li key={l.label}>
              <NavLink
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  cn(
                    "flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-semibold",
                    isActive || extraActive(l.label)
                      ? "text-indigo-700"
                      : "text-slate-500",
                  )
                }
              >
                <Icon name={l.icon} className="h-5 w-5" />
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
