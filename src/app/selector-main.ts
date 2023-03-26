import { IstateRedux } from './reducer';

export const selectMain = (stateRedux: IstateRedux) => stateRedux.main;
export const selectToaster = (stateRedux: IstateRedux) => stateRedux.main.toasterMsg;