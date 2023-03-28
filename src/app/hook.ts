import { useEffect, useRef, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { setIsLoadingFetching } from './reducer';
import type { AppDispatch,RootState } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export const useClickOutside = (initialIsVisible: boolean) => {
    const [isComponentVisible, setIsComponentVisible] = useState<boolean>(initialIsVisible);
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return { ref, isComponentVisible, setIsComponentVisible };
}

export const useCheckDesktopView = (minWidth: string) => {
  const [matches, setMatches] = useState(
    window.matchMedia(minWidth).matches
  )

  useEffect(() => {
    window
    .matchMedia(minWidth)
    .addEventListener('change', e => setMatches( e.matches ));

    return (window.matchMedia(minWidth).removeEventListener('change', e => setMatches( e.matches )))
  }, [minWidth]);

  return matches
}

export const useIsLoadingTotal = () => {
  const dispatch = useAppDispatch();
  const isSomePendingQueries = useSelector((state: RootState) => Object.values(state.fetch.queries).some(query => query?.status === 'pending'));
  const isSomePendingMutations = useSelector((state: RootState) => Object.values(state.fetch.mutations).some(mutation => mutation?.status === 'pending'));

  return useEffect(() => {
    if (isSomePendingQueries || isSomePendingMutations) {
      dispatch(setIsLoadingFetching(true));
    } else dispatch(setIsLoadingFetching(false));
  }, [isSomePendingQueries, isSomePendingMutations, dispatch])
}