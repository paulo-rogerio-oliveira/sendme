import fetchMock from "jest-fetch-mock";
import { userService } from "../userService";

fetchMock.enableMocks();

beforeEach(()=>{

    fetch.resetMocks();
    
    

});

it('When authenticated a valid user', async ()=> {

    fetch.mockResponseOnce(JSON.stringify({ login: "Jon", token: "1234", id: 123,}))
    
    const result= await userService.authenticate({login: "Jon", password: "123", }) ;    
   
    expect( result.id ).toEqual(123);
    expect( result.hasErrors ).toBeUndefined();

});


it('When try auth with invalid user', async ()=> {

    fetch.mockRejectOnce(JSON.stringify({ status: 422, message: "Inválid login or password." }))
    
    const result= await userService.authenticate({login: "admin", password: "admin", }) ;    
    
    expect( result.hasErrors ).toBeDefined();
    expect( result.errors ).toBeDefined();
    expect( result.errors.general.errors ).toBeDefined();

});

it('When try auth with server down', async ()=> {

    fetch.mockAbortOnce(JSON.stringify({ status: 500, message: "Server down." }))
    
    const result= await userService.authenticate({login: "admin", password: "admin", }) ;    
    
    expect( result.hasErrors ).toBeDefined();
    expect( result.errors ).toBeDefined();
    expect( result.errors.general.errors ).toBeDefined();

});


it('When register a user with success', async ()=> {

    fetch.mockResponseOnce(JSON.stringify({ login: "Jon", token: "1234", id: 123,}))
    
    const result= await userService.register({login: "Jon", password: "123", email: "me@company.com" }) ;    
    
    expect( result.id ).toEqual(123);
    expect( result.hasErrors ).toBeUndefined();
});


it('When try register with invalid email', async ()=> {

    fetch.mockRejectOnce(JSON.stringify({ status: 422, message: "Inválid email." }))
    
    const result= await userService.register({login: "admin", password: "admin", }) ;    
    
    expect( result.hasErrors ).toBeDefined();
    expect( result.errors ).toBeDefined();
    expect( result.errors.general.errors ).toBeDefined();

});

it('When try register with server down', async ()=> {

    fetch.mockAbortOnce(JSON.stringify({ status: 500, message: "Server down." }))
    
    const result= await userService.register({login: "admin", password: "admin", }) ;    
    
    expect( result.hasErrors ).toBeDefined();
    expect( result.errors ).toBeDefined();
    expect( result.errors.general.errors ).toBeDefined();

});