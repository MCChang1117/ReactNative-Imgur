import axios from 'axios';

// Deal with http request interacted with Imgur API

const IMGUR_BASE_URL = 'https://api.imgur.com/3/gallery/';
const CLIENT_ID = '1a12322be9171c8';
let config = {
    headers: {
        Authorization: 'Client-ID ' + CLIENT_ID
    }
};


export async function getImage(query) {
    // Get images based on query of words sent from user
    const IMG_TYPE = 'jpg';
    const imgur_search_url = String(IMGUR_BASE_URL + "search/?q_type=" + IMG_TYPE + '&q=' + query);
    
    console.log('get images based on the search input');
    const res = await axios.get(imgur_search_url, config);

    if (!res.data.success){
        // There's a problem in reading response
        return null;
    }

    if (res.data.data.length == 0){
        // No result with given query of words
        return null;
    }
    
    return res.data.data;
};

export async function getImageComment(id) {
    const imgur_comment_url = IMGUR_BASE_URL + '/' + id + '/comments';

    console.log('get comments with given gallery id');
    const res_comment = await axios.get(imgur_comment_url, config);

    if (!res_comment.data.success){
        // There's a problem in reading response
        return [];
    }

    if (res_comment.data.data.length == 0){
        // No result with given query of words
        return [];
    }

    const comments = []
    res_comment.data.data.forEach(function(comment, idx){
        comments[idx] = comment.comment;
    });

    return comments;
};