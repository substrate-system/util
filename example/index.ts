import Debug from '@bicycle-codes/debug'
import { attributesToString } from '../src/index.js'
const debug = Debug()

const el = document.getElementById('example')
const str = attributesToString(el!)

debug('attributes as string', str)
