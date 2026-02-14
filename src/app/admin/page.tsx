'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Script, CreateScriptRequest, UpdateScriptRequest } from '@/types/script';
import { getAllScripts, createScript, updateScript, deleteScript } from '@/lib/api';

const CATEGORIES = [
  { id: 1, name: 'Digio' },
  { id: 2, name: 'Uber Conta' },
  { id: 3, name: 'Templates' }
];

export default function AdminPage() {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingScript, setEditingScript] = useState<Script | null>(null);
  const [filterCategory, setFilterCategory] = useState<number | 'all'>('all');

  // Form state
  const [formData, setFormData] = useState<CreateScriptRequest>({
    name: '',
    description: '',
    content: '',
    author: '',
    category_id: 1
  });

  useEffect(() => {
    loadScripts();
  }, []);

  const loadScripts = async () => {
    try {
      setLoading(true);
      const data = await getAllScripts();
      setScripts(data);
      setError('');
    } catch (err) {
      setError('Erro ao carregar scripts. Verifique se a API está rodando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingScript) {
        await updateScript(editingScript.id, formData as UpdateScriptRequest);
      } else {
        await createScript(formData);
      }
      resetForm();
      await loadScripts();
    } catch (err) {
      setError('Erro ao salvar script');
      console.error(err);
    }
  };

  const handleEdit = (script: Script) => {
    setEditingScript(script);
    setFormData({
      name: script.name,
      description: script.description,
      content: script.content,
      author: script.author,
      category_id: script.category_id
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar este script?')) return;
    try {
      await deleteScript(id);
      await loadScripts();
    } catch (err) {
      setError('Erro ao deletar script');
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      content: '',
      author: '',
      category_id: 1
    });
    setEditingScript(null);
    setShowForm(false);
  };

  const filteredScripts = filterCategory === 'all'
    ? scripts
    : scripts.filter(s => s.category_id === filterCategory);

  return (
    <div className="container" style={{ maxWidth: '1400px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <Link href="/" style={{ fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block' }}>
            ← Voltar
          </Link>
          <h1 style={{ margin: '0.5rem 0' }}>Gerenciar Scripts</h1>
        </div>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Fechar' : '+ Novo Script'}
        </button>
      </div>

      {error && (
        <div style={{ 
          padding: '0.75rem', 
          background: '#300', 
          border: '1px solid #f00', 
          color: '#f00',
          marginBottom: '1rem' 
        }}>
          {error}
        </div>
      )}

      {/* Formulário */}
      {showForm && (
        <div style={{ 
          background: '#111', 
          border: '1px solid #0f0', 
          padding: '1rem', 
          marginBottom: '1.5rem' 
        }}>
          <h2 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#0f0' }}>
            {editingScript ? 'Editar Script' : 'Novo Script'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '0.75rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem' }}>
                Nome/Título
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  background: '#000',
                  border: '1px solid #0f0',
                  color: '#0f0',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem' }}>
                Descrição/Categoria Interna
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  background: '#000',
                  border: '1px solid #0f0',
                  color: '#0f0',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div style={{ marginBottom: '0.75rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem' }}>
                Conteúdo do Script
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                rows={6}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  background: '#000',
                  border: '1px solid #0f0',
                  color: '#0f0',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem' }}>
                  Autor
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    background: '#000',
                    border: '1px solid #0f0',
                    color: '#0f0',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem' }}>
                  Categoria
                </label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: Number(e.target.value) })}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    background: '#000',
                    border: '1px solid #0f0',
                    color: '#0f0',
                    fontFamily: 'inherit'
                  }}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit">
                {editingScript ? 'Atualizar' : 'Criar'}
              </button>
              <button type="button" onClick={resetForm} style={{ background: '#300', borderColor: '#f00', color: '#f00' }}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filtros */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setFilterCategory('all')}
          style={{
            background: filterCategory === 'all' ? '#0f0' : '#000',
            color: filterCategory === 'all' ? '#000' : '#0f0'
          }}
        >
          Todos ({scripts.length})
        </button>
        {CATEGORIES.map(cat => {
          const count = scripts.filter(s => s.category_id === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              style={{
                background: filterCategory === cat.id ? '#0f0' : '#000',
                color: filterCategory === cat.id ? '#000' : '#0f0'
              }}
            >
              {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Lista de Scripts */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Carregando...</div>
      ) : (
        <div>
          <div className="category">
            Scripts Cadastrados ({filteredScripts.length})
          </div>
          {filteredScripts.length === 0 ? (
            <div style={{ padding: '1rem', opacity: 0.5 }}>
              Nenhum script encontrado.
            </div>
          ) : (
            filteredScripts.map(script => (
              <div key={script.id} className="script-box" style={{ cursor: 'default' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                      {script.name}
                      <span style={{ 
                        marginLeft: '0.5rem', 
                        fontSize: '0.75rem', 
                        opacity: 0.6 
                      }}>
                        [{script.category_name}]
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.5rem' }}>
                      {script.description}
                    </div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.5, marginBottom: '0.5rem' }}>
                      {script.content}
                    </div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.4 }}>
                      Por {script.author} • Criado em {new Date(script.created_at).toLocaleString('pt-BR')}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                    <button
                      onClick={() => handleEdit(script)}
                      style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(script.id)}
                      style={{ 
                        padding: '0.25rem 0.75rem', 
                        fontSize: '0.75rem',
                        background: '#300',
                        borderColor: '#f00',
                        color: '#f00'
                      }}
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
