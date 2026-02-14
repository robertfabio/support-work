'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getScriptsByCategory } from '@/lib/api';
import { Script } from '@/types/script';

const scripts = [
  {
    category: "Identificação e Abertura",
    items: [
      {
        title: "Saudação Uber Conta",
        text: "Olá! Meu nome é [NOME], da equipe Uber Conta (Digio). Como posso ajudá-lo(a) hoje com sua conta?"
      },
      {
        title: "Validação de identidade",
        text: "Para sua segurança, vou validar sua identidade. Por favor, confirme seu CPF e e-mail cadastrado na Uber."
      }
    ]
  },
  {
    category: "Conta e Saldo",
    items: [
      {
        title: "Consulta de saldo",
        text: "Seu saldo disponível na Uber Conta é de R$ [VALOR]. Seu limite total é de R$ [LIMITE]."
      },
      {
        title: "Extrato detalhado",
        text: "Vou listar suas últimas transações: [LISTAR_TRANSACOES]. Para receber o extrato completo, posso enviar por e-mail."
      },
      {
        title: "Recarga de conta",
        text: "Você pode fazer recarga via Pix, TED ou boleto bancário. Qual método prefere? O valor estará disponível em [TEMPO_PROCESSAMENTO]."
      }
    ]
  },
  {
    category: "Viagens e Pagamentos",
    items: [
      {
        title: "Cobrança incorreta",
        text: "Vou verificar a viagem de [DATA] no valor de R$ [VALOR]. [DETALHES_VIAGEM]. Vou abrir uma contestação se necessário."
      },
      {
        title: "Pagamento com Uber Conta",
        text: "Sua viagem foi paga com saldo da Uber Conta. Valor da viagem: R$ [VALOR]. Saldo restante: R$ [SALDO_RESTANTE]."
      },
      {
        title: "Problema no pagamento",
        text: "Identifiquei que houve um problema no pagamento da viagem [ID_VIAGEM]. Vou ajustar isso para você. [AÇÃO_TOMADA]."
      }
    ]
  },
  {
    category: "Cashback e Benefícios",
    items: [
      {
        title: "Consulta de cashback",
        text: "Você acumulou R$ [VALOR] em cashback este mês. O cashback é creditado automaticamente até o dia [DATA]."
      },
      {
        title: "Resgate de cashback",
        text: "Seu cashback disponível para resgate é de R$ [VALOR]. Posso creditar diretamente na sua Uber Conta agora."
      },
      {
        title: "Promoções ativas",
        text: "Você tem as seguintes promoções ativas: [LISTAR_PROMOCOES]. Válidas até [DATA_VALIDADE]."
      }
    ]
  },
  {
    category: "Uber Motorista - Saques",
    items: [
      {
        title: "Consulta de ganhos",
        text: "Seus ganhos disponíveis para saque são de R$ [VALOR]. Última atualização: [DATA_HORA]."
      },
      {
        title: "Solicitação de saque",
        text: "Vou processar o saque de R$ [VALOR] para sua conta bancária [BANCO] ag [AGENCIA] cc [CONTA]. O valor estará disponível em [PRAZO]."
      },
      {
        title: "Saque não creditado",
        text: "Vou verificar o saque de R$ [VALOR] solicitado em [DATA]. Status: [STATUS]. [INFORMACOES_ADICIONAIS]."
      }
    ]
  },
  {
    category: "Problemas Técnicos",
    items: [
      {
        title: "App não reconhece pagamento",
        text: "Vou sincronizar sua conta manualmente. Isso pode levar alguns minutos. Tente fazer logout e login novamente no app após 5 minutos."
      },
      {
        title: "Erro ao adicionar saldo",
        text: "Identifiquei um erro técnico. Vou criar um chamado para o time técnico. Protocolo: [NUMERO]. Resolução em até 24h."
      },
      {
        title: "Conta bloqueada/suspensa",
        text: "Vejo que sua conta está [STATUS]. Motivo: [MOTIVO]. Vou [AÇÃO]. Isso será resolvido em até [PRAZO]."
      }
    ]
  },
  {
    category: "Encerramento",
    items: [
      {
        title: "Finalização padrão",
        text: "Foi um prazer ajudá-lo(a)! Protocolo: [NUMERO]. Qualquer dúvida, estamos à disposição. Boas viagens!"
      },
      {
        title: "Finalização com follow-up",
        text: "Sua solicitação foi registrada (protocolo [NUMERO]). Você receberá atualizações por [E-MAIL/SMS/APP]. Prazo: [PRAZO]. Precisando, é só chamar!"
      }
    ]
  }
];

export default function UberContaScripts() {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [apiScripts, setApiScripts] = useState<Script[]>([]);
  const [useApi, setUseApi] = useState(false);

  useEffect(() => {
    // Tentar carregar da API (categoria 2 = Uber Conta)
    getScriptsByCategory(2)
      .then(data => {
        if (data && data.length > 0) {
          setApiScripts(data);
          setUseApi(true);
        }
      })
      .catch(() => {
        setUseApi(false);
      });
  }, []);

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
      
      <h1>Scripts Uber Conta</h1>
      <p style={{ marginBottom: '1.5rem', fontSize: '0.85rem', opacity: 0.8 }}>
        Clique em qualquer script para copiar
        {useApi && <span style={{ marginLeft: '0.5rem', color: '#0f0' }}>● API Conectada</span>}
      </p>

      {useApi && apiScripts.length > 0 ? (
        <>
          <div className="category">Scripts do Banco de Dados</div>
          {apiScripts.map((script) => (
            <div
              key={script.id}
              className="script-box"
              onClick={() => copyToClipboard(script.content, `api-${script.id}`)}
            >
              <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                {script.name}
                {copiedIndex === `api-${script.id}` && (
                  <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem' }}>✓ COPIADO</span>
                )}
              </div>
              <div style={{ opacity: 0.6, fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                {script.description}
              </div>
              <div style={{ opacity: 0.7, fontSize: '0.8rem' }}>
                {script.content}
              </div>
            </div>
          ))}
        </>
      ) : (
        scripts.map((section, sectionIndex) => (
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
              </div>
            );
          })}
        </div>
      ))
      )}
    </div>
  );
}
