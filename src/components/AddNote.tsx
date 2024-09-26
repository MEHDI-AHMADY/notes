import { notesContext } from "context/NotesContext";
import { useContext, useEffect, useRef, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Note } from "types/types";
import Dialog from "./Dialog";

export default function AddNote() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if(isShowModal) {
      document.body.classList.add("blur")
    }

    return () => document.body.classList.remove("blur")

  }, [isShowModal]);

  const showAddNoteModal = (): void => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
    setIsShowModal(true);
  };

  const context = useContext(notesContext);
  if (!context) return null;

  const { setAllNotes } = context;

  const addNoteHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let newNote: Note = {
      id: crypto.randomUUID(),
      title: title.trim(),
      text: text.trim(),
      createdAt: {
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      },
      deadline: selectedDate,
    };

    if (!title.trim() && !text.trim() && !selectedDate) return;

    setAllNotes((prevState: Note[]) => [...prevState, newNote]);
    setTitle("");
    setText("");
    setSelectedDate(null);
    closeModal();
  };

  const closeModal = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    setIsShowModal(false);
  };

  return (
    <>
      <button
        onClick={showAddNoteModal}
        className="flex items-center gap-2 outline-none px-4 py-2 rounded-lg bg-white text-black"
      >
        Add Note <FaPlusCircle />
      </button>

      <Dialog
        ref={dialogRef}
        title={title}
        setTitle={setTitle}
        closeModal={closeModal}
        formOnSubmit={addNoteHandler}
        text={text}
        setText={setText}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        btnText="Add"
      />
    </>
  );
}
