const users=[

    { id: 123, login: "Jon", name: "Jon", password: "123", token: "123"},
    { id: 124, login: "Alber", name: "Alber", password: "1234", token: "1234"},

]

const autenticate = async (request)=>{


    const resolvedPromise = jest.fn();
    const rejectedPromise = jest.fn();
    const findUser = users.find(  (l, p) => users.login === l && users.password === p);    
    const responseError= (property, errors) =>{

        return { errors:{ property: {errors: [errors]} } };
    }


    if(!request.login){
        return rejectedPromise.mockRejectedValue(responseError("login", { errorMessage: "inválid login" }));
    }

    if(!request.password){
        return rejectedPromise.mockRejectedValue(responseError("password", { errorMessage: "inválid password" }));
    }

    if( !findUser(request.login, request.password)){
        return rejectedPromise.mockRejectedValue(responseError("general", { errorMessage: "inválid login/password" }));
    }

    return resolvedPromise(findUser(request.login, request.password));

}

export const userService ={

    autenticate,

}
