import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState
} from 'react';

export type ToDo = {
    label: string;
    isCompleted: boolean;
};

type Context = {
    toDoList: ToDo[];
    isCompletedVisible: boolean;
    addToDo: (label: string) => void;
    updateToDoLabel: () => void;
    completeToDo: () => void;
    removeToDo: () => void;
    showCompleted: (flag: boolean) => void;
};

const initialContext: Context = {
    toDoList: [
        {
            label: 'Finish college',
            isCompleted: true
        },
        {
            label: 'Learn React',
            isCompleted: false
        },
        {
            label: 'Get Hired!',
            isCompleted: false
        }
    ],
    isCompletedVisible: false,
    addToDo: (): void => {
        throw new Error('addToDo function must be overridden');
    },
    updateToDoLabel: (): void => {
        throw new Error('updateToDoLabel function must be overridden');
    },
    completeToDo: (): void => {
        throw new Error('completeToDo function must be overridden');
    },
    removeToDo: (): void => {
        throw new Error('removeToDo function must be overridden');
    },
    showCompleted: (): void => {
        throw new Error('showCompleted function must be overridden');
    }
};

const ToDoContext = createContext<Context>(initialContext);

type Props = {
    children: React.ReactNode;
};

export const ToDoProvider = ({ children }: Props) => {
    const [contextState, setContext] = useState<Context>(initialContext);

    const addToDo = useCallback(
        (label: string) => setContext({
            ...contextState,
            toDoList: [
                ...contextState.toDoList,
                { label, isCompleted: false }
            ]
        }),
        [contextState]
    );

    const showCompleted = useCallback(
        (flag: boolean = true) => setContext({ ...contextState, isCompletedVisible: flag }),
        [contextState]
    );

    const data = useMemo((): Context => ({
        ...contextState,
        addToDo,
        showCompleted
    }), [contextState, addToDo, showCompleted]);

    return (
        <ToDoContext.Provider value={data}>
            {children}
        </ToDoContext.Provider>
    );
};

export const useToDoContext = () => {
    const context = useContext(ToDoContext);

    if (context === undefined) {
        throw new Error('useToDoContext can only be used inside ToDoProvider');
    }

    return context;
};
