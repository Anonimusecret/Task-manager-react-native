import React from 'react';
import {Alert, Button, Image, ScrollView, Text, TextInput, View, StyleSheet, Pressable } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function MainScreen(){

    const inputRef = useRef(null);

    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const [tasks, setTasks] = useState([]) //TODO: Хранение в файле
    
    let id = 0

    function addTask(){

        let newTask = {}
        
        newTask.id = 'test'
        id++
        newTask.name = 'textTest'
        newTask.description = 'textDedcriptionTest'
        
        storeData(newTask)
        setTasks([newTask])
    }

    function deleteTask(task){
        alert(task.id)
    }

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('test', jsonValue);
        } catch (e) {
            // saving error
        }
    };
    
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('test');
            console.log(jsonValue)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    };

    useEffect(()=>{
        AsyncStorage.getAllKeys((err, keys) => {
            let data = [];
            AsyncStorage.multiGet(keys, (err, stores) => {
                let data = [];
                stores.map((result, i, store) => {

                // get at each store's key/value so you can work with it
                let key = store[i][0];
                let value = store[i][1];

                
                data[key] = value

                });
            });
        setTasks(data)
        });
        
    }, [])

    //storeData({name: 'testTask', description: "testTaskDecripition", id: 500})
    //let testData = getData();
    //setTasks(testData)

    return( //TODO: Стилизовать
        <View style={styles.main}>
            <TopPart 
                addTask={addTask} 
                setTaskDescription={setTaskDescription} 
                setTaskName={setTaskName} 
                taskName={taskName} 
                taskDescription={taskDescription}
                inputRef={inputRef}
            />
            <BottomPart tasks={tasks} deleteTask={deleteTask}/>
        </View>
    )
    

}

export function TopPart({addTask, setTaskDescription, setTaskName, taskName, taskDescription, inputRef}){
    return(

            <View style={styles.container}>

                <View style={styles.leftContainer}>

                    <View style={styles.inputRow}>
                        <Text style={styles.text}>Имя</Text>
                        <TextInput 
                            value={taskName} 
                            onChange={(e) => setTaskName(e.target.value)}
                            onSubmitEditing={()=>{inputRef.current.focus()}}
                            id='name' 
                            placeholder='Название' 
                            style={styles.input}>
                            
                        </TextInput>
                    </View>

                    <View style={styles.inputRow}>
                        <Text style={styles.text}>Описание</Text>

                        <TextInput 
                            ref={inputRef}
                            value={taskDescription} 
                            onChange={(e) => setTaskDescription(e.target.value)}  
                            id='decription' 
                            placeholder='Описание' 
                            style={styles.input}
                        >
                        </TextInput>

                    </View>

                </View>


                <Pressable style={styles.submitButton} onPress={addTask}>
                    <Text style={styles.submitButtonText}>OK</Text>
                </Pressable>

            </View>

    )

}

export function BottomPart({tasks, deleteTask}){
    return(
        <ScrollView>
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
    return(
        <View style={styles.container}>

            <View style={styles.leftContainer}>
                <Text style={styles.taskName} >
                    {task.name}
                </Text>
                <Text style={styles.taskDecription}>
                    {task.description}
                </Text>
            </View>
            
            <Pressable style={styles.delButton} onPress={deleteTask}>
                <Text style={styles.delButtonText}>X</Text>
            </Pressable>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: "wrap",
    width: '100%',
    alignItems: 'center ',
    //flex: 1
    },
    text: {
        width: 70,
        //flex: 1
    },
    input: {
    marginTop: 10,
    marginBottom: 10,
    outlineColor: "black",
    outlineStyle: "solid",
    outlineWidth: 2,
    //flex: 3,
    //alignSelf: 'center',
    },
    delButton: {
        width: 40,
        height: 40,
        alignSelf: 'center',
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 2,
        paddingHorizontal: 2,
        borderRadius: 4,
        elevation: 3,
    },

    submitButton: {
        width: 60,
        height: 40,
        alignSelf: 'center',
        //flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 2,
        paddingHorizontal: 2,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    taskName: {
        fontSize: 20,
    },
    taskDecription: {
        fontSize: 8,
    },
    inputRow: {
        alignItems: 'center',
        //flex: 1 / 4,
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
        flex: 4,
        //width: '80%'
    },
    main: {
        //flex: 1,
        height: '100%',
        flexDirection: 'column',
        //alignItems: 'flex-start'
    },
    submitButtonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    delButtonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    }

    })