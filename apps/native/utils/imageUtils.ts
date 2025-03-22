export async function isValidImageUrl(url: string): Promise<boolean> {
  try {
    if (!url.startsWith("http")) {
      return false;
    }
    const response = await fetch(url, {
      method: "HEAD",
    });
    const contentType = response.headers.get("Content-Type");
    return (
      response.ok &&
      contentType !== undefined &&
      contentType !== null &&
      contentType.startsWith("image/")
    );
  } catch {
    return false;
  }
}
