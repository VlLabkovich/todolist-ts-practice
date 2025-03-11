import type { BaseResponse } from "common/types"
import type { Dispatch } from "redux"
import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer"

export const handleServerAppError = <D>(data: BaseResponse<D>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC("Some error occurred"))
    dispatch(setAppStatusAC("failed"))
  }
}
