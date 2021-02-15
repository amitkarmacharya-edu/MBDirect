const util = require('util');
const gc = require('../gcConfig/');
const bucket = gc.bucket('mbdirect-images');
const { v4: uuid } = require('uuid');

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

const uploadImage = (file) => new Promise((resolve, reject) => {
    let { name, data: buffer } = file;
    name = name.replace(/ /g, "_");
    name = name.split(".");
    name = name[0] + "_" + uuid() + "."+ name[1];

    const blob = bucket.file(name);
    const blobStream = blob.createWriteStream({
        resumable: false
    });
    blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
    })
    .on('error', () => {
        reject('Unable to uploda images, somthing went wrong');
    })
    .end(buffer);
 });

module.exports = {uploadImage};