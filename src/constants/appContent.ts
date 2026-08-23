import { MOCK_ADMIN } from '@/data/mock/users';
import { UserRole } from '@/types/user';

export type AppLanguage = 'en' | 'hi' | 'pa';

export interface LanguageOption {
  code: AppLanguage;
  label: string;
  nativeLabel: string;
  sample: string;
  available: boolean;
}

export const languageOptions: LanguageOption[] = [
  {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    sample: 'Healthcare support in your language',
    available: true,
  },
  {
    code: 'hi',
    label: 'Hindi',
    nativeLabel: 'हिन्दी',
    sample: 'आपकी भाषा में स्वास्थ्य सहायता',
    available: true,
  },
  {
    code: 'pa',
    label: 'Punjabi',
    nativeLabel: 'ਪੰਜਾਬੀ',
    sample: 'ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ ਸਿਹਤ ਸਹਾਇਤਾ',
    available: true,
  },
];

export interface RoleOption {
  value: UserRole;
  title: string;
  description: string;
  registerable: boolean;
}

export const roleOptions: RoleOption[] = [
  {
    value: 'asha',
    title: 'ASHA Worker',
    description: 'Daily queue, visits, referrals, vaccinations and field operations',
    registerable: true,
  },
  {
    value: 'patient',
    title: 'Rural Citizen',
    description: 'Report symptoms, track family health and find nearby care',
    registerable: true,
  },
  {
    value: 'admin',
    title: 'System Admin',
    description: 'Supervisors and district staff — assigned by the health department',
    registerable: false,
  },
];

export const welcomeFeatures = [
  {
    id: 'asha',
    title: 'ASHA field companion',
    description: 'Prioritised household visits, referrals and offline records in one place.',
  },
  {
    id: 'citizen',
    title: 'Simple health requests',
    description: 'Citizens can report symptoms with text, buttons or voice — in local language.',
  },
  {
    id: 'offline',
    title: 'Works with weak networks',
    description: 'Record visits without internet. Data syncs when the signal returns.',
  },
];

export interface DemoAccount {
  role: UserRole;
  name: string;
  identifier: string;
  password: string;
  label: string;
}

export const demoAccounts: DemoAccount[] = [
  {
    role: 'patient',
    name: 'Sunita Devi',
    identifier: '9876543210',
    password: 'demo',
    label: 'Citizen',
  },
  {
    role: 'asha',
    name: 'Priya Sharma',
    identifier: '9876543211',
    password: 'demo',
    label: 'ASHA',
  },
  {
    role: 'admin',
    name: MOCK_ADMIN.user.name,
    identifier: MOCK_ADMIN.user.mobile,
    password: MOCK_ADMIN.password,
    label: 'Admin',
  },
];

export const MOCK_OTP = '123456';
