import { addImage, deleteImage, addComment, deleteComment, getImageId, getComments } from "/js/api.mjs"

function change_image(imageId, numChange) {

}

function change_comments(comments, index, numChange) {

}

function update_image_display(){
    const img = JSON.parse(localStorage.getItem("img"));
    const images = img.images;
    const image = images[images.length - 1];
    if(image == null) {
        document.querySelector("#images").innerHTML = "";
        return;
    }
    
    document.querySelector("#images").innerHTML = `
        <div class="image_title">${image.title}</div>
        <div class="image_author">${image.author}</div>
        <img id="image" src="${image.url}"/>
    `;

    document.querySelector("#comments").innerHTML = "";

    document.querySelector(".delete_image")
        .addEventListener("click", function(e) {
            document.querySelector("#comments").innerHTML = "";
            change_image(image.imageId, -1);
            deleteImage(image.imageId);
            update();
        });

    document.querySelector(".next_image")
        .addEventListener("click", function(e) {
            change_image(image.imageId, 1);
            update();
        });

    document.querySelector(".back_image")
        .addEventListener("click", function(e) {
            change_image(image.imageId, -1);
            update();
        });    
}

function update_comment_display(){
    const image = document.querySelector("#image");
    if(image == null) {
        document.querySelector("#comments").innerHTML = "";
        return;
    }
    const comments = getComments(getImageId(image.src));
    document.querySelector("#comments").innerHTML = "";
    comments.slice(0, 10).forEach( function(comment) {
    // create comment element
    const elmt = document.createElement("div");
    elmt.className = "comment";
    elmt.innerHTML = `
        <div class="comment_data">
            <div class="comment_user">${comment.author}</div>
            <div class="comment_date">${comment.date}</div>
        </div>
        <div class="comment_content">${comment.content}</div>
        <div class="delete_comment icon"></div>
    `;

    elmt.querySelector(".delete_comment")
        .addEventListener("click", function(e) {
            deleteComment(comment.commentId);
            update();
        });
    document.querySelector("#comments").append(elmt);
    });

    document.querySelector(".next_comments")
        .addEventListener("click", function(e) {
            change_comments(comment, 10);
            update();
        });

    document.querySelector(".back_comments")
        .addEventListener("click", function(e) {
            change_comments(comment, -10);
            update();
        });

    
}

document.getElementById("imageForm_toggle_btn")
    .addEventListener( "click", function(e) {
        if(image_form.style.display == "none") {
            image_form.style.display = "flex";
            imageForm_toggle_btn.value = "-";
        } else {
            image_form.style.display = "none";
            imageForm_toggle_btn.value = "+";
        }
    });

document.getElementById("image_form")
    .addEventListener( "submit", function(e){
        e.preventDefault();

        const title = document.getElementById("image_title").value;
        const author = document.getElementById("image_author").value;
        const url = document.getElementById("image_url").value;

        document.getElementById("image_form").reset();

        addImage(title, author, url);

        main_page.style.display = "flex";

        update_image_display();
    });

document.getElementById("comment_form")
    .addEventListener( "submit", function(e){
        e.preventDefault();

        const url = document.getElementById("image").src;
        const imageId = getImageId(url);
        const username = document.getElementById("user_name").value;
        const content = document.getElementById("user_comment").value

        document.getElementById("comment_form").reset();

        addComment(imageId, username, content);

        update_comment_display();
    });

function update() {
    update_image_display();
    update_comment_display();
}

update();