const dataNumbers = document.querySelectorAll('[data-number]')
const dataOperation = document.querySelectorAll('[data-operation]')
const dataPercent = document.querySelector('[data-percent]')
const dataAc = document.querySelector('[data-all-clear]')
const dataDel = document.querySelector('[data-del]')
const dataEqual = document.querySelector('[data-equals]')
const dataPrevious = document.querySelector('[data-previous]')
const dataCurrent = document.querySelector('[data-current]')
const dataSum = document.querySelector('[data-sum]')
const dataPc = document.querySelector('[data-pc]')




//set dataCurrent to zero onload
function zero(){
    dataSum.innerText = 0;
}


//calculator class function

class Calculators{
    constructor(dataPrevious, dataCurrent, dataSum){
        this.dataPrevious =  dataPrevious;
        this.dataCurrent =  dataCurrent;
        this.dataSum = dataSum
        this.clear()
    }

  

    clear(){
        this.previousInnerText = ''
        this.currentInnerText = ''
        this.dataSum.innerText = ''
        this.sumation = ""
        this.operation = ''
        dataSum.innerText = 0;
        this.total = false
    }


    appendNumber(number){
        if(this.total) {
            this.clear()
        }
           

        if(number === '.' && this.currentInnerText.includes('.') ) return
        this.currentInnerText = this.currentInnerText.toString() + number.toString()

     
    }

    percent(){
       this.currentInnerText = this.currentInnerText / 100
       console.log("percent")
    }


    chooseOperation(operation){
            if(this.currentInnerText=== '' ) return
            if(this.previousInnerText !== '' ){
                this.compute()
                this.currentInnerText = this.sumation
                 this.dataSum.innerText = '= ' + this.getDisplayNumber(this.sumation)
            }

            this.operation = operation
            this.previousInnerText = this.currentInnerText
            this.currentInnerText = ""
    }

         
    

    compute(){
        let computation 
        const prev = parseFloat(this.previousInnerText)
        const current = parseFloat(this.currentInnerText)
        if(isNaN(prev) || isNaN(current))return

        switch(this.operation){
            case '+':
                computation = prev + current 
                break
            case '-':
            computation = prev - current
            break
            case '×':
            computation = prev *current
            break
            case '÷':
            computation = prev / current
            break
            default:

            return
        }

        this.sumation = computation
         this.total = false
      

        console.log('compute =',this.total)
    }

    delete(){

        this.currentInnerText = this.currentInnerText.toString().slice(0, -1)
             
    }

    equals(){
         
        this.compute()

      
        if(this.sumation) {
            this.dataSum.innerText = '= ' + this.getDisplayNumber(this.sumation)
            this.total = true
        }
        console.log('equal= ', this.total)
}



getDisplayNumber(number) {  
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

    updateDisplay(){

        this.dataCurrent.innerText =
        this.getDisplayNumber(this.currentInnerText)
      if (this.operation != null) {
        this.dataPrevious.innerText =
          `${this.getDisplayNumber(this.previousInnerText)} ${this.operation}`
      } else {
        this.dataPrevious.innerText = ''
      }
    }
        
    // this.dataCurrent.innerText = this.currentInnerText
    // this.dataPrevious.innerText = ` ${this.previousInnerText}  ${this.operation}`
   
   
     
    }

    



const calculator = new Calculators(dataPrevious, dataCurrent, dataSum)


dataAc.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
    
})


dataNumbers.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerText)
        calculator.updateDisplay()
    })
})



dataOperation.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.innerText)
        calculator.updateDisplay()
    })
})

dataEqual.addEventListener('click', () => {
    calculator.equals()
    calculator.updateDisplay()
})

dataDel.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})


dataPercent.addEventListener('click', () => {
    calculator.percent()
    calculator.updateDisplay()
})



// function thousandConvert(number){
//     number = number.split('.')
//     let integer = parseFloat(number[0])
//     const decimal = parseFloat(number[1])
//     integer = integer.toLocaleString('en')
//     let convert = `${integer}.${decimal}`

//     if(decimal){
//         return convert
//     }else {
//         return integer
//     }
    
//     return convert
// }

// console.log(thousandConvert("4567120098564"))