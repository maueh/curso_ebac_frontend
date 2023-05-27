document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('data-atualizacao').innerHTML = new Date().toLocaleDateString('pt-BR', { timezone: 'UTC' });
    testeGulp();
});

function testeGulp() {
    alert("O gulp comprimiu e exportou o arquivo Javascript");
    console.log("Testando o gulp");
}