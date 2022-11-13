let db =[
    {
        identifier : "LrnoyyNLUqsUZlI0sXkW4A==",
        MFACode : "1234",
        expiresOn : "date string",
        isUsed : false
    }
];
module.exports ={
    AddMinutesToDate(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    },
    generateOTP(){
        let otpRecord =  {
            isUsed : false
        };
        
        const identifier = Date.now();
        
        otpRecord.identifier = identifier;

        let otp = "";
        for (let index = 0; index < 6; index++) {
            otp +=  Math.floor(Math.random() * 10);
        }

        otpRecord.MFACode = otp;

        var now = new Date();
        var next = this.AddMinutesToDate(now,5);
        
        
        otpRecord.expiresOn = next.toLocaleString();

        db.push(otpRecord);
        return otpRecord;
    },
    isValidOTP(identifier,MFACode){
        let otpRecord = db.filter(recored => recored.identifier===identifier)[0];
        if(!otpRecord.isUsed){
            if(new Date().getTime() < new Date(otpRecord.expiresOn).getTime()){
                return otpRecord.MFACode === MFACode;
            }
        }
        return false;
    }
}