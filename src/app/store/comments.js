import { createAction, createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment.service'
import { getCurrentUserId } from './users'
import { nanoid } from 'nanoid'

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        commentsRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        // Добавление коментария
        commentCreated: (state, action) => {
            state.entities.push(action.payload)
        }
    }
})

const { actions, reducer: commentsReducer } = commentsSlice
const {
    commentsRequested,
    commentsReceved,
    commentsRequestFiled,
    commentCreated
} = actions
const addCommentRequested = createAction('comments/addCommentRequested') // Добавление коментария

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested())
    try {
        const { content } = await commentService.getComments(userId)
        dispatch(commentsReceved(content))
    } catch (error) {
        dispatch(commentsRequestFiled(error.message))
    }
}
// Добавление коментария
export const createComment = (payload) => async (dispatch, getState) => {
    dispatch(addCommentRequested(payload))
    const comment = {
        ...payload,
        _id: nanoid(),
        created_at: Date.now(),
        userId: getCurrentUserId()(getState())
    }
    try {
        const { content } = await commentService.createComment(comment)
        dispatch(commentCreated(content))
    } catch (error) {
        dispatch(commentsRequestFiled(error.message))
    }
}
export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading

export default commentsReducer
