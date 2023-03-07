import { Fragment } from 'react';

import style from './input-highlighter.module.css';

export const HighlightedHintText = ({text, highlight}: {text:string, highlight: string}) => {
    let phrase = text;
    const highlightArray = highlight.split('\\');
    
    highlightArray.forEach((el) => {
        phrase = phrase.replace(el, `\\${el}\\`)
    });
    
    const result = phrase.split('\\').filter((value) => value !== '');
  
    return (
        <Fragment> 
            {result.map((el, ind) => {
                if (highlightArray.includes(el)) {
                    return (
                        <span
                            key={`${ el}_${Math.random()*ind}_${ new Date().getTime() }`}
                            className={style.span_highlight}
                            data-test-id='hint'
                        >
                            { `${el} ` }
                        </span>)
                }
                
                return (
                    <span
                        key={`${ el}_${Math.random()*ind}_${ new Date().getTime() }`}
                        data-test-id='hint'
                    >
                        { `${el} ` }
                    </span>)
            })}
        </Fragment>
    )
};