import { copy, CopyKey } from '@/constants/copy';
import { useAppStore } from '@/stores/appStore';

export function useCopy() {
  const language = useAppStore((s) => s.language);
  const strings = copy[language];

  const t = (key: CopyKey): string => strings[key];

  return { t, language, strings };
}
