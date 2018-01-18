import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import RNFS from 'react-native-fs';
import { RNS3 } from 'react-native-aws3';
import { bucket, region, url, accessKey, secretKey } from '../../config';
import { updateReactPhotos } from './photos';

const config = { "accessKeyId": accessKey, "secretAccessKey": secretKey, "region": region };

AWS.config.update(config);
s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: bucket},
});


// Action types

export const FETCH_USERS = 'FETCH_USERS';
export const ADD_PHOTO_TO_ALBUM = 'ADD_PHOTO_TO_ALBUM';
export const CREATE_USER_ALBUM = 'CREATE_USER_ALBUM';
export const GET_USER_ALBUM = 'GET_USER_ALBUM';
export const DELETE_PHOTO_FROM_ALBUM = 'DELETE_PHOTO_FROM_ALBUM';


// Actions creators

export const fetchUsers = (users) => {
    return {
        type: FETCH_USERS,
        users,
    };
};


export const listUsers = () => {
    return (dispatch, getState) => {
        s3.listObjects({Delimiter: '/'}, (err, data) => {
            if (err) {
                console.log('There was an error listing your albums: ' + err.message);
            } else {
                console.log("Album List", data);
            }
        });
    };
};

export const createUserAlbum = (albumName) => {
    return (dispatch, getState) => {
        albumName = albumName.trim();
        if (!albumName) {
            console.log('Album names must contain at least one non-space character.');
        }
        if (albumName.indexOf('/') !== -1) {
            console.log('Album names cannot contain slashes.');
        }

        const albumKey = encodeURIComponent(albumName) + '/';
        s3.headObject({ Key: albumKey }, (err, data) => {
            if (!err) {
                console.log('Album already exists.');
            }
            s3.putObject({Key: albumKey}, (err, data) => {
                if (err) {
                    console.log('There was an error creating your album: ' + err.message);
                }
                console.log('Successfully created album.', data);
            });
        });
    };
};

export const getUserAlbum = (albumName) => {
    return (dispatch, getState) => {
        const albumPhotosKey = encodeURIComponent(albumName) + '/';
        s3.listObjects({Prefix: albumPhotosKey}, (err, data) => {
            if (err) {
                console.log('There was an error viewing your album: ' + err.message);
            } else {
                const photosWithoutAlbum = data.Contents;
                photosWithoutAlbum.shift(); //Remove 1st since its the album
                const photosURLs = photosWithoutAlbum.map((photo) => {
                    return { url: url+photo.Key };
                });
                dispatch(updateReactPhotos(photosURLs));
                dispatch(getCoordinatiesForPhotos(photosWithoutAlbum));
            }
        });
    };
};

export const getCoordinatiesForPhotos = (photosData) => {
    return async (dispatch, getState) => {
        const photosURLsWithCoords = await Promise.all(photosData.map(photo => {
            const params = {
                Bucket: bucket,
                Key: photo.Key,
            };
            return s3.getObject(params).promise()
            .then(data => {
                if (data.Metadata.location) {
                    const coords = JSON.parse(data.Metadata.location);
                    return { url: url+photo.Key, location: coords };
                }
                return { url: url+photo.Key };
            });
        }));
        dispatch(updateReactPhotos(photosURLsWithCoords));
    };
};

export const addPhotoToAlbum = (photo) => {
    return (dispatch, getState) => {
        const { id } = getState().user;
        const file = {
            uri: photo.uri,
            name: Date.now() + '.png',
            type: 'image/png',
        };
        const params = {
            keyPrefix: id + "/",
            bucket,
            region,
            accessKey,
            secretKey,
            successActionStatus: 201,
            metadata: {
                location: JSON.stringify(photo.location),
            },
        };

        RNS3.put(file, params)
        .then(response => console.log(response));
    };
};

export const deletePhotoFromAlbum = (albumName, photoKey) => {
    return (dispatch, getState) => {
        s3.deleteObject({Key: photoKey}, (err, data) => {
            if (err) {
                console.log('There was an error deleting your photo: ', err.message);
            } else {
                console.log('Successfully deleted photo.', data);
            }
        });
    };
};
