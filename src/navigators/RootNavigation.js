// RootNavigation.js
import { CommonActions } from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
export function navigateAndReset(name,params){
    navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: name,params:{...params} },
          ],
        })
      );
}
