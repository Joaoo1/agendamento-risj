const TOKEN_KEY = '@agendamentorisj/token_key';
const ADMIN_USER_NAME_KEY = '@agendamentorisj/admin_user_name_key';

const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

const getToken = () => localStorage.getItem(TOKEN_KEY);
const getAdminUserName = () => localStorage.getItem(ADMIN_USER_NAME_KEY);

const login = ({ token, name }) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ADMIN_USER_NAME_KEY, name);
};

const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_USER_NAME_KEY);
};

export { isAuthenticated, getToken, getAdminUserName, login, logout };
