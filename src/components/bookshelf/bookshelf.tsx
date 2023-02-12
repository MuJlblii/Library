import { useSelector } from 'react-redux';

import { IstateRedux } from '../../app/reducer';

import { Bookcard } from './bookcard';

import style from './bookshelf.module.css';
import lstyle from './bookshelf-list.module.css';


export const Bookshelf = () => {
    const state = useSelector((stateRedux: IstateRedux) => stateRedux.main);
    const allBooks = Object.values(state.data).flat();
    
    return (
        <div className={state.bookShelfView === 'Table' ? style.bookshelf__wrapper : lstyle.bookshelf__wrapper}>
            {state.currentCategory === 'all'
                ? allBooks.map((el) => <Bookcard {...el} key={el.id}/>)
                : Object.values(state.data[state.currentCategory]).map((el) => <Bookcard {...el} key={el.id}/>)
            }
        </div>

)};
