import { UserStateType } from './reducer-user';

export const selectProfile = (state: UserStateType) => state.user.userProfile;
export const selectUser = (state: UserStateType) => state.user.User;
export const selectJWTToken = (stateRedux: UserStateType) => stateRedux.user.JWTtoken;
export const selectUserId = (stateRedux: UserStateType) => stateRedux.user.User?.id;