import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  beerbiceps: {
    userID: "beerbiceps",
    profilePic:
      "https://i.pinimg.com/originals/08/1b/f6/081bf6e08af1bc9b7b8c67835842f947.jpg",
    followers: "7M",
    following: 200,
    name: "Ranveer Allahbadia",
    category: "Entrepneure",
    bio: "Founder of Beer💪🏼 and busy building 5000 startups..",
    verified: true
  },
  rohitdhas_11: {
    userID: "rohitdhas_11",
    profilePic: "https://avatars.githubusercontent.com/u/53969450?v=4",
    followers: "7.6B",
    following: 200,
    name: "Rohit Dhas",
    category: "Programmer",
    bio: "I Write Code👨🏼‍💻",
    verified: true
  },
  carryminati: {
    userID: "carryminati",
    profilePic:
      "data:image/jpeg;base64,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",
    followers: "12M",
    following: 750,
    name: "Ajay Nagar",
    category: "Youthober",
    bio: "Ye Apna Official hai.",
    verified: true
  },
  viraj_seth: {
    userID: "viraj_seth",
    profilePic:
      "https://monk-e.in/assets/images/Our-Team/02%20Viraj%20Color.jpg",
    followers: "432k",
    following: 232,
    name: "Viraj Seth",
    category: "Entrepneure",
    bio: "Co-founder of Monk-E!",
    verified: true
  },
  "mangesh.07": {
    userID: "mangesh.07",
    profilePic:
      "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-24.jpg",
    followers: "44M",
    following: 1,
    name: "Mangesh Shinde",
    category: "Public Figure",
    bio: "Mahakal ka bhakt...🕉",
    verified: false
  },
  mayur_shinde: {
    userID: "mayur_shinde",
    profilePic:
      "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-24.jpg",
    followers: "21M",
    following: 131,
    name: "Mayur Shinde",
    category: "",
    bio: "😎Lucifer😎",
    verified: false
  },
  kamlesh_sabale: {
    userID: "kamlesh_sabale_11",
    profilePic:
      "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-24.jpg",
    followers: "12M",
    following: 159,
    name: "Kamlesh Sabale",
    category: "Fitness Model",
    bio: "👔Mr.Beast",
    verified: true
  },
  silent_device: {
    userID: "silent_device",
    profilePic:
      "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-24.jpg",
    followers: "18M",
    following: 795,
    name: "Vaibhav Dhas",
    category: "Artist",
    bio: "🅱🅸🆁🆃🅷🅳🅰🆈 🎂..... 12 🅳🅴🅲",
    verified: false
  },
  sush_shinde11: {
    userID: "sush_shinde11",
    profilePic:
      "https://0.academia-photos.com/21801803/9307291/10374065/s200_sushma.shinde.jpg",
    followers: "4M",
    following: 345,
    name: "Sushma Shinde",
    category: "Software Engineer",
    bio: "Kaizen🤗",
    verified: true
  },
  charlieputh: {
    userID: "charlieputh",
    profilePic:
      "https://static.wikia.nocookie.net/littlemix/images/b/b5/Charlie_puth_shoot.jpg/revision/latest/top-crop/width/360/height/450?cb=20180114181214",
    followers: "14M",
    following: 234,
    name: "Charlie Puth",
    category: "Artist",
    bio: "💡",
    verified: true
  },
  justinbieber: {
    userID: "justinbieber",
    profilePic:
      "data:image/jpeg;base64,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",
    followers: "177M",
    following: 534,
    name: "Justin Bieber",
    category: "Artist",
    bio: "JUSTICE the album out now",
    verified: true
  },
  vivianakadivine: {
    userID: "vivianakadivine",
    profilePic:
      "data:image/jpeg;base64,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",
    followers: "3.4M",
    following: 534,
    name: "DIVINE",
    category: "Musician/Band",
    bio: "gullygangindia - 59 ✝",
    verified: true
  }
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    getUserData: (state, action) => {
      const [id, name] = action.payload;
      state[id] = {
        userID: id,
        profilePic:
          "https://energies2050.org/wp-content/uploads/2017/01/beweship-contact-placeholder.jpg",
        followers: 0,
        following: 0,
        name,
        bio: "",
        category: "",
        verified: false
      };
    }
  }
});

export const { getUserData } = userProfileSlice.actions;

export default userProfileSlice.reducer;
