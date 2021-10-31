import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {} from 'react';

type RootStackParamList = {
  Home: undefined;
  CountriesList: undefined;
};

declare module 'react' {
  type RNFC = React.FC<NativeStackScreenProps<RootStackParamList>>;
}
