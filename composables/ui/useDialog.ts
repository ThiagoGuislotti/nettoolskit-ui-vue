/**
 * useDialog - Composable para gerenciar diálogos/modais
 * 
 * Simplifica controle de abrir/fechar diálogos com estado reativo
 * e callbacks opcionais.
 * 
 * @example
 * const dialog = useDialog()
 * const confirmDialog = useDialog({ onClose: () => console.log('Fechou') })
 * 
 * dialog.open()
 * dialog.close()
 * dialog.toggle()
 */

import { ref, computed } from 'vue'

export interface UseDialogOptions {
  initialState?: boolean
  onOpen?: () => void
  onClose?: () => void
  onToggle?: (isOpen: boolean) => void
}

/**
 * Composable useDialog
 * 
 * @param options - Opções de configuração do diálogo
 * @returns Objeto com estado e métodos do diálogo
 */
export function useDialog(options: UseDialogOptions = {}) {
  const {
    initialState = false,
    onOpen,
    onClose,
    onToggle
  } = options

  // Dialog state
  const isOpen = ref(initialState)

  /**
   * Computed: Check if closed
   */
  const isClosed = computed(() => !isOpen.value)

  /**
   * Opens the dialog
   */
  const open = () => {
    if (!isOpen.value) {
      isOpen.value = true
      onOpen?.()
      onToggle?.(true)
    }
  }

  /**
   * Closes the dialog
   */
  const close = () => {
    if (isOpen.value) {
      isOpen.value = false
      onClose?.()
      onToggle?.(false)
    }
  }

  /**
   * Toggles dialog state
   */
  const toggle = () => {
    if (isOpen.value) {
      close()
    } else {
      open()
    }
  }

  /**
   * Reseta para estado inicial
   */
  const reset = () => {
    isOpen.value = initialState
  }

  return {
    isOpen,
    isClosed,
    open,
    close,
    toggle,
    reset
  }
}

/**
 * useDialogConfirm - Composable for confirmation dialogs
 * 
 * Specialization of useDialog for confirmations with Promise
 * 
 * @example
 * const { open, confirm, cancel } = useDialogConfirm()
 * 
 * const result = await open()
 * if (result) {
 *   // User confirmed
 * }
 */
export function useDialogConfirm(options: UseDialogOptions = {}) {
  const dialog = useDialog(options)
  let resolvePromise: ((value: boolean) => void) | null = null

  /**
   * Abre diálogo e retorna Promise que resolve com true/false
   */
  const openWithPromise = (): Promise<boolean> => {
    dialog.open()
    return new Promise((resolve) => {
      resolvePromise = resolve
    })
  }

  /**
   * Confirma e fecha diálogo (resolve com true)
   */
  const confirm = () => {
    dialog.close()
    resolvePromise?.(true)
    resolvePromise = null
  }

  /**
   * Cancela e fecha diálogo (resolve com false)
   */
  const cancel = () => {
    dialog.close()
    resolvePromise?.(false)
    resolvePromise = null
  }

  return {
    ...dialog,
    open: openWithPromise,
    confirm,
    cancel
  }
}