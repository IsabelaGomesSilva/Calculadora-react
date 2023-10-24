
import React from 'react';
import {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 



export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const buttons = ['AC', 'DEL', '%', '/', 7, 8, 9, '*', 4, 5, 6, '-', 3, 2, 1, '+', 0, '.', '+/-', '=']  

  const [currentNumber, setCurrentNumber] = useState("")
  const [lastNumber, setLastNumber] = useState("")


  function calculator(){
    const splitNumbers = currentNumber.split(' ')
    const firstNumber = parseFloat(splitNumbers[0])
    const lastNumber = parseFloat(splitNumbers[2])
    const operator = splitNumbers[1]

    switch(operator){
      case '+':
        setCurrentNumber((firstNumber + lastNumber).toString())
        return
      case '-': 
        setCurrentNumber((firstNumber - lastNumber).toString())
        return
      case '*':
        setCurrentNumber((firstNumber * lastNumber).toString())
        return
      case '/': 
        setCurrentNumber((firstNumber / lastNumber).toString())
        return
        case '%': 
        setCurrentNumber((lastNumber*(firstNumber /100) ).toString())
        return
    }
  }

  function handleInput(buttonPressed){
    const value = 0;
    console.log(buttonPressed)
    if(buttonPressed === '+' | buttonPressed === "-" | buttonPressed === "*" | buttonPressed === "/" | buttonPressed === "%"  ){
      setCurrentNumber(currentNumber + " " + buttonPressed + " ")
      return
    }
    switch(buttonPressed){
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length -1)))
        return
      case 'AC':
        setLastNumber("")
        setCurrentNumber("")
        return
      case '=':
        setLastNumber(currentNumber + " = ")
        calculator()
        return
      case '+/-':
        
        if (currentNumber[1].toString() == "-")
        {
          currentNumber.splice(0,0, '+');
          console.log(currentNumber[1].toString());
          // setCurrentNumber("+ "+currentNumber );
        } 
        return
    }

    setCurrentNumber(currentNumber + buttonPressed)
  }

  const styles = StyleSheet.create({
    results: {
      backgroundColor: darkMode ? "#213635" : "#B0C4DE",
      width: '100%',
      minHeight: '48%',
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
    },
    resultText: {
      color: darkMode ? "#B5B7BB" : "#7c7c7c",
      margin: 10,
      fontSize: 40
    },

    historyText:{
      color: darkMode ? "#B5B7BB" : "#7c7c7c",
      fontSize: 20,
      marginRight: 10,
      alignSelf: 'flex-end',
    },
    themeButton: {
      alignSelf: 'flex-start',
      bottom: 120,
      margin: 10,
      backgroundColor: darkMode ? "#B5B7BB" :"#ADD1E1",
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
      
    },
    buttons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      borderColor: darkMode ? '#7c7c7c' : "#b5b7bb",
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 90, 
      minHeight: 90,
      flex: 2,
    },
    textButton: {
      color: darkMode ? "#b5b7bb" : "#7c7c7c",
      fontSize: 20,
    }, 
  });

  return (
    <View>
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton}>
          <Entypo name={darkMode ? "moon" : 'light-up'} size={24} color={darkMode ? "white" : '#7c7c7c'} onPress={() => darkMode ? setDarkMode(false) : setDarkMode(true)} />
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) => 
          button === '=' ?
        <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, {backgroundColor:  darkMode ? '#b5b7bb' : "#7c7c7c" }]}>
          <Text style={[styles.textButton, {color: "white", fontSize: 30}]}>{button}</Text>
        </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, 
          {backgroundColor: typeof(button) === 'number' ? darkMode === true ? '#213635' : '#B0C4DE': darkMode === true ? '#213635' : '#B0C4DE'}]}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}