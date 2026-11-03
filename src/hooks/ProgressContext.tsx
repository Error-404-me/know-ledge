import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { PracticeAttemptRecord } from "@/database/schema";
import * as service from "@/services/progressService";
import { emptySnapshot, type AttemptInput, type ProgressBackup, type ProgressSnapshot } from "@/services/progressService";

/**
 * React state around the progress service. IndexedDB remains the source of
 * truth: after every write the snapshot is reloaded from the database.
 */

type LoadState = "loading" | "ready" | "error";

interface ProgressContextValue {
  state: LoadState;
  snapshot: ProgressSnapshot;
  error: string | null;
  reload: () => Promise<void>;
  saveLessonPage: (p: { topicId: string; lessonId: string; page: number; totalPages: number }) => Promise<void>;
  completeLesson: (p: { topicId: string; lessonId: string; lastPage: number }) => Promise<void>;
  recordAttempt: (input: AttemptInput) => Promise<PracticeAttemptRecord>;
  getAttempt: (id: string) => Promise<PracticeAttemptRecord | undefined>;
  exportBackup: () => Promise<ProgressBackup>;
  importBackup: (raw: unknown) => Promise<{ lessons: number; attempts: number }>;
  resetProgress: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LoadState>("loading");
  const [snapshot, setSnapshot] = useState<ProgressSnapshot>(emptySnapshot);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);

  const reload = useCallback(async () => {
    try {
      const next = await service.loadSnapshot();
      if (!mounted.current) return;
      setSnapshot(next);
      setError(null);
      setState("ready");
    } catch (e) {
      if (!mounted.current) return;
      setError(e instanceof Error ? e.message : "Progress could not be loaded.");
      setState("error");
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    void reload();
    return () => {
      mounted.current = false;
    };
  }, [reload]);

  const value = useMemo<ProgressContextValue>(
    () => ({
      state,
      snapshot,
      error,
      reload,
      saveLessonPage: async (p) => {
        await service.saveLessonPage(p);
        await reload();
      },
      completeLesson: async (p) => {
        await service.completeLesson(p);
        await reload();
      },
      recordAttempt: async (input) => {
        const record = await service.recordPracticeAttempt(input);
        await reload();
        return record;
      },
      getAttempt: service.getAttempt,
      exportBackup: service.exportProgress,
      importBackup: async (raw) => {
        const result = await service.importProgress(raw);
        await reload();
        return result;
      },
      resetProgress: async () => {
        await service.resetAllProgress();
        await reload();
      },
    }),
    [state, snapshot, error, reload],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside <ProgressProvider>");
  return ctx;
}
