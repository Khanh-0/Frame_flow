import { useState, useEffect, useRef, useCallback } from "react";
import type { Tool, BlendMode, FrameState, ImportedFile, ContextMenu } from "../types";
import type { PaintCanvasHandle } from "../components/PaintCanvas";
import { uploadFrameImage, uploadColoredFrame } from "../services/storage.api";
import { createFrame, loadFrames, updateFrameColor, updateFrameStatus } from "../services/frame.api";
import { useParams } from "react-router";

export function useDashboard() {
  const { projectId } = useParams();

  // ── Frame state ────────────────────────────────────────────────────────────
  const [activeFrame, setActiveFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState("1x");
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [frameStates, setFrameStates] = useState<Record<number, FrameState>>({});
  const [uncoloredFiles, setUncoloredFiles] = useState<ImportedFile[]>([]);
  const [framePaints, setFramePaints] = useState<Record<number, string>>({});
  const [referenceImage, setReferenceImage] = useState<ImportedFile | null>(null);
  const [frameRefMap, setFrameRefMap] = useState<Record<number, ImportedFile>>({});
  const [contextMenu, setContextMenu] = useState<ContextMenu>(null);
  const [undoStack, setUndoStack] = useState<Record<number, string[]>>({});
  const [redoStack, setRedoStack] = useState<Record<number, string[]>>({});

  // ── Tool state ─────────────────────────────────────────────────────────────
  const [activeTool, setActiveTool] = useState<Tool>("brush");
  const [activeColor, setActiveColor] = useState("#FF6B9D");
  const [secondaryColor, setSecondaryColor] = useState("#FFFFFF");
  const [recentColors, setRecentColors] = useState<string[]>([]);
  const [brushSize, setBrushSize] = useState(20);
  const [opacity, setOpacity] = useState(85);
  const [hardness, setHardness] = useState(70);
  const [blendMode, setBlendMode] = useState<BlendMode>("source-over");
  const [flow, setFlow] = useState(100);
  const [spacing, setSpacing] = useState(10);
  const [fillTolerance, setFillTolerance] = useState(35);
  const [gapClose, setGapClose] = useState(true);
  const [lockLineArt, setLockLineArt] = useState(false);

  // ── Panel state ────────────────────────────────────────────────────────────
  const [panelOpen, setPanelOpen] = useState({
    tools: true,
    color: true,
    brush: true,
    adjust: false,
  });

  // ── AI state ───────────────────────────────────────────────────────────────
  const [isColoring, setIsColoring] = useState(false);
  const [improveEdge, setImproveEdge] = useState(true);
  const [preserveLines, setPreserveLines] = useState(true);
  const [skinTone, setSkinTone] = useState(true);
  const [brightness, setBrightness] = useState(50);
  const [contrastVal, setContrastVal] = useState(50);
  const [saturation, setSaturation] = useState(60);
  const [blur, setBlur] = useState(20);
  const [spill, setSpill] = useState(30);
  const [tones, setTones] = useState(45);

  // ── Modal state ────────────────────────────────────────────────────────────
  const [showReferenceModal, setShowReferenceModal] = useState(false);
  const [refModalTab, setRefModalTab] = useState<"list" | "upload">("list");
  const [selectedRefId, setSelectedRefId] = useState<string | null>(null);

  // ── Refs ───────────────────────────────────────────────────────────────────
  const playRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const uncoloredInputRef = useRef<HTMLInputElement>(null);
  const customColoredInputRef = useRef<HTMLInputElement>(null);
  const timelineScrollRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paintCanvasRef = useRef<PaintCanvasHandle>(null);
  // Debounce cho updateFrameStatus khi tô tay — tránh spam DB mỗi nét bút
  const statusDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const drawRevisionRef = useRef(0);

  // ── Load frames từ DB khi mount ────────────────────────────────────────────
  // Đọc status + colored_image_url để khôi phục đúng tag sau reload
  useEffect(() => {
    if (!projectId) return;

    const init = async () => {
      try {
        const frames = await loadFrames(projectId);

        const files = frames.map((frame) => ({
              id: frame.id,
              name: `frame_${frame.frame_index}`,
              url: frame.source_image_url,
              paintUrl: frame.colored_image_url ?? undefined,
            }));
        setUncoloredFiles(files);

        // Khôi phục frameStates từ cột status DB
        // "manual" / "ai" → hiện đúng tag
        // "plain" hoặc giá trị khác → plain (không có tag)
        // fallback: có colored_image_url nhưng status lạ → coi là manual
        const states: Record<number, FrameState> = {};
            frames.forEach((frame, i) => {
              if (frame.status === "ai" || frame.status === "manual") {
                states[i] = frame.status;
              } else if (frame.colored_image_url) {
                states[i] = "manual";
              }
            });
        setFrameStates(states);
      } catch (error) {
        console.error("loadFrames error:", error);
      }
    };

    init();
  }, [projectId]);

  // ── Playback ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isPlaying && uncoloredFiles.length > 0) {
      const ms =
        speed === "0.25x" ? 800
        : speed === "0.5x" ? 400
        : speed === "2x" ? 100
        : 200;
      playRef.current = setInterval(
        () => setActiveFrame((f) => (f + 1) % uncoloredFiles.length),
        ms,
      );
    } else if (playRef.current) {
      clearInterval(playRef.current);
    }
    return () => {
      if (playRef.current) clearInterval(playRef.current);
    };
  }, [isPlaying, speed, uncoloredFiles.length]);

  // ── Timeline auto-scroll ───────────────────────────────────────────────────
  useEffect(() => {
    const c = timelineScrollRef.current;
    if (!c) return;
    c.scrollTo({
      left: Math.max(0, activeFrame * 58 - c.clientWidth / 2 + 29),
      behavior: "smooth",
    });
  }, [activeFrame]);

  // ── Lưu snapshot frame hiện tại vào session cache ─────────────────────────
  const saveCurrentFrame = useCallback(() => {
    const dataUrl = paintCanvasRef.current?.getFlattenedDataUrl();
    if (!dataUrl) return;
    setFramePaints((prev) => ({ ...prev, [activeFrame]: dataUrl }));
  }, [activeFrame]);

  // ── Chuyển frame ───────────────────────────────────────────────────────────
  // Lưu snapshot frame cũ → restore session cache frame mới (nếu có)
  // KHÔNG restore paintUrl vào canvasRef — PaintCanvas tự load qua props vào bgRef
  const handleFrameChange = useCallback(
    (idx: number) => {
      saveCurrentFrame();
      setActiveFrame(idx);
      setIsPlaying(false);
    },
    [saveCurrentFrame],
  );

  // ── Upload ảnh + ghi DB (khi có blob thật) ────────────────────────────────
  const saveFrame = useCallback(
    async (status: "ai" | "manual") => {
      try {
        if (!projectId) return;
        const frame = uncoloredFiles[activeFrame];
        if (!frame) return;
        const startedRevision = drawRevisionRef.current;

        const blob = (await paintCanvasRef.current?.getPaintOnlyBlob()) ?? null;
        if (!blob) return;

        const coloredUrl = await uploadColoredFrame(blob, projectId, frame.id);
        const freshPaintUrl = `${coloredUrl}?t=${Date.now()}`;
        console.log("saving frame row id =", frame.id, "activeFrame =", activeFrame, frame);
        console.log("coloredUrl =", coloredUrl, "status =", status);


        // Ghi cả ảnh lẫn status xuống DB cùng lúc
        await updateFrameColor(frame.id, coloredUrl, status);
        console.log("updateFrameColor done");

        // Cập nhật paintUrl local để PaintCanvas dùng khi reload
        if (drawRevisionRef.current === startedRevision) {
          setUncoloredFiles((prev) =>
            prev.map((item, index) =>
              index === activeFrame ? { ...item, paintUrl: freshPaintUrl } : item,
            ),
          );

          setFramePaints((prev) => {
            const next = { ...prev };
            delete next[activeFrame];
            return next;
          });
        }

        // Xoá session cache vì đã persist lên DB
        setFramePaints((prev) => {
          const next = { ...prev };
          delete next[activeFrame];
          return next;
        });
      } catch (error) {
        console.error("saveFrame error:", error);
      }
    },
    [activeFrame, projectId, uncoloredFiles],
  );

  // Nút Save trên toolbar
  const handleSaveCurrentFrame = useCallback(() => {
    const status = frameStates[activeFrame] === "ai" ? "ai" : "manual";
    return saveFrame(status);
  }, [activeFrame, frameStates, saveFrame]);

  // ── Undo ──────────────────────────────────────────────────────────────────
  const pushUndoSnapshot = useCallback(() => {
    const snap = paintCanvasRef.current?.getFlattenedDataUrl();
    if (!snap) return;
    setUndoStack((prev) => ({
      ...prev,
      [activeFrame]: [...(prev[activeFrame] || []), snap].slice(-30),
    }));
    setRedoStack((prev) => ({ ...prev, [activeFrame]: [] }));
  }, [activeFrame]);

  const handleUndo = useCallback(() => {
    const stack = undoStack[activeFrame] || [];
    if (stack.length === 0) return;
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d")!;
    const currentSnap = cv.toDataURL();

    setRedoStack((prev) => ({
      ...prev,
      [activeFrame]: [...(prev[activeFrame] || []), currentSnap].slice(-30),
    }));
    ctx.clearRect(0, 0, cv.width, cv.height);

    if (stack.length === 1) {
      // Undo hết về plain
      setUndoStack((s) => ({ ...s, [activeFrame]: [] }));
      setFrameStates((prev) => ({
        ...prev,
        [activeFrame]: "plain",
      }));
      const frame = uncoloredFiles[activeFrame];
      if (frame?.id) {
        updateFrameStatus(frame.id, "plain").catch(console.error);
      }
    } else {
      const target = stack[stack.length - 2];
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = target;
      setUndoStack((s) => ({ ...s, [activeFrame]: stack.slice(0, -1) }));
    }
  }, [activeFrame, undoStack, uncoloredFiles]);

  const handleRedo = useCallback(() => {
    const stack = redoStack[activeFrame] || [];
    if (stack.length === 0) return;
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d")!;
    const currentSnap = cv.toDataURL();

    setUndoStack((prev) => ({
      ...prev,
      [activeFrame]: [...(prev[activeFrame] || []), currentSnap].slice(-30),
    }));
    const target = stack[stack.length - 1];
    ctx.clearRect(0, 0, cv.width, cv.height);

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      setFrameStates((prev) => ({
        ...prev,
        [activeFrame]: "manual",
      }));
      const frame = uncoloredFiles[activeFrame];
      if (frame?.id) {
        updateFrameStatus(frame.id, "manual").catch(console.error);
      }
    };
    img.src = target;
    setRedoStack((s) => ({ ...s, [activeFrame]: stack.slice(0, -1) }));
  }, [activeFrame, redoStack, uncoloredFiles]);

  // ── Stroke handler ─────────────────────────────────────────────────────────
  // Gọi mỗi khi user tô xong 1 nét.
  // Đổi tag về "manual" ngay lập tức (kể cả frame đang "ai").
  // Ghi DB debounced 600ms — tránh spam khi tô nhiều nét liên tiếp.
  const handleStroke = useCallback(() => {
    const frame = uncoloredFiles[activeFrame];

    drawRevisionRef.current += 1;

    setFrameStates((prev) => ({
      ...prev,
      [activeFrame]: "manual",
    }));

    saveCurrentFrame();

    if (statusDebounceRef.current) clearTimeout(statusDebounceRef.current);
    if (frame?.id && projectId) {
      statusDebounceRef.current = setTimeout(() => {
        updateFrameStatus(frame.id, "manual").catch(console.error);
      }, 600);
    }
  }, [activeFrame, saveCurrentFrame, uncoloredFiles, projectId]);

  // ── Keyboard shortcuts ─────────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      )
        return;
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "z") { e.preventDefault(); handleUndo(); return; }
        if (e.key === "y" || e.key === "Z") { e.preventDefault(); handleRedo(); return; }
        return;
      }
      switch (e.key.toUpperCase()) {
        case "B": setActiveTool("brush"); break;
        case "P": setActiveTool("pencil"); break;
        case "E": setActiveTool("eraser"); break;
        case "I": setActiveTool("picker"); break;
        case "F": setActiveTool("fill"); break;
        case "G": setActiveTool("fill"); break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleUndo, handleRedo]);

  // ── Color helpers ──────────────────────────────────────────────────────────
  const handleColorPicked = (c: string) => {
    setActiveColor(c);
    setRecentColors((prev) => [c, ...prev.filter((x) => x !== c)].slice(0, 10));
  };

  // ── AI color current frame ─────────────────────────────────────────────────
  // Đổi tag về "ai" ngay + ghi DB ngay.
  // Frame đang "manual" → đổi về "ai" (option A: ghi đè hoàn toàn).
  // TODO: Khi có API thật → gọi API → upload ảnh → updateFrameColor(id, url, "ai")
  const handleColorCurrentFrame = useCallback(async () => {
    const frame = uncoloredFiles[activeFrame];
    if (!frame || !projectId) return;

    // Update UI ngay
    setFrameStates((prev) => ({
      ...prev,
      [activeFrame]: "ai",
    }));

    // Ghi DB ngay — không phụ thuộc blob/upload
    try {
      await updateFrameStatus(frame.id, "ai");
    } catch (err) {
      console.error("handleColorCurrentFrame updateFrameStatus error:", err);
    }

    // TODO: khi có API thật:
    // setIsColoring(true);
    // try {
    //   const coloredUrl = await colorSingleFrame(frame.url, referenceImage?.url);
    //   const blob = await fetch(coloredUrl).then(r => r.blob());
    //   const uploadedUrl = await uploadColoredFrame(blob, projectId, frame.id);
    //   await updateFrameColor(frame.id, uploadedUrl, "ai");
    //   setUncoloredFiles(prev => prev.map((f, i) =>
    //     i === activeFrame ? { ...f, paintUrl: uploadedUrl } : f
    //   ));
    // } finally { setIsColoring(false); }
  }, [activeFrame, uncoloredFiles, projectId]);

  // ── AI color tất cả frames ────────────────────────────────────────────────
  // Chỉ tô frames chưa "manual" — giữ nguyên frame user đã tô tay.
  // Ghi DB cho từng frame.
  // TODO: Khi có API thật → loop gọi API + upload từng frame
  const handleAutoColor = useCallback(async () => {
    if (!projectId) return;
    setIsColoring(true);

    try {
      // Lọc frame chưa manual
      const framesToColor = uncoloredFiles
        .map((frame, idx) => ({ frame, idx }))
        .filter(({ idx }) => frameStates[idx] !== "manual");

      // Ghi "ai" xuống DB cho tất cả frame cần tô
      await Promise.all(
        framesToColor.map(({ frame }) => updateFrameStatus(frame.id, "ai")),
      );

      // Cập nhật UI — giữ nguyên "manual", đổi còn lại thành "ai"
      setFrameStates((prev) => {
        const next = { ...prev };

        uncoloredFiles.forEach((_, idx) => {
          if (next[idx] !== "manual") {
            next[idx] = "ai";
          }
        });

        return next;
      });

      // TODO: khi có API thật:
      // for (const { frame, idx } of framesToColor) {
      //   const coloredUrl = await autoColorFrames([frame.url], referenceImage?.url);
      //   const blob = await fetch(coloredUrl[0]).then(r => r.blob());
      //   const uploadedUrl = await uploadColoredFrame(blob, projectId, frame.id);
      //   await updateFrameColor(frame.id, uploadedUrl, "ai");
      //   setUncoloredFiles(prev => prev.map((f, i) =>
      //     i === idx ? { ...f, paintUrl: uploadedUrl } : f
      //   ));
      // }
    } catch (err) {
      console.error("handleAutoColor error:", err);
    } finally {
      setIsColoring(false);
    }
  }, [projectId, uncoloredFiles, frameStates]);

  // ── File import ────────────────────────────────────────────────────────────
  const handleImportUncolored = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length || !projectId) return;

    try {
      const uploadedFrames: ImportedFile[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageUrl = await uploadFrameImage(file, projectId);
        const frame = await createFrame({
          projectId,
          frameIndex: uncoloredFiles.length + i,
          sourceImageUrl: imageUrl,
        });

        uploadedFrames.push({
          id: frame.id,
          name: file.name,
          url: imageUrl,
          paintUrl: null,
        });
      }

      setUncoloredFiles((prev) => [...prev, ...uploadedFrames]);
      setFrameStates((prev) => {
        const next = { ...prev };
        const startIndex = uncoloredFiles.length;

        files.forEach((_, i) => {
          next[startIndex + i] = "plain";
        });

        return next;
      });

      e.target.value = "";
    } catch (error) {
      console.error("handleImportUncolored error:", error);
    }
  };

  const handleCustomColoredUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setReferenceImage({
      id: `custom-${Date.now()}`,
      name: file.name,
      url: URL.createObjectURL(file),
    });

    setShowReferenceModal(false);
    e.target.value = "";
  };

  // ── Reference handlers ─────────────────────────────────────────────────────
  const handleConfirmReference = () => {
    const found = uncoloredFiles.find((f) => f.id === selectedRefId);
    if (found) setReferenceImage(found);
    setShowReferenceModal(false);
  };

  const openReferenceModal = () => {
    setSelectedRefId(referenceImage?.id ?? null);
    setRefModalTab("list");
    setShowReferenceModal(true);
  };

  const handleSetFrameRef = (fi: number) => {
    if (referenceImage) setFrameRefMap((p) => ({ ...p, [fi]: referenceImage }));
    setContextMenu(null);
  };

  const handleSetFrameAsGlobalRef = (fi: number) => {
    const f = uncoloredFiles[fi];
    if (f) {
      setReferenceImage(f);
      setFrameRefMap((p) => ({ ...p, [fi]: f }));
    }
    setContextMenu(null);
  };

  const handleClearFrameRef = (fi: number) => {
    setFrameRefMap((p) => {
      const n = { ...p };
      delete n[fi];
      return n;
    });
    setContextMenu(null);
  };

  const togglePanel = (k: keyof typeof panelOpen) =>
    setPanelOpen((p) => ({ ...p, [k]: !p[k] }));

  // ── Return ─────────────────────────────────────────────────────────────────
  return {
    // Frame
    activeFrame, setActiveFrame,
    isPlaying, setIsPlaying,
    speed, setSpeed,
    showSpeedMenu, setShowSpeedMenu,
    frameStates, setFrameStates,
    uncoloredFiles,
    referenceImage, setReferenceImage,
    frameRefMap,
    contextMenu, setContextMenu,
    undoStack, redoStack,

    // Tool
    activeTool, setActiveTool,
    activeColor, setActiveColor,
    secondaryColor, setSecondaryColor,
    recentColors, setRecentColors,
    brushSize, setBrushSize,
    opacity, setOpacity,
    hardness, setHardness,
    blendMode, setBlendMode,
    flow, setFlow,
    spacing, setSpacing,
    fillTolerance, setFillTolerance,
    gapClose, setGapClose,
    lockLineArt, setLockLineArt,

    // Panel
    panelOpen, togglePanel,

    // AI
    isColoring,
    improveEdge, setImproveEdge,
    preserveLines, setPreserveLines,
    skinTone, setSkinTone,
    brightness, setBrightness,
    contrastVal, setContrastVal,
    saturation, setSaturation,
    blur, setBlur,
    spill, setSpill,
    tones, setTones,

    // Modal
    showReferenceModal, setShowReferenceModal,
    refModalTab, setRefModalTab,
    selectedRefId, setSelectedRefId,

    // Refs
    canvasRef,
    paintCanvasRef,
    uncoloredInputRef,
    customColoredInputRef,
    timelineScrollRef,

    // Handlers
    handleSaveCurrentFrame,
    handleFrameChange,
    pushUndoSnapshot,
    handleStroke,
    handleUndo,
    handleRedo,
    handleColorPicked,
    handleAutoColor,
    handleColorCurrentFrame,
    handleImportUncolored,
    handleCustomColoredUpload,
    handleConfirmReference,
    openReferenceModal,
    handleSetFrameRef,
    handleSetFrameAsGlobalRef,
    handleClearFrameRef,
  };
}