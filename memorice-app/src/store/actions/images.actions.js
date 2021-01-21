export const SET_IMAGES = 'SET_IMAGES'

export const setImages = imageList => {
    return {
        type: SET_IMAGES,
        imageList
    }
}