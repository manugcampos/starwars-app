import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Link, Switch } from 'wouter';
import PeoplePage from './pages/PeoplePage';
import PlanetsPage from './pages/PlanetsPage';
import * as Toast from '@radix-ui/react-toast';
import { StarIcon, GlobeIcon } from '@radix-ui/react-icons';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow mb-6">
          <div className="container mx-auto px-4 py-4 flex gap-4 items-center">
            <Link href="/" className="flex items-center gap-1 text-lg font-bold text-blue-700 hover:underline">
              <StarIcon /> Characters
            </Link>
            <Link href="/planets" className="flex items-center gap-1 text-lg font-bold text-blue-700 hover:underline">
              <GlobeIcon /> Planets
            </Link>
          </div>
        </nav>
        <main className="container mx-auto px-4">
          <Switch>
            <Route path="/" component={PeoplePage} />
            <Route path="/planets" component={PlanetsPage} />
            <Route> <div className="text-center text-2xl mt-10">404 - Page not found</div> </Route>
          </Switch>
        </main>
        <Toast.Provider swipeDirection="right">
          <Toast.Root open={toastOpen} onOpenChange={setToastOpen} className="bg-black text-white px-4 py-2 rounded shadow-lg">
            <Toast.Title>{toastMsg}</Toast.Title>
          </Toast.Root>
          <Toast.Viewport className="fixed bottom-4 right-4 z-50" />
        </Toast.Provider>
      </div>
    </QueryClientProvider>
  );
};

export default App;
