import { useTaskStore } from '../store/taskStore';

export function useTasks() {
  const tasks = useTaskStore(state => state.tasks);
  const activeTaskId = useTaskStore(state => state.activeTaskId);
  const draftTaskTitle = useTaskStore(state => state.draftTaskTitle);
  const draftTaskMinutes = useTaskStore(state => state.draftTaskMinutes);
  
  const setDraftTaskTitle = useTaskStore(state => state.setDraftTaskTitle);
  const setDraftTaskMinutes = useTaskStore(state => state.setDraftTaskMinutes);
  const addTask = useTaskStore(state => state.addTask);
  const setActiveTask = useTaskStore(state => state.setActiveTask);
  const completeTask = useTaskStore(state => state.completeTask);
  const deleteTask = useTaskStore(state => state.deleteTask);
  const moveTaskPriority = useTaskStore(state => state.moveTaskPriority);
  
  const sortedTasks = [...tasks].sort((a, b) => a.priority - b.priority);
  const activeTask = sortedTasks.find(t => t.id === activeTaskId) || null;
  const pendingTasks = sortedTasks.filter(t => t.status === 'active');
  const completedTasks = sortedTasks.filter(t => t.status === 'completed');

  return {
    tasks: sortedTasks,
    pendingTasks,
    completedTasks,
    activeTask,
    activeTaskId,
    draftTaskTitle,
    draftTaskMinutes,
    setDraftTaskTitle,
    setDraftTaskMinutes,
    addTask,
    setActiveTask,
    completeTask,
    deleteTask,
    moveTaskPriority,
  };
}
