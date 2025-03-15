import type { BaseResponse } from "common/types"
import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer"
import type { AppDispatch } from "../../app/store"

export const handleServerAppError = <D>(data: BaseResponse<D>, dispatch: AppDispatch) => {
  dispatch(setAppStatusAC("failed"))
  dispatch(setAppErrorAC(data.messages.length ? data.messages[0] : "Some error occurred"))
}

// // Дженериковая функция
// // function declaration
// function identity1<T>(arg: T): T {
//   return arg
// }
//
// // arrow function(expression)
// const identity2 = <T>(arg: T): T => {
//   return arg
// }
