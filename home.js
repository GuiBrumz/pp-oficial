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