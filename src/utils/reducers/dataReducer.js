const reducer = (state = [], action) => {
  switch (action.type) {
    case 'PREVIEW_DATA':
      return action.data
    default:
      return state
  }
}

export const previewData = data => {
  return dispatch => {
    dispatch({
      type: 'PREVIEW_DATA',
      data: data
    })
  }
}

export default reducer
