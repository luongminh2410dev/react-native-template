import {ModalProps, TextStyle, ViewStyle} from "react-native";

export interface ModalPickerProps extends ModalProps {
  data: Array<ItemPicker>;
  onClose: () => void;
  onSelect: (item: ItemPicker) => void;
  isClose?: Boolean;
  styleViewModal?: ViewStyle;
  label: string;
  value: string;
  type: string;
}
export interface ModalNoteProps extends ModalProps {
  onClose: () => void;
  textContent?: string;
  successCheckin?: boolean;
  stylesContent?: TextStyle;
}
export interface ModalMonthProps extends ModalProps {
  onClose: () => void;
  onValueChange: (event: any, newDate: any) => void;
}
export interface ItemPicker {
  id: number;
  key: string;
  name: string;
  label: string;
  reason: string;
}
export interface ModalConfirmProps extends ModalProps {
  onClose: () => void;
  visible?: boolean | undefined;
  data?: any | undefined;
}

export interface ModalContactProps extends ModalProps {
  onClose: () => void;
  visible?: boolean | undefined;
  data: any;
  onContact: any;
}
