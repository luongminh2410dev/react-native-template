import {GET_DATA_HOME_SUCCESS, SCROLL_TO_TOP, TOGGLE_MENU} from "./actions";
const initState = {
  visibleMenu: false,
  scrollToTop: 0,
  dataHome: {},
};
function appReducer(state = initState, action: any) {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        visibleMenu: action.data?.visible,
      };
    case SCROLL_TO_TOP:
      return {
        ...state,
        scrollToTop: (state.scrollToTop += 1),
      };
    case GET_DATA_HOME_SUCCESS:
      return {
        ...state,
        dataHome: action.data,
      };
    default:
      return state;
  }
}

export default appReducer;
