import { createContext, ReactNode, useState } from "react";
import { ContextTypes, Note } from "types/types";

type Props = {
  children : ReactNode
}

export const notesContext = createContext<ContextTypes | undefined>(undefined);

export default function NotesProvider ({children} : Props) {
  const [allNotes, setAllNotes] = useState<Note[]>([]);

  return (
    <notesContext.Provider value={{ allNotes, setAllNotes }}>
      {children}
    </notesContext.Provider>
  );
}
