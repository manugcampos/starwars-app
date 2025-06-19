import React from 'react';
import { Person, PaginatedResponse } from '../types';
import * as Dialog from '@radix-ui/react-dialog';

interface Props {
  data?: PaginatedResponse<Person>;
  isLoading: boolean;
  isError: boolean;
  page: number;
  onPageChange: (newPage: number) => void;
  onSimulateAI: (name: string) => void;
}

const TablePeople: React.FC<Props> = ({ data, isLoading, isError, page, onPageChange, onSimulateAI }) => {
  if (isLoading) return <div className="flex justify-center py-8"><div className="loader" /></div>;
  if (isError) return <div className="text-red-600 text-center py-4">Error loading data</div>;
  if (!data) return null;

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.results.map((person) => (
            <tr key={person.url}>
              <td className="px-6 py-4 whitespace-nowrap">{person.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(person.created).toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  onClick={() => onSimulateAI(person.name)}
                >
                  Simulate Insight
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end items-center p-4">
        <button
          className="px-3 py-1 mr-2 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >Previous</button>
        <span className="mx-2">Page {page}</span>
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          onClick={() => onPageChange(page + 1)}
          disabled={data.results.length < 15}
        >Next</button>
      </div>
    </div>
  );
};

export default TablePeople; 