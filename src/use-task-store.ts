import Task from "./task.component";
import useLocalStorage from "./use-local-storage";

type Task = {
  label: string;
  id: string;
  isComplete: boolean;
};

const useTaskStore = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>([], "tasks");
};

export default useTaskStore;
