import React from 'react';
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Code,
} from 'native-base';
import { SpotifySongInfo } from './spotify-song-info';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

// extend the theme
export const theme = extendTheme({ config });

export const AppMain = ({ accessToken }: { accessToken: string }) => {
  return (
    <NativeBaseProvider>
      <Center
        _dark={{ bg: 'blueGray.900' }}
        _light={{ bg: 'blueGray.50' }}
        px={4}
        flex={1}
      >
        <VStack space={5} alignItems="center">
          <SpotifySongInfo accessToken={accessToken} />
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
};

// // Color Switch Component
// function ToggleDarkMode() {
//   const { colorMode, toggleColorMode } = useColorMode();
//   return (
//     <HStack space={2} alignItems="center">
//       <Text>Dark</Text>
//       <Switch
//         isChecked={colorMode === 'light' ? true : false}
//         onToggle={toggleColorMode}
//         aria-label={
//           colorMode === 'light' ? 'switch to dark mode' : 'switch to light mode'
//         }
//       />
//       <Text>Light</Text>
//     </HStack>
//   );
// }
