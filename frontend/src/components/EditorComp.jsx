import React, { useRef, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import { Button, Text, Flex, Stack, IconButton, useDisclosure, Input, FormLabel, FormControl, Box, Spinner } from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'

import axios from 'axios'





export default function EditorComp({ colorMode }) {
    const [fontSize, setFontSize] = React.useState(14)
    const [tabSpace, setTabSpace] = React.useState(4)
    const [wordWrap, setWordWrap] = React.useState('on')
    const [selectedFont, setSelectedFont] = React.useState('Monaco,monoace');
    const [output, setOutput] = React.useState('')

    const [loading, setLoading] = React.useState(false)



    const editorRef = useRef(null)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const settingRef = React.useRef()

    function handleEditorDidMount(editor) {
        editorRef.current = editor;
    }




    const tabSpaces = [1, 2, 3, 4, 5, 6, 7, 8];

    const fontOptions = [
        { label: 'Default', value: 'Menlo' },
        { label: 'Fira Code', value: 'Fira Code, monospace' },
        { label: 'Consolas', value: 'Consolas, monospace' },
        { label: 'Monaco', value: 'Monaco, monospace' },
        { label: 'Inconsolata', value: 'Inconsolata, monospace' },
        { label: 'Source Code Pro', value: 'Source Code Pro, monospace' },
        { label: 'Roboto Mono', value: 'Roboto Mono, monospace' },
        { label: 'Cascadia Code', value: 'Cascadia Code, monospace' },
        { label: 'Dank Mono', value: 'Dank Mono, monospace' },
        { label: 'JetBrains Mono', value: 'JetBrains Mono, monospace' },
        { label: 'Operator Mono', value: 'Operator Mono, monospace' },
        { label: 'Ubuntu Mono', value: 'Ubuntu Mono, monospace' },
        { label: 'Hack', value: 'Hack, monospace' },
        { label: 'DejaVu Sans Mono', value: 'DejaVu Sans Mono, monospace' },
        { label: 'Courier Prime Code', value: 'Courier Prime Code, monospace' },
        { label: 'IBM Plex Mono', value: 'IBM Plex Mono, monospace' },
        { label: 'Monolisa', value: 'Monolisa, monospace' },
        { label: 'SF Mono', value: 'SF Mono, monospace' },
        // Add more fonts here...
    ];


    const files = {
        "script.py": {
            name: "script.py",
            ext: "py",
            language: "python",
            value: "print('Hello World')"
        },
        "script.js": {
            name: "script.js",
            ext: "js",
            language: "javascript",
            value: "console.log('Hello World')"
        },
        "script.cpp": {
            name: "script.cpp",
            ext: "cpp",
            language: "cpp",
            value: "#include <iostream>\n\nusing namespace std;\n\nint main() {\n\tcout << \"Hello World\";\n\treturn 0;\n}"
        }
    }

    const [filename, setFilename] = React.useState('script.cpp')
    const file = files[filename]
    const submitCode = async () => {
        const code = editorRef.current.getValue()
        console.log(file.ext, code)
        // alert(code);

        setLoading(true)
        try {

            const { data } = await axios.post('http://localhost:5001/run', {
                code: code,
                language: file.ext
            }, { crossorigin: true })
            console.log(data)
            setLoading(false)
            setOutput(data.output)
        } catch ({ response }) {
            console.log(response)
            if (response) {
                const errMsg = response.data.error.stderr
                setOutput(errMsg)
                setLoading(false)
            } else {
                setOutput('Error connecting to Server :(')
                setLoading(false)
            }

        }

    }


    const setDefaultLanguage = () => {
        window.localStorage.setItem('defaultLanguage', file.ext)

    }


    useEffect(() => {
        const defaultLanguage = window.localStorage.getItem('defaultLanguage')
        if (defaultLanguage) {
            setFilename(`script.${defaultLanguage}`)
        }
    }, [])


    return (
        <Flex h={'100vh'} w={'100vw'} mx={'auto'} p={0} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} my={-90}>
            <Flex w={'85%'} h={'5vh'} justifyContent={'space-between'} alignItems={'center'}>
                <Button w={'5vw'} mb={2} variant={'solid'} h={'20px'}
                    // bgGradient='linear(to-l, #7928CA, #FF0080)'
                    colorScheme='green'
                    onClick={submitCode}
                    size={'md'}
                    isLoading={loading}
                >Run</Button>
                <Flex mb={2} alignItems={'center'}>

                    <Button
                        onClick={setDefaultLanguage}
                        variant={'solid'}
                        colorScheme='green'
                        size={'md'}
                        height={'20px'}
                    >Set Default Language</Button>
                    <Flex p={2} textAlign={'center'} justifyContent={'center'} alignItems={'center'}>Language</Flex>
                    <Select w={'150px'} value={filename} onChange={(e) => setFilename(e.target.value)} variant={'filled'}>
                        <option value={'script.cpp'}>C++</option>
                        <option value={'script.py'}>Python</option>
                        <option value={'script.js'}>Javascript</option>
                    </Select>
                    {/* <Box as="button" onClick={() => setIsRotated((prevState) => !prevState)}> */}
                    {/* <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: isRotated ? 45 : 0 }}
                            transition={{ duration: 0.3 }}
                        > */}
                    <IconButton ref={settingRef}
                        variant={'link'}
                        // bgGradient='linear(to-l, #7928CA, #FF0080)'
                        color={'green.100'}
                        icon={<SettingsIcon />}
                        onClick={onOpen}
                        ml={3}
                    >

                    </IconButton>
                    {/* </motion.div> */}
                    {/* </Box> */}

                </Flex>
                <Drawer
                    isOpen={isOpen}
                    placement='right'
                    onClose={onClose}
                    finalFocusRef={settingRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>

                        <DrawerCloseButton />
                        <DrawerHeader>Editor Settings</DrawerHeader>

                        <DrawerBody>
                            <FormControl>

                                <FormLabel>Enter Font Size</FormLabel>
                                <Input
                                    variant={'filled'}
                                    placeholder='Enter Font Size'
                                    value={fontSize}
                                    onChange={(e) => setFontSize(e.target.value)}
                                />
                            </FormControl>
                            <FormControl mt={4}>

                                <FormLabel>Select Tab Space</FormLabel>
                                <Select variant={'filled'} placeholder='Select tab space' mt={4} value={tabSpace} onChange={e => setTabSpace(e.target.value)}>
                                    {
                                        tabSpaces.map((tabspace) => {
                                            return (
                                                <option key={tabspace} value={tabspace}>{tabspace}</option>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <FormControl mt={4}>

                                <FormLabel>Word Wrap</FormLabel>
                                <RadioGroup defaultValue={wordWrap} value={wordWrap} onChange={setWordWrap}>
                                    <Stack spacing={5} direction='row'>
                                        <Radio colorScheme='green' value='on'>
                                            On
                                        </Radio>
                                        <Radio colorScheme='red' value='off'>
                                            Off
                                        </Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>

                            <FormControl mt={4}>

                                <FormLabel>Select Font</FormLabel>
                                <Select variant={'filled'} value={selectedFont} onChange={(e) => setSelectedFont(e.target.value)}>
                                    {fontOptions.map((font) => (
                                        <option key={font.value} value={font.value}>
                                            {font.label}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>


                        </DrawerBody>

                        <DrawerFooter>
                            <Button variant='outline' mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='green' onClick={onClose}>Save</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </Flex>
            <Stack height={'60vh'} w={'85vw'} shadow={'dark-lg'} p={0} scrollBehavior={'smooth'} >

                <Editor
                    height={'60vh'}
                    width={'100%'}
                    path={file.name}
                    defaultLanguage={file.language}
                    theme={colorMode === 'light' ? 'light' : 'vs-dark'}
                    defaultValue={file.value}
                    onMount={handleEditorDidMount}
                    options={
                        {
                            fontSize: fontSize,
                            tabSize: tabSpace,
                            wordWrap: wordWrap,
                            fontFamily: selectedFont,

                        }
                    }
                />
            </Stack>
            <Box mt={3} h={'25vh'} overflow={'scroll'} w={'85vw'} backgroundColor={'blackAlpha.800'} color={'white'} fontSize={'15px'} shadow={'dark-lg'} p={2}>
                <pre>{output}</pre>
            </Box>

        </Flex >
    )
}
