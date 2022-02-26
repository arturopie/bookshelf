import bookPlaceholderSvg from '../assets/book-placeholder.svg'
import {useQuery} from 'react-query'
import {client} from './api-client.exercise'

const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  loadingBook: true,
}

function useBook(bookId, user) {
  const result = useQuery(['book', {bookId}], () =>
    client(`books/${bookId}`, {token: user.token}).then(data => data.book),
  )
  return {...result, book: result.data ?? loadingBook}
}

function useBookSearch(query, user) {
  const result = useQuery(['bookSearch', {query}], () =>
    client(`books?query=${encodeURIComponent(query)}`, {
      token: user.token,
    }).then(data => data.books),
  )
  return {...result, books: result.data ?? loadingBook}
}

export {useBook, useBookSearch}
