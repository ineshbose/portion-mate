import Colors from '../../constants/Colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'rgb(0, 0, 0, 0)',
    borderWidth: 0,
    marginTop: '10%',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 500,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 0.5,
    borderRadius: 5,
    marginBottom: 10,
  },
  submit: {
    backgroundColor: Colors.primary,
    marginBottom: 10,
  },
  switch: {
    backgroundColor: Colors.secondary,
  },
});
