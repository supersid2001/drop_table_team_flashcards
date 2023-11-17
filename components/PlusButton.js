import { useState } from "react";
import AddFlashcard from "./AddFlashcard";
import styles from "../styles/Home.module.css";

const PlusButton = ({ onAddFlashcard }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.plusButtonContainer}>
      <div className={styles.plusButton} onClick={openModal}>
        +
      </div>
      {showModal && (
        <AddFlashcard onClose={closeModal} onAdd={onAddFlashcard} />
      )}
    </div>
  );
};

export default PlusButton;
