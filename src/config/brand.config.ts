/**
 * Brand Configuration
 * Configurações de marca para cada projeto
 * Define logo, navegação, CTAs e informações de footer
 */

export interface NavItem {
  /** Texto do link */
  label: string;
  /** URL de destino */
  href: string;
  /** Link externo (abre em nova aba) */
  external?: boolean;
  /** Ícone opcional */
  icon?: string;
}

export interface SocialLink {
  /** Nome da rede social */
  name: string;
  /** Ícone (Material Icons ou URL) */
  icon: string;
  /** URL do perfil */
  href: string;
}

export interface FooterSection {
  /** Título da seção */
  title: string;
  /** Links da seção */
  links: NavItem[];
}

export interface BrandConfig {
  /** Nome do projeto */
  name: string;
  /** Configuração do logo */
  logo: {
    /** Letra do ícone */
    letter: string;
    /** Texto do logo */
    text: string;
    /** Tagline opcional */
    tagline?: string;
  };
  /** Itens de navegação do header */
  navigation: NavItem[];
  /** Botão CTA principal */
  cta: {
    /** Texto do botão */
    text: string;
    /** Link de destino */
    link: string;
    /** Variante do botão */
    variant?: 'primary' | 'secondary' | 'outline';
  };
  /** Links de redes sociais */
  social: SocialLink[];
  /** Configuração do footer */
  footer: {
    /** Descrição da empresa/projeto */
    description: string;
    /** Seções de links */
    sections: FooterSection[];
    /** Texto de copyright */
    copyright: string;
  };
}

/**
 * Configuração da marca Sentinela
 */
export const sentinelaBrand: BrandConfig = {
  name: 'Sentinela',
  logo: {
    letter: 'S',
    text: 'Sentinela',
    tagline: 'Sistema de Busca',
  },
  navigation: [
    { label: 'Funcionalidades', href: '#funcionalidades' },
    { label: 'Planos', href: '#planos' },
    { label: 'Contato', href: '#contato' },
  ],
  cta: {
    text: 'Começar',
    link: '/search',
    variant: 'primary',
  },
  social: [
    { name: 'GitHub', icon: 'fab fa-github', href: 'https://github.com/ThiagoGuislotti/sentinela' },
  ],
  footer: {
    description: 'Sistema inteligente de busca e monitoramento de vídeos no YouTube.',
    sections: [
      {
        title: 'Produto',
        links: [
          { label: 'Funcionalidades', href: '#funcionalidades' },
          { label: 'Planos', href: '#planos' },
          { label: 'Documentação', href: '/docs' },
        ],
      },
      {
        title: 'Suporte',
        links: [
          { label: 'Contato', href: '#contato' },
          { label: 'FAQ', href: '/faq' },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} Sentinela. Todos os direitos reservados.`,
  },
};

/**
 * Configuração da marca PlaTEA
 */
export const plateaBrand: BrandConfig = {
  name: 'PlaTEA',
  logo: {
    letter: 'P',
    text: 'PlaTEA',
    tagline: 'Agenda Visual Assistida',
  },
  navigation: [
    { label: 'Funcionalidades', href: '#funcionalidades' },
    { label: 'Planos', href: '#planos' },
    { label: 'Contato', href: '#contato' },
  ],
  cta: {
    text: 'Começar Grátis',
    link: '/app',
    variant: 'primary',
  },
  social: [
    { name: 'GitHub', icon: 'fab fa-github', href: 'https://github.com/ThiagoGuislotti/PlaTEA' },
  ],
  footer: {
    description: 'Agenda visual assistida para pessoas neurodivergentes e profissionais de tecnologia.',
    sections: [
      {
        title: 'Produto',
        links: [
          { label: 'Funcionalidades', href: '#funcionalidades' },
          { label: 'Planos', href: '#planos' },
          { label: 'Ver Demo', href: '/demo' },
        ],
      },
      {
        title: 'Suporte',
        links: [
          { label: 'Contato', href: '#contato' },
          { label: 'Acessibilidade', href: '/acessibilidade' },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} PlaTEA. Todos os direitos reservados.`,
  },
};

/**
 * Configuração da marca NetToolsKit
 */
export const nettoolskitBrand: BrandConfig = {
  name: 'NetToolsKit UI',
  logo: {
    letter: 'NTK',
    text: 'NetToolsKit UI',
    tagline: 'Vue 3 + Quasar',
  },
  navigation: [
    { label: 'Componentes', href: '#components' },
    { label: 'Temas', href: '#themes' },
    { label: 'Instalação', href: '#installation' },
  ],
  cta: {
    text: 'GitHub',
    link: 'https://github.com/ThiagoGuislotti/nettoolskit-ui-vue',
    variant: 'primary',
  },
  social: [
    { name: 'GitHub', icon: 'fab fa-github', href: 'https://github.com/ThiagoGuislotti/nettoolskit-ui-vue' },
  ],
  footer: {
    description: 'Biblioteca de componentes Vue 3 + Quasar com sistema de temas.',
    sections: [
      {
        title: 'Documentação',
        links: [
          { label: 'Componentes', href: '#components' },
          { label: 'Temas', href: '#themes' },
          { label: 'Instalação', href: '#installation' },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} NetToolsKit. MIT License.`,
  },
};

/**
 * Marcas disponíveis
 */
export const brands = {
  sentinela: sentinelaBrand,
  platea: plateaBrand,
  nettoolskit: nettoolskitBrand,
} as const;

export type BrandName = keyof typeof brands;

/**
 * Obtém configuração de marca pelo nome
 */
export function getBrand(name: BrandName): BrandConfig {
  return brands[name];
}
