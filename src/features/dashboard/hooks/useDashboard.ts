// import { useState, useEffect, useRef, useCallback } from "react";
// import type { Tool, BlendMode, FrameState, ImportedFile, ContextMenu } from "../types";
// import { uploadFrameImage } from "../services/storage.api";
// import { createFrame } from "../services/frame.api";
// import { useParams } from "react-router";
// import { loadFrames } from "../services/frame.api";
// import {
//   uploadColoredFrame,
// } from "../services/storage.api";

// import {
//   updateFrameColor,
// } from "../services/frame.api";
// export function useDashboard() {
//   const { projectId } = useParams();
//   const [activeFrame, setActiveFrame] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [speed, setSpeed] = useState("1x");
//   const [showSpeedMenu, setShowSpeedMenu] = useState(false);
//   const [frameStates, setFrameStates] = useState<FrameState[]>([]);
//   const [uncoloredFiles, setUncoloredFiles] = useState<ImportedFile[]>([]);
//   useEffect(() => {
//   if (!projectId) {
//     return;
//   }

//   const init = async () => {
//     try {
//       const frames = await loadFrames(
//         projectId,
//       );

//       setUncoloredFiles(
//         frames.map((frame) => ({
//           id: frame.id,
//           name: `Frame ${frame.frame_index + 1}`,
//           url: frame.source_image_url,
//           paintUrl: frame.colored_image_url
//         })),
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   init();
// }, [projectId]);
//   const [referenceImage, setReferenceImage] = useState<ImportedFile | null>(null);
//   const [frameRefMap, setFrameRefMap] = useState<Record<number, ImportedFile>>({});
//   const [contextMenu, setContextMenu] = useState<ContextMenu>(null);
//   const [framePaints, setFramePaints] = useState<Record<number, string>>({});
//   const [undoStack, setUndoStack] = useState<Record<number, string[]>>({});
//   const [redoStack, setRedoStack] = useState<Record<number, string[]>>({});

//   // Tools
//   const [activeTool, setActiveTool] = useState<Tool>("brush");
//   const [activeColor, setActiveColor] = useState("#FF6B9D");
//   const [secondaryColor, setSecondaryColor] = useState("#FFFFFF");
//   const [recentColors, setRecentColors] = useState<string[]>([]);
//   const [brushSize, setBrushSize] = useState(20);
//   const [opacity, setOpacity] = useState(85);
//   const [hardness, setHardness] = useState(70);
//   const [blendMode, setBlendMode] = useState<BlendMode>("source-over");
//   const [flow, setFlow] = useState(100);
//   const [spacing, setSpacing] = useState(10);
//   const [fillTolerance, setFillTolerance] = useState(35);
//   const [gapClose, setGapClose] = useState(true);
//   const [lockLineArt, setLockLineArt] = useState(false);

//   // Panels
//   const [panelOpen, setPanelOpen] = useState({
//     tools: true,
//     color: true,
//     brush: true,
//     adjust: false,
//   });

//   // AI
//   const [isColoring, setIsColoring] = useState(false);
//   const [improveEdge, setImproveEdge] = useState(true);
//   const [preserveLines, setPreserveLines] = useState(true);
//   const [skinTone, setSkinTone] = useState(true);
//   const [brightness, setBrightness] = useState(50);
//   const [contrastVal, setContrastVal] = useState(50);
//   const [saturation, setSaturation] = useState(60);
//   const [blur, setBlur] = useState(20);
//   const [spill, setSpill] = useState(30);
//   const [tones, setTones] = useState(45);

//   // Modal
//   const [showReferenceModal, setShowReferenceModal] = useState(false);
//   const [refModalTab, setRefModalTab] = useState<"list" | "upload">("list");
//   const [selectedRefId, setSelectedRefId] = useState<string | null>(null);

//   // Refs
//   const playRef = useRef<ReturnType<typeof setInterval> | null>(null);
//   const uncoloredInputRef = useRef<HTMLInputElement>(null);
//   const customColoredInputRef = useRef<HTMLInputElement>(null);
//   const timelineScrollRef = useRef<HTMLDivElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   // ── Playback ───────────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (isPlaying && uncoloredFiles.length > 0) {
//       const ms =
//         speed === "0.25x" ? 800 : speed === "0.5x" ? 400 : speed === "2x" ? 100 : 200;
//       playRef.current = setInterval(
//         () => setActiveFrame((f) => (f + 1) % uncoloredFiles.length),
//         ms
//       );
//     } else if (playRef.current) clearInterval(playRef.current);
//     return () => {
//       if (playRef.current) clearInterval(playRef.current);
//     };
//   }, [isPlaying, speed, uncoloredFiles.length]);

//   // ── Timeline auto-scroll ───────────────────────────────────────────────────
//   useEffect(() => {
//     const c = timelineScrollRef.current;
//     if (!c) return;
//     c.scrollTo({
//       left: Math.max(0, activeFrame * 58 - c.clientWidth / 2 + 29),
//       behavior: "smooth",
//     });
//   }, [activeFrame]);

//   // ── Frame save/restore ─────────────────────────────────────────────────────
//   const saveCurrentFrame = useCallback(() => {
//     const cv = canvasRef.current;
//     if (!cv) return;
//     setFramePaints((prev) => ({ ...prev, [activeFrame]: cv.toDataURL() }));
//   }, [activeFrame]);

//   const handleFrameChange = (idx: number) => {
//   saveCurrentFrame();

//   setActiveFrame(idx);

//   setIsPlaying(false);

//   setTimeout(() => {
//     const cv = canvasRef.current;

//     if (!cv) {
//       return;
//     }

//     const ctx = cv.getContext("2d")!;

//     ctx.clearRect(
//       0,
//       0,
//       cv.width,
//       cv.height,
//     );

//     const saved =
//       uncoloredFiles[idx]?.paintUrl
//       || framePaints[idx];

//     if (saved) {
//       const img = new Image();

//       img.onload = () => {
//         ctx.clearRect(
//           0,
//           0,
//           cv.width,
//           cv.height,
//         );

//         ctx.drawImage(
//           img,
//           0,
//           0,
//         );
//       };

//       img.src = saved;
//     }
//   }, 50);
// };

//   // ── Undo / Redo ────────────────────────────────────────────────────────────
//   const pushUndoSnapshot = useCallback(() => {
//     const cv = canvasRef.current;
//     if (!cv) return;
//     const snap = cv.toDataURL();
//     setUndoStack((prev) => ({
//       ...prev,
//       [activeFrame]: [...(prev[activeFrame] || []), snap].slice(-30),
//     }));
//     setRedoStack((prev) => ({ ...prev, [activeFrame]: [] }));
//   }, [activeFrame]);

//   const handleStroke = useCallback(() => {
//   setFrameStates((prev) => {
//     const next = [...prev];
//     next[activeFrame] = "manual";
//     return next;
//   });

//   const handleSaveCurrentFrame = useCallback(async () => {
//   try {
//     const canvas = canvasRef.current;

//     if (!canvas || !projectId) {
//       return;
//     }

//     const frame = uncoloredFiles[activeFrame];

//     if (!frame) {
//       return;
//     }

//     const blob = await new Promise<Blob | null>((resolve) => {
//       canvas.toBlob(resolve, "image/png");
//     });

//     if (!blob) {
//       return;
//     }

//     const coloredUrl = await uploadColoredFrame(
//       blob,
//       projectId,
//       frame.id,
//     );

//     await updateFrameColor(
//       frame.id,
//       coloredUrl,
//     );

//     setUncoloredFiles((prev) =>
//       prev.map((item, index) =>
//         index === activeFrame
//           ? {
//               ...item,
//               paintUrl: coloredUrl,
//             }
//           : item,
//       ),
//     );
//   } catch (error) {
//     console.error("SAVE FRAME ERROR:", error);
//   }
// }, [
//   activeFrame,
//   projectId,
//   uncoloredFiles,
// ]);

//   saveCurrentFrame();
// }, [activeFrame, saveCurrentFrame]);

//   const handleUndo = useCallback(() => {
//     const stack = undoStack[activeFrame] || [];
//     if (stack.length === 0) return;
//     const cv = canvasRef.current;
//     if (!cv) return;
//     const ctx = cv.getContext("2d")!;
//     const currentSnap = cv.toDataURL();
//     setRedoStack((prev) => ({
//       ...prev,
//       [activeFrame]: [...(prev[activeFrame] || []), currentSnap].slice(-30),
//     }));
//     ctx.clearRect(0, 0, cv.width, cv.height);
//     if (stack.length === 1) {
//       setUndoStack((s) => ({ ...s, [activeFrame]: [] }));
//       setFrameStates((prev) => {
//         const n = [...prev];
//         n[activeFrame] = "plain";
//         return n;
//       });
//     } else {
//       const target = stack[stack.length - 2];
//       const img = new Image();
//       img.onload = () => ctx.drawImage(img, 0, 0);
//       img.src = target;
//       setUndoStack((s) => ({ ...s, [activeFrame]: stack.slice(0, -1) }));
//     }
//   }, [activeFrame, undoStack]);

//   const handleRedo = useCallback(() => {
//     const stack = redoStack[activeFrame] || [];
//     if (stack.length === 0) return;
//     const cv = canvasRef.current;
//     if (!cv) return;
//     const ctx = cv.getContext("2d")!;
//     const currentSnap = cv.toDataURL();
//     setUndoStack((prev) => ({
//       ...prev,
//       [activeFrame]: [...(prev[activeFrame] || []), currentSnap].slice(-30),
//     }));
//     const target = stack[stack.length - 1];
//     ctx.clearRect(0, 0, cv.width, cv.height);
//     const img = new Image();
//     img.onload = () => {
//       ctx.drawImage(img, 0, 0);
//       setFrameStates((prev) => {
//         const n = [...prev];
//         n[activeFrame] = "manual";
//         return n;
//       });
//     };
//     img.src = target;
//     setRedoStack((s) => ({ ...s, [activeFrame]: stack.slice(0, -1) }));
//   }, [activeFrame, redoStack]);

//   // ── Keyboard shortcuts ─────────────────────────────────────────────────────
//   useEffect(() => {
//     const handleKey = (e: KeyboardEvent) => {
//       if (
//         e.target instanceof HTMLInputElement ||
//         e.target instanceof HTMLTextAreaElement ||
//         e.target instanceof HTMLSelectElement
//       )
//         return;
//       if (e.ctrlKey || e.metaKey) {
//         if (e.key === "z") { e.preventDefault(); handleUndo(); return; }
//         if (e.key === "y" || e.key === "Z") { e.preventDefault(); handleRedo(); return; }
//         return;
//       }
//       switch (e.key.toUpperCase()) {
//         case "B": setActiveTool("brush"); break;
//         case "P": setActiveTool("pencil"); break;
//         case "E": setActiveTool("eraser"); break;
//         case "I": setActiveTool("picker"); break;
//         case "F": setActiveTool("fill"); break;
//         case "G": setActiveTool("fill"); break;
//       }
//     };
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [handleUndo, handleRedo]);

//   // ── Color helpers ──────────────────────────────────────────────────────────
//   const handleColorPicked = (c: string) => {
//     setActiveColor(c);
//     setRecentColors((prev) => [c, ...prev.filter((x) => x !== c)].slice(0, 10));
//   };

//   // ── AI handlers ────────────────────────────────────────────────────────────
//   const handleAutoColor = () => {
//     setIsColoring(true);
//     setTimeout(() => {
//       setFrameStates(Array(uncoloredFiles.length).fill("ai" as FrameState));
//       setIsColoring(false);
//     }, 1800);
//   };

//   const handleColorCurrentFrame = () =>
//     setFrameStates((prev) => {
//       const n = [...prev];
//       n[activeFrame] = "ai";
//       return n;
//     });

//   // ── File import ────────────────────────────────────────────────────────────
// const handleImportUncolored = async (
//   e: React.ChangeEvent<HTMLInputElement>,
// ) => {
//   const files = Array.from(e.target.files || []);

//   if (!files.length || !projectId) {
//     return;
//   }

//   try {
//     const uploadedFrames = [];

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];

//       // Upload image to Supabase Storage
//       const imageUrl = await uploadFrameImage(
//         file,
//         projectId,
//       );

//       // Insert frame row into DB
//       const frame = await createFrame({
//           projectId,
//           frameIndex:
//             uncoloredFiles.length + i,
//           sourceImageUrl: imageUrl,
//         });

//       // Local UI update
//       uploadedFrames.push({
//         id: frame.id,
//         name: file.name,
//         url: imageUrl,
//       });
//     }

//     setUncoloredFiles((prev) => [
//       ...prev,
//       ...uploadedFrames,
//     ]);

//     setFrameStates((prev) => [
//       ...prev,
//       ...files.map(
//         () => "plain" as FrameState,
//       ),
//     ]);

//     e.target.value = "";
//   } catch (error) {
//     console.error(error);
//   }
// };
// const handleCustomColoredUpload = (
//   e: React.ChangeEvent<HTMLInputElement>,
// ) => {
//   const file = e.target.files?.[0];

//   if (!file) return;

//   setReferenceImage({
//     id: `custom-${Date.now()}`,
//     name: file.name,
//     url: URL.createObjectURL(file),
//   });

//   setShowReferenceModal(false);

//   e.target.value = "";
// };

//   // ── Reference handlers ─────────────────────────────────────────────────────
//   const handleConfirmReference = () => {
//     const found = uncoloredFiles.find((f) => f.id === selectedRefId);
//     if (found) setReferenceImage(found);
//     setShowReferenceModal(false);
//   };

//   const openReferenceModal = () => {
//     setSelectedRefId(referenceImage?.id ?? null);
//     setRefModalTab("list");
//     setShowReferenceModal(true);
//   };

//   const handleSetFrameRef = (fi: number) => {
//     if (referenceImage) setFrameRefMap((p) => ({ ...p, [fi]: referenceImage }));
//     setContextMenu(null);
//   };

//   const handleSetFrameAsGlobalRef = (fi: number) => {
//     const f = uncoloredFiles[fi];
//     if (f) {
//       setReferenceImage(f);
//       setFrameRefMap((p) => ({ ...p, [fi]: f }));
//     }
//     setContextMenu(null);
//   };

//   const handleClearFrameRef = (fi: number) => {
//     setFrameRefMap((p) => {
//       const n = { ...p };
//       delete n[fi];
//       return n;
//     });
//     setContextMenu(null);
//   };

//   const togglePanel = (k: keyof typeof panelOpen) =>
//     setPanelOpen((p) => ({ ...p, [k]: !p[k] }));

//   return {
//     // Frame state
//     activeFrame, setActiveFrame,
//     isPlaying, setIsPlaying,
//     speed, setSpeed,
//     showSpeedMenu, setShowSpeedMenu,
//     frameStates, setFrameStates,
//     uncoloredFiles,
//     referenceImage, setReferenceImage,
//     frameRefMap,
//     contextMenu, setContextMenu,
//     undoStack, redoStack,

//     // Tool state
//     activeTool, setActiveTool,
//     activeColor, setActiveColor,
//     secondaryColor, setSecondaryColor,
//     recentColors, setRecentColors,
//     brushSize, setBrushSize,
//     opacity, setOpacity,
//     hardness, setHardness,
//     blendMode, setBlendMode,
//     flow, setFlow,
//     spacing, setSpacing,
//     fillTolerance, setFillTolerance,
//     gapClose, setGapClose,
//     lockLineArt, setLockLineArt,

//     // Panel state
//     panelOpen, togglePanel,

//     // AI state
//     isColoring,
//     improveEdge, setImproveEdge,
//     preserveLines, setPreserveLines,
//     skinTone, setSkinTone,
//     brightness, setBrightness,
//     contrastVal, setContrastVal,
//     saturation, setSaturation,
//     blur, setBlur,
//     spill, setSpill,
//     tones, setTones,

//     // Modal state
//     showReferenceModal, setShowReferenceModal,
//     refModalTab, setRefModalTab,
//     selectedRefId, setSelectedRefId,

//     // Refs
//     canvasRef,
//     uncoloredInputRef,
//     customColoredInputRef,
//     timelineScrollRef,
//     handleSaveCurrentFrame,

//     // Handlers
//     handleFrameChange,
//     pushUndoSnapshot,
//     handleStroke,
//     handleUndo,
//     handleRedo,
//     handleColorPicked,
//     handleAutoColor,
//     handleColorCurrentFrame,
//     handleImportUncolored,
//     handleCustomColoredUpload,
//     handleConfirmReference,
//     openReferenceModal,
//     handleSetFrameRef,
//     handleSetFrameAsGlobalRef,
//     handleClearFrameRef,
//   };
// }

// import { useState, useEffect, useRef, useCallback } from "react";
// import type { Tool, BlendMode, FrameState, ImportedFile, ContextMenu } from "../types";
// import { uploadFrameImage } from "../services/storage.api";
// import { createFrame } from "../services/frame.api";
// import { useParams } from "react-router";
// import { loadFrames } from "../services/frame.api";
// import {
//   uploadColoredFrame,
// } from "../services/storage.api";

// import {
//   updateFrameColor,
// } from "../services/frame.api";
// export function useDashboard() {
//   const { projectId } = useParams();
//   const [activeFrame, setActiveFrame] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [speed, setSpeed] = useState("1x");
//   const [showSpeedMenu, setShowSpeedMenu] = useState(false);
//   const [frameStates, setFrameStates] = useState<FrameState[]>([]);
//   const [uncoloredFiles, setUncoloredFiles] = useState<ImportedFile[]>([]);
//   useEffect(() => {
//   if (!projectId) {
//     return;
//   }

//   const init = async () => {
//     try {
//       const frames = await loadFrames(
//         projectId,
//       );

//       setUncoloredFiles(
//         frames.map((frame) => ({
//           id: frame.id,
//           name: `Frame ${frame.frame_index + 1}`,
//           url: frame.source_image_url,
//           paintUrl: frame.colored_image_url
//         })),
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   init();
// }, [projectId]);
//   const [referenceImage, setReferenceImage] = useState<ImportedFile | null>(null);
//   const [frameRefMap, setFrameRefMap] = useState<Record<number, ImportedFile>>({});
//   const [contextMenu, setContextMenu] = useState<ContextMenu>(null);
//   const [framePaints, setFramePaints] = useState<Record<number, string>>({});
//   const [undoStack, setUndoStack] = useState<Record<number, string[]>>({});
//   const [redoStack, setRedoStack] = useState<Record<number, string[]>>({});

//   // Tools
//   const [activeTool, setActiveTool] = useState<Tool>("brush");
//   const [activeColor, setActiveColor] = useState("#FF6B9D");
//   const [secondaryColor, setSecondaryColor] = useState("#FFFFFF");
//   const [recentColors, setRecentColors] = useState<string[]>([]);
//   const [brushSize, setBrushSize] = useState(20);
//   const [opacity, setOpacity] = useState(85);
//   const [hardness, setHardness] = useState(70);
//   const [blendMode, setBlendMode] = useState<BlendMode>("source-over");
//   const [flow, setFlow] = useState(100);
//   const [spacing, setSpacing] = useState(10);
//   const [fillTolerance, setFillTolerance] = useState(35);
//   const [gapClose, setGapClose] = useState(true);
//   const [lockLineArt, setLockLineArt] = useState(false);

//   // Panels
//   const [panelOpen, setPanelOpen] = useState({
//     tools: true,
//     color: true,
//     brush: true,
//     adjust: false,
//   });

//   // AI
//   const [isColoring, setIsColoring] = useState(false);
//   const [improveEdge, setImproveEdge] = useState(true);
//   const [preserveLines, setPreserveLines] = useState(true);
//   const [skinTone, setSkinTone] = useState(true);
//   const [brightness, setBrightness] = useState(50);
//   const [contrastVal, setContrastVal] = useState(50);
//   const [saturation, setSaturation] = useState(60);
//   const [blur, setBlur] = useState(20);
//   const [spill, setSpill] = useState(30);
//   const [tones, setTones] = useState(45);

//   // Modal
//   const [showReferenceModal, setShowReferenceModal] = useState(false);
//   const [refModalTab, setRefModalTab] = useState<"list" | "upload">("list");
//   const [selectedRefId, setSelectedRefId] = useState<string | null>(null);

//   // Refs
//   const playRef = useRef<ReturnType<typeof setInterval> | null>(null);
//   const uncoloredInputRef = useRef<HTMLInputElement>(null);
//   const customColoredInputRef = useRef<HTMLInputElement>(null);
//   const timelineScrollRef = useRef<HTMLDivElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   // ── Playback ───────────────────────────────────────────────────────────────
//   useEffect(() => {
//     if (isPlaying && uncoloredFiles.length > 0) {
//       const ms =
//         speed === "0.25x" ? 800 : speed === "0.5x" ? 400 : speed === "2x" ? 100 : 200;
//       playRef.current = setInterval(
//         () => setActiveFrame((f) => (f + 1) % uncoloredFiles.length),
//         ms
//       );
//     } else if (playRef.current) clearInterval(playRef.current);
//     return () => {
//       if (playRef.current) clearInterval(playRef.current);
//     };
//   }, [isPlaying, speed, uncoloredFiles.length]);

//   // ── Timeline auto-scroll ───────────────────────────────────────────────────
//   useEffect(() => {
//     const c = timelineScrollRef.current;
//     if (!c) return;
//     c.scrollTo({
//       left: Math.max(0, activeFrame * 58 - c.clientWidth / 2 + 29),
//       behavior: "smooth",
//     });
//   }, [activeFrame]);

//   // ── Frame save/restore ─────────────────────────────────────────────────────
//   const saveCurrentFrame = useCallback(() => {
//     const cv = canvasRef.current;
//     if (!cv) return;
//     setFramePaints((prev) => ({ ...prev, [activeFrame]: cv.toDataURL() }));
//   }, [activeFrame]);

//   const handleFrameChange = (idx: number) => {
//   saveCurrentFrame();

//   setActiveFrame(idx);

//   setIsPlaying(false);

//   setTimeout(() => {
//     const cv = canvasRef.current;

//     if (!cv) {
//       return;
//     }

//     const ctx = cv.getContext("2d")!;

//     ctx.clearRect(
//       0,
//       0,
//       cv.width,
//       cv.height,
//     );

//     const saved =
//       uncoloredFiles[idx]?.paintUrl
//       || framePaints[idx];

//     if (saved) {
//       const img = new Image();

//       img.onload = () => {
//         ctx.clearRect(
//           0,
//           0,
//           cv.width,
//           cv.height,
//         );

//         ctx.drawImage(
//           img,
//           0,
//           0,
//         );
//       };

//       img.src = saved;
//     }
//   }, 50);
// };

//   // ── Undo / Redo ────────────────────────────────────────────────────────────
//   const pushUndoSnapshot = useCallback(() => {
//     const cv = canvasRef.current;
//     if (!cv) return;
//     const snap = cv.toDataURL();
//     setUndoStack((prev) => ({
//       ...prev,
//       [activeFrame]: [...(prev[activeFrame] || []), snap].slice(-30),
//     }));
//     setRedoStack((prev) => ({ ...prev, [activeFrame]: [] }));
//   }, [activeFrame]);

//   const handleStroke = useCallback(() => {
//   setFrameStates((prev) => {
//     const next = [...prev];
//     next[activeFrame] = "manual";
//     return next;
//   });

//   const handleSaveCurrentFrame = useCallback(async () => {
//   try {
//     const canvas = canvasRef.current;

//     if (!canvas || !projectId) {
//       return;
//     }

//     const frame = uncoloredFiles[activeFrame];

//     if (!frame) {
//       return;
//     }

//     const blob = await new Promise<Blob | null>((resolve) => {
//       canvas.toBlob(resolve, "image/png");
//     });

//     if (!blob) {
//       return;
//     }

//     const coloredUrl = await uploadColoredFrame(
//       blob,
//       projectId,
//       frame.id,
//     );

//     await updateFrameColor(
//       frame.id,
//       coloredUrl,
//     );

//     setUncoloredFiles((prev) =>
//       prev.map((item, index) =>
//         index === activeFrame
//           ? {
//               ...item,
//               paintUrl: coloredUrl,
//             }
//           : item,
//       ),
//     );
//   } catch (error) {
//     console.error("SAVE FRAME ERROR:", error);
//   }
// }, [
//   activeFrame,
//   projectId,
//   uncoloredFiles,
// ]);

//   saveCurrentFrame();
// }, [activeFrame, saveCurrentFrame]);

//   const handleUndo = useCallback(() => {
//     const stack = undoStack[activeFrame] || [];
//     if (stack.length === 0) return;
//     const cv = canvasRef.current;
//     if (!cv) return;
//     const ctx = cv.getContext("2d")!;
//     const currentSnap = cv.toDataURL();
//     setRedoStack((prev) => ({
//       ...prev,
//       [activeFrame]: [...(prev[activeFrame] || []), currentSnap].slice(-30),
//     }));
//     ctx.clearRect(0, 0, cv.width, cv.height);
//     if (stack.length === 1) {
//       setUndoStack((s) => ({ ...s, [activeFrame]: [] }));
//       setFrameStates((prev) => {
//         const n = [...prev];
//         n[activeFrame] = "plain";
//         return n;
//       });
//     } else {
//       const target = stack[stack.length - 2];
//       const img = new Image();
//       img.onload = () => ctx.drawImage(img, 0, 0);
//       img.src = target;
//       setUndoStack((s) => ({ ...s, [activeFrame]: stack.slice(0, -1) }));
//     }
//   }, [activeFrame, undoStack]);

//   const handleRedo = useCallback(() => {
//     const stack = redoStack[activeFrame] || [];
//     if (stack.length === 0) return;
//     const cv = canvasRef.current;
//     if (!cv) return;
//     const ctx = cv.getContext("2d")!;
//     const currentSnap = cv.toDataURL();
//     setUndoStack((prev) => ({
//       ...prev,
//       [activeFrame]: [...(prev[activeFrame] || []), currentSnap].slice(-30),
//     }));
//     const target = stack[stack.length - 1];
//     ctx.clearRect(0, 0, cv.width, cv.height);
//     const img = new Image();
//     img.onload = () => {
//       ctx.drawImage(img, 0, 0);
//       setFrameStates((prev) => {
//         const n = [...prev];
//         n[activeFrame] = "manual";
//         return n;
//       });
//     };
//     img.src = target;
//     setRedoStack((s) => ({ ...s, [activeFrame]: stack.slice(0, -1) }));
//   }, [activeFrame, redoStack]);

//   // ── Keyboard shortcuts ─────────────────────────────────────────────────────
//   useEffect(() => {
//     const handleKey = (e: KeyboardEvent) => {
//       if (
//         e.target instanceof HTMLInputElement ||
//         e.target instanceof HTMLTextAreaElement ||
//         e.target instanceof HTMLSelectElement
//       )
//         return;
//       if (e.ctrlKey || e.metaKey) {
//         if (e.key === "z") { e.preventDefault(); handleUndo(); return; }
//         if (e.key === "y" || e.key === "Z") { e.preventDefault(); handleRedo(); return; }
//         return;
//       }
//       switch (e.key.toUpperCase()) {
//         case "B": setActiveTool("brush"); break;
//         case "P": setActiveTool("pencil"); break;
//         case "E": setActiveTool("eraser"); break;
//         case "I": setActiveTool("picker"); break;
//         case "F": setActiveTool("fill"); break;
//         case "G": setActiveTool("fill"); break;
//       }
//     };
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [handleUndo, handleRedo]);

//   // ── Color helpers ──────────────────────────────────────────────────────────
//   const handleColorPicked = (c: string) => {
//     setActiveColor(c);
//     setRecentColors((prev) => [c, ...prev.filter((x) => x !== c)].slice(0, 10));
//   };

//   // ── AI handlers ────────────────────────────────────────────────────────────
//   const handleAutoColor = () => {
//     setIsColoring(true);
//     setTimeout(() => {
//       setFrameStates(Array(uncoloredFiles.length).fill("ai" as FrameState));
//       setIsColoring(false);
//     }, 1800);
//   };

//   const handleColorCurrentFrame = () =>
//     setFrameStates((prev) => {
//       const n = [...prev];
//       n[activeFrame] = "ai";
//       return n;
//     });

//   // ── File import ────────────────────────────────────────────────────────────
// const handleImportUncolored = async (
//   e: React.ChangeEvent<HTMLInputElement>,
// ) => {
//   const files = Array.from(e.target.files || []);

//   if (!files.length || !projectId) {
//     return;
//   }

//   try {
//     const uploadedFrames = [];

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];

//       // Upload image to Supabase Storage
//       const imageUrl = await uploadFrameImage(
//         file,
//         projectId,
//       );

//       // Insert frame row into DB
//       const frame = await createFrame({
//           projectId,
//           frameIndex:
//             uncoloredFiles.length + i,
//           sourceImageUrl: imageUrl,
//         });

//       // Local UI update
//       uploadedFrames.push({
//         id: frame.id,
//         name: file.name,
//         url: imageUrl,
//       });
//     }

//     setUncoloredFiles((prev) => [
//       ...prev,
//       ...uploadedFrames,
//     ]);

//     setFrameStates((prev) => [
//       ...prev,
//       ...files.map(
//         () => "plain" as FrameState,
//       ),
//     ]);

//     e.target.value = "";
//   } catch (error) {
//     console.error(error);
//   }
// };
// const handleCustomColoredUpload = (
//   e: React.ChangeEvent<HTMLInputElement>,
// ) => {
//   const file = e.target.files?.[0];

//   if (!file) return;

//   setReferenceImage({
//     id: `custom-${Date.now()}`,
//     name: file.name,
//     url: URL.createObjectURL(file),
//   });

//   setShowReferenceModal(false);

//   e.target.value = "";
// };

//   // ── Reference handlers ─────────────────────────────────────────────────────
//   const handleConfirmReference = () => {
//     const found = uncoloredFiles.find((f) => f.id === selectedRefId);
//     if (found) setReferenceImage(found);
//     setShowReferenceModal(false);
//   };

//   const openReferenceModal = () => {
//     setSelectedRefId(referenceImage?.id ?? null);
//     setRefModalTab("list");
//     setShowReferenceModal(true);
//   };

//   const handleSetFrameRef = (fi: number) => {
//     if (referenceImage) setFrameRefMap((p) => ({ ...p, [fi]: referenceImage }));
//     setContextMenu(null);
//   };

//   const handleSetFrameAsGlobalRef = (fi: number) => {
//     const f = uncoloredFiles[fi];
//     if (f) {
//       setReferenceImage(f);
//       setFrameRefMap((p) => ({ ...p, [fi]: f }));
//     }
//     setContextMenu(null);
//   };

//   const handleClearFrameRef = (fi: number) => {
//     setFrameRefMap((p) => {
//       const n = { ...p };
//       delete n[fi];
//       return n;
//     });
//     setContextMenu(null);
//   };

//   const togglePanel = (k: keyof typeof panelOpen) =>
//     setPanelOpen((p) => ({ ...p, [k]: !p[k] }));

//   return {
//     // Frame state
//     activeFrame, setActiveFrame,
//     isPlaying, setIsPlaying,
//     speed, setSpeed,
//     showSpeedMenu, setShowSpeedMenu,
//     frameStates, setFrameStates,
//     uncoloredFiles,
//     referenceImage, setReferenceImage,
//     frameRefMap,
//     contextMenu, setContextMenu,
//     undoStack, redoStack,

//     // Tool state
//     activeTool, setActiveTool,
//     activeColor, setActiveColor,
//     secondaryColor, setSecondaryColor,
//     recentColors, setRecentColors,
//     brushSize, setBrushSize,
//     opacity, setOpacity,
//     hardness, setHardness,
//     blendMode, setBlendMode,
//     flow, setFlow,
//     spacing, setSpacing,
//     fillTolerance, setFillTolerance,
//     gapClose, setGapClose,
//     lockLineArt, setLockLineArt,

//     // Panel state
//     panelOpen, togglePanel,

//     // AI state
//     isColoring,
//     improveEdge, setImproveEdge,
//     preserveLines, setPreserveLines,
//     skinTone, setSkinTone,
//     brightness, setBrightness,
//     contrastVal, setContrastVal,
//     saturation, setSaturation,
//     blur, setBlur,
//     spill, setSpill,
//     tones, setTones,

//     // Modal state
//     showReferenceModal, setShowReferenceModal,
//     refModalTab, setRefModalTab,
//     selectedRefId, setSelectedRefId,

//     // Refs
//     canvasRef,
//     uncoloredInputRef,
//     customColoredInputRef,
//     timelineScrollRef,
//     handleSaveCurrentFrame,

//     // Handlers
//     handleFrameChange,
//     pushUndoSnapshot,
//     handleStroke,
//     handleUndo,
//     handleRedo,
//     handleColorPicked,
//     handleAutoColor,
//     handleColorCurrentFrame,
//     handleImportUncolored,
//     handleCustomColoredUpload,
//     handleConfirmReference,
//     openReferenceModal,
//     handleSetFrameRef,
//     handleSetFrameAsGlobalRef,
//     handleClearFrameRef,
//   };
// }

import { useState, useEffect, useRef, useCallback } from "react";
import type { Tool, BlendMode, FrameState, ImportedFile, ContextMenu } from "../types";
import type { PaintCanvasHandle } from "../components/PaintCanvas";
import { uploadFrameImage } from "../services/storage.api";
import { createFrame } from "../services/frame.api";
import { useParams } from "react-router";
import { loadFrames } from "../services/frame.api";
import {
  uploadColoredFrame,
} from "../services/storage.api";

import {
  updateFrameColor,
} from "../services/frame.api";
export function useDashboard() {
  const { projectId } = useParams();
  const [activeFrame, setActiveFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState("1x");
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [frameStates, setFrameStates] = useState<FrameState[]>([]);
  const [uncoloredFiles, setUncoloredFiles] = useState<ImportedFile[]>([]);
  useEffect(() => {
  if (!projectId) {
    return;
  }

  const init = async () => {
    try {
      const frames = await loadFrames(
        projectId,
      );

      setUncoloredFiles(
        frames.map((frame) => ({
          id: frame.id,
          name: `Frame ${frame.frame_index + 1}`,
          url: frame.source_image_url,
          paintUrl: frame.colored_image_url
        })),
      );
    } catch (error) {
      console.error(error);
    }
  };

  init();
}, [projectId]);
  const [referenceImage, setReferenceImage] = useState<ImportedFile | null>(null);
  const [frameRefMap, setFrameRefMap] = useState<Record<number, ImportedFile>>({});
  const [contextMenu, setContextMenu] = useState<ContextMenu>(null);
  const [framePaints, setFramePaints] = useState<Record<number, string>>({});
  const [undoStack, setUndoStack] = useState<Record<number, string[]>>({});
  const [redoStack, setRedoStack] = useState<Record<number, string[]>>({});

  // Tools
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

  // Panels
  const [panelOpen, setPanelOpen] = useState({
    tools: true,
    color: true,
    brush: true,
    adjust: false,
  });

  // AI
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

  // Modal
  const [showReferenceModal, setShowReferenceModal] = useState(false);
  const [refModalTab, setRefModalTab] = useState<"list" | "upload">("list");
  const [selectedRefId, setSelectedRefId] = useState<string | null>(null);

  // Refs
  const playRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const uncoloredInputRef = useRef<HTMLInputElement>(null);
  const customColoredInputRef = useRef<HTMLInputElement>(null);
  const timelineScrollRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Ref to PaintCanvas imperative handle — gives access to merged (flattened) canvas
  const paintCanvasRef = useRef<PaintCanvasHandle>(null);

  // ── Playback ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isPlaying && uncoloredFiles.length > 0) {
      const ms =
        speed === "0.25x" ? 800 : speed === "0.5x" ? 400 : speed === "2x" ? 100 : 200;
      playRef.current = setInterval(
        () => setActiveFrame((f) => (f + 1) % uncoloredFiles.length),
        ms
      );
    } else if (playRef.current) clearInterval(playRef.current);
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

  // ── Frame save/restore ─────────────────────────────────────────────────────
  const saveCurrentFrame = useCallback(() => {
    // Use merged layers (colorRef + bgRef + canvasRef) so lockLineArt data is captured
    const dataUrl = paintCanvasRef.current?.getFlattenedDataUrl();
    if (!dataUrl) return;
    setFramePaints((prev) => ({ ...prev, [activeFrame]: dataUrl }));
  }, [activeFrame]);

  const handleFrameChange = (idx: number) => {
  saveCurrentFrame();

  setActiveFrame(idx);

  setIsPlaying(false);

  setTimeout(() => {
    const cv = canvasRef.current;

    if (!cv) {
      return;
    }

    const ctx = cv.getContext("2d")!;

    ctx.clearRect(
      0,
      0,
      cv.width,
      cv.height,
    );

    const saved =
      uncoloredFiles[idx]?.paintUrl
      || framePaints[idx];

    if (saved) {
      const img = new Image();

      img.onload = () => {
        ctx.clearRect(
          0,
          0,
          cv.width,
          cv.height,
        );

        ctx.drawImage(
          img,
          0,
          0,
        );
      };

      img.src = saved;
    }
  }, 50);
};

  // ── Undo / Redo ────────────────────────────────────────────────────────────
  const pushUndoSnapshot = useCallback(() => {
    const snap = paintCanvasRef.current?.getFlattenedDataUrl();
    if (!snap) return;
    setUndoStack((prev) => ({
      ...prev,
      [activeFrame]: [...(prev[activeFrame] || []), snap].slice(-30),
    }));
    setRedoStack((prev) => ({ ...prev, [activeFrame]: [] }));
  }, [activeFrame]);

  const handleStroke = useCallback(() => {
    setFrameStates((prev) => {
      const next = [...prev];
      next[activeFrame] = "manual";
      return next;
    });
    saveCurrentFrame();
  }, [activeFrame, saveCurrentFrame]);

  const handleSaveCurrentFrame = useCallback(async () => {
    try {
      if (!projectId) return;

      const frame = uncoloredFiles[activeFrame];
      if (!frame) return;

      // Merge all layers (colorRef + bgRef + canvasRef) before uploading
      const blob = await paintCanvasRef.current?.getFlattenedBlob() ?? null;
      if (!blob) return;

      const coloredUrl = await uploadColoredFrame(blob, projectId, frame.id);

      await updateFrameColor(frame.id, coloredUrl);

      setUncoloredFiles((prev) =>
        prev.map((item, index) =>
          index === activeFrame ? { ...item, paintUrl: coloredUrl } : item,
        ),
      );
    } catch (error) {
      console.error("SAVE FRAME ERROR:", error);
    }
  }, [activeFrame, projectId, uncoloredFiles]);

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
      setUndoStack((s) => ({ ...s, [activeFrame]: [] }));
      setFrameStates((prev) => {
        const n = [...prev];
        n[activeFrame] = "plain";
        return n;
      });
    } else {
      const target = stack[stack.length - 2];
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = target;
      setUndoStack((s) => ({ ...s, [activeFrame]: stack.slice(0, -1) }));
    }
  }, [activeFrame, undoStack]);

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
      setFrameStates((prev) => {
        const n = [...prev];
        n[activeFrame] = "manual";
        return n;
      });
    };
    img.src = target;
    setRedoStack((s) => ({ ...s, [activeFrame]: stack.slice(0, -1) }));
  }, [activeFrame, redoStack]);

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

  // ── AI handlers ────────────────────────────────────────────────────────────
  const handleAutoColor = () => {
    setIsColoring(true);
    setTimeout(() => {
      setFrameStates(Array(uncoloredFiles.length).fill("ai" as FrameState));
      setIsColoring(false);
    }, 1800);
  };

  const handleColorCurrentFrame = () =>
    setFrameStates((prev) => {
      const n = [...prev];
      n[activeFrame] = "ai";
      return n;
    });

  // ── File import ────────────────────────────────────────────────────────────
const handleImportUncolored = async (
  e: React.ChangeEvent<HTMLInputElement>,
) => {
  const files = Array.from(e.target.files || []);

  if (!files.length || !projectId) {
    return;
  }

  try {
    const uploadedFrames = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Upload image to Supabase Storage
      const imageUrl = await uploadFrameImage(
        file,
        projectId,
      );

      // Insert frame row into DB
      const frame = await createFrame({
          projectId,
          frameIndex:
            uncoloredFiles.length + i,
          sourceImageUrl: imageUrl,
        });

      // Local UI update
      uploadedFrames.push({
        id: frame.id,
        name: file.name,
        url: imageUrl,
      });
    }

    setUncoloredFiles((prev) => [
      ...prev,
      ...uploadedFrames,
    ]);

    setFrameStates((prev) => [
      ...prev,
      ...files.map(
        () => "plain" as FrameState,
      ),
    ]);

    e.target.value = "";
  } catch (error) {
    console.error(error);
  }
};
const handleCustomColoredUpload = (
  e: React.ChangeEvent<HTMLInputElement>,
) => {
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

  return {
    // Frame state
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

    // Tool state
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

    // Panel state
    panelOpen, togglePanel,

    // AI state
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

    // Modal state
    showReferenceModal, setShowReferenceModal,
    refModalTab, setRefModalTab,
    selectedRefId, setSelectedRefId,

    // Refs
    canvasRef,
    paintCanvasRef,
    uncoloredInputRef,
    customColoredInputRef,
    timelineScrollRef,
    handleSaveCurrentFrame,

    // Handlers
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