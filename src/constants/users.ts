export enum UserAuthLevel {
  'ADMIN', 'STORE_OWNER', 'EMPLOYEE'
}

export const UserInitialState = {
  username: '',
  authLevel: 2,
  isLoggedIn: false,
};
