import React from 'react';
import {Alert, Button, Image, ScrollView, Text, TextInput, View, StyleSheet} from 'react-native';
import { useState } from 'react';


export default function MainScreen(){
    const [tasks, setTasks] = useState([]) //TODO: Хранение в файле
    let id = 0

    function addTask(task){

        let newTask = {}
        
        newTask.id = id
        id++
        newTask.name = tasks.name
        newTask.description = tasks.description
        
        setTasks([...tasks, newTask])
    }

    function deleteTask(task){
        alert(task.id)
    }

    return( //TODO: Стилизовать
        <>
            <TopPart addTask={addTask}/>
            <BottomPart tasks={tasks} deleteTask={deleteTask}/>
        </>
    )
    

}

export function TopPart({addTask}){
    return(

            <View style={styles.container}>

                <View style={styles.leftContainer}>

                    <View style={styles.inputRow}>
                        <Text style={styles.text}>Имя</Text>
                        <TextInput id='name' placeholder='Название' style={styles.input}></TextInput>
                    </View>

                    <View style={styles.inputRow}>
                        <Text style={styles.text}>Описание</Text>
                        <TextInput  id='decription' placeholder='Описание' style={styles.input}></TextInput>
                    </View>

                </View>


                <View style={styles.submitButton}>
                    <Button 
                        onPress={addTask}
                        title="OK">
                    </Button>
                </View>

            </View>

    )

}

export function BottomPart({tasks, deleteTask}){
    return(
        <ScrollView style={styles.scroll}>
            <TaskList tasks={tasks} deleteTask={deleteTask}/>
        </ScrollView>
    )

}

export function TaskList({tasks, deleteTask}){
    
    return(
        tasks.map((task)=>{
            return(
                <TaskListElement key={task.id} task={task} deleteTask={deleteTask}/>
            )
        })
    )
}

export function TaskListElement({task, deleteTask}){
    <>
        <View style={styles.elemTextRow}>
            <Text style={styles.taskName} >
                {task.name}
            </Text>
            <Text style={styles.taskDecription}>
                {task.description}
            </Text>
        </View>
        
        <View style={styles.delButton}>
            <Button 
                onPress={deleteTask}
                title='X'
            ></Button>
        </View>
        
    </>
}

const styles = StyleSheet.create({
    container: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: "wrap",
    width: '100%',
    alignItems: 'center ',
    flex: 1 / 1
    },
    text: {
        width: 150,
        flex: 1
    },
    input: {
    marginTop: 10,
    marginBottom: 10,
    outlineColor: "black",
    outlineStyle: "solid",
    outlineWidth: 2,
    flex: 3,
    //alignSelf: 'center',
    },
    delButton: {
        width: 40,
        height: 40,
        alignSelf: 'right',
        color: 'red',
    },
    submitButton: {
        width: 40,
        height: 40,
        alignSelf: 'center',
        flex: 1
    },
    taskName: {
        fontSize: 20,
    },
    taskDecription: {
        fontSize: 8,
    },
    inputRow: {
        alignItems: 'center',
        flex: 1 / 4,
        flexDirection: "row",
        //width: 500,
    },
    elemTextRow: {
        flex: 1,
        flexDirection: "column",
        //width: 500,
    },
    scroll: {
        //flex: 4
    },
    leftContainer:{
        alignItems: 'left',
        flex: 4
    }

    })