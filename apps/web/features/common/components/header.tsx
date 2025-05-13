import { Button, HStack, Icon } from '@chakra-ui/react'
import { AppShellHeader } from '@saas-ui-pro/react'
import { LuBell, LuSearch } from 'react-icons/lu'

export function AppHeader() {
  return (
    <AppShellHeader
      borderBottomWidth="1px"
      height="14"
      px="4"
      bg="white"
    >
      <HStack spacing="4" justify="flex-end" flex="1">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<Icon as={LuSearch} boxSize="4" />}
        >
          Search
        </Button>
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<Icon as={LuBell} boxSize="4" />}
        >
          Notifications
        </Button>
      </HStack>
    </AppShellHeader>
  )
}
