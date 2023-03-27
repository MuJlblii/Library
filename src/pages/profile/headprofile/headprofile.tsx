import { useEffect, useRef, useState } from 'react';

import { useChangeProfileInfoMutation, useImageUploadMutation } from '../../../app/api';
import { useAppDispatch, useIsLoading } from '../../../app/hook';
import { setToasterMsg } from '../../../app/reducer';
import avatarImg from '../../../assets/img/default_avatar.svg';
import {ReactComponent as IconCamera} from '../../../assets/img/Icon_camera.svg';
import { PATHS } from '../../../constants/path-routing';

import style from './headprofile.module.css';

export type HeadProfileType = {
    firstName: string,
    lastName: string,
    avatar: string | null,
    id: number,
}

export const HeadProfile = ({firstName, lastName, avatar, id: userId} : HeadProfileType) => {
    const avatarFilePath = avatar ? `${PATHS.baseUrl}${avatar}` : avatarImg;
    const dispatch = useAppDispatch();
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [imageUpload, {isError: isErrorImage, isSuccess: isSuccessImageUpload, data, isLoading: isLoadingImageUpload}] = useImageUploadMutation()
    const [changeProfileInfo, {isSuccess, isError, isLoading: LoadingChangeProfile}] = useChangeProfileInfoMutation()

    useIsLoading(isLoadingImageUpload);
    useIsLoading(LoadingChangeProfile);

    const handleFileClick = () => {
        inputRef?.current?.click();
    }
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    }

    useEffect(() => {
        const uploadImage = async () => {
            if (file) {
                const imageData = new FormData();
    
                imageData.append('files', file);
                await imageUpload(imageData);
            }
        }

        uploadImage();
    }, [file, imageUpload, userId]);

    useEffect(() => {
        if (isSuccessImageUpload) {
            const newAvatar = {avatar: data[0].id}
            
            changeProfileInfo({ userId, ...newAvatar })
        }
    }, [data, isSuccessImageUpload, changeProfileInfo, userId])

    useEffect(() => {
        if (isSuccess || isSuccessImageUpload) {
            dispatch(setToasterMsg({type: 'success', message: 'Фото успешно сохранено!'}));
            setFile(null);
        }
        if (isError || isErrorImage) {
            dispatch(setToasterMsg({type: 'error', message: 'Что-то пошло не так, фото не сохранилось. Попробуйте позже!'}));
        }
    }, [dispatch, isError, isSuccess, isSuccessImageUpload, isErrorImage]);


    return (
        <div className={style.head} data-test-id='profile-avatar'>
            <div className={style.head__avatar_wrapper} role='presentation' onClick={() => handleFileClick()}>
                <img className={style.head__avatar_img} src={avatarFilePath} alt="Avatar" />
                <span className={style.head__avatar_blur}/>
                <IconCamera  className={style.head__avatar_camera}/>
                <input
                    type="file"
                    accept='image/*'
                    multiple={false}
                    name="fileInput"
                    className={style.head__avatar_file}
                    ref={inputRef}
                    onChange={(e) => onChangeInput(e)}

                />
            </div>
            <div className={style.head_names}>
                <p className={style.head_name}>{firstName}</p>
                <p className={style.head_name}>{lastName}</p>
            </div>
        </div>
    )
}