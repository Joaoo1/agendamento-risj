const TOKEN_KEY = '@agendamentorisj/token_key';

const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

const getToken = () => localStorage.getItem(TOKEN_KEY);

const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export { isAuthenticated, getToken, login, logout };
