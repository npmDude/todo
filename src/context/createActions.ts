export type Action = {
    type: string;
    payload: any;
};

type ActionCreator = {
    (...args: any[]): Action;
    toString(): string;
    type: string;
}

export default function createAction(type: string): ActionCreator {
    function actionCreator(...args: any[]) {
        return { type, payload: args[0] };
    }

    actionCreator.toString = () => `${type}`;

    actionCreator.type = type;

    return actionCreator;
}