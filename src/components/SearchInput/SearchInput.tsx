import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {debounce} from '../../utils';

interface SearchInputProps extends TextInputProps {
  onSearch: (searchKeyword: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({onSearch, ...rest}) => {
  return (
    <View style={styles.parentView}>
      <TextInput
        style={styles.input}
        placeholder="Search by country"
        onChangeText={debounce(onSearch, 250)}
        placeholderTextColor="#8F8F8F"
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 6,
    color: '#000',
  },
});

export {SearchInput as default};
