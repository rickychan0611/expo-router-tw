import { useWindowDimensions } from 'react-native'

export const useScreenSize = () => {
  const { width } = useWindowDimensions();
  if (width < 639) {
    return 'xs'
  }
  if (width > 640 && width < 767) {
    return 'sm'
  }
  if (width > 768 && width < 1023) {
    return 'md'
  }
  if (width > 1024 && width < 1279) {
    return 'lg'
  }
  if (width > 1280 && width < 1535) {
    return 'xl'
  }
  if (width > 1536) {
    return '2xl'
  }
}
