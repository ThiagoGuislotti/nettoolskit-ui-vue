/**
 * Vitest Setup File
 * 
 * Global configuration and mocks for all tests
 */

import { vi } from 'vitest'

// Mock Vue reactivity for non-Vue tests
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    ref: (value: any) => ({ value }),
    computed: (fn: () => any) => ({ value: fn() }),
    watch: vi.fn(),
    onMounted: vi.fn(),
    onUnmounted: vi.fn()
  }
})
