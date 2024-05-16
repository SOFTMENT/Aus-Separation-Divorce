import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    userData:null,
    currentPosition : null,
    favorites : [],
    orderCount:0,
    currentLocation:"",
    categories:[],
    isLive:false
}
// const api = createApi({
//     baseQuery: fakeBaseQuery(),
//     endpoints: (build) => ({
//       getFavorites: build.query({
//         async queryFn(arg) {
//           try {
//             const uid = auth().currentUser.uid
//             const result = await firestore().collection("Users").doc(uid).collection("Favorites").get()
//             let favs = []
//             result.forEach(doc => {
//                 favs.push(doc.data())
//             })
//             return { data: favs}
//           } catch (e) {
//             return { error: e }
//           }
//         },
//       }),
//     }),
//   })
export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserData:(state,action)=>{
            let data = action.payload
            data ={
                ...data,
                createdAt : data.createdAt.toDate().toDateString(),
                subscriptionDate : data?.subscriptionDate?.toDate()?.toDateString() ?? ""
            }
            state.userData = data
        },
        setIsLive:(state,action)=>{
            let data = action.payload
            state.isLive = data
        },
        setCurrentPosition:(state,action)=>{
            let data = action.payload
            state.currentPosition = data
        },
        setCategories:(state,action)=>{
            let data = action.payload
            state.categories = data
        },
        setCurrentLocation:(state,action) => {
            let data = action.payload
            state.currentLocation = data
        },
        setFavorites : (state,action) => {
            let data = action.payload
            state.favorites = data
        },
        setOrderCount : (state,action) => {
            let data = action.payload
            state.orderCount = data
        }
    }
})
// export const { getFavorites } = api;
export const {setUserData,setCurrentPosition,setFavorites,setOrderCount,setCurrentLocation,setCategories,setIsLive} = userSlice.actions
export default userSlice.reducer