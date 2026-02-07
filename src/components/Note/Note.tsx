import styles from "./Note.module.css";
import imageRefactor from "../../assets/redactor.png"
import imageClose from "../../assets/close.png"

export type NoteElement = {
  id: string;
  title: string;
  content: string;
  update?: Date;
};

type NoteProps = {
    id: string;
    title: string;
    content: string;
    deleteNote: (id: string) => void;
    updateNote: (id: string) => void;
    toggleUpdate: (value: boolean) => void;
}

const Note = ({updateNote, deleteNote, id, title, content}: NoteProps) => {
    function EditNote(id: string) {
        updateNote(id);
    }

    return (
        <>
            <div className={styles.note_wrapper}>
                <div className={styles.title}>
                    <h3 className={styles.title_text}>{title}</h3>
                    <div className={styles.buttons}>
                        <button onClick={() => EditNote(id)} className={styles.title_edit}>
                            <img width={20} height={20} src={imageRefactor} alt="Редактировать."/>
                        </button>
                        <button onClick={()=> deleteNote(id)} className={styles.title_delete}>
                            <img width={20} height={20} src={imageClose} alt="Закрыть."/>
                        </button>
                    </div>
                </div>
                <div className={styles.text}>{content}</div>
            </div>
        </>
    );
};

export default Note;