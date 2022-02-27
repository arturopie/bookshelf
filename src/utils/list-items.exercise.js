import {queryCache, useMutation, useQuery} from 'react-query'
import {client} from './api-client.exercise'

function useListItems(user) {
  const result = useQuery('list-items', endpoint => {
    return client(endpoint, {token: user.token}).then(data => data.listItems)
  })
  return {...result, listItems: result.data ?? []}
}

function useListItem(user, bookId) {
  const result = useListItems(user)

  return {
    ...result,
    listItem: result.listItems.find(i => i.bookId === bookId),
  }
}

const invalidateListItemsQuery = {
  onSettled: () => queryCache.invalidateQueries('list-items'),
}

function useUpdateListItem(user, options) {
  const [update, {error, isError}] = useMutation(
    listItem => {
      return client(`list-items/${listItem.id}`, {
        token: user.token,
        method: 'PUT',
        data: listItem,
      })
    },
    {...invalidateListItemsQuery, ...options},
  )
  return {update, error, isError}
}

function useRemoveListItem(user, options) {
  const [remove] = useMutation(
    listItemId =>
      client(`list-items/${listItemId}`, {
        token: user.token,
        method: 'DELETE',
      }),
    {...invalidateListItemsQuery, ...options},
  )
  return {remove}
}

function useCreateListItem(user, options) {
  const [create] = useMutation(
    book => client('list-items', {data: {bookId: book.id}, token: user.token}),
    {...invalidateListItemsQuery, ...options},
  )
  return {create}
}

export {
  useListItem,
  useUpdateListItem,
  useRemoveListItem,
  useCreateListItem,
  useListItems,
}
