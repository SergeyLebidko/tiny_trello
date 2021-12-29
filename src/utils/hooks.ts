import {useEffect, useRef, useState} from 'react';

export function useModalError(): [string | null, (text: string) => void]{
    const [error, setError] = useState<string | null>(null);
    const errorTimer: { current: NodeJS.Timeout | undefined } = useRef();

    // Предотвращаем возможное изменение состояния компонента по таймеру, после того как компонент размонтирован
    useEffect(() => {
        return () => {
            if (typeof errorTimer.current !== 'undefined') clearTimeout(errorTimer.current);
        }
    }, []);

    const setErrorText = (text: string): void => {
        setError(text);
        errorTimer.current = setTimeout(() => setError(null), 4000);
    }

    return [error, setErrorText];
}