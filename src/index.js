const URLS = (process.env.HEALTH_CHECK_URLS || '')
  .split(',')
  .map(u => u.trim())
  .filter(Boolean)

async function checkUrl(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} returned ${res.status}`)
  console.log(`✅ ${url} — OK (${res.status})`)
}

async function main() {
  if (URLS.length === 0) {
    console.error('❌ HEALTH_CHECK_URLS is not set')
    process.exit(1)
  }

  console.log(`🔍 Checking ${URLS.length} URL(s)...`)

  const results = await Promise.allSettled(URLS.map(checkUrl))
  const failed = results.filter(r => r.status === 'rejected')

  failed.forEach(r => console.error(`❌ ${r.reason.message}`))

  if (failed.length > 0) {
    console.error(`\n${failed.length} check(s) failed`)
    process.exit(1)
  }

  console.log('\n✅ All checks passed')
}

main()