import './App.css'
import Note, {type NoteElement} from "./components/Note/Note.tsx";
import Header from "./components/Header/Header.tsx";
import {useEffect, useState} from "react";
import NewNote from "./components/NewNote/NewNote.tsx";
import EditNote from "./components/EditNote/EditNote.tsx";

function App() {
    const [openModal, setOpenModal] = useState(false);
    const [openRedactor, setOpenRedactor] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [notes, setNotes] = useState<NoteElement[]>(() => {
        const defaultNotes: NoteElement[] = [
            { id: "1", title: "Первая", content: "...", update: new Date() },
        ];

        return JSON.parse(
            localStorage.getItem("notes") || JSON.stringify(defaultNotes)
        ) as NoteElement[];
    });

    function addNote(noteElements: NoteElement[]) {
        setNotes(noteElements);
    }

    function deleteNote(id: string) {
        const newNotes = notes.filter((note) => note.id !== id);
        console.log(newNotes);
        setNotes(newNotes);
    }
    
    function updateNote(id: string) {
        setEditingId(id);
        setOpenRedactor(true);
    }

    function saveUpdate(id: string, title: string, content: string) {
        setNotes((prev) =>
            prev.map((n) =>
                n.id === id ? { ...n, title, content, update: new Date() } : n
            )
        );
        setOpenRedactor(false);
        setEditingId(null);
    }

    function toggleUpdate(value: boolean) {
        setOpenRedactor(value);
    }

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    function toggleModalTrue() {
        setOpenModal(true);
        return;
    }

    function toggleModalFalse() {
        setOpenModal(false);
        return;
    }

    if (openModal) {
        return (<NewNote addNote={addNote} toggle={toggleModalFalse}/>);
    }

    if (openRedactor && editingId) {
        const note = notes.find((n) => n.id === editingId);

        return (
            <EditNote
                note={note}
                toggleUpdate={toggleUpdate}
                saveUpdate={saveUpdate}
            />
        );
    }

  return (
    <>
        <Header toggle={toggleModalTrue} />
        <div className="container">
            {notes.map((value) => (
                <Note toggleUpdate={toggleUpdate} updateNote={updateNote} deleteNote={deleteNote} id={value.id} key={value.id} title={value.title} content={value.content}/>
            ))}
        </div>
    </>
  )
}

export default App
