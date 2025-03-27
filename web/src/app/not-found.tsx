import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto bg-black min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-4xl font-montserrat font-bold mb-6 text-[#ffff00]">
        Página não encontrada
      </h2>
      
      <div className="bg-zinc-900 rounded-lg p-8 w-full max-w-2xl shadow-lg border border-zinc-800">
        <div className="text-center mb-8">
          <p className="text-6xl font-bold text-[#ffff00] mb-4">404</p>
          <p className="text-zinc-400 text-lg">
            A página que você está procurando não existe ou foi removida.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Link 
            href="/"
            className="bg-[#ffff00] hover:bg-[#cccc00] text-black font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
