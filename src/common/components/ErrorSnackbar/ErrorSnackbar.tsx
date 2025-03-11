import { useAppDispatch, useAppSelector } from "common/hooks"
import { SyntheticEvent } from "react"
import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import { setAppErrorAC } from "../../../app/app-reducer"
import { selectError } from "../../../app/appSelectors"

export const ErrorSnackbar = () => {
  const dispatch = useAppDispatch()

  const error = useAppSelector(selectError)

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    dispatch(setAppErrorAC(null))
  }

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
