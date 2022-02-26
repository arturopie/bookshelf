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

function useUpdateListItem(user) {
  const [update] = useMutation(listItem => {
    return client(`list-items/${listItem.id}`, {
      token: user.token,
      method: 'PUT',
      data: listItem,
    })
  }, invalidateListItemsQuery)
  return {update}
}

function useRemoveListItem(user) {
  const [remove] = useMutation(
    listItemId =>
      client(`list-items/${listItemId}`, {
        token: user.token,
        method: 'DELETE',
      }),
    invalidateListItemsQuery,
  )
  return {remove}
}

function useCreateListItem(user) {
  const [create] = useMutation(
    book => client('list-items', {data: {bookId: book.id}, token: user.token}),
    invalidateListItemsQuery,
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
