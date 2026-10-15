const express = require('express');
const app = express();
const port = 3001;
app.use(express.json()); 


let tasks = [
  {
    id: 1,
    title: 'Faire les courses',
    description: 'Acheter du pain et du lait',
    isDone: false
  }
];

app.get('/', (req, res) => {
  res.json('Hello World!');
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/new-task', (req, res) => {
  const { title, description, isDone } = req.body;

  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    title: title || '',
    description: description || '',
    isDone: isDone ?? false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/update-task/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ message: 'Tâche non trouvée' });
  }

  const { title, description, isDone } = req.body;

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (isDone !== undefined) task.isDone = isDone;

  res.json(task);
});

app.delete('/delete-task/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const initialLength = tasks.length;

  tasks = tasks.filter(t => t.id !== id);

  if (tasks.length === initialLength) {
    return res.status(404).json({ message: 'Tâche non trouvée' });
  }

  res.json({ message: 'Tâche supprimée avec succès' });
});


app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});