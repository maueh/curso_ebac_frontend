document.addEventListener('DOMContentLoaded', function() {
    const nome = document.querySelector("#nome");
    const nome_usuario = document.querySelector("#nome_usuario");
    const seguidores = document.querySelector("#qtd_seguidores");
    const seguindo = document.querySelector("#qtd_seguindo");
    const repositorios = document.querySelector("#qtd_repositorios");
    const avatar = document.querySelector("#avatar");
    const link_usuario = document.querySelector("#link_usuario");
    
    const endpoint = `https://api.github.com/users/${nome_usuario.innerText}`;

    fetch(endpoint)
    .then(function(resposta) {
        return resposta.json();
    })
    .then(function(json) {
        try{
            if(json.name===null) {
                throw new Error("Unnamed");
            }
        nome.innerHTML = json.name;
        } catch {
            nome.innerHTML = json.login;
        }
        nome_usuario.innerText = json.login;
        avatar.src = json.avatar_url;
        seguidores.innerText += json.followers;
        seguindo.innerText += json.following;
        repositorios.innerText += json.public_repos;
        link_usuario.href = json.html_url;
    });
});