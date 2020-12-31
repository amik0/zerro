import React from 'react'
import { Typography } from '@material-ui/core'
import Rhythm from 'components/Rhythm'
import pluralize from 'helpers/pluralize'
import { Card } from './Card'

export function NoCategoryCard({ value }) {
  return (
    <Card>
      <Rhythm gap={1}>
        {value ? (
          <>
            <Typography variant="h4" align="center">
              {value} {pluralize(value, ['операция', 'операции', 'операций'])}
            </Typography>
            <Typography variant="body1" align="center">
              {pluralize(value, ['осталась', 'остались', 'остались'])} без
              категории
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h4" align="center">
              👍
            </Typography>
            <Typography variant="body1" align="center">
              Круто! Ни одной операции без категории!
            </Typography>
          </>
        )}
      </Rhythm>
    </Card>
  )
}
