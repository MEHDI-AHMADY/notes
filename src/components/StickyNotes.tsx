import { useContext } from 'react'
import StickyNote from './StickyNote'
import { notesContext } from 'context/NotesContext'
import { Note } from 'types/types';

export default function StickyNotes() {
    const context = useContext(notesContext)

    if(!context) return null;

    const {allNotes} = context;

  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10'>
        {allNotes?.map((note:Note) => (
            <StickyNote key={note.id} {...note}/>
        ))}
    </div>
  )
}
