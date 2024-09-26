import { forwardRef } from "react";
import { IoMdClose } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ModalProps } from "types/types";

const Dialog = forwardRef<HTMLDialogElement , ModalProps>(
  (
    {
      formOnSubmit,
      closeModal,
      title,
      setTitle, 
      text,
      setText,
      selectedDate,
      setSelectedDate,
      btnText,
    },
    ref
  ) => {
    return (
      <dialog ref={ref} className="outline-none p-4 rounded-md text-black z-20">
        <form onSubmit={formOnSubmit} className="flex flex-col gap-3">
          <IoMdClose
            onClick={closeModal}
            className="inline-block self-end bg-black/80 text-white rounded-full w-5 h-5 p-1 cursor-pointer hover:scale-105"
          />
          <input
            className="focus:outline-none border border-black p-2 rounded-sm"
            type="text"
            placeholder="Enter the Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Write the Note"
            className="h-64 w-96 resize-none focus:outline-none overflow-auto border border-black p-2 rounded-md"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <DatePicker
            selected={selectedDate}
            minDate={new Date()}
            onChange={(date:Date | null) => setSelectedDate(date)}
            placeholderText="Select a date"
            className="w-full focus:outline-none border border-black p-2 rounded-sm"
            required
            dateFormat="dd/MM/yyyy"
            icon={null} 
          />
          <button
            type="submit"
            className="w-full h-full rounded-sm bg-black/80 py-2 px-4 text-white hover:scale-95 transition-transform duration-300"
          >
            {btnText}
          </button>
        </form>
      </dialog>
    );
  }
);

export default Dialog;
