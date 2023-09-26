import React, { useState } from "react";
import { uploadActorImage } from "../context/UploadImg";
import {addActorDB} from "../context/addMovieInfo";


const AddActor = () =>{
    const [name,setName] = useState('')
    const [lastname,setLastname] = useState('')
    const [birthDate,setBirthDate] = useState(null)
    const [actorImage,setActorImage] = useState(null)


    const handleImageSelection =(event)=>{
        setActorImage(event.target.files[0]);
    }

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
        window.location.reload()
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


        <br/><button onClick={handleAddActor} >Add Actor</button>
        </>
    )
}

export default AddActor;