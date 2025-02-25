// // reducers/viewTagsReducer.ts

// export type Tag = {
//   id: number;
//   name: string;
//   description: string;
// };

// export type State = {
//   items: Tag[];
// };

// export type Action =
//   | { type: "SET_ITEMS"; payload: Tag[] }
//   | { type: "EDIT_ITEM"; payload: { id: number; key: string; value: any } }
//   | { type: "DELETE_ITEM"; payload: number }
//   | { type: "CLEAR_ITEMS" };

// export const initialState: State = {
//   items: [], // Initial state with an empty list of tags
// };

// export const reducer = (state: State, action: Action): State => {
//   switch (action.type) {
//     case "SET_ITEMS":
//       return { ...state, items: action.payload };
//     case "EDIT_ITEM":
//       return {
//         ...state,
//         items: state.items.map((item) =>
//           item.id === action.payload.id
//             ? { ...item, [action.payload.key]: action.payload.value }
//             : item
//         ),
//       };
//     case "DELETE_ITEM":
//       return {
//         ...state,
//         items: state.items.filter((item) => item.id !== action.payload),
//       };
//     case "CLEAR_ITEMS":
//       return { ...state, items: [] };
//     default:
//       throw new Error(`Unhandled action type: ${(action as any).type}`);
//   }
// };

export interface Animal {
  id: string;
  name: string;
  species: string;
}

interface State {
  items: Animal[];
}

export const initialState: State = {
  items: [],
};

type Action =
  | { type: "SET_ANIMALS"; payload: Animal[] }
  | { type: "EDIT_ANIMAL"; payload: { id: string; key: string; value: string } }
  | { type: "DELETE_ANIMAL"; payload: string };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_ANIMALS":
      return { ...state, items: action.payload };

    case "EDIT_ANIMAL":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, [action.payload.key]: action.payload.value }
            : item
        ),
      };

    case "DELETE_ANIMAL":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};
