import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const CHANNEL_ID = "UCxTCV_x9eQZmnhei1NIal0g";
const REFRESH_SECRET = process.env.YOUTUBE_REFRESH_SECRET || "jlycc-refresh-2024";

async function fetchLatestVideoId(): Promise<string | null> {
  try {
    const rss = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      { next: { revalidate: 1800 } }
    );
    const xml = await rss.text();
    const match = xml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export async function GET() {
  const videoId = await fetchLatestVideoId();
  if (!videoId) {
    return NextResponse.json({ videoId: null, embedUrl: null }, { status: 200 });
  }
  return NextResponse.json({
    videoId,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    channelFallback: `https://www.youtube.com/embed?listType=user_uploads&list=jlymicentral233`,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  if (body.secret !== REFRESH_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  revalidatePath("/api/youtube-live");
  const videoId = await fetchLatestVideoId();
  return NextResponse.json({ ok: true, videoId });
}
