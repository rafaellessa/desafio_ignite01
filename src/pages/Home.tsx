import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";


export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const taskExists = tasks.some((item) => item.title === newTaskTitle)

    if(newTaskTitle.trim() && !taskExists){
      setTasks([...tasks, {
        done: false,
        id: new Date().getTime(),
        title: newTaskTitle
      }])
    }else{
      return Alert.alert('Task já cadastrada')
    }
  }
  

  function handleToggleTaskDone(id: number) {
    const taskSelected = tasks.find((item) =>  item.id === id)
    const filteredTasks = tasks.filter((item) => item.id !== id)

    if(taskSelected){
      const newTask:Task = {
        done: !taskSelected.done,
        id: taskSelected.id,
        title: taskSelected.title
      }

      setTasks([...filteredTasks, newTask].sort((a, b) => {
        if (a.id! > b.id!) {
          return 1
        }
        if (a.id! < b.id!) {
          return -1
        }
        return 0
      }))
    }    
  }

  function handleRemoveTask(id: number) {
    // return Alert.alert("Excluir",
    // "A tarefa selecionada será exluída, tem certeza?",
    // [
    //   {
    //     text: "Não",        
    //     style: "cancel"
    //   },
    //   { text: "Sim", onPress: () =>  setTasks(old => old.filter((item) => item.id !== id))}
    // ])
    setTasks(old => old.filter((item) => item.id !== id))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
