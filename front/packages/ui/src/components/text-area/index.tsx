import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect } from 'react';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

interface MenuBarProps {
  editor: any;
}

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 p-2 bg-[#FFFFFF] rounded-t-md">
      {/* Histórico */}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="p-x-[4px] w-[30px] h-[30px] flex items-center justify-center hover:bg-[#BABABA] rounded"
      >
        <img src="/assets/images/icons/undo.svg" alt="Desfazer"  className="text-white max-w-none w-[24px] h-auto" />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="p-x-[4px] w-[30px] h-[30px] flex items-center justify-center hover:bg-[#BABABA] rounded"
      >
        <img src="/assets/images/icons/redo.svg" alt="Refazer"  className="text-white max-w-none w-[24px] h-auto" />
      </button>

      {/* Parágrafos */}
      <select
        onChange={(e) => {
          const value = e.target.value;
          if (value === 'paragraph') {
            editor.chain().focus().setParagraph().run();
          } else if (value === 'heading') {
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }
        }}
        value={editor.isActive('heading', { level: 2 }) ? 'heading' : 'paragraph'}
        className="text-black border border-[#BABABA] rounded px-2 py-1 focus:outline-none"
      >
        <option value="paragraph">Parágrafo</option>
        <option value="heading">Título</option>
      </select>

      {/* Formatação de texto */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-x-[4px] w-[30px] h-[30px] flex items-center justify-center hover:bg-[#BABABA] rounded ${
          editor.isActive('bold') ? 'bg-[#BABABA]' : ''
        }`}
      >
        <img src="/assets/images/icons/bold.svg" alt="Negrito"  className="text-white max-w-none w-[24px] h-auto" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-x-[4px] w-[30px] h-[30px] flex items-center justify-center hover:bg-[#BABABA] rounded ${
          editor.isActive('italic') ? 'bg-[#BABABA]' : ''
        }`}
      >
        <img src="/assets/images/icons/italic.svg" alt="Itálico"  className="text-white max-w-none w-[24px] h-auto" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={`p-x-[4px] w-[30px] h-[30px] flex items-center justify-center hover:bg-[#BABABA] rounded ${
          editor.isActive('underline') ? 'bg-[#BABABA]' : ''
        }`}
      >
        <img src="/assets/images/icons/underline.svg" alt="Sublinhado"  className="text-white max-w-none w-[24px] h-auto" />
      </button>

      {/* Links e mídia */}
      <button
        onClick={() => {
          const url = window.prompt('URL:');
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className={`p-x-[4px] w-[30px] h-[30px] flex items-center justify-center hover:bg-[#BABABA] rounded ${
          editor.isActive('link') ? 'bg-[#BABABA]' : ''
        }`}
      >
        <img src="/assets/images/icons/link.svg" alt="Link"  className="text-white max-w-none w-[24px] h-auto" />
      </button>
      <button
        onClick={() => {
          const url = window.prompt('URL da imagem:');
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        className="p-x-[4px] w-[30px] h-[30px] flex items-center justify-center hover:bg-[#BABABA] rounded"
      >
        <img src="/assets/images/icons/image.svg" alt="Imagem"  className="text-white max-w-none w-[24px] h-auto" />
      </button>

      {/* Emojis */}
      <button
        onClick={() => {
          const emoji = window.prompt('Digite um emoji:');
          if (emoji) {
            editor.chain().focus().insertContent(emoji).run();
          }
        }}
        className="p-x-[4px] w-[30px] h-[30px] flex items-center justify-center hover:bg-[#BABABA] rounded"
      >
        <img src="/assets/images/icons/emoji.svg" alt="Emoji"  className="text-white max-w-none w-[24px] h-auto" />
      </button>
    </div>
  );
};

export const TextArea = ({
  value,
  onChange,
  placeholder = "Digite sua resposta",
}: TextAreaProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Underline,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'w-full bg-[#141414] text-white px-4 py-2 min-h-[120px] outline-none rounded-b-md',
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="w-full [&_.ProseMirror_p]:my-1 [&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-4 [&_.ProseMirror_img]:max-w-full [&_.ProseMirror_a]:text-blue-400 [&_.ProseMirror_a]:underline">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
