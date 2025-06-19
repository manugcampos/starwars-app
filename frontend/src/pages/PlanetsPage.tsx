import React, { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchPlanets, simulateAIInsight } from '../api';
import { Planet, PaginatedResponse } from '../types';
import SearchSortBar from '../components/SearchSortBar';
import TablePlanets from '../components/TablePlanets';
import * as Dialog from '@radix-ui/react-dialog';

const sortOptions = [
  { value: 'name', label: 'Name' },
  { value: 'created', label: 'Created' },
];

const PlanetsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [insight, setInsight] = useState<string | null>(null);
  const [insightLoading, setInsightLoading] = useState(false);

  const { data, isPending, isError } = useQuery<PaginatedResponse<Planet>>({
    queryKey: ['planets', { page, search, sortBy, order }],
    queryFn: () => fetchPlanets({ page, search, sort_by: sortBy, order }),
    retry: 1,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const handleSimulateAI = async (name: string) => {
    setInsightLoading(true);
    try {
      const res = await simulateAIInsight(name);
      setInsight(res.insight);
    } finally {
      setInsightLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Planets</h2>
      <SearchSortBar
        value={search}
        onChange={v => { setSearch(v); setPage(1); }}
        sortBy={sortBy}
        order={order}
        onSortChange={v => { setSortBy(v); setPage(1); }}
        onOrderChange={v => { setOrder(v); setPage(1); }}
        sortOptions={sortOptions}
      />
      <TablePlanets
        data={data}
        isLoading={isPending}
        isError={isError}
        page={page}
        onPageChange={setPage}
        onSimulateAI={handleSimulateAI}
      />
      <Dialog.Root open={!!insight} onOpenChange={open => !open && setInsight(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <Dialog.Title className="text-lg font-bold mb-2">Simulated Insight</Dialog.Title>
            <div className="mb-4">{insightLoading ? 'Loading...' : insight}</div>
            <Dialog.Close asChild>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Close</button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default PlanetsPage; 