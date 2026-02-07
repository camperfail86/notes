import styles from "./EditNote.module.css"
import {useState} from "react";
import {type NoteElement} from "../Note/Note.tsx";

type EditNoteProps = {
    note: NoteElement;
    saveUpdate: (id: string, title: string, content: string) => void;
    toggleUpdate: (value: boolean) => void;
}

const EditNote = ({note, toggleUpdate, saveUpdate}: EditNoteProps) => {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header_newNote}>
                    <div className={styles.title}>Создание заметки</div>
                    <button onClick={()=>toggleUpdate(false)} className={styles.close_button}>Х</button>
                </div>
                <div className={styles.name_note}>Название заметки</div>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className={styles.input_text} type="text"/>
                <div className={styles.text_note}>Текст заметки</div>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} cols={20} rows={15} className={styles.textarea_text} name="" id=""></textarea>
                <button onClick={() => saveUpdate(note.id, title, content)}>Сохранить заметку</button>
            </div>
        </div>
    );
};

export default EditNote;