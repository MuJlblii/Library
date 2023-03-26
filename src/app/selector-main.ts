import { IstateRedux } from './reducer';

export const selectMain = (stateRedux: IstateRedux) => stateRedux.main;
export const selectToaster = (stateRedux: IstateRedux) => stateRedux.main.toasterMsg;
export const selectIsMobileView = (stateRedux: IstateRedux) => stateRedux.main.isMobileView;
export const selectBookshelfView = (stateRedux: IstateRedux) => stateRedux.main.bookShelfView;
export const selectIsDesktopView = (stateRedux: IstateRedux) => stateRedux.main.isDesktopView;
export const selectCategories = (stateRedux: IstateRedux) => stateRedux.main.categories;
export const selectBooks = (stateRedux: IstateRedux) => stateRedux.main.data;