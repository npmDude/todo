import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useReducer
} from 'react';
import createAction, { Action } from '../createActions';

export type ToDo = {
    label: string;
    isCompleted: boolean;
};

type State = {
    toDoList: ToDo[];
    isCompletedVisible: boolean;
};

const initialState: State = {
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
    isCompletedVisible: false
};

type Context = State & {
    addToDo: (label: string) => void;
    updateToDoLabel: (index: number, label: string) => void;
    completeToDo: (index: number) => void;
    revertToDo: (index: number) => void;
    removeToDo: (index: number) => void;
    showCompleted: (flag: boolean) => void;
};

const initialContext: Context = {
    ...initialState,
    addToDo: (): void => {
        throw new Error('addToDo function must be overridden');
    },
    updateToDoLabel: (): void => {
        throw new Error('updateToDoLabel function must be overridden');
    },
    completeToDo: (): void => {
        throw new Error('completeToDo function must be overridden');
    },
    revertToDo: (): void => {
        throw new Error('revertToDo function must be overridden');
    },
    removeToDo: (): void => {
        throw new Error('removeToDo function must be overridden');
    },
    showCompleted: (): void => {
        throw new Error('showCompleted function must be overridden');
    }
};

const actionList = {
    addTodo: createAction('ADD_TODO'),
    updateToDoLabel: createAction('UPDATE_TODO_LABEL'),
    completeToDo: createAction('COMPLETE_TODO'),
    revertToDo: createAction('REVERT_TODO'),
    removeToDo: createAction('REMOVE_TODO'),
    showCompleted: createAction('SHOW_COMPLETED'),
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case actionList.addTodo.type:
            return {
                ...state,
                toDoList: [
                    ...state.toDoList,
                    {
                        label: action.payload,
                        isCompleted: false
                    }
                ]
            };

        case actionList.updateToDoLabel.type: {
            const newTodoList = [...state.toDoList];
            newTodoList[action.payload.index].label = action.payload.label;

            return {
                ...state,
                toDoList: newTodoList
            };
        }

        case actionList.completeToDo.type: {
            const newTodoList = [...state.toDoList];
            newTodoList[action.payload].isCompleted = true;

            return {
                ...state,
                toDoList: newTodoList
            };
        }

        case actionList.revertToDo.type: {
            const newTodoList = [...state.toDoList];
            newTodoList[action.payload].isCompleted = false;

            return {
                ...state,
                toDoList: newTodoList
            };
        }

        case actionList.removeToDo.type: {
            const newTodoList = [...state.toDoList];
            newTodoList.splice(action.payload, 1);
            return {
                ...state,
                toDoList: newTodoList
            }
        }

        case actionList.showCompleted.type:
            return {
                ...state,
                isCompletedVisible: action.payload
            };

        default:
            return state;
    }
};

const ToDoContext = createContext<Context>(initialContext);

type Props = {
    children: React.ReactNode;
};

export const ToDoProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addToDo = useCallback((label: string) => dispatch(actionList.addTodo(label)), []);

    const updateToDoLabel = useCallback((index: number, label: string) => dispatch(actionList.updateToDoLabel({ index, label })), []);

    const completeToDo = useCallback((index: number) => dispatch(actionList.completeToDo(index)), []);

    const revertToDo = useCallback((index: number) => dispatch(actionList.revertToDo(index)), []);

    const removeToDo = useCallback((index: number) => dispatch(actionList.removeToDo(index)), []);

    const showCompleted = useCallback((flag: boolean) => dispatch(actionList.showCompleted(flag)), []);

    const data = useMemo((): Context => ({
        ...state,
        addToDo,
        updateToDoLabel,
        completeToDo,
        revertToDo,
        removeToDo,
        showCompleted,
    }), [state, addToDo, updateToDoLabel, completeToDo, revertToDo, removeToDo, showCompleted]);

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
