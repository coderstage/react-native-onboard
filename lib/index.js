import React from 'react';

/**
 * React Native Components
 */
import {
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

/**
 * Styles
 */
import Styles from './default';


/**
 * Screen Dimensions
 */
const {width, height} = Dimensions.get('window');


/**
 * Onboard Screen
 */
class Onboard extends React.Component {

  /**
   * Component Names
   */
  names = [
    'Back',
    'Next',
    'Done',
    'Skip',
    'Board',
    'Header',
    'Footer',
    'Content',
    'Pagination'
  ];
  
  /**
   * Default States
   */
  state = {
    done: false,
    current: 0
  };
  
  /**
   * Default Props
   */
  defaultPorps = {
    done: false
  };

  /**
   * Head component
   * A placeholder of components
   * at the top of the screens
   * @param {object} props
   */
  header = (props) => this.holder(props, Styles.header);

  /**
   * Foot component
   * A placeholder of components
   * at the bottom of the screens
   * @param {object} props
   */
  footer = (props) => this.holder(props, Styles.footer);

  /**
   * Skip component
   * A touchable skip button component
   * @param {object} props
   */
  skip = (props) => {
    return this.touchable(props, this.onPress('skip', props), Styles.skip);
  };

  /**
   * Done component
   * A touchable done button component
   * @param {object} props
   */
  done = (props) => {
    if(this.state.current === (props.views.length - 1)) {
      return this.touchable(props, this.onPress('done', props), Styles.done);
    }
    return null;
  };

  /**
   * Next component
   * A touchable next button component
   * @param {object} props
   */
  next = (props) => {
    if(this.state.current < (props.views.length - 1)) {
      return this.touchable(props, this.toIndex(this.state.current + 1, props), Styles.next);
    }
    return null;
  };

  /**
   * Back component
   * A touchable back button component
   * @param {object} props
   */
  back = (props) => {
    let scrollTo = null;
    let styles = [Styles.back];

    if(this.state.current > 0) {
      styles.push({opacity: 1});
      scrollTo = this.toIndex(this.state.current - 1, props);
    }
    return this.touchable(props, scrollTo, styles);
  };

  /**
   * Board component
   * A placeholder for screens and its components
   * use for traversal of views on each children
   * @param {object} props
   */
  board = (props) => {
    let views = [];
    props.children.map(child => {
      /**
       * Find content component
       * and traverse through out its children
       */
      if(child.type.displayName == 'Content') {
        views = child.props.children;
      }
    });
    return (
      <View style={[{flex: 1}, props.style]}>
        {/**
         * Clone children and set props
         */}
        {React.Children.map(props.children, child => React.cloneElement(child, {views}))}
      </View>
    );
  };

  /**
   * OnChange Event
   * Set current state when view change
   * @param {object} props
   */
  change = ({viewableItems}) => {
    this.setState({current: viewableItems[0].index});
  };

  /**
   * A placeholder for children
   * @param {object} props
   * @param {object} style Styles of the holder
   */
  holder = (props, style) => {
    const items = props.children;
    return (
      <View style={[style, props.style]}>
        {React.Children.map(items, child => {
          return React.cloneElement(child, {
            views: props.views,
            style: {width: width/items.length}
          });
        })}
      </View>
    );
  };

  /**
   * Content component
   * A placeholder containing the list of views
   * @param {object} props
   */
  content = (props) => {
    let scroll = false;
    if(typeof props.scroll !== 'undefined' || props.scroll === true) {
      scroll = true;
    }
    return (
      <View style={{flex: 1}}>
        <FlatList
          horizontal
          pagingEnabled
          style={props.style}
          data={props.children}
          scrollEnabled={scroll}
          renderItem={this.renderItem}
          ref={ref => (this.flatlist = ref)}
          showVerticalScrollIndicator={false}
          onViewableItemsChanged={this.change}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  /**
   * Scroll to a certain view with index
   * @param {int} key An index of an item/view
   * @param {object} props
   */
  toIndex = (key, props) => {
    return () => {
      let index = key;
      if(index > (props.views.length - 1)) {
        this.setState({done: true});
      } else {
        this.flatlist.scrollToIndex({animated: true, index});
      }
    };
  };

  /**
   * OnPress Event
   */
  onPress = (name, props) => {
    let state = {done: true};
    return () => {
      if(typeof props.onPress !== 'undefined') {
        /**
         * Use callback to trigger the event
         */
        const event = props.onPress();
        if(typeof event === 'object') {
          if(name !== 'done') {
            state = event;
            /**
             * Scroll to the item if index is set
             */
            if(typeof event.index !== 'undefined') {
              return this.toIndex(event.index, props)();
            }
          }
        }
      }
      this.setState(state);
    }
  };

  /**
   * Touchable Component
   */
  touchable = (props, onPress, style = {}) => {
    
    if(typeof props.disable == 'undefined') {
      props.disable = false;
    }
    return (
      <TouchableOpacity onPress={onPress} disable={props.disable}>
        {props.label ? (
          <Text style={[style, props.style]}>{props.label}</Text>
        ) : (
          props.children
        )}
      </TouchableOpacity>
    );
  };

  /**
   * Render children
   */
  renderItem = ({item}) => {
    /**
     * Add default style to children
     */
    return React.cloneElement(item, {
      style: [item.props.style, {
        width,
        height,
        paddingVertical: 20,
        paddingHorizontal: 20,
      }]
    });
  };

  /**
   * Pagination component
   */
  pagination = (props) => {
    return (
      <View style={[Styles.pagination, props.holderStyle]}>
        {props.views.map((item, index) => {
          let active = {};
          if(index === this.state.current) {
            active = [{backgroundColor: '#fff'}, props.activeStyle];
          }
          return (
            <TouchableOpacity key={index+1} onPress={this.toIndex(index, props)}>
              <View style={[Styles.bullets, props.bulletStyle, active]}></View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };


  /**
  * The props of a board
  */
  boardProps = (onboard) => {
    const props = {};
    this.names.map(name => {
      let comp = onboard[name.toLowerCase()];
      comp.displayName = name;
      props[name] = comp;
    });
    return props;
  };


  /**
   * Render
   */
  render() {
    const App = this.props.app;
    const Board = this.props.board;
    /**
     * Started
     */
    if(this.props.done || this.state.done) {
      return <App/>
    } else {
      return (
        <Board current={this.state.current} components={this.boardProps(this)}/>
      );
    }
  }
}

/**
 * Export Onboard
 */
export default Onboard;