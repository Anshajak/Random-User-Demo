import React,{ useState,useEffect } from 'react';
import {utils,writeFile} from "xlsx";
import {fetchUser} from '../routes';
import Loading from '../components/Loading';
import '../assets/css/UserModels.css';

const Records = () => {
  const [loading, isLoading] = useState(true);
  const [loginId, setloginId] = useState(-1);
  const [copySuccess, setCopySuccess] = useState('')
  const [userData, setuserData] = useState({
    users: [],
    order: "ascend",
    filteredUsers: [],
  });

  const handleSearchChange = event => {
    const filter = event.target.value;
    const filteredList = userData.users.filter(item => {
      let values = item.name.first.toLowerCase();
      return values.indexOf(filter.toLowerCase()) !== -1;
    });

    setuserData({ 
    ...userData, 
    filteredUsers: filteredList });
  };

  useEffect(() => {
    getUsersData();
  }, []);
  const getUsersData =async ()=> {
      try {
          let users = await fetchUser('?results=50');
          console.log(users.data.results);
          setuserData({
          ...userData,
          users: users.data.results,
          filteredUsers: users.data.results
        });
          isLoading(false);
      } catch (error) {
          console.log(error);
      }
  }
  const copy=(img,name,uname,pass,phone,email,dob)=>{
    const tempInput = document.createElement('input')
    tempInput.value = `Image: ${img},Name: ${name}, Username: ${uname}, Password: ${pass}, Phone: ${phone}Email: ${email}, DOB: ${dob}`
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempInput)
    setCopySuccess('Copied!!')
    setTimeout(() => {
    setCopySuccess('')
    }, 2000);
  }
  function ExportData(){
    let filename='reports.xlsx';
    var ws = utils.json_to_sheet(userData.users);
    var wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "People");
    writeFile(wb,filename);
    }
  if (loading) {return (<Loading/>)}
  return (
    <div className="rbody">
      <nav className="navbar navbar-expand-lg " style={{background: "gainsboro"}}>
        <div className="searchbox">
            <form className="form-inline">
                <input className="navin form-control "
                    type="search"placeholder="Search"aria-label="Search"
                    onChange={e => handleSearchChange(e)}
                />
                <button className="btn my-2 my-sm-0" type="submit">
                    <i className="fa fa-search" style={{verticalAlign: "inherit"}} aria-hidden="true"></i>
                </button>
            </form>
        </div>
        <button className="navBtn" onClick={()=>getUsersData()}>refresh</button>
        <p className="text-base-secondary" style={{display:(copySuccess==="Copied!!")? "block": "none", fontSize: 25, fontWeight: 800, margin: '0 auto', fontFamily: 'serif'}}>
          {copySuccess ? <span className="blink">{copySuccess}</span> : 'Copy link'}
        </p>
        <button className="navBtn" onClick={()=>ExportData()} style={{margin: 'auto 5px auto auto'}}>export</button>
      </nav>
      <div id="gallerys" className="gallerys">
          {userData.filteredUsers[0] !== undefined && userData.filteredUsers[0].name !== undefined ? (
            userData.filteredUsers.map(({ login, location, name, picture, phone, email, dob },index) => {
              return (
                  <>
                    <div key={login.uuid} className="cards" onClick={()=>setloginId(index)}>
                      <div className="cards-img-container">
                          <img className="cards-img" src={picture.medium} alt="profile picture"/>
                      </div>
                      <div className="cards-info-container">
                          <h3 id="name" className="cards-name cap">{name.first} {name.last}</h3>
                          <p className="cards-text">{email}</p>
                          <p className="cards-text cap">{location.city}, {location.state}</p>
                      </div>
                    </div>
                    <div className="modals-container" style={{display:(loginId==index)? "block": "none",textAlign: "center"}}>
                      <div className="modals">
                        <button type="button" onClick={(e)=>setloginId(null)} className="modals-close-btn"><strong>X</strong></button>
                        <div className="modals-info-container">
                          <img className="modals-img" src={picture.large} alt="profile picture"/>
                          <h3 id="name" className="modals-name cap" style={{color:"black"}}>{name.first} {name.last}</h3>
                          <table className="modelTable" >
                            <tbody >
                              <tr>
                                <td data-th="Username" className="align-left">
                                Username
                                </td>
                                <td data-th="Username" className="align-left">
                                {login.username}
                                </td>
                              </tr>
                              <tr>
                                <td data-th="Password" className="align-left">
                                Password
                                </td>
                                <td data-th="Password" className="align-left">
                                {login.password}
                                </td>
                              </tr>
                              <tr>
                                <td data-th="Phone" className="align-left">
                                Phone
                                </td>
                                <td data-th="Phone" className="align-left">
                                {phone}
                                </td>
                              </tr>
                              <tr>
                                <td data-th="Email" className="align-left">
                                Email
                                </td>
                                <td data-th="Email" className="align-left">
                                {email}
                                </td>
                              </tr>
                              <tr>
                                <td data-th="DOB" className="align-left">
                                DOB
                                </td>
                                <td data-th="DOB" className="align-left">
                                {dob.date.slice(0,10)}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="modals-btn-container">
                        <button type="button" onClick={()=>setloginId(index-1)} className="modals-prev btn">Prev</button>
                        <button type="button" onClick={()=>setloginId(index+1)} className="modals-next btn">Next</button>
                      </div>
                    </div>
                  </>
              );
            })
          ) : (
            <></>
          )}
      </div>
    </div>
  );
}
export default Records;