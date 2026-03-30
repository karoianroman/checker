import { describe, it, expect, vi, beforeEach } from 'vitest'
import { checkUrl, parseUrls } from './checker.js'

describe('parseUrls', () => {
  it('повертає масив URL', () => {
    const result = parseUrls('https://a.com,https://b.com')
    expect(result).toEqual(['https://a.com', 'https://b.com'])
  })

  it('ігнорує пробіли', () => {
    const result = parseUrls(' https://a.com , https://b.com ')
    expect(result).toEqual(['https://a.com', 'https://b.com'])
  })

  it('повертає порожній масив якщо env не задано', () => {
    expect(parseUrls('')).toEqual([])
    expect(parseUrls(undefined)).toEqual([])
  })
})

describe('checkUrl', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('успішно якщо статус 200', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, status: 200 })

    const status = await checkUrl('https://example.com')
    expect(status).toBe(200)
  })

  it('кидає помилку якщо статус 500', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 })

    await expect(checkUrl('https://example.com'))
      .rejects
      .toThrow('https://example.com returned 500')
  })

  it('кидає помилку якщо сайт недоступний', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('fetch failed'))

    await expect(checkUrl('https://example.com'))
      .rejects
      .toThrow('fetch failed')
  })
})
