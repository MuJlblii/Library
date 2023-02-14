import { useSelector } from 'react-redux';

import { IstateRedux } from '../../app/reducer';

import { Bookcard } from './bookcard';

import style from './bookshelf.module.css';
import lstyle from './bookshelf-list.module.css';


export const Bookshelf = () => {
    const state = useSelector((stateRedux: IstateRedux) => stateRedux.main);
    
    return (
        <div className={state.bookShelfView === 'Table' ? style.bookshelf__wrapper : lstyle.bookshelf__wrapper}>
            {state.currentCategory === 'all' && state.data.map((el) => el.list?.map(book => <Bookcard {...book} key={book.id} category={el.path}/>))}
            {state.data !== null && state.data.find(el => el.path === state.currentCategory)?.list?.map((book) => <Bookcard {...book} key={book.id} category={state.currentCategory}/>)}
        </div>

)};
