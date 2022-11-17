import axios from 'axios';
let url ='https://randomuser.me/api/';

export const fetchUser = async (value) => {
    try{
        let response = await axios.get(`${url}${value}`);
        //console.log(response.data.results);
        return response;
    }
    catch(error){
        console.error(`Url Error: ${error}`);
    }
}