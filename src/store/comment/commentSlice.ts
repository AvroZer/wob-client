import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Comment {
    id: number;
    text: string;
    createdAt: string;
    updatedAt: string;
}

interface CommentState {
    comment: Comment[];
}

const initialState: CommentState = {
    comment: [],
};

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
      setComments: (state, action: PayloadAction<Comment[]>) => {
        state.comment = action.payload;
      },
      addComment: (state, action: PayloadAction<Comment>) => {
        state.comment.unshift(action.payload);
      },
    },
  });

export const { setComments, addComment } = commentSlice.actions;

export default commentSlice.reducer;
