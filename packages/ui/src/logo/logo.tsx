import { FlexProps, Image, ImageProps, useColorMode } from '@chakra-ui/react'

export const Logo = (props: FlexProps) => {
  const { colorMode } = useColorMode()
  const logoSrc = colorMode === 'dark' ? 'https://sovanza.com/assert/asad/asad/Logo.svg' : 'https://sovanza.com/assert/asad/asad/Logo.svg'
  return <Image src={logoSrc} alt="Muhasaba AI" width="160px" {...props} />
}

export const LogoIcon = (props: ImageProps) => {
  const { colorMode } = useColorMode()
  const logoSrc = colorMode === 'dark' ? 'https://sovanza.com/assert/asad/asad/Logo.svg' : 'https://sovanza.com/assert/asad/asad/Logo.svg'
  return <Image src={logoSrc} alt="Muhasaba AI" {...props} />
}
