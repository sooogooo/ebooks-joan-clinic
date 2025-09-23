const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ addUtilities, addComponents, theme }) {
  // 添加自定义工具类
  addUtilities({
    '.text-balance': {
      'text-wrap': 'balance',
    },
    '.line-clamp-1': {
      'overflow': 'hidden',
      'display': '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': '1',
    },
    '.line-clamp-2': {
      'overflow': 'hidden',
      'display': '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': '2',
    },
    '.line-clamp-3': {
      'overflow': 'hidden',
      'display': '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': '3',
    },
    '.backdrop-blur-xs': {
      '--tw-backdrop-blur': 'blur(2px)',
      'backdrop-filter': 'var(--tw-backdrop-blur)',
    },
    '.scroll-smooth-safari': {
      '-webkit-overflow-scrolling': 'touch',
      'scroll-behavior': 'smooth',
    }
  });

  // 添加自定义组件
  addComponents({
    '.btn': {
      'display': 'inline-flex',
      'align-items': 'center',
      'justify-content': 'center',
      'padding': '0.75rem 1.5rem',
      'border-radius': '0.5rem',
      'font-weight': '500',
      'text-decoration': 'none',
      'transition': 'all 0.2s ease',
      'cursor': 'pointer',
      'border': 'none',
      'font-size': '0.9rem',
      'line-height': '1.5',
    },
    '.btn-primary': {
      'background': theme('colors.primary.600'),
      'color': 'white',
      '&:hover': {
        'background': theme('colors.primary.700'),
        'transform': 'translateY(-1px)',
        'box-shadow': theme('boxShadow.md'),
      },
      '&:focus': {
        'outline': 'none',
        'ring': '2px',
        'ring-color': theme('colors.primary.500'),
        'ring-offset': '2px',
      },
    },
    '.btn-secondary': {
      'background': theme('colors.gray.100'),
      'color': theme('colors.gray.700'),
      'border': '1px solid',
      'border-color': theme('colors.gray.300'),
      '&:hover': {
        'background': theme('colors.gray.200'),
        'transform': 'translateY(-1px)',
      },
    },
    '.btn-ghost': {
      'background': 'transparent',
      'color': theme('colors.gray.600'),
      '&:hover': {
        'background': theme('colors.gray.100'),
        'color': theme('colors.gray.900'),
      },
    },
    '.card': {
      'background': theme('colors.white'),
      'border-radius': '0.75rem',
      'padding': '1.5rem',
      'box-shadow': theme('boxShadow.sm'),
      'border': '1px solid',
      'border-color': theme('colors.gray.200'),
      'transition': 'all 0.3s ease',
    },
    '.card-hover': {
      '&:hover': {
        'transform': 'translateY(-2px)',
        'box-shadow': theme('boxShadow.lg'),
      },
    },
    '.prose-chinese': {
      'text-indent': '2em',
      'line-height': '1.8',
      '& p:first-child': {
        'text-indent': '0',
      },
      '& blockquote': {
        'text-indent': '0',
      },
      '& li': {
        'text-indent': '0',
      },
    },
    '.reading-progress': {
      'position': 'fixed',
      'top': '0',
      'left': '0',
      'width': '100%',
      'height': '3px',
      'background': 'rgba(14, 165, 233, 0.3)',
      'z-index': '1000',
    },
    '.reading-progress-bar': {
      'height': '100%',
      'background': theme('colors.primary.600'),
      'transition': 'width 0.1s ease',
    },
    '.chapter-nav': {
      'position': 'sticky',
      'top': '2rem',
      'max-height': 'calc(100vh - 4rem)',
      'overflow-y': 'auto',
      '&::-webkit-scrollbar': {
        'width': '4px',
      },
      '&::-webkit-scrollbar-track': {
        'background': 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        'background': theme('colors.gray.300'),
        'border-radius': '2px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        'background': theme('colors.gray.400'),
      },
    },
    '.gradient-text': {
      'background': `linear-gradient(135deg, ${theme('colors.primary.600')}, ${theme('colors.accent.600')})`,
      '-webkit-background-clip': 'text',
      'background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
    },
    '.glass-effect': {
      'background': 'rgba(255, 255, 255, 0.8)',
      'backdrop-filter': 'blur(10px)',
      'border': '1px solid rgba(255, 255, 255, 0.2)',
    },
    '.text-shadow-sm': {
      'text-shadow': '0 1px 2px rgba(0, 0, 0, 0.1)',
    },
    '.text-shadow': {
      'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    '.text-shadow-lg': {
      'text-shadow': '0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)',
    },
  });
});