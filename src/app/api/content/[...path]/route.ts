import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  // 1. Verify user session
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pathParts = (await params).path;
  if (!pathParts || pathParts.length === 0) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  // 2. Resolve file path safely
  const filePath = path.join(process.cwd(), "content", ...pathParts);

  // Ensure the file is actually inside the "content" directory (prevent path traversal)
  const resolvedPath = path.resolve(filePath);
  if (!resolvedPath.startsWith(path.join(process.cwd(), "content"))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    if (!fs.existsSync(resolvedPath)) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    const stat = fs.statSync(resolvedPath);
    const fileStream = fs.createReadStream(resolvedPath);

    // Determine basic content types
    const ext = path.extname(resolvedPath).toLowerCase();
    let contentType = "application/octet-stream";
    if (ext === ".mp3") contentType = "audio/mpeg";
    if (ext === ".webp") contentType = "image/webp";
    if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    if (ext === ".png") contentType = "image/png";
    if (ext === ".pdf") contentType = "application/pdf";

    return new NextResponse(fileStream as any, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": stat.size.toString(),
        // Add cache control if you want, but considering it's protected, maybe limit caching
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error serving local file:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
