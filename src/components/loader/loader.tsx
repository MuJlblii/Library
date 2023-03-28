import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectIsLoading } from '../../app/selector-main';
import { ReactComponent as LoaderImg } from '../../assets/img/Loader.svg';

import style from './loader.module.css';

export const Loader = () => {
    const isLoadingFetching = useSelector(selectIsLoading);
    const [isShowingLoader, setIsShowingLoader] = useState(false);

    useEffect(() => {
        if (isLoadingFetching) {
            setIsShowingLoader(true);
        }
        if (!isLoadingFetching && isShowingLoader) {
            setIsShowingLoader(false);
        }
    }, [isLoadingFetching, isShowingLoader]);

    return (
        <Fragment>
            {isLoadingFetching &&
                <div className={style.wrapper} data-test-id='loader' >
                    <div className={style.content}>
                        <LoaderImg className={style.loader} />
                    </div>
                </div>
            }
            {!isLoadingFetching && null}
        </Fragment>
    )
}