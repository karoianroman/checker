export async function checkUrl(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} returned ${res.status}`)
  return res.status
}

export function parseUrls(env) {
  return (env || '')
    .split(',')
    .map(u => u.trim())
    .filter(Boolean)
}