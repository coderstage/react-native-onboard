## React Native Onboard
A customizable onboarding screen for react native

## Installation
```
npm install react-native-onboard
```

# Example
```js
import React from 'react';

/**
 * React Native Components
 */
import {
  Text,
  View,
} from 'react-native';

/**
 * Styles
 */
import Styles from './Styles';

/**
 * One Board
 */
export default (props) => {

  const {
    Done,
    Skip,
    Back,
    Next,
    Board,
    Header,
    Footer,
    Content,
    Pagination,
  } = props.components;

  /**
   * Render Board
   */
  return (
    <Board style={{flex: 1}}>
      <Header>
        <Skip onPress={() => ({index: props.current+1})}>
          <Text>Skip</Text>
        </Skip>
      </Header>
      <Content scroll>
        <View style={Styles.one}>
          <Text style={Styles.title}>Step 1</Text>
          <Text>This is a onboarding screen, you can replace this and add your own content and style.</Text>
        </View>
        <View style={Styles.two}>
          <Text style={Styles.title}>Step 2</Text>
          <Text>This is a onboarding screen, you can replace this and add your own content and style.</Text>
        </View>
      </Content>
      <Footer>
        <Back label="Back"/>
        <Pagination/>
        <Next label="Next Step"/>
        <Done label="Done"/>
      </Footer>
    </Board>
  );
};
```


## Documentation
Soon

## Change Log

[Semantic Versioning](http://semver.org/)

## License

MIT
