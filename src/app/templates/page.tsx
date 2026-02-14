'use client';

import { useState } from 'react';
import Link from 'next/link';

const templates = [
  {
    category: "Variáveis Comuns",
    items: [
      {
        title: "[NOME]",
        text: "[NOME]",
        description: "Nome do atendente"
      },
      {
        title: "[NUMERO]",
        text: "[NUMERO]",
        description: "Número de protocolo"
      },
      {
        title: "[VALOR]",
        text: "[VALOR]",
        description: "Valor monetário"
      },
      {
        title: "[DATA]",
        text: "[DATA]",
        description: "Data específica"
      },
      {
        title: "[PRAZO]",
        text: "[PRAZO]",
        description: "Prazo de resolução"
      }
    ]
  },
  {
    category: "Respostas Rápidas - Positivas",
    items: [
      {
        title: "Resolvido",
        text: "Pronto! Já resolvi isso para você. Algo mais?",
        description: "Problema solucionado"
      },
      {
        title: "Confirmado",
        text: "Confirmado! Tudo certo por aqui.",
        description: "Confirmação simples"
      },
      {
        title: "Processado",
        text: "Já processado! Em breve estará disponível.",
        description: "Ação processada"
      }
    ]
  },
  {
    category: "Respostas Rápidas - Aguardo",
    items: [
      {
        title: "Um momento",
        text: "Um momento, por favor. Vou verificar isso para você.",
        description: "Pedindo tempo"
      },
      {
        title: "Consultando",
        text: "Estou consultando aqui no sistema...",
        description: "Durante consulta"
      },
      {
        title: "Aguarde análise",
        text: "Sua solicitação está em análise. Retorno em até [PRAZO].",
        description: "Análise em andamento"
      }
    ]
  },
  {
    category: "Respostas Rápidas - Negativas",
    items: [
      {
        title: "Não localizado",
        text: "Não localizei essa informação no sistema. Pode confirmar os dados?",
        description: "Info não encontrada"
      },
      {
        title: "Aguardando terceiros",
        text: "Estamos aguardando retorno de terceiros. Prazo: [PRAZO].",
        description: "Dependência externa"
      },
      {
        title: "Não disponível",
        text: "Infelizmente essa opção não está disponível no momento.",
        description: "Recurso indisponível"
      }
    ]
  },
  {
    category: "Empatia e Cortesia",
    items: [
      {
        title: "Compreensão",
        text: "Entendo perfeitamente sua situação. Vou fazer o possível para ajudar.",
        description: "Demonstrar empatia"
      },
      {
        title: "Desculpas",
        text: "Peço desculpas pelo transtorno. Vamos resolver isso juntos.",
        description: "Pedir desculpas"
      },
      {
        title: "Agradecimento",
        text: "Obrigado(a) pela sua paciência e compreensão.",
        description: "Agradecer"
      },
      {
        title: "Tranquilização",
        text: "Fique tranquilo(a), vou cuidar disso pessoalmente.",
        description: "Tranquilizar cliente"
      }
    ]
  },
  {
    category: "Redirecionamentos",
    items: [
      {
        title: "Transferir setor",
        text: "Vou transferir você para o setor especializado. Um momento, por favor.",
        description: "Transferência"
      },
      {
        title: "Canal alternativo",
        text: "Para essa solicitação, recomendo contato via [CANAL]. Lá será mais rápido.",
        description: "Indicar outro canal"
      },
      {
        title: "Callback",
        text: "Vou solicitar que nosso time entre em contato com você em até [PRAZO].",
        description: "Retorno por ligação"
      }
    ]
  },
  {
    category: "Confirmação de Dados",
    items: [
      {
        title: "Confirmar CPF",
        text: "Por favor, confirme seu CPF: XXX.XXX.XXX-XX está correto?",
        description: "Validar CPF"
      },
      {
        title: "Confirmar endereço",
        text: "Seu endereço cadastrado é [ENDERECO]. Está correto?",
        description: "Validar endereço"
      },
      {
        title: "Confirmar contato",
        text: "Vou enviar para o e-mail [EMAIL] e celular [TELEFONE]. Confirma?",
        description: "Validar contatos"
      }
    ]
  },
  {
    category: "Instruções Técnicas",
    items: [
      {
        title: "Limpar cache",
        text: "Tente limpar o cache do app: Configurações > Apps > [APP] > Limpar cache. Depois, tente novamente.",
        description: "Solução técnica básica"
      },
      {
        title: "Atualizar app",
        text: "Verifique se o app está atualizado na loja. Versão recomendada: [VERSAO].",
        description: "Atualização necessária"
      },
      {
        title: "Logout/Login",
        text: "Faça logout e login novamente no app. Isso geralmente resolve o problema.",
        description: "Reset de sessão"
      }
    ]
  }
];

export default function Templates() {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const copyToClipboard = (text: string, index: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="container">
      <Link href="/" style={{ fontSize: '0.85rem', marginBottom: '1rem', display: 'inline-block' }}>
        ← Voltar
      </Link>
      
      <h1>Templates e Mensagens Prontas</h1>
      <p style={{ marginBottom: '1.5rem', fontSize: '0.85rem', opacity: 0.8 }}>
        Clique para copiar. Use as variáveis entre colchetes nos scripts.
      </p>

      {templates.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <div className="category">{section.category}</div>
          {section.items.map((item, itemIndex) => {
            const uniqueKey = `${sectionIndex}-${itemIndex}`;
            return (
              <div
                key={uniqueKey}
                className="script-box"
                onClick={() => copyToClipboard(item.text, uniqueKey)}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                  {item.title}
                  {copiedIndex === uniqueKey && (
                    <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem' }}>✓ COPIADO</span>
                  )}
                </div>
                <div style={{ opacity: 0.7, fontSize: '0.8rem' }}>
                  {item.text}
                </div>
                {item.description && (
                  <div style={{ opacity: 0.5, fontSize: '0.75rem', marginTop: '0.25rem', fontStyle: 'italic' }}>
                    {item.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
