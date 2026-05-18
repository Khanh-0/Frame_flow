import { supabase } from "@/lib/supabase";

export async function uploadFrameImage(file: File, projectId: string) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${projectId}/${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("frames")
    .upload(fileName, file);

  if (error) throw error;

  const { data: publicUrlData } = supabase.storage
    .from("frames")
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}

// Compress PNG blob → JPEG để giảm từ ~6MB xuống ~300-600KB
function compressBlob(blob: Blob, quality = 0.85): Promise<Blob> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d")!.drawImage(img, 0, 0);
      canvas.toBlob(
        (compressed) => {
          URL.revokeObjectURL(url);
          resolve(compressed ?? blob); // fallback nếu compress thất bại
        },
        "image/jpeg",
        quality,
      );
    };
    img.src = url;
  });
}

export async function uploadColoredFrame(
  blob: Blob,
  projectId: string,
  frameId: string,
) {
  // Compress trước khi upload
  const compressed = await compressBlob(blob, 0.85);

  // Path cố định (không có timestamp) để upsert đúng
  const filePath = `${projectId}/${frameId}-${Date.now()}.jpg`;

  console.log("Uploading colored frame:", {
    originalSize: blob.size,
    compressedSize: compressed.size,
    filePath,
  });

  const { error } = await supabase.storage
    .from("colored-frames")
    .upload(filePath, compressed, {
      upsert: true,
      contentType: "image/jpeg",
    });

  if (error) {
    console.error("UPLOAD COLORED FRAME ERROR:", error);
    throw error;
  }

  const { data } = supabase.storage
    .from("colored-frames")
    .getPublicUrl(filePath);

  return data.publicUrl;
}