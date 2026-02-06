import React, { useRef, useState } from 'react'

const Calculator = () => {
  const numrefArr=useRef([])
  const checkSign=useRef(null)
    const btnData = [7,8,9,"+", 4,5,6,"-",1,2,3,"*", "C",0,"=","/"]
    const [btnval, setBtnval]= useState('')
    const [result, setResult] = useState(0)
    const [pushnum, setPushnum] = useState('')
    const [signarr, setSignarr] = useState([])



const math_cal =(prev, cur, sign)=> {
     if(sign == '+') return prev + cur 
   if(sign == '-') return prev - cur 
   if(sign == '*') return prev * cur 
   if(sign == '/') return prev / cur
}  

 const calculation = ()=>{
     let result= numrefArr.current[0];
  for(let i=0; i< signarr.length; i++){
    console.log("111", result);
    
       result = math_cal(Number(result), Number(numrefArr.current[i+1]), signarr[i]) 
          console.log("222", result);
  }
    return result
 }


    const btnHadler = async (val)=>{
       if(val=='C'){
       setBtnval('')
setResult(0)
setPushnum('')
setSignarr([])
checkSign.current = null
numrefArr.current = []
return 
       }
      const isInvalid = ["+", "-", "*", "/"].includes(val);
      if(["+","-","*","/"].includes(checkSign.current) && isInvalid ){ return}
      setPushnum(prev=> prev + val)
   if(val=='+'|| val=='-' || val=='*' ||val=='/'){
    checkSign.current = val
    setSignarr(prev=>([...prev, val]))
    numrefArr.current.push(pushnum)
    setPushnum('')
   }
    if(val=='='){
   // checkSign.current = val
   // setSignarr(prev=>([...prev, val]))
   
    numrefArr.current.push(pushnum)
    const totalval = await calculation()
    setResult(totalval)
    setPushnum('')
   }
   checkSign.current = val
    setBtnval(prev=> prev + val)

    }
    const errorhandler = ()=> setResult("Error")
    
    console.log(pushnum, numrefArr.current, "----", checkSign, "===", signarr);
    
  return (
    
        <div class="wpap">
              <div class="display">
            <div class="result">result: {result}</div>
            <input type="text" name="total" value={btnval} placeholder='' onClick={errorhandler}  class="main" />
        </div>
            {/* <div className='calinput'><input type='text' value={btnval} placeholder=''  /></div>
            <div className='result'></div> */}

              <div class="buttonpart">
            <div class="topbtn"></div>
            <div class="numpart">
               {btnData.map((item)=><button key={item} type='buton' className='num' onClick={()=>btnHadler(item)}>{item}</button>)}  

            </div>

        </div>

        </div>
    
  )
}

export default Calculator