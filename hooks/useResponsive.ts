'use client';
import { useState, useEffect } from 'react';

export function useResponsive() {
    // 1. 初始值透過 lazy function 設定
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined'
            ? window.matchMedia('(max-width: 767px)').matches
            : false
    );

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 767px)');
        const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener('change', handleChange);

        // 不要再在這裡呼叫 setState，否則會觸發警告
        return () => mq.removeEventListener('change', handleChange);
    }, []);

    return { isMobile };
}

