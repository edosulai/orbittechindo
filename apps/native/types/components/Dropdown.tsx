interface Item {
    name: string;
    onClick: () => void;
}

export interface DropdownProps {
    children: React.ReactNode;
    items: Item[];
}
