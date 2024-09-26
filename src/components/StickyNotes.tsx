import { useContext, useState } from "react";
import StickyNote from "./StickyNote";
import { notesContext } from "context/NotesContext";
import { Note } from "types/types";

export default function StickyNotes() {
  const context = useContext(notesContext);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  if (!context) return null;

  const { allNotes , setAllNotes } = context;

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (activeCard === null) return;

    const dropIndex = Number(e.currentTarget.id);
    const newNotes = [...allNotes];

    [newNotes[activeCard] , newNotes[dropIndex]] = [newNotes[dropIndex] , newNotes[activeCard]];

    newNotes[activeCard] = {...newNotes[activeCard] , index : activeCard}
    newNotes[dropIndex] = {...newNotes[dropIndex] , index : dropIndex}

    setAllNotes(newNotes);
    setActiveCard(null);
  };

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
      {allNotes.map((note: Note, i: number) => (
        <div
          key={note.id}
          id={i.toString()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <StickyNote {...note} index={i} setActiveCard={setActiveCard} />
        </div>
      ))}
    </div>
  );
}
