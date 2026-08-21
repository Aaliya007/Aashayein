import { KeyboardAvoidingView, Platform, ScrollView, View, type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReactNode } from 'react';

interface ScreenProps extends ViewProps {
  children: ReactNode;
  scrollable?: boolean;
  safeArea?: boolean;
  className?: string;
  contentClassName?: string;
  header?: ReactNode;
}

export function Screen({
  children,
  scrollable = false,
  safeArea = true,
  className = '',
  contentClassName = '',
  header,
  ...props
}: ScreenProps) {
  const Container = safeArea ? SafeAreaView : View;

  const body = scrollable ? (
    <ScrollView
      className={`flex-1 ${contentClassName}`}
      contentContainerClassName="grow px-4 py-4"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <View className={`flex-1 px-4 py-4 ${contentClassName}`} {...props}>
      {children}
    </View>
  );

  return (
    <Container className={`flex-1 bg-canvas ${className}`} edges={['top', 'left', 'right']}>
      {header}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1">
        {body}
      </KeyboardAvoidingView>
    </Container>
  );
}
