// Verifica se o usuário está logado antes de acessar a página
if (localStorage.getItem("token") == null) {
  alert("Você precisa estar logado para acessar essa página");
  window.location.href = "../front/login.html";
}

// Obtém as informações do usuário armazenadas no localStorage
let user = JSON.parse(localStorage.getItem('userdata'));
console.log(user.id); // Mostra o ID do usuário no console

// Obtém o botão de submissão
let button = document.getElementById("handleSubmit");

document.addEventListener('DOMContentLoaded', function () {
  
  // Função de clique para criar uma nova postagem
  button.onclick = async function () {
    let title = document.getElementById("title").value; // Obtém o título da postagem
    let userId = user.id; // ID do usuário logado
    let data = { title, userId }; // Dados a serem enviados para o backend

    console.log(data); // Exibe os dados no console para depuração

    // Envia a requisição para criar uma nova postagem
    const response = await fetch('http://localhost:3000/api/store/task', {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(data)
    });

    let content = await response.json(); // Recebe a resposta em JSON

    if (content.success) {
      // Se a postagem for bem-sucedida, salva ela no localStorage
      const novaPostagem = content.data;
      let postagensSalvas = JSON.parse(localStorage.getItem('postagensSalvas')) || [];
      postagensSalvas.push(novaPostagem);
      localStorage.setItem('postagensSalvas', JSON.stringify(postagensSalvas));
      alert("Sucesso");
      renderPostagens(); // Recarrega a lista de postagens
      document.getElementById('title').value = ''; // Limpa o campo de título
    } else {
      alert('Não foi possível postar.');
    }
  };

  // Função para atualizar uma postagem
  async function atualizarPostagem(id, novoTexto) {
    // Envia uma requisição EDIT para atualizar a postagem do backend
    const response = await fetch(`http://localhost:3000/api/update/task/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: novoTexto })
    });

    const result = await response.json(); // Recebe a resposta em JSON
    if (result.success) {
      alert('Postagem atualizada com sucesso!');
    } else {
      alert('Erro ao atualizar postagem.');
    }
  }

  // Função para deletar uma postagem
  async function deletarPostagem(id) {
    // Envia uma requisição DELETE para remover a postagem do backend
    const response = await fetch(`http://localhost:3000/api/delete/task/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json(); // Recebe a resposta em JSON
    if (result.success) {
      alert('Postagem deletada com sucesso!');
    } else {
      alert('Erro ao deletar postagem.');
    }
  }

  // Função para obter todas as postagens
  async function getPostagens() {
    const response = await fetch('http://localhost:3000/api/task', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json(); // Recebe a resposta em JSON
    console.log(result);

    const container = document.getElementById('postagens-container');
    container.innerHTML = ''; // Limpa o container antes de renderizar novas postagens

    let postagensSalvas = JSON.parse(localStorage.getItem('postagensSalvas')) || [];

    // Itera pelas postagens e as exibe, permitindo editar ou deletar
    result.data.forEach((postagem, index) => {
      // Verifica se a postagem pertence ao usuário logado
      if (postagem.id_user === user.id) {
        let messageItem = document.createElement('div');
        messageItem.classList.add('message-item');

        let p = document.createElement('p');
        p.textContent = postagem.title;

        let editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.textContent = '🖊';
        // Evento para editar uma postagem
        editButton.addEventListener('click', async function () {
          let novoTexto = prompt('Editar comentário:', postagem.title);
          if (novoTexto && novoTexto.trim() !== '') {
            postagensSalvas[index] = { ...postagem, title: novoTexto };
            localStorage.setItem('postagensSalvas', JSON.stringify(postagensSalvas));
            await atualizarPostagem(postagem.id, novoTexto);
            renderPostagens(); // Atualiza a lista de postagens
          }
        });

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = '❌';
        // Evento para deletar uma postagem
        deleteButton.addEventListener('click', async function () {
          postagensSalvas.splice(index, 1); // Remove a postagem do array
          localStorage.setItem('postagensSalvas', JSON.stringify(postagensSalvas));
          await deletarPostagem(postagem.id);
          renderPostagens(); // Atualiza a lista de postagens
        });

        messageItem.appendChild(p);
        messageItem.appendChild(editButton);
        messageItem.appendChild(deleteButton);
        container.appendChild(messageItem);
      } else {
        let messageItem = document.createElement('div');
        messageItem.classList.add('message-item');

        let p = document.createElement('p');
        p.textContent = postagem.title;
        messageItem.appendChild(p);
        container.appendChild(messageItem);
      }
    });
  }

  // Função para renderizar as postagens
  function renderPostagens() {
    getPostagens();
  }

  getPostagens(); // Chama a função para carregar as postagens

});

// Função para alternar a visibilidade da barra lateral
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const isHidden = sidebar.style.right === "-250px" || sidebar.style.right === "";

  // Alterna a visibilidade da barra lateral
  if (isHidden) {
    sidebar.style.right = "0"; // Mostra a barra lateral
  } else {
    sidebar.style.right = "-250px"; // Esconde a barra lateral
  }
}

// Tornando a função global
window.toggleSidebar = toggleSidebar;
