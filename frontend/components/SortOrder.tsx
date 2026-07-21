import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  value: 'low-high' | 'high-low';
  onOrderChange: (value: 'low-high' | 'high-low') => void;
};

export default function SortOrder({ value, onOrderChange }: Props) {
  return (
    <Select
      value={value}
      onValueChange={(value) => onOrderChange(value as 'low-high' | 'high-low')}
    >
      <SelectTrigger className="w-48 capitalize">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="low-high">Priority: Low to High</SelectItem>

        <SelectItem value="high-low">Priority: High to Low</SelectItem>
      </SelectContent>
    </Select>
  );
}
