const ALLOWED_IMAGE_HOSTS = [
  "upload.wikimedia.org",
  "commons.wikimedia.org",
  "images.wikimedia.org",
];

function isAllowedImageHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  return ALLOWED_IMAGE_HOSTS.some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
}

/**
 * Keep only https image URLs from trusted public hosts (Wikimedia family).
 * Returns the final URL after redirects when content-type is an image.
 */
export async function verifyReferenceImageUrl(
  url: string | undefined,
): Promise<{ url?: string; status: "verified" | "rejected" | "missing"; reason?: string }> {
  if (!url?.trim()) return { status: "missing" };

  let parsed: URL;
  try {
    parsed = new URL(url.trim());
  } catch {
    return { status: "rejected", reason: "Invalid image URL" };
  }

  if (parsed.protocol !== "https:") {
    return { status: "rejected", reason: "Image URL must be https" };
  }
  if (!isAllowedImageHost(parsed.hostname)) {
    return {
      status: "rejected",
      reason: "Only Wikimedia image hosts are accepted for now",
    };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch(parsed.toString(), {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        Accept: "image/*,*/*;q=0.8",
        "User-Agent":
          "Mozilla/5.0 (compatible; ChromabenchImageCheck/1.0; +https://chromabench.com)",
      },
    });

    if (!res.ok) {
      return { status: "rejected", reason: `Image URL returned ${res.status}` };
    }

    let finalUrl = res.url || parsed.toString();
    try {
      const finalHost = new URL(finalUrl).hostname;
      if (!isAllowedImageHost(finalHost)) {
        return { status: "rejected", reason: "Image redirected off Wikimedia hosts" };
      }
    } catch {
      return { status: "rejected", reason: "Invalid final image URL" };
    }

    const contentType = (res.headers.get("content-type") ?? "").toLowerCase();
    if (!contentType.startsWith("image/")) {
      // Commons file pages are HTML — reject; require a direct upload.wikimedia.org file URL
      return {
        status: "rejected",
        reason: "Use a direct Wikimedia upload.wikimedia.org image URL",
      };
    }

    // Drain body so the connection can close cleanly
    await res.arrayBuffer().catch(() => undefined);

    return { url: finalUrl, status: "verified" };
  } catch {
    return { status: "rejected", reason: "Could not reach image URL" };
  } finally {
    clearTimeout(timer);
  }
}
