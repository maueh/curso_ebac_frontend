document.addEventListener('DOMContentLoaded', function() {
    const nome = document.querySelector("#nome");
    const nome_usuario = document.querySelector("#nome_usuario");
    const seguidores = document.querySelector("#qtd_seguidores");
    const seguindo = document.querySelector("#qtd_seguindo");
    const repositorios = document.querySelector("#qtd_repositorios");
    const avatar = document.querySelector("#avatar");
    const link_usuario = document.querySelector("#link_usuario");
    
    fetch(`https://api.github.com/users/maueh`)
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
        nome_usuario.innerHTML = json.login;
        avatar.src = json.avatar_url;
        seguidores.innerHTML += json.followers;
        seguindo.innerHTML += json.following;
        repositorios.innerHTML += json.public_repos;
        link_usuario.href = json.html_url;
    });
});