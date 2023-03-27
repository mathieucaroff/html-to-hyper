export interface ConverterOptionSet {
  /**
   * Whether to use `null` as second value when the element has no attributes
   */
  useNullValue?: boolean
}

/**
 * convert
 *
 * Can be used to convert a string of HTML data to a string of hyper data
 */
export function convert(input: string, optionSet: ConverterOptionSet = {}) {
  const convertTree = (tree: Element, indentLevel: number) => {
    let indent = '  '.repeat(indentLevel)
    let argumentArray = [`${JSON.stringify(tree.tagName.toLowerCase())}`]

    let attributeArray = getAttributeArray(tree)
    let attributeString = `{ ${attributeArray.join(', ')} }`

    let nextIndentLevel = indentLevel + 1
    if (tree.children.length === 1 && tree.children[0].children.length === 0) {
      nextIndentLevel = 0
    }
    let childArray = [...tree.children].map((child) => convertTree(child, nextIndentLevel))

    if (childArray.length > 0) {
      if (attributeArray.length === 0) {
        if (optionSet.useNullValue) {
          attributeString = 'null'
        } else {
          attributeString = '{}'
        }
      }
      let childrenString: string
      if (nextIndentLevel === 0) {
        childrenString = `[${childArray.join(',\n')}]`
      } else {
        childrenString = `[\n${childArray.join(',\n')},\n${indent}]`
      }
      argumentArray.push(attributeString, childrenString)
    } else if (attributeArray.length > 0) {
      argumentArray.push(attributeString)
    }

    return `${indent}h(${argumentArray.join(', ')})`
  }

  const getAttributeArray = (element: Element) => {
    const a: string[] = []
    for (let b of element.attributes) {
      let { name } = b
      if (!name.match(/^[a-zA-Z]*$/)) name = JSON.stringify(name)
      if (name === 'class') name = 'className'
      a.push(`${name}: ${JSON.stringify(b.value)}`)
    }
    if (element.children.length === 0 && element.textContent?.trim()) {
      a.push(`textContent: ${JSON.stringify(element.textContent.trim())}`)
    }
    return a
  }

  let root: Element
  let error = ''
  let value = ''
  try {
    root = document.createElement('root')
    root.innerHTML = input
    value = convertTree(root, 0)
  } catch (e) {
    error = e.toString()
  }

  return { value, error, warning: '' }
}
