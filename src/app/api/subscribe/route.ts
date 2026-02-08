import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { isValidEmail } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; source?: string };
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const source = typeof body.source === "string" ? body.source : "unknown";

    if (!email) {
      return NextResponse.json({ ok: false, error: "请输入邮箱地址" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "请输入有效的邮箱地址" }, { status: 400 });
    }

    const supabase = getSupabaseServer();
    if (supabase) {
      const { error } = await supabase.from("subscribers").insert({
        email,
        source,
      });
      if (error && error.code !== "23505") {
        return NextResponse.json(
          { ok: false, error: "订阅失败，请稍后重试" },
          { status: 500 }
        );
      }
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "请求无效" },
      { status: 400 }
    );
  }
}
