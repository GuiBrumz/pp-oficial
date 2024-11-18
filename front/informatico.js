// Função para adicionar destaque ao item do menu clicado
const menuItems = document.querySelectorAll('.sidebar nav ul li a');

menuItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove a classe 'active' de todos os itens
        menuItems.forEach(link => link.classList.remove('active'));
        // Adiciona a classe 'active' ao item clicado
        this.classList.add('active');
    });
});

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.getElementById('menuIcon');

    if (sidebar.style.right === '0px') {
        sidebar.style.right = '-250px'; // Esconde a sidebar
        menuIcon.style.right = '15px'; // Retorna o ícone para a posição original
    } else {
        sidebar.style.right = '0px'; // Mostra a sidebar
        menuIcon.style.right = '265px'; // Move o ícone para acompanhar a sidebar
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Faz a rolagem ser suave
    });
}
