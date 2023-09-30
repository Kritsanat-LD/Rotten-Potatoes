import React, { useState } from "react";
import { uploadActorImage } from "../context/UploadImg";
import { addActorDB } from "../context/addMovieInfo";
import NavbarAdmin from "./navbaradmin";
import AdminCss from "../css/admin.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AddActor = () => {
    const [name, setName] = useState('')
    const [birthDate, setBirthDate] = useState(null)
    const [actorImage, setActorImage] = useState(null)


    const handleImageSelection = (event) => {
        setActorImage(event.target.files[0]);
    }

    const handleAddActor = async () => {
        try {
            let imageURL = null;
            if (actorImage) {
                imageURL = await uploadActorImage(actorImage);
                console.log(imageURL)
            }
            const data = {
                Name: name,
                BirthDate: birthDate,
                ActorImage: imageURL
            };
            await addActorDB(data);
            console.log('Actor added successfully');
        } catch (error) {
            console.error('Error add actor:', error);
        }
        setName('')
        setBirthDate(null)
        window.alert('Data added successfully!');
        window.location.reload()
    }

    return (
        <>
            {/* <h1>Add Actor</h1>
        <label><b>Name</b></label>
        <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required/><br/>
        <label><b>Last Name</b></label>
        <input type="text" placeholder="Enter Lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} required/><br/>
        <label><b>Movie Name</b></label>
        <input type="date" placeholder="Enter BirthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required/><br/>
        <label><b>Actor Image</b></label>
        <input type="file" onChange={handleImageSelection}/>


    <br/><button onClick={handleAddActor} >Add Actor</button> */}
     <NavbarAdmin />
                <section className={AdminCss.warpper}>
                    <section className={AdminCss.container}>
                        <a href="" className={AdminCss.gobackbtn}><FontAwesomeIcon icon={faArrowLeft} /></a>
                        <header className={AdminCss.header}>Add Actor</header>
                        <div className={AdminCss.form}>
                            <div className={AdminCss.inputbox}>
                                <label className={AdminCss.label}>Actor Name</label>
                                <input className={AdminCss.input} type="text" placeholder="Enter Actor Name" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className={AdminCss.inputbox}>
                                <label className={AdminCss.label}>Enter BirthDate</label>
                                <input className={AdminCss.input} type="date" placeholder="Enter BirthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
                            </div>

                            <div className={AdminCss.inputbox}>
                                <label className={AdminCss.label}>Movie Image</label>
                                <input onChange={handleImageSelection} type="file" className={AdminCss.inputfile} />
                            </div>
                            <button onClick={handleAddActor} className={AdminCss.addmovie}>Add Movie</button>
                        </div>
                    </section>
                </section>
        </>
    )
}

export default AddActor;