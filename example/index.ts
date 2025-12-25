import { type FunctionComponent, render } from 'preact'
import { html } from 'htm/preact'
import { numberToString } from '../src/index.js'

const Example:FunctionComponent<unknown> = function () {
    return html`<h1>util</h1>
    <div>
        <h2>number to string</h2>
        <div>input = 16495279551</div>
        <div>output = ${numberToString(16495279551)}</div>
    </div>`
}

render(html`<${Example} />`, document.getElementById('root')!)
