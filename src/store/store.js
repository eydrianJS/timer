function reducer(state, action) {
    switch (action.type) {
      case "OPEN_DIALOG":
        return {
          dialog: action.openDialog
        };
      default:
        return state;
    }
  }
  
  export default reducer;