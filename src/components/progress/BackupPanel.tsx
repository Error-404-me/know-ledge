import { useRef, useState } from "react";
import { useProgress } from "@/hooks/ProgressContext";
import { Icon } from "@/components/common/Icon";
import { Card, btn } from "@/components/common/ui";

export function BackupPanel() {
  const { exportBackup, importBackup, resetProgress } = useProgress();
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleExport() {
    setBusy(true);
    try {
      const data = await exportBackup();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `knowknow-progress-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setMessage({ kind: "ok", text: "Backup downloaded. Keep the file somewhere safe." });
    } catch (e) {
      setMessage({ kind: "error", text: e instanceof Error ? e.message : "Export failed." });
    } finally {
      setBusy(false);
    }
  }

  async function handleFile(file: File | undefined) {
    if (!file) return;
    if (!window.confirm("Restoring a backup replaces the progress currently saved in this browser. Continue?")) {
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    setBusy(true);
    try {
      let parsed: unknown;
      try {
        parsed = JSON.parse(await file.text());
      } catch {
        throw new Error("That file couldn’t be read. Choose a backup file you exported from this app.");
      }
      const result = await importBackup(parsed);
      setMessage({
        kind: "ok",
        text: `Progress restored: ${result.lessons} lesson record${result.lessons === 1 ? "" : "s"} and ${result.attempts} practice attempt${result.attempts === 1 ? "" : "s"}.`,
      });
    } catch (e) {
      setMessage({ kind: "error", text: e instanceof Error ? e.message : "Import failed." });
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function handleReset() {
    if (!window.confirm("Erase ALL saved progress on this device? This cannot be undone. Export a backup first if you’re unsure.")) return;
    setBusy(true);
    try {
      await resetProgress();
      setMessage({ kind: "ok", text: "All progress on this device has been reset." });
    } catch (e) {
      setMessage({ kind: "error", text: e instanceof Error ? e.message : "Reset failed." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card>
      <h2 className="text-lg font-bold text-slate-900">Back up your progress</h2>
      <p className="mt-1 text-slate-600">
        Your progress is stored <strong className="font-semibold text-slate-900">only in this browser</strong>. It can be lost if browser data is
        cleared, if you use private browsing, or if you switch to another device. Export a backup file now and then, and restore it if needed.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" className={btn.primary} onClick={() => void handleExport()} disabled={busy}>
          <Icon name="download" className="h-4 w-4" /> Export backup
        </button>
        <button type="button" className={btn.secondary} onClick={() => fileRef.current?.click()} disabled={busy}>
          <Icon name="upload" className="h-4 w-4" /> Restore from file
        </button>
        <button type="button" className={btn.danger} onClick={() => void handleReset()} disabled={busy}>
          Reset progress
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="sr-only"
          aria-label="Choose backup file"
          onChange={(e) => void handleFile(e.target.files?.[0])}
        />
      </div>
      {message && (
        <p
          role={message.kind === "error" ? "alert" : "status"}
          className={`mt-4 rounded-lg px-3 py-2 text-sm ${message.kind === "ok" ? "bg-emerald-50 text-emerald-900" : "bg-rose-50 text-rose-900"}`}
        >
          {message.text}
        </p>
      )}
    </Card>
  );
}
