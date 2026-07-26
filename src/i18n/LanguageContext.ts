import { createContext, useContext } from 'react'
import { translations, type Lang, type Translation } from './translations'

export interface LanguageValue {
  lang: Lang
  toggleLang: () => void
  t: Translation
}

export const LanguageContext = createContext<LanguageValue>({
  lang: 'pt',
  toggleLang: () => {},
  t: translations.pt,
})

export function useLanguage() {
  return useContext(LanguageContext)
}
