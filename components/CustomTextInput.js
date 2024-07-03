import React from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';

const CustomTextInput = ({ placeholder, value, onChangeText, imageSource, secureTextEntry }) => {
  return (
    <View style={styles.inputWrapper}>
      <Image source={imageSource} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#A8A8A8"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomTextInput;
