/** @jsx createElement */
import createElement from '../../jsx-runtime.js';

import './style.css'

const CountingButton = () => {

    let state = { count: 3 };

    let incr = (elem) => {
        state.count += 1;
        elem.innerText = state.count;
    }

    let Button = () => {
        let button = (
            <button onClick={() => incr(button)}>
                {state.count}
            </button>
        );

        return button
    }

    return <Button />

}

export default CountingButton;