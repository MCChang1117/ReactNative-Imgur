import { getImageComment } from './http';

export async function parseImageResponse(galleries, count){

    let galleries_arr = [];
    let loopCount = count;
    if (galleries.length < loopCount){
        loopCount = galleries.length;
    }

    for (let i = 0; i < loopCount; i++){
        let img_info = galleries[i];
        let gallery_map = new Map();

        // extract image url from the album
        let img_urls = [];
        if (img_info.is_album){
            img_info.images.forEach(function(image, idx){
                img_urls[idx] = image.link;
            });
        } else {
            img_urls[0] = img_info.link;
        };
        gallery_map.set("urls", img_urls);

        // get author
        gallery_map.set("author", img_info.account_url);

        // get points
        gallery_map.set("points", img_info.points);

        // get comments
        const comments = await getImageComment(img_info.id);
        gallery_map.set("comments", comments);

        galleries_arr[i] = gallery_map;
    }
    

    return galleries_arr;
}