if (!localStorage.getItem("cmt")) {
  localStorage.setItem("cmt", JSON.stringify({ next: 0, comments: [] }));
}

if (!localStorage.getItem("img")) {
  localStorage.setItem("img", JSON.stringify({ next: 0, images: [] }));
}

/*  ******* Data types *******
    image objects must have at least the following attributes:
        - (String) imageId 
        - (String) title
        - (String) author
        - (String) url
        - (Date) date

    comment objects must have the following attributes
        - (String) commentId
        - (String) imageId
        - (String) author
        - (String) content
        - (Date) date

****************************** */

// add an image to the gallery
export function addImage(title, author, url) {
    const img = JSON.parse(localStorage.getItem("img"));
    const image = { imageId: img.next++, title: title, author: author, url: url, date: new Date() };
    img.images.unshift(image);
    localStorage.setItem("img", JSON.stringify(img));
}

// get currently displayed image's imageId given url
export function getImageId(url) {
    const img = JSON.parse(localStorage.getItem("img"));
    const index = img.images.findIndex((image) => image.url == url);
    return img.images[index].imageId;
}

// delete an image from the gallery given its imageId
export function deleteImage(imageId) {
    const img = JSON.parse(localStorage.getItem("img"));
    const index = img.images.findIndex((image) => image.imageId == imageId);
    if (index == -1) return null;
    const image = img.images[index];
    img.images.splice(index, 1);
    localStorage.setItem("img", JSON.stringify(img));
}

//get all comments of an image
export function getComments(imageId) {
    const cmt = JSON.parse(localStorage.getItem("cmt"));
    const result = cmt.comments.filter((comment) => comment.imageId == imageId);
    return result;
}

// add a comment to an image
export function addComment(imageId, author, content) {
    const cmt = JSON.parse(localStorage.getItem("cmt"));
    const comment = { commentId: cmt.next++, imageId: imageId, author: author, content: content, date: new Date() };
    cmt.comments.unshift(comment);
    localStorage.setItem("cmt", JSON.stringify(cmt));
}

// delete a comment to an image
export function deleteComment(commentId) {
    const cmt = JSON.parse(localStorage.getItem("cmt"));
    const index = cmt.comments.findIndex((comment) => comment.commentId == commentId);
    if (index == -1) return null;
    const comment = cmt.comments[index];
    cmt.comments.splice(index, 1);
    localStorage.setItem("cmt", JSON.stringify(cmt));
}
