import Animated, { FadeIn } from 'react-native-reanimated';
import Svg, { Circle, Path } from 'react-native-svg';

interface BrandMarkProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: { box: 'h-14 w-14 rounded-2xl', icon: 40 },
  md: { box: 'h-20 w-20 rounded-3xl', icon: 58 },
  lg: { box: 'h-28 w-28 rounded-[28px]', icon: 82 },
};

function CommunityHealthIcon({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none" accessibilityElementsHidden>
      <Path d="M15 42C18 23 31 13 48 13" stroke="#71B947" strokeWidth="5" strokeLinecap="round" />
      <Path d="M85 43C82 24 69 13 52 13" stroke="#71B947" strokeWidth="5" strokeLinecap="round" />
      <Path d="M50 14V34M40 24H60" stroke="#71B947" strokeWidth="7" strokeLinecap="round" />

      <Circle cx="27" cy="42" r="7" fill="#17A8A2" />
      <Circle cx="50" cy="35" r="7" fill="#75C443" />
      <Circle cx="73" cy="42" r="7" fill="#F37E84" />
      <Circle cx="50" cy="58" r="7" fill="#F5A429" />

      <Path d="M15 64C18 52 29 49 38 58" stroke="#17A8A2" strokeWidth="7" strokeLinecap="round" />
      <Path d="M39 58C43 49 57 49 61 58" stroke="#75C443" strokeWidth="7" strokeLinecap="round" />
      <Path d="M62 58C70 49 82 52 85 64" stroke="#F37E84" strokeWidth="7" strokeLinecap="round" />
      <Path d="M38 76C41 65 58 65 62 76" stroke="#F5A429" strokeWidth="7" strokeLinecap="round" />

      <Path d="M11 72C24 80 38 84 51 84C65 84 77 79 89 67C86 83 72 92 52 92C33 92 19 85 11 72Z" fill="#087C6B" />
      <Path d="M42 78C48 84 56 84 62 77" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
    </Svg>
  );
}

export function BrandMark({ size = 'md' }: BrandMarkProps) {
  const selected = sizes[size];

  return (
    <Animated.View
      entering={FadeIn.duration(300).springify()}
      className={`items-center justify-center bg-white ${selected.box}`}
      style={{
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#0F766E',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.13,
        shadowRadius: 16,
        elevation: 3,
      }}
      accessibilityRole="image"
      accessibilityLabel="Aashayein">
      <CommunityHealthIcon size={selected.icon} />
    </Animated.View>
  );
}
