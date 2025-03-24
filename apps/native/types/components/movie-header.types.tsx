export interface MovieHeaderProps {
  handleTitleChange: (title: string) => void;
  handleTypeFilterChange: (type: string) => void;
  handleYearRangeChange: (range: [number, number]) => void;
}
