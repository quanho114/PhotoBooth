import React from 'react';
import { Filter } from '../types';
import { FILTERS } from '../constants';

interface FilterSelectorProps {
  currentFilter: Filter;
  onSelect: (filter: Filter) => void;
}

export const FilterSelector: React.FC<FilterSelectorProps> = ({ currentFilter, onSelect }) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4 px-2 no-scrollbar">
      {FILTERS.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onSelect(filter)}
          className={`flex flex-col items-center flex-shrink-0 transition-all duration-300 ${
            currentFilter.id === filter.id ? 'scale-110' : 'scale-100 opacity-70 hover:opacity-100'
          }`}
        >
          <div 
            className={`w-14 h-14 rounded-full border-4 shadow-lg mb-1 flex items-center justify-center overflow-hidden
              ${currentFilter.id === filter.id ? 'border-white ring-2 ring-brand-pink' : 'border-gray-700'}
            `}
          >
             <div className={`w-full h-full bg-gray-300 ${filter.cssClass}`}>
                <img 
                  src="https://picsum.photos/100/100" 
                  alt="filter preview" 
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
          <span className="text-xs font-medium text-white shadow-black drop-shadow-md">{filter.name}</span>
        </button>
      ))}
    </div>
  );
};
