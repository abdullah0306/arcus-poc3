'use client'

import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  Grid,
  HStack,
  IconButton,
  VStack,
  Flex,
} from '@chakra-ui/react'
import { Page } from '@saas-ui-pro/react'
import { LuChevronLeft, LuChevronRight, LuPlus } from 'react-icons/lu'

const TimeSlots = () => {
  const times = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 || 12
    const ampm = i < 12 ? 'AM' : 'PM'
    return `${hour} ${ampm}`
  })

  return (
    <VStack align="stretch" spacing={0} pt={12}>
      {times.map((time) => (
        <Box key={time} h="60px" borderBottomWidth="1px" borderColor="gray.100" px={2}>
          <Text fontSize="sm" color="gray.500" mt="-10px">
            {time}
          </Text>
        </Box>
      ))}
    </VStack>
  )
}

const WeekView = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const currentDate = new Date(2025, 4, 13) // May 13, 2025
  const startOfWeek = new Date(currentDate)
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()) // Start from Sunday

  return (
    <Grid templateColumns="60px 1fr" w="full">
      <Box /> {/* Empty space for time column */}
      <Grid templateColumns="repeat(7, 1fr)">
        {days.map((day, index) => {
          const date = new Date(startOfWeek)
          date.setDate(startOfWeek.getDate() + index)
          const isToday = date.getDate() === currentDate.getDate()

          return (
            <Box key={day} textAlign="center" py={2}>
              <Text fontSize="sm" color="gray.600">
                {day}
              </Text>
              <Text
                fontSize="sm"
                fontWeight={isToday ? "bold" : "normal"}
                color={isToday ? "brand.500" : "gray.800"}
              >
                {date.getDate()}
              </Text>
            </Box>
          )
        })}
      </Grid>
    </Grid>
  )
}

const CalendarGrid = () => {
  return (
    <Grid templateColumns="60px 1fr" flex={1} overflow="auto">
      <TimeSlots />
      <Grid templateColumns="repeat(7, 1fr)" borderLeftWidth="1px" borderColor="gray.100">
        {Array.from({ length: 7 }).map((_, dayIndex) => (
          <Box key={dayIndex} borderRightWidth="1px" borderColor="gray.100">
            {Array.from({ length: 24 }).map((_, hourIndex) => (
              <Box
                key={hourIndex}
                h="60px"
                borderBottomWidth="1px"
                borderColor="gray.100"
                _hover={{ bg: 'gray.50' }}
                cursor="pointer"
              />
            ))}
          </Box>
        ))}
      </Grid>
    </Grid>
  )
}

export default function CalendarPage() {
  return (
    <Page height="100vh">
      <Stack spacing={0} height="100%">
        <Box bg="white" px={6} py={4}>
          <Stack spacing={1}>
            <Heading size="lg">Calendar</Heading>
            <Text color="gray.600">Schedule and manage your appointments</Text>
          </Stack>
        </Box>

        <Box bg="gray.100" flex={1} p={6} overflowY="auto">
          <Box bg="white" borderRadius="lg" shadow="sm" maxH="calc(100vh - 140px)">
            <Stack spacing={0}>
              <Box px={6} py={4} borderBottomWidth="1px" borderColor="gray.100">
                <Flex justify="space-between" align="center">
                  <HStack spacing={4}>
                    <IconButton
                      aria-label="Previous week"
                      icon={<LuChevronLeft />}
                      variant="ghost"
                      colorScheme="gray"
                    />
                    <Heading size="md">May 2025</Heading>
                    <Text color="gray.600">Week 20, May 11 - May 17, 2025</Text>
                    <IconButton
                      aria-label="Next week"
                      icon={<LuChevronRight />}
                      variant="ghost"
                      colorScheme="gray"
                    />
                  </HStack>
                  
                  <HStack spacing={4}>
                    <Button variant="ghost" colorScheme="gray">Today</Button>
                    <Button leftIcon={<LuPlus />} colorScheme="brand">Add event</Button>
                  </HStack>
                </Flex>
              </Box>

              <Box maxH="calc(100vh - 210px)" overflowY="auto">
                <WeekView />
                <CalendarGrid />
              </Box>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Page>
  )
}
