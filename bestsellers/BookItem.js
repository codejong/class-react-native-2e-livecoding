import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  bookItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: 2,
    padding: 5,
    height: 175,
  },
  cover: { flex: 1, height: 150, resizeMode: 'contain' },
  info: {
    flex: 3,
    alignItems: 'flex-end',
    flexDirection: 'column',
    alignSelf: 'center',
    padding: 20,
  },
  author: { fontSize: 18 },
  title: { fontSize: 18, fontWeight: 'bold' },
});

class BookItem extends Component {
  render() {
    return (
      <View style={styles.bookItem}>
        <Image style={styles.cover} source={{ uri: this.props.coverURL }} />
        <View style={styles.info}>
          <Text style={styles.author}>{this.props.author}</Text>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        <TouchableOpacity onPress={this.props.onPressFavorite}>
          <Ionicons
            name={`ios-star${this.props.isFavorite ? '' : '-outline'}`}
            size={50}
            color={'gray'}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default BookItem;
