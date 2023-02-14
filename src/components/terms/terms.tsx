import React from 'react';

import { Paragraph } from './paragraph/paragraph';

import style from './terms.module.css'

type PropsType = {
    contentView: string
}
export const Terms = ({contentView}: PropsType) => (
    <React.Fragment>
        {contentView === 'terms'
            && (
            <div className={style.terms__wrapper}>
                <h3 className={style.terms__title}>Правила пользования</h3>
                <Paragraph />
            </div>
            )
        }
        {contentView === 'contract'
            && (
            <div className={style.terms__wrapper}>
                <h3 className={style.terms__title}>Договор оферты</h3>
                <Paragraph />
            </div>
            )
        }
    </React.Fragment>
);