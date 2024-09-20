"use client"
import { v4 as uuidv4 } from "uuid"
import Button from "@/components/button"
import styles from "./page.module.scss"
import Modal from "@/components/modal"
import { useEffect, useState } from "react"
import Image from "next/image"
import IconTrash from "@/assets/icon-trash.png"

type TasksType = {
  id: string
  text: string
  isFinished: boolean
}

export default function Home() {
  const [tasks, setTasks] = useState<TasksType[]>([])
  const [openModal, setOpenModal] = useState({
    newTask: false,
    deleteTask: false,
  })
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null)

  function getTasksFromStorage() {
    return localStorage.getItem("tasks")
  }

  function setTasksFromStorage(v: any) {
    localStorage.setItem("tasks", v)
  }

  function closeModalNewTask() {
    setOpenModal((old) => ({ ...old, newTask: false }))
  }

  function openModalNewTask() {
    setOpenModal((old) => ({ ...old, newTask: true }))
  }

  function closeModalDeleteTask() {
    setOpenModal((old) => ({ ...old, deleteTask: false }))
    setTaskToDelete(null)
  }

  function openModalDeleteTask(id: string) {
    setTaskToDelete(id)
    setOpenModal((old) => ({ ...old, deleteTask: true }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const taskText = data.get("task") as string

    if (!taskText) {
      return
    }

    const newTask: TasksType = {
      id: uuidv4(),
      text: taskText,
      isFinished: false
    }
    const oldTasksStorage = getTasksFromStorage()
    const existingTasks = oldTasksStorage ? JSON.parse(oldTasksStorage) : []
    const updatedTasks = [...existingTasks, newTask]
    setTasksFromStorage(JSON.stringify(updatedTasks))
    setTasks((old) => [...old, newTask])
    closeModalNewTask()
  }

  function finishTask(id: string) {
    setTasks((old) => {
      const updatedTasks = old.map((task) =>
        task.id === id
          ? { ...task, isFinished: !task.isFinished }
          : task
      )
      setTasksFromStorage(JSON.stringify(updatedTasks))
      return updatedTasks
    })
  }

  function deleteTask() {
    if (taskToDelete) {
      setTasks((old) => old.filter((task) => task.id !== taskToDelete))
      const updatedTasks = tasks.filter((task) => task.id !== taskToDelete)
      setTasksFromStorage(JSON.stringify(updatedTasks))
      closeModalDeleteTask()
    }
  }

  useEffect(() => {
    const tasksStorage = getTasksFromStorage()
    if (tasksStorage) {
      setTasks(JSON.parse(tasksStorage))
    }
  }, [])

  return (
    <div className={styles.container}>
      <Modal
        className={styles["modal-new-task"]}
        isOpen={openModal.newTask}
        onClose={closeModalNewTask}
      >
        <form onSubmit={handleSubmit} noValidate>
          <h2>Nova tarefa</h2>
          <div>
            <label htmlFor="task">Título</label>
            <input
              id="task"
              name="task"
              placeholder="Digite"
              required
            />
          </div>
          <div>
            <Button
              className={styles.button}
              onClick={closeModalNewTask}
            >
              Cancelar
            </Button>
            <Button type="submit">Adicionar</Button>
          </div>
        </form>
      </Modal>

      <Modal
        className={`${styles["modal-new-task"]} ${styles["modal-delete-task"]}`}
        isOpen={openModal.deleteTask}
        onClose={closeModalDeleteTask}
      >
        <div>
          <h2>Deletar tarefa</h2>
          <p>
            Tem certeza que você deseja deletar essa tarefa?
          </p>
          <div>
            <Button
              className={styles.button}
              onClick={closeModalDeleteTask}
            >
              Cancelar
            </Button>
            <Button
              className={styles.button}
              onClick={deleteTask}
            >
              Deletar
            </Button>
          </div>
        </div>
      </Modal>

      <main>
        <div className={styles.card}>
          <div>
            <h3>Suas tarefas de hoje</h3>
            <ul>
              {tasks.filter((v) => !v.isFinished).map((v) => (
                <li key={v.id}>
                  <div>
                    <input
                      type="checkbox"
                      checked={v.isFinished}
                      onChange={() => finishTask(v.id)}
                    />
                    <span>{v.text}</span>
                  </div>
                  <Image
                    onClick={(e) => {
                      e.stopPropagation()
                      openModalDeleteTask(v.id)
                    }}
                    src={IconTrash}
                    alt="Deletar"
                    width={24}
                    height={24}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Tarefas finalizadas</h3>
            <ul>
              {tasks.filter((v) => v.isFinished).map((v) => (
                <li key={v.id}>
                  <div>
                    <input
                      type="checkbox"
                      checked={v.isFinished}
                      onChange={() => finishTask(v.id)}
                    />
                    <s className="muted">{v.text}</s>
                  </div>
                  <Image
                    onClick={(e) => {
                      e.stopPropagation()
                      openModalDeleteTask(v.id)
                    }}
                    src={IconTrash}
                    alt="Deletar"
                    width={24}
                    height={24}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Button
          className={styles.button}
          onClick={openModalNewTask}
        >
          Adicionar nova tarefa
        </Button>
      </main>
    </div>
  )
}
