export interface RainbowColor {
  name: string
  code: string
}

export const COLOR_PRESETS: RainbowColor[] = [
  { name: 'Vermelho', code: '#FF0000' },
  { name: 'Laranja', code: '#FF7F00' },
  { name: 'Amarelo', code: '#FFFF00' },
  { name: 'Verde', code: '#00FF00' },
  { name: 'Azul', code: '#0000FF' },
  { name: 'Anil', code: '#4B0082' },
  { name: 'Violeta', code: '#8B00FF' },
] as const
