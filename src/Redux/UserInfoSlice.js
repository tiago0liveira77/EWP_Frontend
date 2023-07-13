import { createSlice } from '@reduxjs/toolkit';

// Cria um slice do Redux para gerenciar as informações do usuário
export const userInfoSlice = createSlice({
  name: 'userInfo', // Nome do slice
  initialState: {
    name: '',
    email: null,
    creationDate: '',
    accessLevel: '',
    status: '',
    cellphone: ''
  }, // Estado inicial, contendo as informações do usuário
  reducers: {
    // Define a função "updateUserInfo" que recebe um objeto "payload"
    // contendo as novas informações do usuário e atualiza o estado do slice
    updateUserInfo: (state, action) => {
      return { ...state, ...action.payload }
    },
  },
});

// Exporta a ação "updateUserInfo"
export const { updateUserInfo } = userInfoSlice.actions;
