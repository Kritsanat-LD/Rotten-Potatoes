import React, { useState } from "react";
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const AddActor = () =>{
    const [name,setName] = useState('')
    const [lastname,setLastname] = useState('')
    const [birthDate,setBirthDate] = useState(null)
    const [actorImage,setActorImage] = useState(null)


    const handleImageSelection =(event)=>{
        setActorImage(event.target.files[0]);
    }

    const uploadActorImage = async (file) => {
        const storageRef = ref(storage, `Actor/${file.name}`);
        await uploadBytes(storageRef, file);
      
        const imageURL = await getDownloadURL(storageRef);
        return imageURL;
      };

    const addActorDB = async (data) => {
        try{
          const newDocRef = collection(db,'Actor');
          await addDoc(newDocRef,data);
          console.log('Actor added to Firestore successfully');
        } catch (error){
          console.error('Error adding Actor to Firestore:', error);
        }
    };

    const handleAddActor = async () =>{
        try{
            let imageURL = null;
            if (actorImage) {
                imageURL = await uploadActorImage(actorImage);
                console.log(imageURL)
              }
            const data = {
                Name : name,
                Lastname : lastname,
                BirthDate : birthDate,
                ActorImage : imageURL
            };
            await addActorDB(data);
            console.log('Actor added successfully');
        }catch(error){
            console.error('Error add actor:', error);
        }
        setName('')
        setLastname('')
        setBirthDate(null)
        window.alert('Data added successfully!');
    }

    return(
        <>
        <h1>Add Actor</h1>
        <label><b>Name</b></label>
        <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required/><br/>
        <label><b>Last Name</b></label>
        <input type="text" placeholder="Enter Lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} required/><br/>
        <label><b>Movie Name</b></label>
        <input type="date" placeholder="Enter BirthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required/><br/>
        <label><b>Actor Image</b></label>
        <input type="file" onChange={handleImageSelection}/>


        <button onClick={handleAddActor} >Add Movie</button>
        </>
    )
}

export default AddActor;