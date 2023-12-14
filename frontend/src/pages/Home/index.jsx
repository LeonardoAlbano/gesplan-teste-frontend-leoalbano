import React, { useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { Container, Content } from './styles';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import Modal from 'react-modal'; 
import { api } from "../../services/api"
import { Input } from "../../components/Input"
import { FaRegStar, FaStar, FaTrash } from "react-icons/fa";
import { Navigate } from 'react-router-dom';
import { IoClose } from "react-icons/io5";

Modal.setAppElement('#root');


export function Home() {
  // Estados do componente
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [favoriteRows, setFavoriteRows] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: [''], // Array para armazenar telefones
    tipoFornecedor: '',
    observacao: '',
  });

  // Função de validação de e-mail
  const validateEmail = (email) => {
    // Sua lógica de validação de e-mail aqui
    // Para simplificar, vamos verificar se o e-mail contém um símbolo @
    if (!email.includes('@')) {
      alert('e-mail digitado é invalido');
    }
  };

  // Funções para controlar a abertura e fechamento do modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  0// Função para selecionar/deselecionar uma linha
  const toggleRowSelection = (item) => {
    const newSelectedRows = [...selectedRows];
    if (newSelectedRows.includes(item)) {
      // Se já estiver selecionado, remova da lista
      const indexToRemove = newSelectedRows.indexOf(item);
      newSelectedRows.splice(indexToRemove, 1);
    } else {
      // Se não estiver selecionado, adicione à lista
      newSelectedRows.push(item);
    }
    setSelectedRows(newSelectedRows);
  };

  // Função para adicionar/remover uma linha aos favoritos
  const toggleFavorite = (index) => {
    const newFavoriteRows = [...favoriteRows];
    if (newFavoriteRows.includes(index)) {
      const indexToRemove = newFavoriteRows.indexOf(index);
      newFavoriteRows.splice(indexToRemove, 1);
    } else {
      newFavoriteRows.unshift(index); // Adiciona ao início para ser o primeiro da lista
    }
    setFavoriteRows(newFavoriteRows);
  };

  // Função para lidar com a mudança nos campos do formulário
  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  // Função para lidar com a mudança nos campos de telefone do formulário
  const handleTelefoneChange = (index, value) => {
    const newTelefones = [...formData.telefone];
    newTelefones[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      telefone: newTelefones,
    }));
  };

  // Função para adicionar um campo de telefone ao formulário
  const addTelefone = () => {
    setFormData((prevData) => ({
      ...prevData,
      telefone: [...prevData.telefone, ''],
    }));
  };

  // Função para remover um campo de telefone do formulário
  const removeTelefone = (index) => {
    const newTelefones = [...formData.telefone];
    newTelefones.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      telefone: newTelefones,
    }));
  };


  // Função para lidar com o cadastro de um novo usuário
  const handleSignUp = () => {
  // Verifica se todos os campos obrigatórios foram preenchidos
  if (!formData.nome || !formData.email || !formData.telefone || !formData.tipoFornecedor) {
    return alert("Preencha todos os campos obrigatórios!");
  }

  // Converte o array de telefones em uma string separada por vírgulas
  const telefoneString = formData.telefone.join(',');

  // Cria um novo objeto de usuário com os dados do formulário
  const newUser = {
    nome: formData.nome,
    email: formData.email,
    telefone: telefoneString,
    tipoFornecedor: formData.tipoFornecedor,
    observacao: formData.observacao
  };

  // Redefine os dados do formulário antes de enviar a requisição
  setFormData({
    nome: '',
    email: '',
    telefone: [''],
    tipoFornecedor: '',
    observacao: '',
  });

  // Envia uma requisição POST para criar um novo usuário
  api.post("/users", newUser)
    .then(response => {
      // Atualiza o estado local com o novo usuário
      setUsers(prevUsers => [...prevUsers, newUser]); // Usa newUser aqui, não response.data
      console.log("Novo usuário adicionado:", newUser);

      // Exibe um alerta indicando que o usuário foi criado com sucesso
      alert("Usuário criado com sucesso");

      // Fecha o modal e limpa o estado de edição
      closeModal();
      setEditingUser(null);
    })
    .catch(error => {
      // Trata possíveis erros durante a requisição
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível cadastrar");
      }
    });
};
  
  
  async function handleDelete() {
    const confirm = window.confirm("Deseja realmente remover o usuário?")

    if(confirm){
      await api.delete(`/users/${parms.id}`);
      Navigate("/")

    }
  };

  const handleEdit = () => {
  if (selectedRows.length !== 1) {
    return alert("Selecione um usuário para editar.");
  }

  const selectedIndex = selectedRows[0];
  const selectedUser = users[selectedIndex];

  // Verifique se o usuário selecionado está definido
  if (!selectedUser) {
    return alert("Erro: Usuário selecionado não encontrado.");
  }

  // Preencher o formulário com os dados do usuário selecionado
  setFormData((prevData) => ({
    ...prevData,
    nome: selectedUser.nome || '',
    email: selectedUser.email || '',
    telefone: selectedUser.telefone ? selectedUser.telefone.split(', ') : [], // Analise os valores separados por vírgula
    tipoFornecedor: selectedUser.tipoFornecedor || '',
    observacao: selectedUser.observacao || '',
  }));

  // Configurar o estado de edição
  setEditingUser(selectedIndex);

  // Abrir o modal
  openModal();
};

  return (
    <Container>
      <Header />

      <main>
        <Content>
        <section>
          <Button title="Novo" onClick={openModal} />
          <Button icon={<FaEdit />} disabled={selectedRows.length !== 1} onClick={handleEdit} />
          <Button icon={<RiDeleteBin6Line />} disabled={selectedRows.length !== 1} onClick={handleDelete} />
        </section>

        <section>
          <table>
            <thead>
              <tr>
                <th>Check</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefones</th>
                <th>Tipo de Fornecedor</th>
                <th>Observação</th>
                <th>Favorito</th>
              </tr>
            </thead>
          <tbody>
          {users && users.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(index)}
                  onChange={() => toggleRowSelection(index)}
                />
              </td>
              <td>{item.nome || ''}</td>
              <td>{item.email || ''}</td>
              <td>{item.telefone || ''}</td>
              <td>{item.tipoFornecedor || ''}</td>
              <td>{item.observacao || ''}</td>
              <td>
                <button onClick={() => toggleFavorite(index)}>
                     {favoriteRows.includes(index) ?  <FaStar /> : <FaRegStar />}
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </section>
      </Content>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000, 
          },
          content: {
            width: '50%', 
            margin: 'auto', 
            padding: '30px', 
            display:'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap:'19px'
          },
        }}>

        <Button icon={<IoClose />} onClick={closeModal} />
        <h2>Novo Cadastro</h2>
        <form className='ModalStyles'>
          <label>
            Nome:
            <Input
              type="text"
              value={formData.nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              required
            />
          </label>

          <label>
            E-mail:
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onBlur={(e) => validateEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Telefones:
            {formData.telefone.map((telefone, index) => (
              <div key={index}>
                <Input
                  type="number"
                  value={telefone}
                  onChange={(e) => handleTelefoneChange(index, e.target.value)}
                  required
                />
                {index > 0 && (
                  <Button type="button" onClick={() => removeTelefone(index)} icon={<FaTrash />} />
                  
                )}
              </div>
            ))}
            <button type="button" onClick={addTelefone}>
              Adicionar Telefone
            </button>
      </label>

      <label>
        Tipo de Fornecedor:
          <select
            value={formData.tipoFornecedor}
            onChange={(e) => handleInputChange('tipoFornecedor', e.target.value)}
            required
          >
          <option value="">Selecione o tipo</option>
          <option value="atacadista">Atacadista</option>
          <option value="distribuidor">Distribuidor</option>
          <option value="fabricante">Fabricante</option>
          <option value="varejista">Varejista</option>
        </select>
      </label>

      <label>
        Observação:
        <textarea
          value={formData.observacao}
          onChange={(e) => handleInputChange('observacao', e.target.value)}
        />
      </label>

          <Button title="Adicionar" onClick={handleSignUp}/>
        </form>
      </Modal>
      
      </main>
    </Container>
  );
}
