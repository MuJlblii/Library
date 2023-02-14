import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux/es/exports';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import {store} from './app/store';
import { Terms } from './components/terms';
import { Layout } from './layouts/layout';
import { LayoutMainPage } from './layouts/layout-main-page';
import { BookPage } from './pages/book';
import { MainPage } from './pages/main';

import './index.css';

import './assets/fonts/Montserrat-Medium.ttf';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route element={<LayoutMainPage />}>
              <Route path='/' element={<Navigate to='/books/all' />} />
              <Route path='/books/:category' element={<MainPage />} />
              <Route path='/terms' element={<Terms contentView='terms' />} />
              <Route path='/contract' element={<Terms contentView='contract' />} />
            </Route>
            <Route path='/books/:category/:bookId' element={<BookPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
