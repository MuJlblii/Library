import iconFacebook from '../../assets/img/icon-facebook.png';
import iconInstagram from '../../assets/img/icon-instagram.png';
import iconLinkedIn from '../../assets/img/icon-linkedin.png';
import iconVK from '../../assets/img/icon-vk.png';

import style from './footer.module.css';

export const Footer = () => (
    <div className={style.footer}>
        <p className={style.footer__title}>© 2020-2023 Cleverland. Все права защищены.</p>
        <div className={style.footer__social}>
            <ul className={style.footer__social_list}>
                <li className={style.footer__social_wrapper}>
                    <img src={iconFacebook} alt='Facebook' />
                </li>
                <li className={style.footer__social_wrapper}>
                    <img src={iconInstagram} alt='Instagram' />
                </li>
                <li className={style.footer__social_wrapper}>
                    <img src={iconVK} alt='VK' />
                </li>
                <li className={style.footer__social_wrapper}>
                    <img src={iconLinkedIn} alt='LinkedIn' />
                </li>
            </ul>
        </div>
    </div>
)