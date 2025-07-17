// components/TiptapEditor.tsx
'use client';

import { useEditor, EditorContent, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import { TextStyleKit } from '@tiptap/extension-text-style';
import { cn } from '@/lib/utils';

export default function TiptapEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) {
  const editor = useEditor({
    extensions: [TextStyleKit, StarterKit],
    content: value,
    autofocus: false,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'min-h-[150px] prose p-3 border rounded focus:outline-none',
        placeholder: placeholder || 'Start typing...',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor?.isActive('bold'),
        isItalic: ctx.editor?.isActive('italic'),
        isBulletList: ctx.editor?.isActive('bulletList'),
        isOrderedList: ctx.editor?.isActive('orderedList'),
        isH1: ctx.editor?.isActive('heading', { level: 1 }),
        isH2: ctx.editor?.isActive('heading', { level: 2 }),
        isH3: ctx.editor?.isActive('heading', { level: 3 }),
        isH4: ctx.editor?.isActive('heading', { level: 4 }),
      };
    },
  });
  if (!editor) return null;

  function handleToggleHeading(level: 1 | 2 | 3 | 4) {
    editor?.chain().focus().toggleHeading({ level }).run();
  }

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 bg-muted/50 border border-border rounded-lg px-2 py-1 mb-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            'px-2 py-1 rounded text-sm transition-colors',
            editorState?.isBold
              ? 'bg-primary/10 text-primary font-semibold'
              : 'hover:bg-accent hover:text-accent-foreground',
          )}
          aria-label="Bold"
        >
          <b>B</b>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            'px-2 py-1 rounded text-sm transition-colors',
            editorState?.isItalic
              ? 'bg-primary/10 text-primary font-semibold italic'
              : 'hover:bg-accent hover:text-accent-foreground',
          )}
          aria-label="Italic"
        >
          <i>I</i>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            'px-2 py-1 rounded text-sm transition-colors',
            editorState?.isBulletList
              ? 'bg-primary/10 text-primary font-semibold'
              : 'hover:bg-accent hover:text-accent-foreground',
          )}
          aria-label="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            'px-2 py-1 rounded text-sm transition-colors',
            editorState?.isOrderedList
              ? 'bg-primary/10 text-primary font-semibold'
              : 'hover:bg-accent hover:text-accent-foreground',
          )}
          aria-label="Ordered List"
        >
          1. List
        </button>
        {/* Heading buttons */}
        {[1, 2, 3, 4].map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => handleToggleHeading(level as 1 | 2 | 3 | 4)}
            className={cn(
              'px-2 py-1 rounded text-sm transition-colors',
              editor.isActive('heading', { level: level as 1 | 2 | 3 | 4 })
                ? 'bg-primary/10 text-primary font-semibold'
                : 'hover:bg-accent hover:text-accent-foreground',
            )}
            aria-label={`Heading ${level}`}
          >
            H{level}
          </button>
        ))}
      </div>

      {/* Editor */}
      <div className="rounded-lg bg-background focus-within:ring-2 focus-within:ring-primary/30 transition-shadow">
        <EditorContent
          editor={editor}
          className="prose dark:prose-invert min-h-[150px]"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
