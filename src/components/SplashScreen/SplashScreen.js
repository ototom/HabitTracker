import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { authContext } from '../../context/auth-context';
import { habitsContext } from '../../context/habits-context';
import './SplashScreen.css';

const SplashScreen = () => {
    const { isLoading: isUserLoading } = useContext(authContext);
    const { isLoading: isHabitsLoading } = useContext(habitsContext);
    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(true);

    const unmountSplashScreen = () => setIsMounted(false);

    useEffect(() => {
        if (!isUserLoading || !isHabitsLoading) setIsClosing(true);
    }, [isUserLoading, isHabitsLoading]);

    useEffect(() => {
        if (!isClosing) return;

        const timeoutId = setTimeout(unmountSplashScreen, 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [isClosing]);

    if (!isMounted) return null;
    return createPortal(
        <div
            className={`splash-screen ${
                isClosing ? 'splash-screen--is-closing' : ''
            }`}
        >
            <div className='lds-grid'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>,
        document.getElementById('splash-screen-container')
    );
};

export default SplashScreen;
