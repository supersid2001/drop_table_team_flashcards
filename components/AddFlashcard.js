import styles from "../styles/Home.module.css";

import { useState, useEffect, useRef } from "react";


//ADD HERE: GET NEW INPUT, ADD IT TO DB, ADD A FLASHCARD FROM OUTPUT 
const AddFlashcard = ({ onAdd, onClose }) => {
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");
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

  const handleCreate = () => {
    if (!term && !image) {
      alert("Please fill in either the term or upload an image");
      return;
    }

    if (!definition) {
      alert("Please fill in both term and definition");
      return;
    }

    // onAdd(term, definition);
    onAdd({ term: term || "", definition, image });
    

    setTerm("");
    setDefinition("");
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
          Definition:
          <input
            type="text"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            placeholder="Enter definition"
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
