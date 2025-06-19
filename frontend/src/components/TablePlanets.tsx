import React from 'react';
import { Planet, PaginatedResponse } from '../types';
import * as Dialog from '@radix-ui/react-dialog';

interface Props {
  data?: PaginatedResponse<Planet>;
  isLoading: boolean;
  isError: boolean;
  page: number;
  onPageChange: (newPage: number) => void;
  onSimulateAI: (name: string) => void;
}

const TablePlanets: React.FC<Props> = ({ data, isLoading, isError, page, onPageChange, onSimulateAI }) => {
  if (isLoading) return <div className="flex justify-center py-8"><div className="loader" /></div>;
  if (isError) return <div className="text-red-600 text-center py-4">Error loading data</div>;
  if (!data) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-x-auto border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-blue-100 to-blue-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Created</th>
            <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {data.results.map((planet) => (
            <tr key={planet.url} className="hover:bg-blue-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">{planet.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">{new Date(planet.created).toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded shadow hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm font-semibold transition-all"
                  onClick={() => onSimulateAI(planet.name)}
                >
                  Simulate Insight
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center p-4 bg-gray-50 border-t border-gray-200">
        <button
          className="px-4 py-2 bg-gray-200 rounded shadow hover:bg-gray-300 disabled:opacity-50 transition-all"
          onClick={() => onPageChange(page - 1)}
          disabled={!data.previous}
        >Previous</button>
        <span className="mx-2 text-gray-700 font-semibold">Page {page}</span>
        <button
          className="px-4 py-2 bg-gray-200 rounded shadow hover:bg-gray-300 disabled:opacity-50 transition-all"
          onClick={() => onPageChange(page + 1)}
          disabled={!data.next}
        >Next</button>
      </div>
    </div>
  );
};

export default TablePlanets; 