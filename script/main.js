function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);

    //https://stackoverflow.com/questions/40954960/read-an-external-local-json-file-into-javascript
}


function reloadBody(text) {
    const div = document.getElementById('divContainer')

    if (div.parentNode !== null) {
        div.parentNode.removeChild(div)
    } else {
        div.innerHTML = ''
    }

    document.body.innerHTML = text


    document.body.style.color = 'WHITE'

    document.body.style.textAlign = 'center'

    document.body.style.height = '350px'

    document.body.style.marginTop = '300px'

    document.body.style.fontSize = '100px'

}



readTextFile("languages.json", function(text) {

    try {

        const langBrowser = navigator.language
            //  const activeLangs = navigator.languages

        const languages = JSON.parse(text);

        const idText = document.getElementById('text')
        const langDetectada = document.getElementById('langDetectada');

        //  const navigatorLanguages = document.getElementById('navigatorLanguages');

        let lang = false

        languages.forEach(l => {
            if (l.tipo == langBrowser) {

                idText.innerText = l.texto
                langDetectada.innerText = `Say "Hello World" with the browser language | ${l.tipo}`
                lang = true

                // navigatorLanguages.innerText = `${activeLangs.join('\n')}`

            }
        })

        if (lang == false) return reloadBody('<h1>' + 'Unfortunately, your browser language is not yet supported. :(' + '</h1>');

        if (!idText.innerText) return reloadBody('<h1>' + "Hmmm... For some reason, I can't capture the language of your browser... Reload this page and try again." + '</h1>');


    } catch (err) {
        let txt = '<h2>' + `Code: ${err.code ? undefined : 'Without code'}` + '</h2>' + '<h1>' + '<br>' + 'Ups, it looks like there was an error :/' + '</br>' + '<h1>'

        reloadBody(txt)
        document.body.style.color = 'RED'

        console.log(err)

    }

});