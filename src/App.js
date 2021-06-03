import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
const previousData = localStorage.getItem('existing')// here declare the initial data of our local storage
function App() {
  const [tasks, setTasks] = useState(
    previousData ? [...JSON.parse(previousData)] : []
  )
  const [searchResult, setSearchResult] = useState([])
  const [task, setTask] = useState('')
  const [edit, setEdit] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [togg, setTogg] = useState(edit && true)
  const [search, setSearch] = useState('')

  // here handle the input search....
  const handleSearch = (e) => {
    setSearch(e.target.value)
    let txt = e.target.value
    if (txt) {
      let copyTasks = [...tasks]
      copyTasks = copyTasks.filter((item) => {
        let str1 = item.task.toLowerCase()
        let str2 = txt.toLowerCase()
        return str1.includes(str2)
      })
      setSearchResult([...copyTasks])
    } else {
      setSearchResult([...tasks])
    }
  }
// here perform adding of contact....
  const handleSubmit = (e) => {
    e.preventDefault()
    if (task) {
      const newTask = {
        id: new Date().getTime().toString(),
        task,
        ed: false,
      }
      setTasks([...tasks, newTask])
      setTask('')
    }
  }
  // updation functionality
  const update = (id) => {
    setIsEdit(false)
    const newTasks = tasks
    newTasks.forEach((ele) => {
      if (ele.id === id) {
        ele.task = edit
        ele.ed = false
      }
    })
    setTasks(newTasks)
    setSearchResult([...tasks])
    localStorage.setItem('existing', JSON.stringify(tasks))
    setEdit('')
  }
  
  // here perform to update a contact list....
  const change = (id) => {
    setIsEdit(true)
    const toEdit = searchResult.find((ele) => ele.id === id)
    toEdit.ed = true
    setEdit(toEdit.task)
  }
  // here perform deletion of contact list.....
  
  const remove = (id) => {
    const newTasks = tasks.filter((ele) => ele.id !== id)
    setTasks(newTasks)
  }
  useEffect(() => {
    setTogg(edit ? false : true)
  }, [edit])
  useEffect(() => {
    setSearchResult([...tasks])
    localStorage.setItem('existing', JSON.stringify(tasks))
  }, [tasks])
  return (
    <div id="main">
    <h1>Contact list</h1>
      <input type="text" value={search} onChange={(e) => handleSearch(e)} placeholder="search contact"/>
      <form>
        <input
          type="text"
          name="task"
          value={task}
          id="task"
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter"
        />
        <button type="submit" id="btn" onClick={(e) => handleSubmit(e)} >
        Create Contact
        </button>
      </form>
      <ul>
        {searchResult.map((ele) => {
          const { id, task, ed } = ele
          return (
            <li className="list" key={id}>
              {isEdit && ed ? (
                <>
                  <input
                    className="editTask"
                    type="text"
                    value={edit}
                    onChange={(e) => setEdit(e.target.value)}
                  />{' '}
                  <button
                    className="saveTask"
                    disabled={togg}
                    onClick={() => update(id)}
                  >
                    Update
                  </button>
                </>
              ) : (
                <>
                  {task}{' '}
                  <button className="delete" onClick={() => remove(id)}>
                    Delete Contact
                  </button>{' '}
                  <button className="edit" onClick={() => change(id)}>
                  Update Contact
                  </button>
                </>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App