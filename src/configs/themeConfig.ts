import { PaletteMode } from '@mui/material'
import { ContentWidth } from 'src/@core/layouts/types'

type ThemeConfig = {
  mode: PaletteMode
  templateName: string
  routingLoader: boolean
  disableRipple: boolean
  navigationSize: number
  menuTextTruncate: boolean
  contentWidth: ContentWidth
  responsiveFontSizes: boolean
}

const themeConfig: ThemeConfig = {
  templateName:'Dashboard',
  mode: 'light',
  contentWidth: 'boxed',

  // ** Configuração rotas
  routingLoader: true ,
  menuTextTruncate: true ,
  navigationSize: 260, // menu lateral

  // ** Outros
  responsiveFontSizes: true,
  disableRipple: false
}

export default themeConfig
