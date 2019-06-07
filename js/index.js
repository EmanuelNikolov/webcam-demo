const player = document.getElementById('player'),
    constraints = {video: true},
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    captureButton = document.getElementById('capture'),
    sendButton = document.getElementById('send');

let wasCaptured = false;

captureButton.addEventListener('click', function () {
    canvas.width = player.offsetWidth;
    canvas.height = player.offsetHeight;
    context.drawImage(player, 0, 0, canvas.width, canvas.height);

    wasCaptured = true;
});

sendButton.addEventListener('click', function () {
    if (!wasCaptured) {
        M.toast({
            html: 'Take a photo first!',
            classes: 'teal',
            displayLength: 5000
        });
        return;
    }

    const xhr = new XMLHttpRequest();

    xhr.open('POST', window.location.href);

    xhr.onload = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            M.toast({
                html: 'Photo uploaded successfully!',
                classes: 'light-green accent-4',
                displayLength: 5000
            });
        }
    };

    xhr.onerror = function (e) {
        M.toast({
            html: 'Photo uploaded successfully!',
            classes: 'light-green accent-4',
            displayLength: 5000
        });
    };

    const formData = new FormData(),
        canvasData = canvas.toDataURL('image/png');

    formData.append('photo', canvasData);
    xhr.send(formData);
});

navigator.mediaDevices.getUserMedia(constraints)
    .then(function (stream) {
        player.srcObject = stream;
    });

