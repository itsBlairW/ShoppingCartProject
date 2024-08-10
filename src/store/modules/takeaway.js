//编写相关代码
import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"

const foodStore = createSlice({
    name: 'foods',
    initialState:{
        //商品列表
        foodsList: [],
        //Menu激活下标值
        activeIndex: 0,
        //购物车列表
        cartList: []
    },
    reducers: {
        setFoodList(state, action){
            state.foodsList = action.payload
        },
        //更改activeIndex
        changeActiveIndex(state, action){
            state.activeIndex = action.payload
        },
        //添加购物车
        addCart(state, action){
            //是否添加过，以action.payload.id去cartList中匹配 匹配到-添加过
            const item = state.cartList.find(item=>item.id === action.payload.id)
            if(item){
                item.count++
            }else{
                state.cartList.push(action.payload)
            }
        },
        //count plus
        increCount(state, action){
            //关键点：找到当前要修改谁的count id
            const item = state.cartList.find(item=>item.id === action.payload.id)
            item.count++
        },
        //count minus
        decreCount(state, action){
            //关键点：找到当前要修改谁的count id
            const item = state.cartList.find(item=>item.id === action.payload.id)
            if(item.count > 1){
                item.count --
            }else{
                //如果数量为1还按减号，则从购物车中删除该商品
                state.cartList = state.cartList.filter( item=>item.id!==action.payload.id)
            }
        },
        //清除购物车
        clearCart(state){
            state.cartList=[]
        }
    }
})

//异步获取部分
const {setFoodList, changeActiveIndex, addCart, increCount, decreCount, clearCart } = foodStore.actions
const fetchFoodList = () => {
    return async (dispatch)=>{
        //编写异步逻辑
        const res = await axios.get('http://localhost:3004/takeaway')
        //调用dispatch函数提交action
        dispatch(setFoodList(res.data))
    }
}

export { fetchFoodList, changeActiveIndex, addCart, increCount, decreCount, clearCart }

const reducers = foodStore.reducer

export default reducers