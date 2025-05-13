'use client'

import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  Center,
  Icon,
} from '@chakra-ui/react'
import { Page } from '@saas-ui-pro/react'
import { LuPlus } from 'react-icons/lu'

export default function ProjectsPage() {
  return (
    <Page height="100vh">
      <Stack spacing={0} height="100%">
        <Box bg="white" px={6} py={4}>
          <Stack spacing={1}>
            <Heading size="lg">My Projects</Heading>
            <Text color="gray.600">View and manage all your design projects</Text>
          </Stack>
        </Box>
        
        <Box bg="gray.100" px={6} py={6} flex={1}>
          <Stack spacing={6} height="100%">
            <Box display="flex" justifyContent="flex-end">
              <Button colorScheme="brand">Upload PDF</Button>
            </Box>
            <Box 
              bg="white" 
              borderRadius="lg" 
              p={8} 
              minH="400px"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Center flexDirection="column" gap={4}>
                <Box
                  w={12}
                  h={12}
                  borderRadius="full"
                  bg="brand.50"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={LuPlus} color="brand.400" boxSize={6} />
                </Box>
                <Heading size="md">No projects yet</Heading>
                <Text color="gray.500">Upload a PDF to create your first project</Text>
              </Center>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Page>
  )
}
