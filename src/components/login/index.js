import React, {useState} from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {setLoggedIn, setUser} from '@slices/auth';

import {fetchUser} from '@services/fakeData';

import {flex1, flexC, fRow, textC} from '@styles/global';
import {black, blue} from '@styles/colors';

const inputs = new Array(6).fill('');
const otp = [];

const Index = () => {
  const [activeField, setActiveField] = useState(0);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const enteredOtp = otp.join('');

    const isPinValid =
      enteredOtp.length === inputs.length &&
      otp.every(value => !!value.trim() && !isNaN(value));

    if (isPinValid) {
      dispatch(setLoggedIn(true));
      fetchUser().then(res => dispatch(setUser(res)));
    } else {
      Alert.alert('PIN', 'Invalid PIN');
    }
  };

  const focusOnField = index => index >= 0 && inputs[index].focus();

  const handleKeyPress = (nativeEvent, index) =>
    nativeEvent.key === 'Backspace' && focusOnField(index - 1);

  const handleChangeText = (index, value) => {
    otp[index] = value;

    if (index < inputs.length - 1 && value) {
      focusOnField(index + 1);
    }

    if (index == inputs.length - 1) {
      handleSubmit();
    }
  };

  const {
    container,
    heading,
    otpContainer,
    fieldContainer,
    otpField,
    activeFieldS,
  } = styles;

  const renderField = (_, index) => (
    <View key={index} style={fieldContainer}>
      <TextInput
        onSubmitEditing={handleSubmit}
        style={[otpField, index == activeField && activeFieldS]}
        keyboardType="numeric"
        onChangeText={value => handleChangeText(index, value)}
        onKeyPress={e => handleKeyPress(e.nativeEvent, index)}
        maxLength={1}
        onFocus={() => setActiveField(index)}
        autoFocus={index === 0 ? true : undefined}
        ref={ref => (inputs[index] = ref)}
      />
    </View>
  );

  return (
    <SafeAreaView style={container}>
      <Text style={heading}>Enter Login PIN</Text>
      <View style={otpContainer}>{inputs.map(renderField)}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...flex1,
    ...flexC,
  },
  heading: {
    fontSize: 25,
    marginVertical: 20,
  },
  otpContainer: {
    ...flexC,
    ...fRow,
    borderColor: black,
  },
  fieldContainer: {
    marginHorizontal: 10,
  },
  activeFieldS: {
    borderColor: blue,
  },
  otpField: {
    ...textC,
    borderColor: black,
    borderWidth: 1,
    height: 50,
    width: 35,
    padding: 5,
    color: black,
  },
});

export default Index;
