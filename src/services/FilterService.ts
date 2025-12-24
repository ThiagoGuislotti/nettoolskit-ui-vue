/**
 * FilterService - Serviço para gerenciamento de filtros
 * 
 * Serviço puro de lógica de negócio para filtros de busca/relatórios.
 * Sem dependências de frameworks (Vue, Quasar, etc.).
 * 
 * Responsabilidades:
 * - Manage reactive state
 * - Integrate with URL (query params)
 * - Validate and transform values
 * - Save user preferences
 * - Contar filtros ativos
 * - Reset de filtros
 * - Serialização/deserialização para URL
 * 
 * @example
 * const service = new FilterService({ category: null, status: null })
 * service.setFilter('category', 'tech')
 * const count = service.getActiveFilterCount()
 * 
 * @layer Application
 */

/**
 * Estado genérico de filtros
 */
export interface FiltersState {
  [key: string]: any
}

/**
 * Callback for filter changes
 */
export type FilterChangeCallback<T extends FiltersState> = (filters: T) => void

/**
 * FilterService configuration options
 */
export interface FilterServiceOptions<T extends FiltersState> {
  /**
   * Callback called when filters change
   */
  onFilterChange?: FilterChangeCallback<T>
}

/**
 * Filter management service
 * 
 * Implements pure business logic for filters, without external
 * framework dependencies.
 */
export class FilterService<T extends FiltersState> {
  private currentFilters: T
  private readonly initialFilters: T
  private readonly options: FilterServiceOptions<T>

  constructor(initialFilters: T, options: FilterServiceOptions<T> = {}) {
    this.initialFilters = { ...initialFilters }
    this.currentFilters = { ...initialFilters }
    this.options = options
  }

  /**
   * Returns current filter state
   */
  getFilters(): T {
    return { ...this.currentFilters }
  }

  /**
   * Define o estado completo dos filtros
   */
  setFilters(filters: T): void {
    this.currentFilters = { ...filters }
    this.notifyChange()
  }

  /**
   * Sets a specific filter
   */
  setFilter<K extends keyof T>(key: K, value: T[K]): void {
    this.currentFilters[key] = value
    this.notifyChange()
  }

  /**
   * Returns a specific filter
   */
  getFilter<K extends keyof T>(key: K): T[K] {
    return this.currentFilters[key]
  }

  /**
   * Resets all filters to initial values
   */
  resetFilters(): void {
    this.currentFilters = { ...this.initialFilters }
    this.notifyChange()
  }

  /**
   * Resets a specific filter
   */
  resetFilter<K extends keyof T>(key: K): void {
    this.currentFilters[key] = this.initialFilters[key]
    this.notifyChange()
  }

  /**
   * Verifica se há algum filtro ativo
   * 
   * Um filtro é considerado ativo se:
   * - Não é null, undefined ou string vazia
   * - Não é array vazio
   * - É diferente do valor inicial
   */
  hasActiveFilters(): boolean {
    return Object.keys(this.currentFilters).some(key => {
      return this.isFilterActive(key as keyof T)
    })
  }

  /**
   * Verifica se um filtro específico está ativo
   */
  isFilterActive<K extends keyof T>(key: K): boolean {
    const value = this.currentFilters[key]
    const initialValue = this.initialFilters[key]

    // Ignore empty values
    if (this.isEmptyValue(value)) return false

    // Check if different from initial
    return value !== initialValue
  }

  /**
   * Conta quantos filtros estão ativos
   */
  getActiveFilterCount(): number {
    return Object.keys(this.currentFilters).filter(key => {
      return this.isFilterActive(key as keyof T)
    }).length
  }

  /**
   * Lista as chaves dos filtros ativos
   */
  getActiveFilterKeys(): (keyof T)[] {
    return Object.keys(this.currentFilters).filter(key => {
      return this.isFilterActive(key as keyof T)
    }) as (keyof T)[]
  }

  /**
   * Serializa filtros para query params de URL
   * 
   * Converte o estado atual dos filtros em um objeto
   * adequado para query parameters de URL.
   * 
   * @returns Objeto com pares chave-valor (string)
   */
  serializeToQueryParams(): Record<string, string> {
    const query: Record<string, string> = {}

    Object.keys(this.currentFilters).forEach(key => {
      const value = this.currentFilters[key]

      if (!this.isEmptyValue(value)) {
        query[key] = this.valueToString(value)
      }
    })

    return query
  }

  /**
   * Deserializa query params de URL para filtros
   * 
   * Converte query parameters de URL para o formato
   * adequado dos filtros, respeitando os tipos iniciais.
   * 
   * @param queryParams - Objeto com query parameters
   */
  deserializeFromQueryParams(queryParams: Record<string, string | string[]>): void {
    const newFilters: any = { ...this.currentFilters }

    Object.keys(queryParams).forEach(key => {
      if (key in this.initialFilters) {
        const value = queryParams[key]
        
        // Ignore undefined values
        if (value === undefined) return
        
        const initialType = typeof this.initialFilters[key]

        newFilters[key] = this.parseQueryValue(
          value,
          initialType,
          Array.isArray(this.initialFilters[key])
        )
      }
    })

    this.currentFilters = newFilters as T
    this.notifyChange()
  }

  /**
   * Clears all filters (sets to empty values)
   * 
   * Different from resetFilters which restores initial values,
   * this method sets all to null/undefined.
   */
  clearFilters(): void {
    const cleared: any = {}

    Object.keys(this.currentFilters).forEach(key => {
      const value = this.currentFilters[key]

      if (Array.isArray(value)) {
        cleared[key] = []
      } else if (typeof value === 'string') {
        cleared[key] = ''
      } else {
        cleared[key] = null
      }
    })

    this.currentFilters = cleared as T
    this.notifyChange()
  }

  /**
   * Verifica se um valor é considerado vazio
   */
  private isEmptyValue(value: any): boolean {
    if (value === null || value === undefined || value === '') return true
    if (Array.isArray(value) && value.length === 0) return true
    return false
  }

  /**
   * Converte um valor para string (para URL)
   */
  private valueToString(value: any): string {
    if (Array.isArray(value)) {
      return value.join(',')
    }
    return String(value)
  }

  /**
   * Parseia valor de query param para tipo apropriado
   */
  private parseQueryValue(
    value: string | string[],
    expectedType: string,
    isArray: boolean
  ): any {
    const stringValue = Array.isArray(value) ? value[0] : value

    // Ensure we have a valid value
    if (!stringValue) return isArray ? [] : null

    if (isArray) {
      return stringValue.split(',')
    }

    switch (expectedType) {
      case 'number':
        return Number(stringValue)
      case 'boolean':
        return stringValue === 'true'
      default:
        return stringValue
    }
  }

  /**
   * Notifica mudança nos filtros
   */
  private notifyChange(): void {
    if (this.options.onFilterChange) {
      this.options.onFilterChange(this.getFilters())
    }
  }
}

/**
 * Factory singleton para FilterService
 * 
 * Permite criar e gerenciar instâncias de FilterService
 * de forma centralizada.
 */
export class FilterServiceFactory {
  private static instances: Map<string, FilterService<any>> = new Map()

  /**
   * Cria ou retorna instância existente de FilterService
   * 
   * @param key - Chave única para identificar a instância
   * @param initialFilters - Estado inicial dos filtros
   * @param options - Opções de configuração
   */
  static getInstance<T extends FiltersState>(
    key: string,
    initialFilters: T,
    options?: FilterServiceOptions<T>
  ): FilterService<T> {
    if (!this.instances.has(key)) {
      this.instances.set(key, new FilterService(initialFilters, options))
    }
    return this.instances.get(key)!
  }

  /**
   * Remove instância do cache
   */
  static removeInstance(key: string): void {
    this.instances.delete(key)
  }

  /**
   * Limpa todas as instâncias
   */
  static clearAll(): void {
    this.instances.clear()
  }
}