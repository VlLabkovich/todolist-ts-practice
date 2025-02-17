import { useAppDispatch, useAppSelector } from "common/hooks"
import React, { useEffect } from "react"
import Grid from "@mui/material/Unstable_Grid2"
import Paper from "@mui/material/Paper"
import { fetchTodolistsTC } from "../../model/todolists-reducer"
import { Todolist } from "./Todolist/Todolist"
import { selectTodolists } from "../../model/todolistsSelectors"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <>
      {todolists.map((el) => {
        return (
          <Grid key={el.id}>
            <Paper elevation={2} sx={{ padding: "0 20px 20px 20px" }}>
              <Todolist key={el.id} todolist={el} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
