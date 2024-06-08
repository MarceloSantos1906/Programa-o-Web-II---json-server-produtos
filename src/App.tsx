import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Table from './Table/Table';
import api from './api';
import './App.css';

function App() {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
  });
  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    let newProduct = {
      ...product,
      [e.target.name]: e.target.value,
    };
    setProduct(newProduct);
  };

  async function getProduct() {
    await api.get('/products').then((response) => setProducts(response.data));
  }

  async function onEdit(id) {
    await api.get(`/produtos/${id}`).then((res) => setProduto(res.data));
  }

  function onDelete(id) {
    if (confirm('Deseja excluir ${name} ?')) {
      api
        .delete(`/produtos/${id}`)
        .then((result) => {
          toast.done('Excluído com sucesso.');
          getProdutos();
        })
        .catch((e) => {
          toast.error('Não foi possivel excluir ${name}');
        });
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  const register = () => {
    if (product.name == '') {
      toast.error('Nome  não pode ser vazio');
      return;
    } else if (Number(product.price) <= 0) {
      toast.error('Valor não pode ser negativo');
      return;
    } else if (product.price == '') {
      toast.error('Valor não pode ser vazio');
      return;
    }

    if (product.id) {
      api
        .put('/products/${product.id}', product)
        .then((response) => {
          toast.success('Alterado com sucesso');
          setProduct({ name: '', price: '', description: '' });
          getProduct();
        })
        .catch((e) => {
          toast.error('Erro ao efetuar cadastro');
        });
    } else {
      api
        .post('/products', product)
        .then((response) => {
          toast.success('Cadastrado com sucesso');
          setProduct({ name: '', price: '', description: '' });
          getProduct();
        })
        .catch((e) => {
          toast.error('Erro ao efetuar cadastro');
        });
    }
  };

  return (
    <>
      <div>
        <h2>Cadastro de Produtos</h2>
        <div>
          <label>Nome: </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            defaultValue="tset"
          />
        </div>
        <div>
          <label>Preço: </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            defaultValue="tset"
          />
        </div>
        <div>
          <label>Descição: </label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            defaultValue="tset"
          />
        </div>
        <div>
          <button type="button" onClick={register}>
            Cadastrar
          </button>
        </div>
        <ToastContainer />
      </div>
      <Table itens={products} onEdit={onEdit} onDelete={onDelete} />
    </>
  );
}

export default App;
