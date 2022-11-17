import React,{ useState,useEffect } from 'react'
import '../assets/css/Card.css';


const Card = ({data,getUser}) => {
  const { cell, dob, email, location, name, picture, login } = data;
  const[index,setIndex]=useState("name");
  const[title,settitle]=useState("Hi, My name is");
  const[titleData,settitleData]=useState(name.first+" "+name.last);
  const [copySuccess, setCopySuccess] = useState('')

  const copy=()=>{
    const tempInput = document.createElement('input')
    tempInput.value = `name: ${name.first} ${name.last},email: ${email}, cell: ${cell}, DOB: ${dob.date.slice(0,10)}, loaction: ${location.street.number}-${location.street.name}, ${location.city}, ${location.state}, ${location.country}`
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempInput)
    setCopySuccess('Copied')
    setTimeout(() => {
      setCopySuccess('');
    }, 2000);
  }
  const showData=(id,tValue,dValue)=>{
    setIndex(id);
    settitle(tValue);
    settitleData(dValue);
  }
  const getNewUser= async ()=>{
    let user =await getUser();
    setIndex("name");
    settitle("Hi, My name is");
    settitleData(user.first+" "+user.last);
  }
  return(<>
    <header>
      <div className="container">
        <h1>Random User Generator</h1>
        <p>A free, <a id="openSource" style={{color:"#76d6ff"}} href="https://github.com/Anshajak/Random-User-Demo">open-source</a>
        Web Page for generating random user data for people. </p>
      </div>
     </header>
    <div className="container">
      <div className="card_offset card ">
        <p className="ml-2 text-base-secondary text-sm light" style={{display:(copySuccess=="Copied")? "block": "none"}}>
          {copySuccess ? <span className="blink">{copySuccess}</span> : 'Copy link'}
        </p>
        <div style={{margin: "0 22px 0 auto"}}>
            <button onClick={()=>copy()} className="refresh">Copy</button>
            <button onClick={()=>getNewUser()} className="refresh">Next</button>
          </div>
        <div className="details">
          <div className="user_photo" id="user_photo">
            <img src={picture.large}/>
          </div>
          <p id="user_title"> {title}</p>
          <p id="user_value" >{titleData}</p>
        </div>
        <ul className="values_list" id="values_list">
          <li onClick={()=>showData("name","Hi, My name is" ,name.first+" "+name.last)} data-label="name" id="name" className={index=="name" && "active"}>
          </li>
          <li onClick={()=>showData("email","My email address is",email)} data-label="email" id="email" className={index=="email" && "active"}>
          </li>
          <li onClick={()=>showData("birthday","My birthday is",dob.date.slice(0,10))} data-label="birthday" id="birthday" className={index=="birthday" && "active"}>
          </li>
          <li onClick={()=>showData("location","My address is",location.street.number+'-'+location.street.name+','+location.city+','+location.state+','+location.country)} data-label="location" id="location" className={index=="location" && "active"}>
          </li>
          <li onClick={()=>showData("phone","My phone number is",cell)} data-label="phone" id="phone" className={index=="phone" && "active"}>
          </li>
          <li onClick={()=>showData("pass","My password is",login.password)} data-label="pass" id="pass" className={index=="pass" && "active"}>
          </li>
        </ul>
      </div>
    </div>
  </>
  );
}

export default Card
