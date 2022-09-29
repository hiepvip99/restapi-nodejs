const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const orderRoute = require("./routes/order");
const productRoute = require("./routes/product");

// const {google} = require("googleapis");
// const path = require('path');
// const fs = require("fs");

// const CLIENT_ID = "52820989470-rbboevebauil78aeb55fasbu5l2ka3pq.apps.googleusercontent.com";
// const CLIENT_SECRET = "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";
// const REDIRECT_URI = "https://developers.google.com/oauthplayground";

// const REFRESH_TOKEN = "1//04Isd1jub4HA3CgYIARAAGAQSNwF-L9IreyAhRjKtl8WVJufjPERwqs6bg6HLKUPctnilkCNtNBVO_0JWjITU6rAaYKbJHVLFiwc";

// const oauth2Client = new google.auth.OAuth2(
//     CLIENT_ID,
//     CLIENT_SECRET,
//     REDIRECT_URI
// );

// oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

// const drive = google.drive({
//     version: "v3",
//     auth: oauth2Client
// });

// const filePath = path.join(__dirname, "test.png");

// async function uploadFile(){
//     try {
//         const response = await drive.files.create({
//             requestBody:{
//                 name: 'image.png',
//                 mimeType: "image/png"
//             },
//             media:{
//                 mimeType: "image/png",
//                 body: fs.createReadStream(filePath)
//             }
//         })

//         console.log(response.data);
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// // uploadFile();

// async function deleteFile(){
//     try {
//         const response = await drive.files.delete({
//             fileId: '14Fa9IXCpvTM6-3hqMBBge2NZ1ktJ25LI'
//         });
//         console.log(response.data, response.status);
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// // deleteFile();

// async function generatePublicUrl(){
//     try {
//         const fileId = "1vsZIsG--zRrgWTScsdt2DbF0cpS6SEIy";
//         await drive.permissions.create({
//             fileId: fileId,
//             requestBody:{
//                 role: 'reader',
//                 type: "anyone"
//             },
//         });

//         const result = await drive.files.get({
//             fileId: fileId,
//             fields: "webViewLink, webContentLink",
//         });
        
//         console.log(result.data);
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// generatePublicUrl();

dotenv.config();

mongoose.connect((process.env.MONGODB_URL), () => {
    console.log("Connected to MongoDB");
});

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json({limit:"50mb"}));
app.use(cors());
app.use(morgan("dev"));

app.use("/order", orderRoute);
app.use("/product", productRoute);

app.listen(8000, () => {
    console.log("Sever is running")
})