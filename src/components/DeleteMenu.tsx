import { forwardRef, useEffect } from "react";

type Props = {
  isShowDeleteModal: boolean;
  closeDeleteModal : () => void;
  deleteNoteHandler : () => void
};

const DeleteMenu = forwardRef<HTMLDialogElement , Props>(({
  isShowDeleteModal,
  closeDeleteModal,
  deleteNoteHandler
} , ref) => {

  useEffect(() => {
    if (isShowDeleteModal) {
      document.body.classList.add("blur");
    }
    return () => document.body.classList.remove("blur");
  }, [isShowDeleteModal]);

  return (
    <dialog ref={ref} className="text-black z-20">
      <div className="flex flex-col gap-5 p-5 bg-white">
        <h3>Are You sure to delete this note ?</h3>
        <div className="flex items-center gap-4">
          <button onClick={deleteNoteHandler} className="bg-red-300 p-2 rounded-full">Yes</button>
          <button
            className="bg-green-400 p-2 rounded-full"
            onClick={closeDeleteModal}
          >
            No
          </button>
        </div>
      </div>
    </dialog>
  );
})

export default DeleteMenu