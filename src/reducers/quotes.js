export default (state = [], action) => {
  let index
  let quote

  switch(action.type) {
    case 'ADD_QUOTE':
      console.log('reducer action', action.quote)
      console.log('reducer state', state)
      return state.concat(action.quote)

    case 'REMOVE_QUOTE':
      return state.filter(quote => quote.id !== action.quoteId)

    case 'UPVOTE_QUOTE':
      // FIND THE INDEX OF MATCHING QUOTE IN THE STATE(array)
      index = state.findIndex(quote => quote.id == action.quoteId)
      // GET THE QUOTE
      quote = state[index]

      return [
        // MAKE A COPY OF THE QUOTE OBJECT AND ADD 'VOTES' ATTRIBUTE
        ...state.slice(0, index),
        Object.assign({}, quote, { votes: quote.votes += 1 }),
        ...state.slice(index + 1)
      ]

    case 'DOWNVOTE_QUOTE':
      index = state.findIndex(quote => quote.id == action.quoteId)
      quote = state[index]

      // IF THE QUOTE HAS ANY UPVOTE, APPLY DOWNVOTE
      if (quote.votes > 0){
        return [
          ...state.slice(0, index),
          Object.assign({}, quote, { votes: quote.votes -= 1 }),
          ...state.slice(index + 1)
        ]
      }
      // OTHERWISE, JUST RETURN THE STATE OF THE QUOTE
      return state

    default:
      return state

  }
}
