import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query,where } from 'firebase/firestore';
import AdminManagementCss from "../css/adminmanagement.module.css"
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deleteActorInfoDB } from '../context/deleteMovieInfo';
import NavbarAdmin from './navbaradmin';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    // const handleDeleteActor = (actorId, actorName) => {
    //     return toast.promise(
    //         async (resolve) => {
    //             try {
    //                 await deleteActorInfoDB(actorId, actorName);
    //                 // resolve(); 
    //             } catch (error) {
    //                 console.error('Error deleting actor:', error);
    //                 // throw error; 
    //             }
    //         },
    //         {
    //             pending: 'Deleting actor, please wait...', 
    //             success: 'Actor deleted successfully!', 
    //             error: 'Error deleting actor. Please try again later.', 
    //         }
    //     ).then(() => {
    //         setTimeout(() => {
    //             window.location.reload();
    //         }, 2500); 
    //     });
    // };
    
    const handleDeleteActor = (actorId, actorName) => {
        return toast.promise(
            async (resolve) => {
                try {
                    await deleteActorInfoDB(actorId, actorName);
                } catch (error) {
                    console.error('Error deleting actor:', error);
                }
            },
            {
                pending: 'Deleting actor, please wait...',
                success: 'Actor deleted successfully!',
                error: 'Error deleting actor. Please try again later.',
            }
        ).then(() => {
            // Filter out the deleted actor from the state
            setActor((prevActors) => prevActors.filter((actor) => actor.id !== actorId));
        });
    };



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
         <ToastContainer
                            position="top-center"
                            autoClose={2500}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss={false}
                            draggable
                            pauseOnHover={false}
                            theme="light"
                            />
        </div>
    </>
    )
}

export default ActorManagement;