const express=require('express');
const https=require('https');
const app=express();
app.use(express.static('stat-fol'));
app.use(express.urlencoded())
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");

})
app.post('/',function(req,res){
    const first_name=req.body.name1;
    const last_name=req.body.name2;
    const email=req.body.email;
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME: first_name,
                    LNAME: last_name
                }
            }
        ]
    }
    const jsondata=JSON.stringify(data);
    const options={
        method:"POST",
        auth:"Vishwa:b778d66a535434c7e058627d2c11e0d4-us6"
    }
    const url="https://us6.api.mailchimp.com/3.0/lists/4513dd40b4";
    const request=https.request(url,options,function(response){
        if(response.statusCode == 200)
        {
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/failiure.html")
        }
    })
    request.write(jsondata);
    request.end();
})
app.post('/failure', (req, res) => {
    res.redirect('/')
});
app.listen(process.env.PORT||3000,function(req,res){
    console.log('server running on port 3000');
})