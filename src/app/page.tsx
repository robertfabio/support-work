import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <h1>Scripts de Atendimento - Digio</h1>
      <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Selecione a categoria de scripts abaixo:
      </p>

      <div className="category">DIGIO - Scripts Gerais</div>
      <Link href="/digio" className="script-box" style={{ display: 'block' }}>
        → Scripts de Atendimento Digio
      </Link>

      <div className="category">UBER CONTA - Scripts</div>
      <Link href="/uber-conta" className="script-box" style={{ display: 'block' }}>
        → Scripts de Atendimento Uber Conta
      </Link>

      <div className="category">TEMPLATES RÁPIDOS</div>
      <Link href="/templates" className="script-box" style={{ display: 'block' }}>
        → Templates e Mensagens Prontas
      </Link>
    </div>
  );
}
