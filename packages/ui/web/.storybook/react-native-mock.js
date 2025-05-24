// Mock for react-native
module.exports = {
  // Add mock implementations of React Native components and APIs as needed
  View: 'div',
  Text: 'span',
  StyleSheet: {
    create: styles => styles,
  },
  // Add any other RN components or APIs that might be imported
  AccessibilityInfo: {},
  ActivityIndicator: 'div',
  Button: 'button',
  TextInput: 'input',
  Image: 'img',
  ScrollView: 'div',
  Platform: {
    OS: 'web',
    select: (obj) => obj.web || obj.default,
  },
  Dimensions: {
    get: () => ({
      width: window.innerWidth,
      height: window.innerHeight,
    }),
  },
}; 