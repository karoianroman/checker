import { checkUrl, parseUrls } from './checker.js'

const URLS = parseUrls(process.env.HEALTH_CHECK_URLS)

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