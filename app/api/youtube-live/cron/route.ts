import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const CHANNEL_ID = "UCxTCV_x9eQZmnhei1NIal0g";

async function fetchLatestVideoId(): Promise<string | null> {
  try {
    const rss = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      { cache: "no-store" }
    );
    const xml = await rss.text();
    const match = xml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  // Vercel cron auth check
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const videoId = await fetchLatestVideoId();
  revalidatePath("/api/youtube-live");
  revalidatePath("/");

  return NextResponse.json({
    ok: true,
    videoId,
    time: new Date().toISOString(),
  });
}
