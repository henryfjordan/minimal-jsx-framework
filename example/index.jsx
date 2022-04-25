// import './assets/normalize.css';
// import './assets/skeleton.css';

import Title from './components/Title.js';
import CountingButton from './components/CountingButton/CountingButton.js';

const app = (
    <div class="container">
        <div class="row">
            <Title title='Magic Counting Button' subtitle='Click it to see what happens' />
        </div>

        <div class="row">
            <CountingButton num={3} />
        </div>
    </div>
)

window.document.getElementById('app').replaceWith(app)