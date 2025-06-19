import React from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  sortBy: string;
  order: 'asc' | 'desc';
  onSortChange: (v: string) => void;
  onOrderChange: (v: 'asc' | 'desc') => void;
  sortOptions: { value: string; label: string }[];
}

const SearchSortBar: React.FC<Props> = ({ value, onChange, sortBy, order, onSortChange, onOrderChange, sortOptions }) => (
  <div className="flex flex-wrap gap-2 items-center mb-4">
    <input
      type="text"
      placeholder="Search by name"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
    />
    <select
      value={sortBy}
      onChange={e => onSortChange(e.target.value)}
      className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
    >
      {sortOptions.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    <div className="flex gap-1">
      <button
        className={`px-3 py-2 rounded text-sm ${order === 'asc' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        onClick={() => onOrderChange('asc')}
        type="button"
      >Asc</button>
      <button
        className={`px-3 py-2 rounded text-sm ${order === 'desc' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        onClick={() => onOrderChange('desc')}
        type="button"
      >Desc</button>
    </div>
  </div>
);

export default SearchSortBar; 