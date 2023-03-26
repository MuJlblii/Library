import { useSelector } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Terms } from '../components/terms';
import { PATHS, PrivacyREASONS } from '../constants/path-routing';
import { Layout } from '../layouts/layout';
import { LayoutAuth } from '../layouts/layout-auth';
import { LayoutMainPage } from '../layouts/layout-main-page';
import { AuthPage } from '../pages/auth-forms-page/auth';
import { ForgotPasswordPage } from '../pages/auth-forms-page/forgot-password';
import { RegistrationPage } from '../pages/auth-forms-page/registration';
import { BookPage } from '../pages/book';
import { MainPage } from '../pages/main';
import { Profile } from '../pages/profile';

import { PrivateRoute } from './privacy-routing';
import { selectJWTToken } from './selector-user';

export const App = () => {
    const JWTtoken = useSelector(selectJWTToken);

    return (
        <HashRouter>
            <Routes>
                <Route element={<PrivateRoute privacyReason={PrivacyREASONS.userOnly} isAvailable={JWTtoken === null ? false : true} />}>
                    <Route path={PATHS.main} element={<Layout />}>
                        <Route element={<LayoutMainPage />}>
                            <Route path={PATHS.main} element={<Navigate to='/books/all' />} />
                            <Route path={`${PATHS.books}/:category`} element={<MainPage />} />
                            <Route path={PATHS.terms} element={<Terms contentView='terms' />} />
                            <Route path={PATHS.contract} element={<Terms contentView='contract' />} />
                        </Route>
                        <Route path={PATHS.profile} element={<Profile />} />
                        <Route path={`${PATHS.books}/:category/:bookId`} element={<BookPage />} />
                    </Route>
                </Route>
                <Route element={<PrivateRoute privacyReason={PrivacyREASONS.notForUser} isAvailable={!JWTtoken} />}>
                    <Route element={<LayoutAuth />}>
                        <Route path={PATHS.auth} element={<AuthPage />}/>
                        <Route path={PATHS.restorePass} element={<ForgotPasswordPage />}/>
                        <Route path={PATHS.registration} element={<RegistrationPage />}/>
                    </Route>
                </Route>
            </Routes>
        </HashRouter>
    )
}

