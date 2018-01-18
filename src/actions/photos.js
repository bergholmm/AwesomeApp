import React from 'react';
import { CameraRoll } from 'react-native';
import CameraRollExtended from 'react-native-store-photos-album';
import { addPhotoToAlbum } from './aws';
import { Platform } from 'react-native';


// Action types

export const ADD_IMAGE = 'ADD_IMAGE';
export const UPDATE_REACT_PHOTOS = 'UPDATE_REACT_PHOTOS';
export const SET_IMAGE = 'SET_IMAGE';
export const CLEAR_IMAGE = 'CLEAR_IMAGE';
export const UPDATE_PHOTOS_CAMERA_ROLL = 'UPDATE_PHOTOS_CAMERA_ROLL';
export const CLEAR_PHOTOS_CAMERA_ROLL = 'CLEAR_PHOTOS_CAMERA_ROLL';
export const LOGOUT_PHOTOS = 'LOGOUT_PHOTOS';

// Actions creators

export const logoutPhoto = () => {
    return {
        type: LOGOUT_PHOTOS,
    };
};

export const addImage = (image) => {
    return {
        type: ADD_IMAGE,
        image,
    };
};

export const updateReactPhotos = (photos) => {
    return {
        type: UPDATE_REACT_PHOTOS,
        photos,
    };
};

export const setImage = (image, location) => {
    return {
        type: SET_IMAGE,
        image,
        location,
    };
};

export const clearImage = () => {
    return {
        type: CLEAR_IMAGE,
    };
};

export const updatePhotosCameraRoll = (photos, pageInfo) => {
    return {
        type: UPDATE_PHOTOS_CAMERA_ROLL,
        photos,
        pageInfo,
    };
};

export const clearCameraRoll = () => {
    return {
        type: CLEAR_PHOTOS_CAMERA_ROLL,
    };
};


// Actions creators

export const setImageFromCamera = (image) => {
    return (dispatch, getState) => {
        const location = getState().permissions.location;
        dispatch(setImage(image, location));
    };
};

export const getPhotosCameraRoll = ( numPhotos = 50) => {
    return(dispatch, getState) => {
        const { pageInfo } = getState().photos.cameraRoll;
        if ( pageInfo === null ) {
            CameraRoll.getPhotos({
                first: numPhotos,
            })
            .then(r => {
                dispatch(updatePhotosCameraRoll(r.edges, r.page_info));
            });
        } else {
            if ( pageInfo.has_next_page ) {
                CameraRoll.getPhotos({
                    first: numPhotos,
                    after: pageInfo.end_cursor,
                })
                .then(r => {
                    dispatch(updatePhotosCameraRoll(r.edges, r.page_info));
                });
            }
        }
    };
}

export const saveToReactPhotos = (photo) => {
    return (dispatch, getState) => {
        dispatch(addPhotoToAlbum(photo));

        if (Platform.OS === 'ios') {
            CameraRollExtended.saveToCameraRoll(photo, 'photo')
            .then(p => {
                dispatch(addImage({ ...photo, url: p }));
            });
        } else {
            CameraRoll.saveToCameraRoll(photo.uri)
            .then(p => {
                dispatch(addImage({ ...photo, url: p }));
            });
        }
    };
};

// export const getReactPhotos = ( numPhotos = 50) => {
//     return (dispatch, getState) => {
//         const { pageInfo } = getState().photos.reactPhotos;
//         if ( pageInfo === null ) {
//             CameraRoll.getPhotos({
//                 first: numPhotos,
//                 groupName: 'React',
//                 groupTypes: 'Album',
//             })
//             .then(r => {
//                 const photos = r.edges.map(({ node }) => {
//                     return {
//                         url: node.image.uri,
//                         location: node.location,
//                         timestamp: node.timestamp,
//                     }
//                 })
//                 dispatch(updateReactPhotos(photos, r.page_info));
//             });
//         } else {
//             if ( pageInfo.has_next_page ) {
//                 CameraRoll.getPhotos({
//                     first: numPhotos,
//                     after: pageInfo.end_cursor,
//                     groupName: 'React',
//                     groupTypes: 'Album',
//                 })
//                 .then(r => {
//                     const photos = r.edges.map(({ node }) => {
//                         return {
//                             url: node.image.uri,
//                             location: node.location,
//                             timestamp: node.timestamp,
//                         }
//                     })
//                     dispatch(updateReactPhotos(photos, r.page_info));
//                 });
//             }
//         }
//     };
// }
