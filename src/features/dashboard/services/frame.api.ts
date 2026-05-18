import { supabase } from "@/lib/supabase";

export async function createFrame(data: {
  projectId: string;
  frameIndex: number;
  sourceImageUrl: string;
}) {
  const { data: row, error } = await supabase
    .from("frames")
    .insert({
      project_id: data.projectId,
      frame_index: data.frameIndex,
      source_image_url: data.sourceImageUrl,
      status: "plain", // fix: was "uploaded" — loadFrames chỉ check "manual"/"ai"
    })
    .select()
    .single();

  if (error) throw error;
  return row;
}

export async function loadFrames(projectId: string) {
  const { data, error } = await supabase
    .from("frames")
    .select("*")
    .eq("project_id", projectId)
    .order("frame_index", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

/**
 * Ghi ảnh đã tô + status xuống DB cùng lúc.
 * Dùng khi có blob thật (Save nút, AI trả về ảnh).
 */

export async function updateFrameColor(
  frameId: string,
  coloredImageUrl: string,
  status: "ai" | "manual" | "colored" = "manual",
) {
  const { error } = await supabase
    .from("frames")
    .update({ colored_image_url: coloredImageUrl, status })
    .eq("id", frameId);

  if (error) throw error;
}

/**
 * Chỉ cập nhật status — không cần upload ảnh.
 * Dùng ngay khi user tô tay hoặc nhấn AI color.
 * Đảm bảo tag reload vẫn đúng dù chưa nhấn Save.
 */
export async function updateFrameStatus(
  frameId: string,
  status: "ai" | "manual" | "plain" | "colored",
) {
  const { error } = await supabase
    .from("frames")
    .update({ status })
    .eq("id", frameId);

  if (error) throw error;
}