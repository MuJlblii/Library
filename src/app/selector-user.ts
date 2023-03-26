import { UserStateType } from './reducer-user';

// const userProfile = useSelector((state: UserStateType) => state.user.userProfile);

export const selectProfile = (state: UserStateType) => state.user.userProfile;
export const selectUser = (state: UserStateType) => state.user.User;