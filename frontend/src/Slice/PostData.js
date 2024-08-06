import { createSlice } from "@reduxjs/toolkit";

export const postDataSlice = createSlice({
  name: "postData",
  initialState: {
    data: []
  },
  reducers: {
    likePost: (state, action) => {
      // let icon = document.querySelector(".like-post-" + action.payload);
      // icon.classList.add("active");

      // if (state[action.payload].isLiked) {
      // } else {
      //   state[action.payload].isLiked = true;
      //   ++state[action.payload].likes;
      // }

      // setTimeout(() => {
      //   icon.classList.remove("active");
      // }, 700);
    },
    handleLike: (state, action) => {
      // if (state[action.payload].isLiked) {
      //   state[action.payload].isLiked = false;
      //   state[action.payload].likes--;
      // } else {
      //   state[action.payload].isLiked = true;
      //   state[action.payload].likes++;
      // }
    },
    postComment: (state, action) => {
      // const [comment, id] = action.payload;

      // if (comment === "") return;
      // state[id].comments.push([viewerData.id, comment]);
    },
    sharePost: (state, action) => {
      // const [caption, location, src] = action.payload;

      // let newPostData = {
      //   profilePic:
      //     "https://energies2050.org/wp-content/uploads/2017/01/beweship-contact-placeholder.jpg",
      //   userID: viewerData.id,
      //   location,
      //   caption,
      //   postLink: src,
      //   likes: 0,
      //   isLiked: false,
      //   comments: [],
      //   postID: state.length
      // };

      // state.push(newPostData);
    }
  }
});

export const {
  likePost,
  handleLike,
  postComment,
  sharePost
} = postDataSlice.actions;
export default postDataSlice.reducer;
