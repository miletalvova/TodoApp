'use client';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
};

export default function Search({ search, onSearchChange }: Props) {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-9"
      />
    </div>
  );
}
