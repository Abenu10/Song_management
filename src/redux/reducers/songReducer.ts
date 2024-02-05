const songReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_SONGS_SUCCESS':
      return action.payload;
    case 'FETCH_SONGS_FAILURE':
      return state;
    default:
      return state;
  }
};

export default songReducer;