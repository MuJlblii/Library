import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import style from './form-status-block.module.css';

export interface IFormStatusBlockProps {
    title: string,
    text: string,
    btnLink?: string,
    btnText?: string,
    btnSubmitHandler?: () => void,
}

export const FormStatusBlock = ({ title, text, btnLink, btnText, btnSubmitHandler }: IFormStatusBlockProps) => {
    const classes = classNames.bind(style);

    return (
        <div className={style.wrapper} data-test-id='status-block'>
            <p className={classes('title')}>{title}</p>
            <p className={classes('text')}>{text}</p>
            {btnLink && 
                <NavLink to={btnLink}><button type="submit" className={style.button}>{btnText}</button></NavLink>
            }
            {!btnLink && btnSubmitHandler &&
                <button type="submit" className={style.button} onClick={() => btnSubmitHandler()}>{btnText}</button>}
        </div>
    )
}