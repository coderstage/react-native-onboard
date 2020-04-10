import {StyleSheet} from 'react-native';


/**
 * Common style for holder
 */
const holder = {
  left: 0,
  right: 0,
  zIndex: 1,
  position: 'absolute',
  paddingHorizontal: 20,
};


/**
 * Styles
 */
export default StyleSheet.create({
  back: {
    opacity: 0,
    textAlign: 'left',
  },
  next: {
    textAlign: 'right',
  },
  skip: {
    textAlign: 'right',
    flexDirection: 'row-reverse'
  },
  done: {
    textAlign: 'right',
    flexDirection: 'row-reverse'
  },
  header: {
    top: 20,
    ...holder,
    flexDirection: 'row-reverse',
  },
  footer: {
    ...holder,
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bullets: {
    width: 12,
    height: 12,
    borderRadius: 12/2,
    marginHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
});