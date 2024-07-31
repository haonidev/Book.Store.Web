import React, { useState } from 'react';

function Assunto() {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjects, setSubjects] = useState([
    { id: 1, description: 'Matemática' },
    { id: 2, description: 'Física' },
    // Adicione mais assuntos conforme necessário
  ]);

  const handleSearch = () => {
    // Lógica de pesquisa aqui
  };

  const handleEdit = (id) => {
    // Lógica de edição aqui
  };

  const handleDelete = (id) => {
    // Lógica de exclusão aqui
  };

  return (
    <div>
      <h1>Assunto</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Pesquisar assunto"
      />
      <button onClick={handleSearch}>Pesquisar</button>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.id}>
              <td>{subject.description}</td>
              <td>
                <button onClick={() => handleEdit(subject.id)}>Editar</button>
                <button onClick={() => handleDelete(subject.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Assunto;