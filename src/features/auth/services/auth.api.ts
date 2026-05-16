// src/features/auth/services/auth.api.ts
//
// Service layer: wrap toàn bộ Supabase Auth SDK.
// Component và Hook KHÔNG gọi Supabase trực tiếp — chỉ qua file này.
// Sau này đổi backend chỉ cần sửa file này, UI không đổi.

import { createClient } from "@supabase/supabase-js";
import type { AuthResult, AuthUser, SignInCredentials, SignUpCredentials } from "../types";

// ─── Supabase client ───────────────────────────────────────────────────────────
// Đọc từ .env:
//   VITE_SUPABASE_URL=...
//   VITE_SUPABASE_ANON_KEY=...
const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL  as string;
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Map Supabase user object → AuthUser (internal shape) */
function mapUser(raw: import("@supabase/supabase-js").User): AuthUser {
  return {
    id:             raw.id,
    email:          raw.email,
    emailConfirmed: !!raw.email_confirmed_at,
    createdAt:      raw.created_at,
  };
}

// ─── Auth API ─────────────────────────────────────────────────────────────────

/** Đăng nhập bằng email + password */
export async function signIn(credentials: SignInCredentials): Promise<AuthResult> {
  const { error } = await supabase.auth.signInWithPassword({
    email:    credentials.email,
    password: credentials.password,
  });

  if (error) return { success: false, error: error.message };
  return { success: true };
}

/** Đăng ký tài khoản mới */
export async function signUp(credentials: SignUpCredentials): Promise<AuthResult> {
  const { error } = await supabase.auth.signUp({
    email:    credentials.email,
    password: credentials.password,
    options: {
      data: { full_name: credentials.fullName ?? "" },
    },
  });

  if (error) return { success: false, error: error.message };

  // Supabase gửi verification email — user cần xác nhận trước khi login
  return { success: true, needsEmailVerification: true };
}

/** Đăng xuất */
export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

/** Lấy session hiện tại (dùng khi reload app để restore login) */
export async function getSession(): Promise<AuthUser | null> {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session?.user) return null;
  return mapUser(data.session.user);
}

/** Subscribe auth state changes (login / logout / token refresh) */
export function onAuthStateChange(
  callback: (user: AuthUser | null) => void
): () => void {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ? mapUser(session.user) : null);
  });

  // Return unsubscribe function
  return () => subscription.unsubscribe();
}