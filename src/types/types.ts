interface CustomDate {
  day: number;
  month: number;
  year: number;
}

export interface Note {
  id: string;
  title: string;
  text: string;
  createdAt: CustomDate;
  deadline: Date | null;
  index:number;
}

export interface ContextTypes {
  allNotes: Note[];
  setAllNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

export type ModalProps = {
  formOnSubmit : (value : React.FormEvent<HTMLFormElement>) => void,
  closeModal : () => void,
  title :string,
  setTitle: (value:string) => void,
  text :string,
  setText:(value:string) => void,
  selectedDate : Date | null,
  setSelectedDate : React.Dispatch<React.SetStateAction<Date | null>>,
  btnText:string,
};

export type ShowEditModal = {
  isShowEditModal: boolean;
  setIsShowEditModal: (value: boolean) => void;
};
