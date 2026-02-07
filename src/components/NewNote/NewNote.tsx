import styles from './NewNote.module.css';
import {useState} from "react";
import type {NoteElement} from "../Note/Note.tsx";

type NewNoteProps = {
    toggle: () => void;
    addNote: (notes: NoteElement[]) => void;
}

const NewNote = ({addNote, toggle}: NewNoteProps) => {
    const [content, setContent] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    function createNewNote(note: NoteElement){
        note.update = new Date();
        const notes = JSON.parse(localStorage.getItem("notes") || "[]");
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));
        toggle();
        addNote(notes);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header_newNote}>
                    <div className={styles.title}>Создание заметки</div>
                    <button onClick={()=> toggle()} className={styles.close_button}>Х</button>
                </div>
                <div className={styles.name_note}>Название заметки</div>
                <input onChange={(e) => setTitle(e.target.value)} className={styles.input_text} type="text"/>
                <div className={styles.text_note}>Текст заметки</div>
                <textarea onChange={(e) => setContent(e.target.value)} cols={20} rows={15} className={styles.textarea_text} name="" id=""></textarea>
                <button onClick={()=>createNewNote({ id: crypto.randomUUID(), title: title, content: content })}>Создать заметку</button>
            </div>
        </div>
    );
};

export default NewNote;