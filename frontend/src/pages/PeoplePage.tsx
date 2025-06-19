import React, { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchPeople, simulateAIInsight } from '../api';
import { Person, PaginatedResponse } from '../types';
import SearchSortBar from '../components/SearchSortBar';
import TablePeople from '../components/TablePeople';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const sortOptions = [
  { value: 'name', label: 'Name' },
  { value: 'created', label: 'Created' },
];

const PeoplePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [insight, setInsight] = useState<string | null>(null);
  const [insightLoading, setInsightLoading] = useState(false);

  const { data, isPending, isError } = useQuery<PaginatedResponse<Person>>({
    queryKey: ['people', { page, search, sortBy, order }],
    queryFn: () => fetchPeople({ page, search, sort_by: sortBy, order }),
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
      <h2>Characters</h2>
      <SearchSortBar
        value={search}
        onChange={v => { setSearch(v); setPage(1); }}
        sortBy={sortBy}
        order={order}
        onSortChange={v => { setSortBy(v); setPage(1); }}
        onOrderChange={v => { setOrder(v); setPage(1); }}
        sortOptions={sortOptions}
      />
      <TablePeople
        data={data}
        isLoading={isPending}
        isError={isError}
        page={page}
        onPageChange={setPage}
        onSimulateAI={handleSimulateAI}
      />
      <Dialog open={!!insight} onClose={() => setInsight(null)}>
        <DialogTitle>Simulated Insight</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {insightLoading ? 'Loading...' : insight}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInsight(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PeoplePage; 