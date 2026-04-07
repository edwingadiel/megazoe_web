import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const fileId = req.nextUrl.searchParams.get('id');
  if (!fileId || !/^[a-zA-Z0-9_-]+$/.test(fileId)) {
    return NextResponse.json({ error: 'Invalid file id' }, { status: 400 });
  }

  try {
    // Use the confirmed download URL directly (bypasses virus scan page)
    const driveUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`;

    // Forward range header for seeking support
    const rangeHeader = req.headers.get('range');
    const headers: Record<string, string> = {
      'User-Agent': 'Mozilla/5.0',
    };
    if (rangeHeader) {
      headers['Range'] = rangeHeader;
    }

    const response = await fetch(driveUrl, {
      redirect: 'follow',
      headers,
    });

    if (!response.ok && response.status !== 206) {
      return NextResponse.json({ error: 'Failed to fetch audio' }, { status: 502 });
    }

    // Build response headers
    const resHeaders: Record<string, string> = {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'public, max-age=86400',
      'Accept-Ranges': 'bytes',
    };

    // Forward content-length and content-range for seeking
    const contentLength = response.headers.get('content-length');
    const contentRange = response.headers.get('content-range');
    if (contentLength) resHeaders['Content-Length'] = contentLength;
    if (contentRange) resHeaders['Content-Range'] = contentRange;

    return new NextResponse(response.body, {
      status: response.status,
      headers: resHeaders,
    });
  } catch {
    return NextResponse.json({ error: 'Stream error' }, { status: 500 });
  }
}
