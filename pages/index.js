import { useState } from "react";
import Dashboard from "../components/Dashboard";
import AddFlashcard from "../components/AddFlashcard";
import styles from "../styles/Home.module.css";
import PlusButton from "../components/PlusButton";

const Home = () => {
  const [flashcards, setFlashcards] = useState([]);

  const handleAddFlashcard = (newFlashcard) => {
    setFlashcards([
      ...flashcards,
      { ...newFlashcard, id: flashcards.length + 1 },
    ]);
  };

  return (
    <div className={styles.container}>
      <PlusButton onAddFlashcard={handleAddFlashcard} />
      <Dashboard flashcards={flashcards} />
    </div>
  );
};

export default Home;
