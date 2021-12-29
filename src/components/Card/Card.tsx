import React, {FC, useState} from 'react';
import Task from "../Task/Task";

const Card: FC = () => {

    interface IdefTask {
        id: number;
        text: string;
    }

    const defTasks : IdefTask[] = [
        {id:1, text: 'Очень много текста таски',},
        {id:2, text: 'Намного-премного больше этого текста таски',},
        {id:3, text: 'Чуть-чуть текста таски',},
    ]

    const [tasks, setTasks] = useState<IdefTask[]>(defTasks)
    const [newId, setId] = useState<number>(defTasks.length + 1)

    const clickHandler = () : void => {
        setId(prev => prev + 1)
        setTasks((prev) => {
            const arr = prev.slice();
            arr.push({id: newId, text: ''});
            return arr
        })
    }

    const deleteTask = (id : number) : void => {
        setTasks(prev => prev.filter(task => task.id !== id));
    }


    return (
        <div style={{display:"flex", flexDirection:"column"}}>
            <h3 style={{textAlign:'center'}}>Заголовок колонки</h3>
            {tasks.map((task) => {
                return <Task key={task.id} text={task.text} index={task.id} deleteTask={deleteTask}/>
            })}
            <button style={{marginTop:20}} onClick={clickHandler}>Создать таску</button>
        </div>
    );
};

export default Card;