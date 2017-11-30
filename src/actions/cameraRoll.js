import Permissions from 'react-native-permissions';
import React from 'react';
import { CameraRoll } from 'react-native';

// Action types

export const UPDATE_PERMISSION_PHOTOS = 'UPDATE_PERMISSION_PHOTOS';
export const UPDATE_PHOTOS = 'UPDATE_PHOTOS';
export const CLEAR_PHOTOS = 'CLEAR_PHOTOS';

// Actions creators

export const updatePermissionPhotos = (permission) => {
    return {
        type: UPDATE_PERMISSION_PHOTOS,
        permission,
    };
};

export const updatePhotos = (photos, pageInfo) => {
    return {
        type: UPDATE_PHOTOS,
        photos,
        pageInfo,
    };
};

export const clear = () => {
    return {
        type: CLEAR_PHOTOS,
    };
};



export const getPhotosPermission = () => {
    return (dispatch, getState) => {
        Permissions.request('photo').then(response => {
            dispatch(updatePermissionPhotos(response));
        });
    };
};

export const checkAndGetPhotosPermission = () => {
    return (dispatch, getState) => {
        Permissions.check('photo').then(response => {
            dispatch(updatePermissionPhotos(response));
            if (response !== 'authorized') {
                dispatch(getPhotosPermission());
            }
        });
    };
};

export const getPhotos = ( numPhotos = 50) => {
    return(dispatch, getState) => {
        const { pageInfo } = getState().cameraRoll;
        if ( pageInfo === null ) {
            CameraRoll.getPhotos({
                first: numPhotos,
            })
            .then(r => {
                dispatch(updatePhotos(r.edges, r.page_info));
            });
        } else {
            if ( pageInfo.has_next_page ) {
                CameraRoll.getPhotos({
                    first: numPhotos,
                    after: pageInfo.end_cursor,
                })
                .then(r => {
                    dispatch(updatePhotos(r.edges, r.page_info));
                });
            }
        }
    };
}
