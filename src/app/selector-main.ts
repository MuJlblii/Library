import { StateReduxType } from './reducer';

export const selectMain = (stateRedux: StateReduxType) => stateRedux.main;
export const selectToaster = (stateRedux: StateReduxType) => stateRedux.main.toasterMsg;
export const selectIsMobileView = (stateRedux: StateReduxType) => stateRedux.main.isMobileView;
export const selectBookshelfView = (stateRedux: StateReduxType) => stateRedux.main.bookShelfView;
export const selectIsDesktopView = (stateRedux: StateReduxType) => stateRedux.main.isDesktopView;
export const selectCategories = (stateRedux: StateReduxType) => stateRedux.main.categories;
export const selectBooks = (stateRedux: StateReduxType) => stateRedux.main.data;
export const selectIsLoading = (stateRedux: StateReduxType) => stateRedux.main.isLoadingFetching;