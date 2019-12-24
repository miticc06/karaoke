import React, { useState } from 'react'
import clsx from 'clsx'
import moment from 'moment'
import PerfectScrollbar from 'react-perfect-scrollbar'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from '@material-ui/core'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

import { StatusBullet } from 'components'
import mockData from './data'

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}))

const statusColors = {
  delivered: 'success',
  pending: 'info',
  refunded: 'danger'
}

const LatestOrders = props => {
  const { className, ...rest } = props

  const classes = useStyles()

  const [orders] = useState(mockData)

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Số</TableCell>
                  <TableCell>Người tạo</TableCell>
                  <TableCell sortDirection='desc'>
                    <Tooltip
                      enterDelay={300}
                      title='Sort'
                    >
                      <TableSortLabel
                        active
                        direction='desc'
                      >
                        Ngày tạo
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Trạng thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map(order => (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>{order.ref}</TableCell>
                    <TableCell>{order.customer.name}</TableCell>
                    <TableCell>
                      {moment(order.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={statusColors[order.status]}
                          size='sm'
                        />
                        {order.status}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color='primary'
          size='small'
          variant='text'
        >
          View all
          {' '}
          <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  )
}

LatestOrders.propTypes = {
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.string
}

export default LatestOrders
