
let myForm = document.querySelector('#allInputsEl')
let resultOutput = document.querySelector('#resultOutput')
let copyBtn = document.querySelector("#copyBtn")

const copyPassword = () => {
  if(resultOutput.innerText === ""){
    return 
  }
    
  let textArea = document.createElement('textarea')
  textArea.value = resultOutput.innerText
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand("copy")
  document.body.removeChild(textArea)
  alert(`Password copied: ${resultOutput.innerText}`) 
}

const generatePassword = (pLen, pOpt) => {
  const Options = {
    pUppercase: () => String.fromCharCode(Math.round(Math.random()*25) + 65),
    
    pLowercase(){
      return String.fromCharCode(Math.round(Math.random()*25) + 97)
    },

    pNumbers(){
      return String.fromCharCode(Math.round(Math.random()*9) + 48)
    },

    pSymbols(){
      const symbols = '!@#$%^&*(){}[]=<>/,.'
      return symbols[Math.floor(Math.random() * symbols.length)]
    }
  }

  let response = "";

  for(let i = 0; i < pLen; i++){
    let randomOption = Math.floor(Math.random() * pOpt.length)
    response += Options[pOpt[randomOption]]()
  }

  return response
}

function App(event){
  event.preventDefault()

  let passwordLength = Number(document.querySelector('#pLength').value)
  let passwordCheckboxex = [...document.querySelectorAll('input[type=checkbox]')]

  passwordOptions = passwordCheckboxex
    .filter(item => item.checked)
    .map(item => item.id)

  if(passwordLength <= 0 || passwordOptions.length === 0){
    return
  }

  let response = generatePassword(passwordLength, passwordOptions)

  resultOutput.innerText = response
}


myForm.onsubmit = event => App(event)
copyBtn.onclick = () => copyPassword()



