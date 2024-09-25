import AddNote from "components/AddNote";
import StickyNotes from "components/StickyNotes";
import Header from "components/Header";

export default function App() {
  return (
    <div className="container px-2 sm:px-0 mx-auto min-h-[100vh] ">
      <Header />
      <main className="mt-10">
        <AddNote />
        <StickyNotes />
      </main>
    </div>
  );
}
