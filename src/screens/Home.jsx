import React from 'react';
import { useEffect, useState } from 'react';
import {fetchUser} from '../routes';
import Loading from '../components/Loading';
import Card from '../components/Card';

const Home = () =>{
    useEffect(() => { getUserData(); }, []);
    const [loading, isLoading] = useState(true);
    const [data, setData] = useState([]);
    const getUserData =async ()=> {
        try {
            let user = await fetchUser('');
            setData(user.data.results);
            //console.log(user.data.results[0].name.first);
            isLoading(false);
            return user.data.results[0].name;
        } catch (error) {
            console.log(error);
        }
    }
    if (loading) {return (<Loading/>)}
    return (
        <Card data={data[0]} getUser={getUserData}/>
    );
}

export default Home;