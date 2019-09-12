const initialState = {
  fuga: 1
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case 'INCREMENT':
      // TODO
    default:
      return state
  }
}
