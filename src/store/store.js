function reducer(state = false, action) {
    switch (action.type) {
      case "OPEN_DIALOG":
        return {
          dialog: !state.dialog
        };
      default:
        return state;
    }
  }
  
  export default reducer;