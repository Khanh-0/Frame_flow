import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import type { Project } from "../types";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projects.api";

export function useProjects() {
  const navigate = useNavigate();

  // ── Remote state ───────────────────────────────────────────────────────────
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── UI state ───────────────────────────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // ── Derived ────────────────────────────────────────────────────────────────
  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // ── Load on mount ──────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetchProjects();
        if (!cancelled) setProjects(res.data);
      } catch (err) {
        if (!cancelled) setError((err as Error).message);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // ── Create ─────────────────────────────────────────────────────────────────
  const handleCreateProject = useCallback(async () => {
    if (!newProjectName.trim()) return;
    try {
      setIsCreating(true);
      const created = await createProject({ name: newProjectName.trim() });
      setProjects((prev) => [created, ...prev]);
      setNewProjectName("");
      setShowNewModal(false);
      // navigate("/dashboard");
      navigate(
          `/dashboard/${created.id}`,
        );
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsCreating(false);
    }
  }, [newProjectName, navigate]);

  // ── Rename ─────────────────────────────────────────────────────────────────
  const handleRename = useCallback(async (id: number, name: string) => {
    try {
      const updated = await updateProject(id, { name });
      setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setOpenMenuId(null);
    }
  }, []);

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = useCallback(async (id: number) => {
    try {
      setDeletingId(id);
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setDeletingId(null);
      setOpenMenuId(null);
    }
  }, []);

  // ── Modal helpers ──────────────────────────────────────────────────────────
  const openNewModal = () => {
    setNewProjectName("");
    setShowNewModal(true);
  };
  const closeNewModal = () => {
    setNewProjectName("");
    setShowNewModal(false);
  };

  return {
    // Data
    projects,
    filtered,
    isLoading,
    error,

    // Search
    search,
    setSearch,

    // Menu
    openMenuId,
    setOpenMenuId,

    // Modal
    showNewModal,
    newProjectName,
    setNewProjectName,
    isCreating,
    openNewModal,
    closeNewModal,

    // Async states
    deletingId,

    // Handlers
    handleCreateProject,
    handleRename,
    handleDelete,
  };
}