import React from 'react';
import {Alert, Button, Image, ScrollView, Text, TextInput, View, StyleSheet, Pressable } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function MainScreen(){

    const inputRef = useRef(null);

    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const [tasks, setTasks] = useState([])
    

    async function addTask(){
        
        if(taskName.length > 0){
            let newTask = {}
            newTask.id = await getData('ID')
            newTask.name = taskName
            newTask.description = taskDescription

            setTaskName('')
            setTaskDescription('')
            await storeData(newTask.id.toString(), newTask)

            let newId = +newTask.id + 1
            await storeData('ID', newId)

            getAllTasks();
        }
    }
        

    function deleteTask(task, i){

        AsyncStorage.removeItem(task[0])
        getAllTasks();

    }

    const storeData = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {

        }
    };
    
    const getData = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            let result

            result = jsonValue != null ? JSON.parse(jsonValue) : null;

            return result
        } catch (e) {

        }
    };

    async function checkId(){
        let id = await getData('ID')
        if (isNaN(id) || id == null){
            await storeData('ID', 0)
            getAllTasks()
        }
        
    }

    function getAllTasks(){

        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                setTasks(stores);
            });

        });
    }

    useEffect(()=>{

        checkId()
        

    }, [])

    return(
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
                            onChange={(e) => setTaskName(e.nativeEvent.text)}
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
                            onChange={(e) => setTaskDescription(e.nativeEvent.text)}  
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

        tasks.map((task, i)=>{
            return(
                <TaskListElement key={task[0]} item={task} deleteTask={deleteTask} i={i}/>
            )
        })
    )
}

export function TaskListElement({item, deleteTask, i}){
    if(item[0] == 'ID'){
        return
    } else{
        let task = JSON.parse(item[1])
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
                
                <Pressable style={styles.delButton} onPress={()=>{deleteTask(item, i)}}>
                    <Text style={styles.delButtonText}>X</Text>
                </Pressable>
                
            </View>
        )
    }
    
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
    borderWidth: 1,
    borderRadius: 10,
    width: '70%'
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
        fontWeight: 700,
    },
    taskDecription: {
        fontSize: 12,
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
        //flexDirection: 'column-reverse'
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