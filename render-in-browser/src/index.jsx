import './assets/normalize.css';
import './assets/skeleton.css';

import Title from './components/Title.jsx';
import CountingButton from './components/CountingButton/CountingButton.jsx';

const app = (
    <div class="container">
        <div class="row">
            <Title title='Demo 1' subtitle='Click the magic counting button to see what happens' />
        </div>

        <div class="row">
            <CountingButton num={3} />
        </div>
    </div>
)

window.document.getElementById('app').replaceWith(app)