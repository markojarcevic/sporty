import { LeaguesList } from './components/LeaguesList';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Sports Leagues</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 flex flex-col">
        <LeaguesList />
      </main>
    </div>
  );
}

export default App;
