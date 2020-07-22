import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState
} from 'react';

export enum Theme {
    LIGHT = 'light',
    DARK = 'dark'
}

type Context = {
    themeType: Theme;
    setTheme: (theme: Theme) => void;
};

const initialContext: Context = {
    themeType: Theme.LIGHT,
    setTheme: (): void => {
        throw new Error('setTheme function must be overridden');
    }
};

const AppContext = createContext<Context>(initialContext);

type Props = {
    children: React.ReactNode;
};

export const AppProvider = ({ children }: Props) => {
    const [contextState, setContext] = useState<Context>(initialContext);

    const setTheme = useCallback(
        (theme: Theme) => setContext({ ...contextState, themeType: theme }),
        [contextState]
    );

    const data = useMemo((): Context => ({
        ...contextState,
        setTheme
    }), [contextState, setTheme]);

    return (
        <AppContext.Provider value={data}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);

    if (context === undefined) {
        throw new Error('useAppContext can only be used inside AppProvider');
    }

    return context;
};
