const player = document.getElementById('player'),
    constraints = {video: true},
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    captureButton = document.getElementById('capture');

captureButton.addEventListener('click', function () {
    canvas.width = player.offsetWidth;
    canvas.height = player.offsetHeight;

    context.drawImage(player, 0, 0, canvas.width, canvas.height);
});

navigator.mediaDevices.getUserMedia(constraints)
    .then(function (stream) {
        player.srcObject = stream;
    });

