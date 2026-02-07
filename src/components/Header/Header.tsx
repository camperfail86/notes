import styles from "./Header.module.css"

export interface ModalProps {
    toggle: () => void;
}

const Header = ({ toggle }: ModalProps) => {
    return (
        <div className={styles.header}>
            <h2>Заметки 📝</h2>
            <button onClick={()=>toggle()}>Создать заметку</button>
        </div>
    );
};

export default Header;