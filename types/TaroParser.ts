import { ComponentClass } from 'react'

export interface TaroParserProps {
  content: string,
  onImgClick?: Function
  onLinkClick?: Function,
  latexApi?: string,
  yumlApi?: string,
  theme?: 'dark' | 'light'
}

declare const TaroParser: ComponentClass<TaroParserProps>

export default TaroParser
