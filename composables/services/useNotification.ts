/**
 * useNotification - Composable Vue para notificações
 * 
 * Wrapper Vue para o NotificationService (Application Layer).
 * Usa QuasarNotificationAdapter (Infrastructure) como implementação concreta.
 * 
 * Este composable agora está conforme Clean Architecture:
 * - Presentation (composable) → Application (service) → Infrastructure (adapter)
 * 
 * @example
 * const { success, error, warning, info } = useNotification()
 * success('Dados salvos com sucesso!')
 * error('Erro ao processar requisição')
 * 
 * @layer Presentation
 */

import { getQuasarNotificationService } from '../../adapters/QuasarNotificationAdapter'
import type { NotificationOptions, NotificationHandle } from '../../services/NotificationService'

/**
 * Composable useNotification
 * 
 * Retorna métodos do serviço de notificação encapsulado para uso em componentes Vue.
 * 
 * @returns Objeto com métodos de notificação tipados
 */
export function useNotification() {
  // Get service instance (via Quasar adapter)
  const notificationService = getQuasarNotificationService()

  /**
   * Success notification (green)
   */
  const success = (message: string, options?: Partial<NotificationOptions>) => {
    notificationService.success(message, options)
  }

  /**
   * Error notification (red)
   */
  const error = (message: string, options?: Partial<NotificationOptions>) => {
    notificationService.error(message, options)
  }

  /**
   * Warning notification (orange/yellow)
   */
  const warning = (message: string, options?: Partial<NotificationOptions>) => {
    notificationService.warning(message, options)
  }

  /**
   * Info notification (blue)
   */
  const info = (message: string, options?: Partial<NotificationOptions>) => {
    notificationService.info(message, options)
  }

  /**
   * Custom notification
   */
  const notify = (options: NotificationOptions) => {
    notificationService.notify(options)
  }

  /**
   * Loading notification (spinner)
   */
  const loading = (message?: string): NotificationHandle => {
    return notificationService.loading(message)
  }

  return {
    success,
    error,
    warning,
    info,
    notify,
    loading
  }
}