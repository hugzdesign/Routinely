'use client'

import { useState } from 'react'

interface RoutineDisplayProps {
  routine: string
  prenom: string
  onReset: () => void
}

// Simple markdown to HTML converter for our specific format
function renderMarkdown(text: string): string {
  return text
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/💡 \*(.+?)\*/g, '<span class="tip">💡 $1</span>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="numbered"><span class="num">$1</span> $2</li>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|u|l])/gm, '')
    .trim()
}

export default function RoutineDisplay({ routine, prenom, onReset }: RoutineDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(routine)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-up">
      {/* Header actions */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-ink/40 text-sm font-body">Ta routine personnalisée</p>
          <h2 className="font-display text-2xl text-ink">Prêt à démarrer, {prenom} ! 🎯</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-full border-2 border-ink/15 text-ink/60 text-sm font-body hover:border-ink/30 transition-colors"
          >
            {copied ? '✓ Copié' : '📋 Copier'}
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-full border-2 border-ink/15 text-ink/60 text-sm font-body hover:border-ink/30 transition-colors print:hidden"
          >
            🖨️ Imprimer
          </button>
        </div>
      </div>

      {/* Routine card */}
      <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-ink/8 p-8 shadow-sm">
        <div
          className="routine-output"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(routine) }}
        />
      </div>

      {/* Tip card */}
      <div className="mt-4 p-4 rounded-2xl bg-sage/10 border border-sage/20">
        <p className="text-sage text-sm font-body">
          <strong>💡 Conseil :</strong> Commence par seulement 2 habitudes cette semaine. La constance prime sur la perfection.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={onReset}
          className="flex-1 py-3 rounded-full border-2 border-ink/20 text-ink/70 font-body text-sm hover:border-ink/40 transition-colors"
        >
          ← Refaire le questionnaire
        </button>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-6 py-3 rounded-full bg-terra text-white font-body text-sm hover:bg-terra/90 transition-colors"
        >
          ↑ Haut de page
        </button>
      </div>

      {/* Share nudge */}
      <div className="mt-6 p-5 rounded-2xl bg-ink/3 border border-ink/8 text-center">
        <p className="text-ink/50 text-sm font-body">
          Tu aimes ta routine ? Partage <strong className="text-ink/70">Routinely</strong> avec un ami 🙌
        </p>
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'Routinely — Ma routine IA',
                text: 'J\'ai généré ma routine perso avec l\'IA, c\'est top !',
                url: window.location.href,
              })
            } else {
              handleCopy()
            }
          }}
          className="mt-2 text-terra text-sm font-medium underline underline-offset-2"
        >
          Partager le lien
        </button>
      </div>
    </div>
  )
}
