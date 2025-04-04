import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const flags = {
  Luxembourg: "🇱🇺",
  Belgique: "🇧🇪",
  Allemagne: "🇩🇪",
  France: "🇫🇷",
  Suisse: "🇨🇭",
  USA: "🇺🇸",
};

const Dashboard = () => {
  const [tab, setTab] = useState("tasks");
  const [date, setDate] = useState(new Date());
  const [taskStreak, setTaskStreak] = useState(0);

  const tasks = [
    { id: 1, title: "Faire du sport", progress: 80, streak: 45 },
    { id: 2, title: "Lire un livre", progress: 40, streak: 20 },
    { id: 3, title: "Apprendre React", progress: 60, streak: 75 },
  ];

  const leaderboard = [
    { id: 1, name: "Alice", points: 1200, country: "Luxembourg" },
    { id: 2, name: "Bob", points: 1150, country: "Belgique" },
    { id: 3, name: "Charlie", points: 1100, country: "Allemagne" },
    { id: 4, name: "David", points: 1050, country: "France" },
    { id: 5, name: "Emma", points: 1020, country: "Suisse" },
    { id: 6, name: "Frank", points: 980, country: "USA" },
    { id: 7, name: "Grace", points: 950, country: "Luxembourg" },
    { id: 8, name: "Hank", points: 900, country: "Belgique" },
    { id: 9, name: "Ivy", points: 870, country: "Allemagne" },
  ];

  const getColor = (streak) => {
    if (streak >= 90) return "bg-green-500";
    if (streak === 0) return "bg-red-500";
    return "bg-blue-500";
  };

  return (
    <div className="p-6">
      <div className="flex space-x-4 mb-6">
        <Button onClick={() => setTab("tasks")} className={tab === "tasks" ? "bg-blue-500 text-white" : "bg-gray-200"}>Tâches</Button>
        <Button onClick={() => setTab("leaderboard")} className={tab === "leaderboard" ? "bg-blue-500 text-white" : "bg-gray-200"}>Leaderboard</Button>
      </div>

      {tab === "tasks" && (
        <div>
          <Calendar onChange={setDate} value={date} className="mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {tasks.map((task) => (
              <Card key={task.id} className={`p-4 shadow-lg rounded-xl ${getColor(task.streak)}`}>
                <CardContent>
                  <h3 className="text-lg font-bold mb-2">{task.title}</h3>
                  <Progress value={task.progress} />
                  <p className="mt-2">Série actuelle : {task.streak} jours</p>
                  <Button className="mt-4 w-full">Mettre à jour</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === "leaderboard" && (
        <div className="mt-6">
          {leaderboard.map((user, index) => (
            <Card key={user.id} className="p-4 mb-2 shadow-lg rounded-xl flex justify-between">
              <span className="font-bold">#{index + 1} {flags[user.country]} {user.name}</span>
              <span className="text-blue-600">{user.points} pts</span>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
