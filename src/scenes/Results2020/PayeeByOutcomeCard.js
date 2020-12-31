import React from 'react'
import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Rhythm from 'components/Rhythm'
import { Amount } from 'components/Amount'
import { getUserCurrencyCode } from 'store/serverData'
import pluralize from 'helpers/pluralize'
import { Card } from './Card'

export function PayeeByOutcomeCard({ byPayee }) {
  const currency = useSelector(getUserCurrencyCode)
  const sortedPayees = Object.keys(byPayee).sort(
    (a, b) => byPayee[b].outcome - byPayee[a].outcome
  )
  const topPayee = sortedPayees[0]
  const transactions = byPayee[topPayee].outcomeTransactions.length
  const outcome = byPayee[topPayee].outcome

  return (
    <Card>
      <Rhythm gap={1}>
        <Typography variant="h4" align="center">
          {topPayee}
        </Typography>
        <Typography variant="body1" align="center">
          Здесь вы оставили{' '}
          <Amount
            value={outcome}
            currency={currency}
            noShade
            decMode="ifOnly"
          />{' '}
          ({transactions}
          {' '}
          {pluralize(transactions, ['покупка', 'покупки', 'покупок'])})
        </Typography>
      </Rhythm>
    </Card>
  )
}
