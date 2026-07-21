import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  value: 'all' | 'done' | 'undone';
  onStatusChange: (value: 'all' | 'done' | 'undone') => void;
};

export default function StatusFilter({ value, onStatusChange }: Props) {
  return (
    <Select
      value={value}
      onValueChange={(value) => {
        if (value) {
          onStatusChange(value as 'all' | 'done' | 'undone');
        }
      }}
    >
      <SelectTrigger className="w-48 capitalize">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="done">Done</SelectItem>
        <SelectItem value="undone">Undone</SelectItem>
      </SelectContent>
    </Select>
  );
}
