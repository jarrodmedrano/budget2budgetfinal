import { NAVIGATE_TO } from "../actions/types";

const initialState = {
  route: "/"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NAVIGATE_TO:
      return {
        route: action.payload
      };
    default:
      return state;
  }
}
