import { useSelector } from 'react-redux';

export const useAuth = ()=>{


    const {user, authenticated, loading} = useSelector( (state) => state.user);   
    return {authenticated,user,loading, };
    


};

