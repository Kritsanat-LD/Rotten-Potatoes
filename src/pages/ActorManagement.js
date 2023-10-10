import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query,where } from 'firebase/firestore';
import AdminManagementCss from "../css/adminmanagement.module.css"
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deleteActorInfoDB } from '../context/deleteMovieInfo';
import NavbarAdmin from './navbaradmin';
const ActorManagement = () =>{
    const [actor,setActor] = useState([])

    useEffect(()=>{
        const fecthActor = async () =>{
            try{
                const querySnapshot = await getDocs(query(collection(db,'Actor'),orderBy('Name')));
                const actorData = querySnapshot.docs.map((doc)=>({
                    id: doc.id,
                    ...doc.data(),
                }))
                setActor(actorData);
            }
            catch(error){
                console.error('Error fetching movie:', error);
            }
        }
        fecthActor();
    },[])

    const handleDeleteActor = async (actorId,actorName) =>{
        try{
            await deleteActorInfoDB(actorId,actorName);
            console.log('delete successful')
        }catch(error){
            console.error('Error deleting actor:', error);
        }
        window.alert('Data deleted successfully!');
        window.location.reload();
    }
    



    return(
    <>
    <NavbarAdmin/>
     <div className={AdminManagementCss.container}>
     <div className={AdminManagementCss.selectbox}>
        <h1>Actor Management</h1>
        <a className={AdminManagementCss.alinkbtn} href='/addactor'>Add Actor</a>
        </div>
        <div className={AdminManagementCss.warpper}>
        {actor.map((e)=>(
            <div key={e.id} className={AdminManagementCss.content}>
                <img className={AdminManagementCss.img} width={162} height={232} src={e.ActorImage} />
                <div className={AdminManagementCss.contentinfoActor}>
                  <a className={AdminManagementCss.contentactorname}>{e.Name}</a>
                  <a className={AdminManagementCss.contentactorDate}>{e.BirthDate}</a>
                </div>
                <button className={AdminManagementCss.contentbtndelete} onClick={() => handleDeleteActor(e.id,e.Name)}><FontAwesomeIcon icon={faTrash} /></button>
              </div>
        ))}
         </div>
        </div>
    </>
    )
}

export default ActorManagement;