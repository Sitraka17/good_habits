import { useState, useEffect } from 'react';

const HabitTracker = () => {
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem('habits');
    return savedHabits ? JSON.parse(savedHabits) : [];
  });
  const [newHabitName, setNewHabitName] = useState('');
  const [streakView, setStreakView] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (newHabitName.trim() === '') return;
    
    const newHabit = {
      id: Date.now(),
      name: newHabitName,
      streak: 0,
      lastCompleted: null,
      completedDates: []
    };
    
    setHabits([...habits, newHabit]);
    setNewHabitName('');
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const toggleHabitCompletion = (id) => {
    const today = new Date().toISOString().split('T')[0];
    
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const alreadyCompletedToday = habit.completedDates.includes(today);
        
        if (alreadyCompletedToday) {
          // Uncomplete the habit for today
          return {
            ...habit,
            streak: Math.max(0, habit.streak - 1),
            lastCompleted: habit.completedDates.filter(date => date !== today).sort().pop() || null,
            completedDates: habit.completedDates.filter(date => date !== today)
          };
        } else {
          // Complete the habit for today
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayString = yesterday.toISOString().split('T')[0];
          
          const wasCompletedYesterday = habit.completedDates.includes(yesterdayString);
          const newStreak = wasCompletedYesterday ? habit.streak + 1 : 1;
          
          return {
            ...habit,
            streak: newStreak,
            lastCompleted: today,
            completedDates: [...habit.completedDates, today]
          };
        }
      }
      return habit;
    }));
  };

  const isCompletedToday = (habit) => {
    const today = new Date().toISOString().split('T')[0];
    return habit.completedDates.includes(today);
  };

  const getTopHabits = () => {
    return [...habits]
      .sort((a, b) => b.streak - a.streak)
      .slice(0, 3);
  };

  const topHabits = getTopHabits();

  // Emoji for top 3 positions
  const positionEmojis = ['🥇', '🥈', '🥉'];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Suivi d'Habitudes</h1>
        
        {showLeaderboard && habits.length >= 1 && (
          <div className="mb-6 bg-gradient-to-r from-indigo-100 to-purple-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-center mb-3">Top 3 Habitudes</h2>
            <div className="space-y-3">
              {topHabits.map((habit, index) => (
                <div key={habit.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{positionEmojis[index]}</span>
                    <span className="font-medium">{habit.name}</span>
                  </div>
                  <span className="bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full font-medium">
                    {habit.streak} {habit.streak <= 1 ? 'jour' : 'jours'}
                  </span>
                </div>
              ))}
              {topHabits.length === 0 && (
                <p className="text-center text-gray-500">Aucune habitude suivie pour l'instant</p>
              )}
            </div>
          </div>
        )}
        
        <div className="flex mb-6">
          <input
            type="text"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            placeholder="Nouvelle habitude..."
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={addHabit}
            className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors"
          >
            Ajouter
          </button>
        </div>

        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Mes Habitudes</h2>
          <div className="flex space-x-4">
            <button 
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className="text-indigo-600 text-sm underline"
            >
              {showLeaderboard ? "Masquer Top 3" : "Afficher Top 3"}
            </button>
            <button 
              onClick={() => setStreakView(!streakView)}
              className="text-indigo-600 text-sm underline"
            >
              {streakView ? "Vue normale" : "Vue séries"}
            </button>
          </div>
        </div>
        
        {habits.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Aucune habitude pour le moment. Ajoutez-en une !</p>
        ) : (
          <ul className="space-y-2">
            {habits.map(habit => (
              <li 
                key={habit.id} 
                className={`flex justify-between items-center p-3 rounded-lg border ${isCompletedToday(habit) ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}
              >
                <div className="flex items-center">
                  <button
                    onClick={() => toggleHabitCompletion(habit.id)}
                    className={`w-6 h-6 mr-3 rounded-full flex items-center justify-center ${isCompletedToday(habit) ? 'bg-green-500 text-white' : 'border border-gray-300'}`}
                  >
                    {isCompletedToday(habit) && '✓'}
                  </button>
                  <span className="font-medium">{habit.name}</span>
                </div>
                
                <div className="flex items-center">
                  {streakView && (
                    <span className="mr-4 text-sm bg-indigo-100 text-indigo-800 py-1 px-2 rounded-full">
                      {habit.streak} {habit.streak <= 1 ? 'jour' : 'jours'}
                    </span>
                  )}
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HabitTracker;
