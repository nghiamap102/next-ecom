import {
    Action,
    AnyAction,
    combineReducers,
    configureStore,
    Store,
    ThunkAction
} from '@reduxjs/toolkit'
import {
    createRouterMiddleware,
    routerReducer,
    RouterState
} from 'connected-next-router'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import createSagaMiddleware, { Task } from 'redux-saga'
import { CartInitState } from './cart/cartModel'
import { cartReducer } from './cart/cartSlice'
import { ChatInitialState } from './chat/chatModel'
import { chatReducer } from './chat/chatSlice'
import { CommonInitState } from './common/commonModel'
import { commonReducer } from './common/commonSlice'
import { ProductInitState } from './product/productModel'
import { productReducer } from './product/productSlice'
import rootSaga from './rootSaga'

export interface State {
    router: RouterState
    common: CommonInitState
    cart: CartInitState
    product: ProductInitState
    chat: ChatInitialState
}

const rootReducer = combineReducers({
    router: routerReducer,
    common: commonReducer,
    cart: cartReducer,
    product: productReducer,
    chat: chatReducer,
})

const reducer = (state: any, action: AnyAction) => {
    if (action.type === HYDRATE) {
        let nextState = {
            ...state,
            ...action.payload,
        }

        if (typeof window !== 'undefined' && state?.router) {
            nextState.router = state.router
            nextState = {
                ...nextState,
                ...JSON.parse(localStorage.getItem('cart') || '{}'),
            }
        }
        return rootReducer(nextState, action)
    } else {
        return rootReducer(state, action)
    }
}

export interface SagaStore extends Store {
    sagaTask: Task
}

const localStorageMiddleware = ({ getState }: { getState: any }) => {
    return (next: any) => (action: any) => {
        const result = next(action)
        const { cart } = getState()
        if (typeof localStorage !== 'undefined' && cart) {
            localStorage.setItem('cart', JSON.stringify({ cart }))
        }
        return result
    }
}

const reHydrateStore = () => {
    if (
        typeof localStorage !== 'undefined' &&
        localStorage.getItem('cart') !== null
    ) {
        return JSON.parse(localStorage.getItem('cart') || '') // re-hydrate the store
    }
    return {}
}
const sagaMiddleware = createSagaMiddleware()
const routerMiddleware = createRouterMiddleware()
const store = configureStore({
    reducer,
    preloadedState: reHydrateStore(),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            sagaMiddleware,
            routerMiddleware,
            localStorageMiddleware,
        ),
    devTools: true,
})

export const makeStore = () => {
    (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga)
    return store
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

export const wrapper = createWrapper<SagaStore>(makeStore as any)
