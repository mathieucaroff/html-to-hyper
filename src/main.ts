import { page } from './page/page'
import { convert } from './core/convert'

function main() {
  let { outputArea, errorArea, warningArea, inputArea } = page()

  let handleChange = () => {
    let result = convert(inputArea.core.value)

    outputArea.core.value = result.value
    errorArea.core.innerText = result.error
    warningArea.core.innerText = result.warning
  }

  inputArea.core.addEventListener('keydown', handleChange, true)
  inputArea.core.addEventListener('keyup', handleChange, true)
  inputArea.core.addEventListener('change', handleChange, true)
  inputArea.core.addEventListener('blur', handleChange, true)

  handleChange()
}

main()
