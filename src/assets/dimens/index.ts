import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const percentWidth = (percent: number) => {
  return (percent * width) / 100;
};
const percentHeight = (percent: number) => {
  return (percent * height) / 100;
};

export default {
  percentWidth,
  percentHeight,
};
