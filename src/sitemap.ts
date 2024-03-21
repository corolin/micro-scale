export default async function sitemap() {
  let routes = ["", "/terms", "/buy", "/upscale"].map((route) => ({
    url: `https://uscale.imadil.dev${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes];
}
