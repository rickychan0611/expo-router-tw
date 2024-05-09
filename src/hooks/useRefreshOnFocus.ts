import * as React from 'react'
import { useFocusEffect } from '@react-navigation/native'

/**
 * Function to trigger a refetch when the component gains focus.
 *
 * @param {function} refetch - prass a react query constance of refetch()
 */
export function useRefreshOnFocus(refetch: () => void) {
  const enabledRef = React.useRef(false)

  useFocusEffect(
    React.useCallback(() => {
      if (enabledRef.current) {
        refetch()
      } else {
        enabledRef.current = true
      }
    }, [refetch]),
  )
}
