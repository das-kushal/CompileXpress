import { Button, VStack, useColorMode, Flex, Text } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'

import EditorComp from './components/EditorComp'

import { motion } from 'framer-motion'



export default function App() {
  const { colorMode, toggleColorMode } = useColorMode()
  const [isAnimationPlayed, setIsAnimationPlayed] = useState(false);

  useEffect(() => {
    setIsAnimationPlayed(true);
  }, []);
  return (
    <VStack>

      <Flex justifyContent={'space-between'} w={'100vw'} p={2} h={'10vh'}>
        <Text
          bgGradient='linear(to-l, #7928CA, #FF0080)'
          bgClip='text'
          fontSize='4xl'
          fontWeight='extrabold'
        >
          {/* <motion.span
            style={{
              background: isAnimationPlayed
                ? 'linear-gradient(45deg, #FFC107, #E91E63)'
                : 'transparent',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textFillColor: 'transparent',
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          > */}

          Compile<span style={{ color: 'red', fontWeight: 'bolder', fontStyle: 'oblique', textShadow: colorMode === 'light' ? '2px 2px 4px rgba(0, 0, 0, 0.5)' : '2px 2px 4px rgba(220, 220, 220, 0.5)' }}>X</span>press
          {/* </motion.span> */}

        </Text>
        <Button onClick={toggleColorMode} variant={'ghost'}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>

      <EditorComp colorMode={colorMode} />
    </VStack >

  )
}
