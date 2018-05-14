/* ====== DOM Grab ====== */
body = document.querySelector('body')


/* ====== Variables ====== */



/* ====== API Call ====== */
var request = new Request('https://api.unsplash.com/photos/random?count=5', {
    method: 'GET',
    headers: new Headers({
        'Authorization': 'Client-ID 6236edfcbba90a34eb926b8f757f00b77f8c1b7bb90a8de748e7314e73b520ad'
    })
});

fetch(request)
.then( response => { return response.json() })
.then( json_stuff => { send_to_doc(json_stuff) })

/* ====== Functions ====== */

function send_to_doc(arr) {
    arr.forEach( (obj) => {
        url_to_img(obj.urls.small)
    })
}

function url_to_img(url) {
    let img = document.createElement('img')
    img.setAttribute('src', url)
    body.insertAdjacentElement('beforeend', img)
}


/* ====== Events ====== */
