import { useContext, useEffect, useRef, useState } from "react";
import { Note } from "types/types";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { notesContext } from "context/NotesContext";
import Dialog from "./Dialog";
import DeleteMenu from "./DeleteMenu";

interface StickyNoteProps extends Note {
  setActiveCard: (index: number | null) => void;
}

export default function StickyNote({
  id,
  title,
  text,
  createdAt,
  deadline,
  index,
  setActiveCard
}: StickyNoteProps) {
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newText, setNewText] = useState<string>(text);
  const [newSelectedDate, setNewSelectedDate] = useState<Date | null>(deadline);

  const editDialogRef = useRef<HTMLDialogElement | null>(null);
  const deleteDialogRef = useRef<HTMLDialogElement | null>(null);

  const expirationDate = deadline ? deadline.toLocaleDateString("en-GB") : null;
  const { day, month, year } = createdAt;
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");

  const context = useContext(notesContext);

  if (!context) return null;

  const { setAllNotes } = context;

  const showDeleteModal = (): void => {
    if (deleteDialogRef.current) {
      deleteDialogRef.current.showModal();
    }
    setIsShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    if (deleteDialogRef.current) {
      deleteDialogRef.current.close();
    }
    setIsShowDeleteModal(false);
  }

  const deleteNoteHandler = (): void => {
    setAllNotes((prevState: Note[]) => {
      let filteredAllNotes = prevState.filter((note) => note.id !== id);
      return filteredAllNotes;
    });
    closeModal();
  };

  const showEditDialogHandler = (): void => {
    if (editDialogRef.current) {
      editDialogRef.current.showModal();
    }
    setIsShowEditModal(true);
  };

  const editNoteHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    let editedNote = {
      id,
      title: newTitle,
      text: newText,
      createdAt,
      deadline: newSelectedDate,
    } as Note;

    setAllNotes((prevState: Note[]) =>
      prevState.map((note) => (note.id === id ? (note = editedNote) : note))
    );

    closeModal();
  };

  const closeModal = () => {
    if (editDialogRef.current) {
      editDialogRef.current.close();
    }
    setIsShowEditModal(false);
  };

  useEffect(() => {
    if (isShowEditModal) {
      document.body.classList.add("blur");
    }

    return () => document.body.classList.remove("blur");
  }, [isShowEditModal]);

  const isDeadlineArrived = (): boolean => {
    if (
      deadline?.getDate() === new Date().getDate() &&
      deadline?.getMonth() + 1 === new Date().getMonth() + 1 &&
      deadline?.getFullYear() === new Date().getFullYear()
    ) {
      return true;
    }
    return false;
  };

  const isDeadlineToday = isDeadlineArrived()

  return (
    <>
      <div
      onDragStart={() => setActiveCard(index)}
      onDragEnd={() => setActiveCard(null)}
      draggable
        className={`flex flex-col gap-3 relative w-full h-80 rounded-md text-black p-5 overflow-x-hidden cursor-grab ${
          isDeadlineToday ? "bg-red-300" : "bg-white"
        }`}
      >
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-xl">
            - {title} - <br /> {isDeadlineToday && "Deadline is TODAY!"}
          </h3>
          <div className="flex items-center gap-1 text-xl cursor-pointer ">
            <MdEdit
              onClick={showEditDialogHandler}
              className="hover:scale-105"
            />
            <MdDelete onClick={showDeleteModal} className="hover:scale-110" />
          </div>
        </div>
        <p className="text-gray-900 max-h-44 overflow-auto">{text}</p>
        <div className="absolute bottom-4 left-3 flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <span className="bg-lime-400 rounded-sm">CreatedAt: </span>
            <time>
              {formattedDay}/{formattedMonth}/{year}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <span className="bg-red-400 rounded-sm">deadline: </span>
            <time>{expirationDate}</time>
          </div>
        </div>
      </div>

      <Dialog
        ref={editDialogRef}
        title={newTitle}
        setTitle={setNewTitle}
        closeModal={closeModal}
        formOnSubmit={editNoteHandler}
        text={newText}
        setText={setNewText}
        selectedDate={newSelectedDate}
        setSelectedDate={setNewSelectedDate}
        btnText="Edit"
      />

      <DeleteMenu
        isShowDeleteModal={isShowDeleteModal}
        ref={deleteDialogRef}
        deleteNoteHandler={deleteNoteHandler}
        closeDeleteModal={closeDeleteModal}
      />
    </>
  );
}
