
const booksLoaded = (newBooks) => {
  return {
    type: 'FETCH_BOOKS_SUCCESS',
    payload: newBooks
  };
};

const booksRequested = () => {
	return {
		type: 'FETCH_BOOKS_REQUEST'
	}
}

const errorRequest = (payload) => {
	return {
		type: 'FETCH_BOOKS_FAILURE',
		payload
	}
}

const fetchBooks = (bookstoreService, dispatch) => () => {
	dispatch(booksRequested());
	bookstoreService.getBooks()
		.then((data) => dispatch(booksLoaded(data)))
		.catch((error) => dispatch(errorRequest(error)));
}

const bookAddedToCart = (bookId) => {
	return {
		type: 'BOOK_ADDED_TO_CART',
		payload: bookId
	}
}

const bookRemovedFromCart = (bookId) => {
	return {
		type: 'BOOK_REMOVED_FROM_CART',
		payload: bookId
	}
}

const allBookRemovedFromCart = (bookId) => {
	return {
		type: 'ALL_BOOK_REMOVED_FROM_CART',
		payload: bookId
	}
}

export {
	fetchBooks,
	bookAddedToCart,
	bookRemovedFromCart,
	allBookRemovedFromCart
};
