import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit";
import {userService} from '../services/userService';

/* get a user from cache */
const user = {login: "",  password: "", occupation: "", token: "",};
let storedUser = JSON.parse(localStorage.getItem("user"));

export const initialState ={

    user:  storedUser?storedUser:user,
    errors: null,
    loading: false,
    success: false,
    authenticated: false,
};

/**
 * Authenticate user in Api
 */
export const autenticate = createAsyncThunk(
    "user/autenticate", async (user, thunkApi) =>{

        
        const response = await userService.autenticate(user);

        /* if exists object erros in response manually reject this */
        if(response.errors){
            return thunkApi.rejectWithValue(response.errors);      
        }
           
        return response; 

       


    }


);


/**
 * Authenticate user in Api
 */
 export const register = createAsyncThunk(
    "user/register", async (user, thunkApi) =>{

        
        const registerResponse = await userService.register(user);

        /* if exists object erros in response manually reject this */
        if(registerResponse.errors){
            return thunkApi.rejectWithValue(registerResponse.errors);      
        }

        const authResponse = await userService.autenticate(user);
   
            /* if exists object erros in response manually reject this */
        if(registerResponse.errors){
            return thunkApi.rejectWithValue(authResponse.errors);      
        }
        
        return authResponse; 

       


    }


);

 const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {
            reset: (state, action)=>
            {
                state.errors = null;
                state.loading = false;
                state.success=false;
                
            },
            logout: (state, action) =>{
                
                localStorage.removeItem("user");
                state.errors = null;
                state.loading = false;
                state.user = user;
                state.authenticated = false;
                storedUser = null;
            },
        },
        extraReducers: (builder) => {

            builder.addCase(autenticate.pending, (state, action) => {
                                                                        state.loading = true; 
                                                                        state.errors = null;
                                                                        state.success=false;
                                                                        
                                                                    });
            builder.addCase(autenticate.fulfilled, (state, action) => {
                                                                        state.user = action.payload; 
                                                                        state.errors = null; 
                                                                        state.loading=false;     
                                                                        state.success=true;                                                                   
                                                                        state.authenticated = true;
                                                                        
           
                                                                    } );
            builder.addCase(autenticate.rejected, (state, action) => {
                                                                        state.errors = action.payload;
                                                                        state.loading = false;
                                                                        state.user = null;
                                                                        state.success=false;
                                                                        
                                                                    } );

          

        },

    }

);


export const {reset, logout}=  userSlice.actions;
export default userSlice.reducer;


