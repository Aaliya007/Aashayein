import { KeyboardAvoidingView, Platform, ScrollView, View, type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenProps extends ViewProps {
  children: React.ReactNode;
  scrollable?: boolean;
  safeArea?: boolean;
  className?: string;
  contentClassName?: string;
}

export function Screen({
  children,
  scrollable = false,
  safeArea = true,
  className = '',
  contentClassName = '',
  ...props
}: ScreenProps) {
  const Container = safeArea ? SafeAreaView : View;

  const content = scrollable ? (
    <ScrollView
      className={`flex-1 ${contentClassName}`}
      contentContainerClassName="grow px-5 pb-8"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <View className={`flex-1 px-5 ${contentClassName}`} {...props}>
      {children}
    </View>
  );

  return (
    <Container className={`flex-1 bg-background ${className}`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1">
        {content}
      </KeyboardAvoidingView>
    </Container>
  );
}
