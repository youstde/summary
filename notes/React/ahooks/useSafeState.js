import { useState, useEffect, useCallback } from 'react';

const useUnmountedRef = () => {
    const unmountedRef = useRef(false);
    useEffect(() => {
      unmountedRef.current = false;
      return () => {
        unmountedRef.current = true;
      };
    }, []);
    return unmountedRef;
  };

  const useSafeState = (initState) => {
    const unmountedRef = useUnmountedRef();
    const [state, setState] = useState(initState);

    const setCurrentState = useCallback((currentState) => {
        // 如果当前组件已经卸载，则不做更新操作
        if (unmountedRef.current) return;
        setState(currentState);
    }, []);

    return [state, setCurrentState];
  }

  export default useSafeState;