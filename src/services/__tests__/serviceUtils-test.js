import {serviceUtils} from '../serviceUtils'

test('when create headers without authorization', ()=>{

    //arrange
    const authUser = { login: "adm", password: "123", token: ""}
    
    //act
    const result = serviceUtils.getDefaultHeaders(authUser);

    expect( result['Content-Type'] ).toBe("application/json");
    expect( result['Accept'] ).toBe("*/*");
    expect( result['Authorization'] ).toBeUndefined();

});


test('when create headers with authorization', ()=>{

    //arrange
    const authUser = { login: "adm", password: "123", token: "123"}
    
    //act
    const result = serviceUtils.getDefaultHeaders(authUser);

    expect( result['Content-Type'] ).toBe("application/json");
    expect( result['Accept'] ).toBe("*/*");
    expect( result['Authorization'] ).toBe("Bearer 123");

});


test('When request result dont have object errors', async ()=>{

    //arrange
    const response = {
        
        "property": [
            "invalid value"
            ],
    }
    
    //act
    const result = await serviceUtils.padronizeResponse(500,response);

    expect( result['hasErrors'] ).toBe(true);
    expect( result['errors']['general']['errors'][0]['errorMessage'] ).toBe("Request error");
    
});


test('When response to request have object errors and your properties dont have', async ()=>{
  
    //arrange
    const response = {
        
        "errors": {
            "property": [
            "invalid value"
            ],

            "property2": [
                "invalid value",
                "invalid value 2"
            ]
      }
    }

    
    //act
    const result = await serviceUtils.padronizeResponse(421,response);
    console.log(result);

    //assert
    expect( result['hasErrors'] ).toBe(true);
    expect( result['errors']['property']['errors'][0]['errorMessage'] ).toBe("invalid value");
    expect( result['errors']['property2']['errors'][0]['errorMessage'] ).toBe("invalid value");
    expect( result['errors']['property2']['errors'][1]['errorMessage'] ).toBe("invalid value 2");
    
});


test('When response to request have errors object and your properties too', async ()=>{

        debugger

        //arrange
        const response = {
            "errors": {
              "property": {
                "errors": [
                  {
                    "errorMessage": "invalid value"
                  }
                ]},
                "stub": "stub",
                "property2": {
                    "errors": [
                      {
                        "errorMessage": "invalid value"
                      },
                      {
                        "errorMessage": "invalid value 2"
                      }
                    ],
              }
            
          }
        }


    //act
    const result = await serviceUtils.padronizeResponse(421,response);
    console.log(result);

    //assert
    expect( result['hasErrors'] ).toBe(true);
    expect( result['errors']['property']['errors'][0]['errorMessage'] ).toBe("invalid value");
    expect( result['errors']['property2']['errors'][0]['errorMessage'] ).toBe("invalid value");
    expect( result['errors']['property2']['errors'][1]['errorMessage'] ).toBe("invalid value 2");
    
});

test('When response to request have a custom message to errors', async ()=>{



    //arrange
    const response = {
        "message":  "error",
          
    }


//act
const result = await serviceUtils.padronizeResponse(500,response);
console.log(result);

//assert
expect( result['hasErrors'] ).toBe(true);
expect( result['errors']['general']['errors'][0]['errorMessage'] ).toBe("error");


});

test('When response to request have no errors', async ()=>{



    //arrange
    const response = {
        "message":  "no error",
          
    }


//act
const result = await serviceUtils.padronizeResponse(200,response);
console.log(result);

//assert
expect( result.hasErrors ).toBeUndefined();
expect( result.errors ).toBeUndefined();
expect( result.message).toBe("no error");

});