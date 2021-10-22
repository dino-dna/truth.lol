import { fsaIdentityActionCreator } from "../../util/action-creator";

// actions
export const SET_BACKGROUND_IMAGE_ELEMENT_DIMENSIONS =
  "SET_BACKGROUND_IMAGE_ELEMENT_DIMENSIONS";
export const SET_BACKGROUND_NATURAL_DIMENSIONS =
  "SET_BACKGROUND_NATURAL_DIMENSIONS";

// reducer
export default function reducer(
  state = {
    elementDimensions: { width: "100%", height: "100%" },
    naturalDimensions: { width: 0, height: 0 },
  },
  action
) {
  const payload = action.payload;
  switch (action.type) {
    case SET_BACKGROUND_IMAGE_ELEMENT_DIMENSIONS:
      return Object.assign({}, state, { elementDimensions: payload });
    case SET_BACKGROUND_NATURAL_DIMENSIONS:
      return Object.assign({}, state, { naturalDimensions: payload });
    default:
      return state;
  }
}

// action creators
export const setBackgroundImageElementStyles = fsaIdentityActionCreator(
  SET_BACKGROUND_IMAGE_ELEMENT_DIMENSIONS
);
export const setBackgroundNaturalDimensions = fsaIdentityActionCreator(
  SET_BACKGROUND_NATURAL_DIMENSIONS
);
