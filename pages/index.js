import {useEffect, useState} from 'react';
import Dashboard from "../components/Dashboard";
import AddFlashcard from "../components/AddFlashcard";
import styles from "../styles/Home.module.css";
import PlusButton from "../components/PlusButton";

const Home = () => {
  //TODO: INITIALIZE FLASHCARDS HERE!!
  const [flashcards, setFlashcards] = useState([]);

    async function getData(){
      localStorage.setItem('id', '652fe0fe6d3216d1ff0ea25e');
      //TODO: MODIFY API FUNCTION TO GET DATA FROM ID 
      //id: + id???
      const res = await fetch("http://localhost:18080/get_translation_history/?id=" + localStorage.getItem('id'))
      return res.json()
    }
  
    useEffect(() => {
      getData().then((translationHistory) => {
        data = JSON.parse(translationHistory)
        data.map((entry) => {
          //TODO: MODIFY!!
          let {from, inputText, outputText, to} = entry
          handleAddFlashcard({term: inputText, outputText})
        })
      })
      //onAdd({ term: term || "", definition, image });

      //TODO: LOOK AT HOW TO PARSE DATA
      // data.map((entry) => {
      //   handleAddFlashcard({term: entry.input || "", entry.output})
      // })
    })

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
