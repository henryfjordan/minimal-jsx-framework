/** @jsx createElement */
import createElement from '../jsx-runtime.js';

const Title = (props) => <div>
    <h1>{props.title}</h1>
    <p>{props.subtitle}</p>
</div>;
export default Title;
