import React, { FC } from 'react'
import { Typography, Box, Button, Menu, MenuItem } from '@mui/material'
import { ChevronDownIcon } from '@shared/ui/Icons'
import { TISOMonth } from '@shared/types'
import { usePopoverMethods, usePopoverProps } from '@shared/ui/PopoverManager'

import { GoalsProgress } from '@features/bulkActions/fillGoals'
import { rowStyle, useIsSmall } from '../shared/shared'
import { MonthSelect } from './MonthSelect'
import { ToBeBudgeted } from './ToBeBudgeted'
import { Metric } from '../models/useMetric'

type HeaderProps = {
  month: TISOMonth
  metric: Metric
  isAllShown: boolean
  isReordering: boolean
  onShowAllToggle: () => void
  onReorderModeToggle: () => void
  onOpenOverview: () => void
  onMetricSwitch: () => void
}

export const Header: FC<HeaderProps> = props => {
  const {
    month,
    metric,
    isAllShown,
    isReordering,
    onShowAllToggle,
    onReorderModeToggle,
    onOpenOverview,
    onMetricSwitch,
  } = props
  const isSmall = useIsSmall()
  const { openOnClick } = usePopoverMethods('tableMenu')

  return (
    <>
      <Box
        sx={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          position: 'sticky',
          top: 0,
          borderBottom: `1px solid black`,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          zIndex: 99,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            p: 1,
            gap: 2,
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            position: 'sticky',
            top: 0,
            zIndex: 9,
          }}
        >
          <MonthSelect />

          <Box sx={{ display: 'flex', gap: 2 }}>
            {!isSmall && <GoalsProgress month={month} />}
            <ToBeBudgeted onClick={onOpenOverview} />
          </Box>
        </Box>

        <Box sx={rowStyle}>
          <div>
            <Button
              size="small"
              onClick={openOnClick}
              sx={{ ml: -1, px: 1, py: 0 }}
            >
              <Typography variant="overline" color="text.secondary" noWrap>
                Категории{isAllShown && ' (все)'}
              </Typography>
              <ChevronDownIcon />
            </Button>
          </div>

          {(metric === Metric.budgeted || !isSmall) && (
            <Typography
              variant="overline"
              color="text.secondary"
              align="right"
              onClick={onMetricSwitch}
              noWrap
            >
              Бюджет
            </Typography>
          )}

          {(metric === Metric.outcome || !isSmall) && (
            <Typography
              variant="overline"
              color="text.secondary"
              align="right"
              onClick={onMetricSwitch}
              noWrap
            >
              Операции
            </Typography>
          )}

          {(metric === Metric.available || !isSmall) && (
            <Typography
              variant="overline"
              color="text.secondary"
              align="right"
              onClick={onMetricSwitch}
              noWrap
            >
              Доступно
            </Typography>
          )}
        </Box>
      </Box>

      <TableMenu
        isAllShown={isAllShown}
        isReordering={isReordering}
        onShowAllToggle={onShowAllToggle}
        onReorderModeToggle={onReorderModeToggle}
      />
    </>
  )
}

type TableMenuProps = {
  isAllShown: boolean
  isReordering: boolean
  onShowAllToggle: () => void
  onReorderModeToggle: () => void
}

function TableMenu(props: TableMenuProps) {
  const { onShowAllToggle, onReorderModeToggle, isReordering, isAllShown } =
    props
  const popoverProps = usePopoverProps('tableMenu')
  return (
    <Menu {...popoverProps}>
      <MenuItem
        onClick={() => {
          popoverProps.onClose()
          onShowAllToggle()
        }}
      >
        {isAllShown ? 'Скрыть часть категорий' : 'Показать все категории'}
      </MenuItem>
      <MenuItem
        onClick={() => {
          popoverProps.onClose()
          onReorderModeToggle()
        }}
      >
        {isReordering ? 'Скрыть таскалки' : 'Изменить порядок категорий'}
      </MenuItem>
    </Menu>
  )
}