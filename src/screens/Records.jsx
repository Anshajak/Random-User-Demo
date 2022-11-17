import React,{ useState,useEffect } from 'react';
import {utils,writeFile} from "xlsx";
import {fetchUser} from '../routes';
import Loading from '../components/Loading';
import '../assets/css/records.css';

const Records = () => {
  const [loading, isLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState('')
  const [userData, setuserData] = useState({
    users: [],
    order: "ascend",
    filteredUsers: [],
    headings: [
      { name: "Image", width: "10%", },
      { name: "Name", width: "10%", },
      { name: "Username", width: "10%", },
      { name: "Password", width: "10%", },
      { name: "Phone", width: "10%", },
      { name: "Email", width: "10%", },
      { name: "DOB", width: "10%", }
    ]
  });
  const handleSort = heading => {
    if (userData.order === "descend") {
        setuserData({
            order:"ascend"
        })
    } else{
        setuserData({
            order:"descend"
        })
    }
    const compareFnc = (a, b) => {
      if (userData.order === "ascend") {
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        } else if (heading === "name") {
          return a[heading].first.localeCompare(b[heading].first);
        } else {
          return b[heading] - a[heading];
        } 
      } else {
        if (a[heading] === undefined){
            return 1;
        } else if (b[heading] === undefined){
            return -1;
        } else if (heading ==="name"){
            return b[heading].first.localeCompare(a[heading].first);
        } else {
          return b[heading]-  a[heading];
        }
      }
    }
    const sortedUsers = userData.filteredUsers.sort(compareFnc);
    setuserData({
      ...userData,
      filteredUsers: sortedUsers
    });
  };

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
      <div className="data-area">
        {userData.filteredUsers.length > 0 ? <>        
        <div className="datatable mt-2">
          <table id="table" className="table table-striped table-hover table-condensed" >
            <thead style={{textAlign:"center"}}>
              <tr>
                {userData.headings.map(({ name, width }) => { return (
                  <th className="col" key={name} style={{ width }}
                      onClick={() => { handleSort(name.toLowerCase()); }}>
                      {name}
                      <span className="pointer"></span>
                  </th>
                );})}
              </tr>
            </thead>
            <tbody>
            {userData.filteredUsers[0] !== undefined && userData.filteredUsers[0].name !== undefined ? (
              userData.filteredUsers.map(({ login, name, picture, phone, email, dob }) => {
                return (
                  <tr key={login.uuid} style={{textAlign:"center"}} 
                    onClick={()=>copy(picture.medium, name.first+" "+name.last, login.username, login.password, phone, email, dob.date.slice(0,10))}>
                    <td data-th="Image" className="align-middle" >
                      <img src={picture.medium} alt={"profile image for " + name.first + " " + name.last} className="img-responsive"/>
                    </td>
                    <td data-th="Name" className="align-left">
                      {name.first} {name.last}
                    </td>
                    <td data-th="Username" className="align-left">
                      {login.username}
                    </td>
                    <td data-th="Password" className="align-left">
                      {login.password}
                    </td>
                    <td data-th="Phone" className="align-left">
                      {phone}
                    </td>
                    <td data-th="Email" className="align-left">
                        {email}
                    </td>
                    <td data-th="DOB" className="align-left">
                      {dob.date.slice(0,10)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <></>
            )}
          </tbody>
          </table>
        </div>
        </>: <div></div>}
      </div>
    </div>
  );
}
export default Records;