$.getJSON('voices.json', function (voices) {
    let element = document.getElementById('voices');
    Object.keys(voices).forEach(function (language) {
        let html = `<div class="blub-card"><h2>${language}</h2>`;
        for (const voice of voices[language]) {
            html += `
                <div class="blub-voice-preview" onclick="play('preview${voice}')">
                ${voice}
                <audio id="preview${voice}" preload="none" src="preview/voices/${voice}.mp3" />
                </div>
            `;
        }
        html += `</div>`;
        element.insertAdjacentHTML('beforeend', html);
    });
});

$.getJSON('sounds.json', function (sounds) {
    let element = document.getElementById('sounds');
    let html = `<div class="blub-card">`;
    let i = 0;
    for (const sound of sounds) {
        html += `
            <div class="blub-sound-preview" preload="none" onclick="play('preview${sound.name}')">
            ${sound.name}
            <audio id="preview${sound.name}" src="${sound.url}" />
            </div>
        `;

        if ((++i) % 6 == 0) {
            html += `</div>`;
            element.insertAdjacentHTML('beforeend', html);
            html = `<div class="blub-card">`;
        }
    }
    html += `</div>`;
    element.insertAdjacentHTML('beforeend', html);
});

let lastAudio;
function play(id) {
    if (lastAudio) {
        lastAudio.currentTime = 0;
        lastAudio.pause();
    }

    lastAudio = document.getElementById(id);
    lastAudio.play();
}
