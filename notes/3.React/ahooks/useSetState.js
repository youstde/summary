import { useState, useCallback } from 'react';

const useSetState = (initState) => {
    const [state, setState] = useState(initState);

    const mergeState = useCallback((patch) => {
        setState(prevState => {
            const newState = typeof patch === 'function' ? patch(prevState): patch;

            return newState ? {...prevState, ...newState}: prevState;
        });
    }, []);

    return [state, mergeState];
}

export default useSetState;