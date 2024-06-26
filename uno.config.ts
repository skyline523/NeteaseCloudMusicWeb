import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      'netease-red': '#fc3b57',
      'lighter-gray': '#f2f3f4',
      'light-gray': '#f7f9fc',
      'deep-gray': '#f0f3f6',
      'txt-gray': 'rgb(107 114 128 / 0.8)',
    },
  },
  rules: [
    ['shadow-c', { 'box-shadow': 'rgba(145, 158, 171, 0.12) 0px 12px 14px -10px' }],
    ['shadow-b', { 'box-shadow': '0px 12px 10px -10px rgba(0, 0, 0, 0.3)' }],
    ['shadow-border', { 'box-shadow': 'rgba(0, 0, 0, 0.04) 0px 5px 22px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px' }],
    ['shadow-inset', { 'box-shadow': 'rgba(0, 0, 0, 0.04) 0px 5px 22px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px' }],
  ],
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer !outline-none hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
    ['secondary-text', 'text-gray-500/80'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
