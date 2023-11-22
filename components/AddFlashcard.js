import styles from "../styles/Home.module.css";

import { useState, useEffect, useRef } from "react";


//ADD HERE: GET NEW INPUT, ADD IT TO DB, ADD A FLASHCARD FROM OUTPUT 
const AddFlashcard = ({ onAdd, onClose }) => {
  const [term, setTerm] = useState("");
  const [langTo, setLangTo] = useState("");
  const [langFrom, setLangFrom] = useState("");
  const [image, setImage] = useState(null);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const  handleCreate = async () => {
    if (!term && !image) {
      alert("Please fill in either the term or upload an image");
      return;
    }
    if(!langTo){
      alert("Please fill in langauge to");
      //TODO CHECK IF VALID LANGAUGE CODE!
      return;
    }
    if(!langFrom){
      alert("Please fill in langauge from");
      //TODO CHECK IF VALID LANGAUGE CODE!
      return;
    }
    else if(term){
      //TODO CHANGE CALL
      var result = await fetch("http://localhost:18080/get_translation_history/?id=" + localStorage.getItem('id'))
      var resJSON = result.json()
      var data = JSON.parse(resJSON.message)
      //TODO: MODIFY BASED ON MESSAGE
      definition = data.outputText
      // onAdd(term, definition);
      onAdd({ term: term || "", definition: definition});
    } else {
      //TODO ADD IMAGE CALL HERE
      //TODO CHANGE CALL
      var result = await fetch("http://localhost:18080/get_translation_history/?id=" + localStorage.getItem('id'))
      var resJSON = result.json()
      var data = JSON.parse(resJSON.message)
      //TODO: MODIFY BASED ON MESSAGE
      definition = data.outputText
      // onAdd(term, definition);
      onAdd({ term: term || "", definition: definition});
    }
    

    setTerm("");
    setImage(null);
    onClose();
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div className={styles.modalContainer} ref={modalRef}>
      <div className={styles.modal}>
        <h2 className={styles.subtitle}>Add Flashcard</h2>
        <label className={styles.label}>
          Term:
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Enter term"
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Language from:
          <input
            type="text"
            value={langTo}
            onChange={(e) => setLangTo(e.target.value)}
            placeholder="Enter language translating to"
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Language from:
          <input
            type="text"
            value={langFrom}
            onChange={(e) => setLangFrom(e.target.value)}
            placeholder="Enter language translating from"
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Upload Image:
          <input
            type="file"
            accepts="image/*"
            onChange={handleImageChange}
            className={styles.input}
          />
        </label>
        <button onClick={handleCreate} className={styles.button}>
          Create
        </button>
        <button onClick={onClose} className={styles.button}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddFlashcard;
