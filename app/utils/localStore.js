import { IOContainer } from 'utils/containers'
/*
* This container is also applicable to other impure operations
* like async requests
*/
 setItem :: (Str, *) -> IOContainer
export const setItem = (key, val) => {
  return IOContainer.of(() => {
    localStorage.setItem(key, JSON.stringify(val))
  })
}


// getItem :: Str -> IOContainer
export const getItem = (itemKey) => IOContainer
  .of(() => localStorage.getItem(itemKey))
