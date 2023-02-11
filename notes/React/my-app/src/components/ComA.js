import { useState, useCallback } from 'react';
import { produce } from 'immer';

function ComA() {
    const [info, setInfo] = useState({
        name: 'youstde',
        age: 18
    });

    const handleClick = () => {
        setInfo((prevState) => {
            return produce(prevState, draft => {
                draft.age = 26;
            });
        });
    }

    return (
        <div>
            <button onClick={handleClick}>click</button>
            coma
            <div>{info.name}</div>
            <div>{info.age}</div>
        </div>
    )
}

export default ComA;