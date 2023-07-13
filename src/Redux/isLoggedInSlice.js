import { createSlice } from '@reduxjs/toolkit';

// Cria o slice para o estado de login
export const loggedInSlice = createSlice({
  // Define o nome do slice
  name: 'loggedIn',
  // Define o estado inicial do slice
  initialState: false,
  // Define os reducers para atualizar o estado do slice
  reducers: {
    // Reducer para mudar o estado para true (quando logado)
    login: () => true,
    // Reducer para mudar o estado para false (quando deslogado)
    logout: () => false,
  },
});

// Exporta as ações geradas pelo slice
export const { login, logout } = loggedInSlice.actions;

// Exporta o reducer gerado pelo slice
export default loggedInSlice.reducer;
