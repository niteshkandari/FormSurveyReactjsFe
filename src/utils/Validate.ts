export class ValidateFormData {
  static validator(reqBody: {
    name: string;
    email: string;
    address: string;
    phoneNumber: any;
  }) {
      const { name,email,address, phoneNumber } = reqBody;   
      return new Promise((resolve, reject) => {
          if(name === "" && address === "" && address === "") {
            reject({val:false,warning:"Fields cannot be empty"});
        }
        else if(name.length > 20 ){
            reject({val:false,warning:"Name should not exceed 20 characters"});
        }
        else if(!email.includes("@")) {
            reject({val:false,warning:"Email address is not valid"});
        }
        else if(phoneNumber.toString().length < 8) {
            reject({val:false,warning:"Please enter a valid phone number"})
        }
        else if(isNaN(phoneNumber)){
            reject({val:false,warning:"please enter correct phone number"});
        }
        else{
            resolve(true);
        }
    })
  }
}
