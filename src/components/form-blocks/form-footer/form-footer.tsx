import { NavLink } from 'react-router-dom';

import {ReactComponent as IconArrowRight} from '../../../assets/img/Icon_arrow_right.svg';

import style from './form-footer.module.css';


export interface IFormFooter {
    questionMessage: string,
    link: string,
    linkMessage: string,
}

export const FormFooter = ({questionMessage, link, linkMessage}: IFormFooter) => (
    <div className={style.form__footer}>
        <p className={style.form__footer_msg}>{questionMessage}</p>
        <NavLink to={link} className={style.form__footer_link}><span>{linkMessage}</span><IconArrowRight /></NavLink>
    </div>
)