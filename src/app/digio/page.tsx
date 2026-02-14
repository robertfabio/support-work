'use client';

import { useState } from 'react';
import Link from 'next/link';

const scripts = [
  {
    category: "Boas-vindas e Identificação",
    items: [
      {
        title: "Saudação inicial",
        text: "Olá! Meu nome é [NOME], da equipe de suporte Digio. Como posso ajudá-lo(a) hoje?"
      },
      {
        title: "Confirmação de dados",
        text: "Para sua segurança, vou confirmar alguns dados. Pode me informar seu CPF e data de nascimento?"
      }
    ]
  },
  {
    category: "Cartão de Crédito",
    items: [
      {
        title: "Consulta de fatura",
        text: "Vou consultar sua fatura atual. Sua fatura com vencimento em [DATA] está com o valor de R$ [VALOR]. Gostaria de receber o boleto por e-mail ou SMS?"
      },
      {
        title: "Desbloqueio de cartão",
        text: "Entendo sua situação. Vou desbloquear seu cartão agora mesmo. O desbloqueio será processado em até 15 minutos. Algo mais em que posso ajudar?"
      },
      {
        title: "Aumento de limite",
        text: "Vou verificar a possibilidade de aumento de limite. Seu limite atual é de R$ [VALOR]. Vou submeter uma análise para aumento. A resposta será enviada em até 48h úteis."
      },
      {
        title: "Segunda via de cartão",
        text: "Vou solicitar a segunda via do seu cartão. O novo cartão será entregue no endereço cadastrado em até 10 dias úteis. O cartão atual será bloqueado."
      }
    ]
  },
  {
    category: "Conta Digital",
    items: [
      {
        title: "Consulta de saldo",
        text: "Seu saldo atual é de R$ [VALOR]. Seu limite disponível para saque é de R$ [VALOR_SAQUE]."
      },
      {
        title: "Pix - Problema no envio",
        text: "Vou verificar o que aconteceu com seu Pix. A transferência de R$ [VALOR] para [DESTINATÁRIO] foi [STATUS]. [DETALHES]"
      },
      {
        title: "Recuperação de senha",
        text: "Vou enviar um código para seu e-mail/celular cadastrado para redefinir sua senha. Por favor, verifique e insira o código no aplicativo."
      }
    ]
  },
  {
    category: "Contestações e Fraudes",
    items: [
      {
        title: "Registro de contestação",
        text: "Vou registrar a contestação da transação de R$ [VALOR] realizada em [DATA] no estabelecimento [LOCAL]. Protocolo: [NUMERO]. A análise leva até 7 dias úteis."
      },
      {
        title: "Fraude - Bloqueio imediato",
        text: "Por segurança, vou bloquear seu cartão imediatamente. As transações não reconhecidas serão contestadas automaticamente. Vou solicitar um novo cartão."
      },
      {
        title: "Resultado de contestação",
        text: "Sua contestação protocolo [NUMERO] foi [APROVADA/NEGADA]. [DETALHES_RESULTADO]. O valor será [ESTORNADO/MANTIDO]."
      }
    ]
  },
  {
    category: "Encerramento",
    items: [
      {
        title: "Finalização positiva",
        text: "Foi um prazer ajudá-lo(a)! Seu protocolo de atendimento é [NUMERO]. Caso precise de algo, estamos à disposição. Tenha um ótimo dia!"
      },
      {
        title: "Finalização com pendência",
        text: "Registrei sua solicitação sob o protocolo [NUMERO]. Você receberá atualizações por e-mail/SMS. Prazo de resolução: [PRAZO]. Posso ajudar em algo mais?"
      }
    ]
  }
];

export default function DigioScripts() {
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
      
      <h1>Scripts Digio</h1>
      <p style={{ marginBottom: '1.5rem', fontSize: '0.85rem', opacity: 0.8 }}>
        Clique em qualquer script para copiar
      </p>

      {scripts.map((section, sectionIndex) => (
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
      ))}
    </div>
  );
}
