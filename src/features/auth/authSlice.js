import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch {
    // Ignore write errors
  }
};

const initialState = loadState() || {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      saveState(state);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      saveState(state);
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      saveState(state);
    },
  },
});

export const { loginSuccess, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';

// const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem('authState');
//     if (serializedState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   } catch (err) {
//     return undefined;
//   }
// };

// const saveState = (state) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem('authState', serializedState);
//   } catch {
//     // Ignore write errors
//   }
// };

// const initialState = loadState() || {
//   isLoggedIn: false,
//   user: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginSuccess: (state, action) => {
//       state.isLoggedIn = true;
//       state.user = action.payload;
//       saveState(state);
//     },
//     logout: (state) => {
//       state.isLoggedIn = false;
//       state.user = null;
//       saveState(state);
//     },
//   },
// });

// export const { loginSuccess, logout } = authSlice.actions;

// export default authSlice.reducer;