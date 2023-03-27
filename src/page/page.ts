import * as packageJson from '../../package.json'
import { githubCornerHTML } from './lib/githubCorner'
import { h } from './lib/hyper'

let makeTextareaSection = () => {
  let core = h('textarea', { className: 'textareaSectionCore', rows: 19 })
  let root = h('div', {}, [core])

  return {
    core,
    root,
  }
}

let makeDivSection = (prop: any = {}) => {
  let { className = '' } = prop
  className += ' divSectionCore'
  let core = h('div', { className })
  let root = h('div', {}, [core])

  return {
    core,
    root,
  }
}

export function page() {
  let inputArea = makeTextareaSection()
  let warningArea = makeDivSection({ className: 'warn' })
  let errorArea = makeDivSection({ className: 'error' })
  let outputArea = makeTextareaSection()

  let pageDiv = h('div', {}, [
    h('h1', {
      textContent: document.title,
    }),
    inputArea.root,
    errorArea.root,
    warningArea.root,
    outputArea.root,
  ])

  document.body.appendChild(pageDiv)

  let githubCornerDiv = h('div', { innerHTML: githubCornerHTML(packageJson.repository) })
  document.body.appendChild(githubCornerDiv)

  return { outputArea, errorArea, warningArea, inputArea }
}
