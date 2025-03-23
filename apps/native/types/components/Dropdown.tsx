interface Item {
  name: string;
  onClick: () => void;
}

export interface DropdownProps {
  text: string;
  items: Item[];
}
