import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { TamaguiProvider, Theme, getTokenValue } from 'tamagui';
import tamaguiConfig from '../tamagui.config';
import { useColorScheme } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default () => {
  const [fontLoaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  const colorScheme = useColorScheme();

  useEffect(() => {
    if (fontLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded]);

  if (!fontLoaded) {
    return null;
  }

  return (
   <TamaguiProvider config={tamaguiConfig}>
     <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
       <Stack>
         <Stack.Screen
          name="index"
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: getTokenValue('$color.red3Dark')
            },
            headerTintColor: getTokenValue('$color.theme'),
          }}
         />
       </Stack>
     </Theme>
   </TamaguiProvider>
  );
};
