import { LeaguesList } from './components/LeaguesList';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <header className="bg-slate-800/80 backdrop-blur-md border-b border-slate-700/60 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">⚽</span>
            </div>
            <h1 className="text-2xl font-semibold text-white tracking-tight">
              Sports Leagues
            </h1>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8 flex-1 flex flex-col w-full">
        <LeaguesList />
      </main>
    </div>
  );
}

export default App;
