import React,{ useState, useEffect} from 'react';

export default function CopyToClipboard(value){
  const [copySuccess, setCopySuccess] = useState('')
  useEffect(() => {
    copy(value);
  }, [value]);
  const copy=(value)=>{
    const tempInput = document.createElement('input')
    tempInput.value = value
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempInput)
    setCopySuccess('Copied')
    setTimeout(() => {
      setCopySuccess('');

    }, 2000);
  }
  return(
    <p className="ml-2 text-base-secondary text-sm light" style={{display:(copySuccess=="Copied")? :none}}>
      {copySuccess ? <span className="blink">{copySuccess}</span> : 'Copy link'}
    </p>
  )
}