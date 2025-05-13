'use client'

import { useState } from 'react'

import {
  Box,
  Card,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Button
} from '@chakra-ui/react'
import {
  ErrorPage,
  Page,
  PageBody,
  PageHeader,
  Toolbar,
} from '@saas-ui-pro/react'
import { LoadingOverlay, LoadingSpinner } from '@saas-ui/react'

import {
  DateRange,
  DateRangePicker,
  DateRangePresets,
  getRangeDiff,
  getRangeValue,
} from '@acme/ui/date-picker'
import { SegmentedControl } from '@acme/ui/segmented-control'

import { WorkspacePageProps } from '#lib/create-page'
import { api } from '#lib/trpc/react'
import { useAuth } from '@saas-ui/auth-provider'
import { TrendGraph } from './metrics/trend-graph'

export function DashboardPage(props: WorkspacePageProps) {
  const { user } = useAuth()
  const [range, setRange] = useState('30d')
  const [dateRange, setDateRange] = useState(getRangeValue('30d'))
  const onPresetChange = (preset: string) => {
    if (preset !== 'custom') {
      setDateRange(getRangeValue(preset as DateRangePresets))
    }
    setRange(preset)
  }

  const onRangeChange = (range: DateRange) => {
    const diff = getRangeDiff(range)
    if ([1, 3, 7, 30].includes(diff)) {
      setRange(`${diff}`)
    } else {
      setRange('custom')
    }

    setDateRange(range)
  }

  const { data, isLoading } = api.dashboard.get.useQuery(
    {
      workspaceId: props.params.workspace,
      startDate: dateRange.start.toString(),
      endDate: dateRange.end.toString(),
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    },
  )

  if (!isLoading && !data) {
    return (
      <ErrorPage
        title="No workspace found"
        description={`We couldn't find a workspace named ${props.params.workspace}`}
      />
    )
  }

  const toolbar = (
    <Toolbar className="overview-toolbar" variant="ghost">
      {/* Empty toolbar - removed social media buttons */}
    </Toolbar>
  )

  const footer = (
    <Toolbar justifyContent="flex-start" variant="secondary" size="xs">
      <SegmentedControl
        size="xs"
        segments={[
          {
            id: '1d',
            label: '1d',
          },
          {
            id: '3d',
            label: '3d',
          },
          {
            id: '7d',
            label: '7d',
          },
          { id: '30d', label: '30d' },
          { id: 'custom', label: 'Custom' },
        ]}
        value={range}
        onChange={onPresetChange}
      />
      <DateRangePicker value={dateRange} onChange={onRangeChange} />
    </Toolbar>
  )

  const body = isLoading ? (
    <LoadingOverlay>
      <LoadingSpinner />
    </LoadingOverlay>
  ) : (
    <Stack spacing={10} pb={{ base: 10, xl: 16 }}>
      <Stack direction="row" justify="space-between" align="flex-start">
        <Box>
          <Heading size="lg" mb={2}>Good morning, {user?.name || 'User'}!</Heading>
          <Text color="gray.500">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</Text>
        </Box>
        <Box textAlign="right" bg="white" p={4} borderRadius="xl" boxShadow="sm" minW="300px">
          <Text color="gray.600" fontSize="sm" mb={1}>Current Period</Text>
          <Text color="gray.900" fontWeight="medium">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </Text>
        </Box>
      </Stack>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        {/* Active Projects Card */}
        <Card p={6} bg="white" boxShadow="sm" borderRadius="xl">
          <Stack spacing={6}>
            <Text color="gray.600" fontSize="sm">Active projects</Text>
            <Stack>
              <Stack direction="row" align="center" spacing={4}>
                <Heading size="lg">18</Heading>
                <Text color="green.500" fontSize="sm">↑ 15% vs last month</Text>
              </Stack>
              <TrendGraph 
                data={[10, 8, 12, 9, 11, 13, 15, 14, 16, 17, 18]} 
                color="#48BB78"
              />
            </Stack>
            <Button variant="ghost" size="sm" colorScheme="gray">View report</Button>
          </Stack>
        </Card>

        {/* Website Visits Card */}
        <Card p={6} bg="white" boxShadow="sm" borderRadius="xl">
          <Stack spacing={6}>
            <Text color="gray.600" fontSize="sm">Website visits</Text>
            <Stack>
              <Stack direction="row" align="center" spacing={4}>
                <Heading size="lg">654</Heading>
                <Text color="red.500" fontSize="sm">↓ 17% vs last month</Text>
              </Stack>
              <TrendGraph 
                data={[500, 600, 550, 700, 650, 600, 580, 570, 560, 550, 540]} 
                color="#E53E3E"
              />
            </Stack>
            <Button variant="ghost" size="sm" colorScheme="gray">View report</Button>
          </Stack>
        </Card>

        {/* New Customers Card */}
        <Card p={6} bg="white" boxShadow="sm" borderRadius="xl">
          <Stack spacing={6}>
            <Text color="gray.600" fontSize="sm">New customers</Text>
            <Stack>
              <Stack direction="row" align="center" spacing={4}>
                <Heading size="lg">4</Heading>
                <Text color="green.500" fontSize="sm">↑ 8% vs last month</Text>
              </Stack>
              <TrendGraph 
                data={[2, 1, 3, 2, 4, 3, 2, 3, 4, 3, 4]} 
                color="#48BB78"
              />
            </Stack>
            <Button variant="ghost" size="sm" colorScheme="gray">View report</Button>
          </Stack>
        </Card>

        {/* System Types Card */}
        <Card p={6} bg="white" boxShadow="sm" borderRadius="xl">
          <Stack spacing={6}>
            <Stack direction="row" justify="space-between">
              <Text color="gray.600" fontSize="sm">System types</Text>
              <Text color="gray.600" fontSize="sm">Distribution</Text>
            </Stack>
            <Box height="200px" position="relative">
              <Box
                as="svg"
                viewBox="0 0 36 36"
                width="100%"
                height="100%"
                position="absolute"
              >
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#ED8936"
                  strokeWidth="3.6"
                  strokeDasharray="85 15"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#ECC94B"
                  strokeWidth="3.6"
                  strokeDasharray="15 85"
                  strokeDashoffset="-15"
                />
              </Box>
            </Box>
            <Stack spacing={2}>
              <Stack direction="row" align="center" spacing={2}>
                <Box w="2" h="2" borderRadius="full" bg="orange.500" />
                <Text fontSize="sm" color="gray.600">Alarms</Text>
              </Stack>
              <Stack direction="row" align="center" spacing={2}>
                <Box w="2" h="2" borderRadius="full" bg="yellow.500" />
                <Text fontSize="sm" color="gray.600">Detectors</Text>
              </Stack>
              <Stack direction="row" align="center" spacing={2}>
                <Box w="2" h="2" borderRadius="full" bg="teal.500" />
                <Text fontSize="sm" color="gray.600">Cabling</Text>
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </SimpleGrid>
    </Stack>
  )

  return (
    <Page isLoading={isLoading}>
      <PageHeader toolbar={toolbar} footer={footer} />
      <PageBody
        contentWidth="container.2xl"
        bg="gray.50"
        pt={{ base: 8, xl: 12 }}
        pb={{ base: 16, xl: 20 }}
        px={{ base: 6, xl: 10 }}
      >
        {body}
      </PageBody>
    </Page>
  )
}