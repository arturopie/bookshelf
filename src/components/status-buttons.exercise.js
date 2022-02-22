/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
import {
  FaCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaBook,
  FaTimesCircle,
} from 'react-icons/fa'
import Tooltip from '@reach/tooltip'
// 🐨 you'll need useQuery, useMutation, and queryCache from 'react-query'
// 🐨 you'll also need client from 'utils/api-client'
import {useAsync} from 'utils/hooks'
import * as colors from 'styles/colors'
import {CircleButton, Spinner} from './lib'
import {queryCache, useMutation, useQuery} from 'react-query'
import {client} from '../utils/api-client.exercise'

function TooltipButton({label, highlight, onClick, icon, ...rest}) {
  const {isLoading, isError, error, run} = useAsync()

  function handleClick() {
    run(onClick())
  }

  return (
    <Tooltip label={isError ? error.message : label}>
      <CircleButton
        css={{
          backgroundColor: 'white',
          ':hover,:focus': {
            color: isLoading
              ? colors.gray80
              : isError
              ? colors.danger
              : highlight,
          },
        }}
        disabled={isLoading}
        onClick={handleClick}
        aria-label={isError ? error.message : label}
        {...rest}
      >
        {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
      </CircleButton>
    </Tooltip>
  )
}

function StatusButtons({user, book}) {
  const {data: listItems, isSuccess} = useQuery('list-items', endpoint => {
    return client(endpoint, {token: user.token}).then(data => data.listItems)
  })

  const listItem = isSuccess ? listItems.find(i => i.bookId === book.id) : null

  const invalidateListItemsQuery = {
    onSettled: () => queryCache.invalidateQueries('list-items'),
  }
  const [update] = useMutation(
    data =>
      client(`list-items/${listItem.id}`, {
        token: user.token,
        method: 'PUT',
        data,
      }),
    invalidateListItemsQuery,
  )

  const [remove] = useMutation(
    () =>
      client(`list-items/${listItem.id}`, {
        token: user.token,
        method: 'DELETE',
      }),
    invalidateListItemsQuery,
  )

  const [create] = useMutation(
    () => client('list-items', {data: {bookId: book.id}, token: user.token}),
    invalidateListItemsQuery,
  )

  return (
    <React.Fragment>
      {listItem ? (
        Boolean(listItem.finishDate) ? (
          <TooltipButton
            label="Unmark as read"
            highlight={colors.yellow}
            onClick={() => update({id: listItem.id, finishDate: null})}
            icon={<FaBook />}
          />
        ) : (
          <TooltipButton
            label="Mark as read"
            highlight={colors.green}
            onClick={() => update({id: listItem.id, finishDate: Date.now()})}
            icon={<FaCheckCircle />}
          />
        )
      ) : null}
      {listItem ? (
        <TooltipButton
          label="Remove from list"
          highlight={colors.danger}
          onClick={remove}
          icon={<FaMinusCircle />}
        />
      ) : (
        <TooltipButton
          label="Add to list"
          highlight={colors.indigo}
          onClick={create}
          icon={<FaPlusCircle />}
        />
      )}
    </React.Fragment>
  )
}

export {StatusButtons}
