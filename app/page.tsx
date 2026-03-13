'use client'

import { useState } from 'react'
import Questionnaire from '@/components/Questionnaire'
import RoutineDisplay from '@/components/RoutineDisplay'
import { UserProfile } from '@/lib/types'

type AppState = 'landing' | 'questionnaire' | 'result'

export default function Home() {
  const [appState, setAppState] = useState<AppState>('landing')
  const [routine, setRoutine] = useState<string>('')
  const [prenom, setPrenom] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleStart = () => setAppState('questionnaire')

  const handleSubmit = async (profile: UserProfile) => {
    setIsLoading(true)
    setError(null)
    setPrenom(profile.prenom)

    try {
      const res = await fetch('/api/generate-routine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Erreur serveur')

      setRoutine(data.routine)
      setAppState('result')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setAppState('questionnaire')
    setRoutine('')
    setError(null)
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-terra/5" />
        <div className="absolute top-1/2 -left-48 w-96 h-96 rounded-full bg-sage/8" />
        <div className="absolute -bottom-32 right-1/4 w-64 h-64 rounded-full bg-mist/20" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-4xl mx-auto">
        <button
          onClick={() => setAppState('landing')}
          className="font-display text-xl text-ink hover:text-terra transition-colors"
        >
          Routinely
        </button>
        {appState !== 'landing' && (
          <button
            onClick={() => setAppState('landing')}
            className="text-sm text-ink/50 font-body hover:text-ink transition-colors"
          >
            ← Accueil
          </button>
        )}
      </nav>

      {/* Content */}
      <div className="relative z-10 px-6 pb-20">

        {/* Landing */}
        {appState === 'landing' && (
          <div className="max-w-2xl mx-auto text-center pt-16 md:pt-24">
            <div className="inline-block px-4 py-1.5 rounded-full bg-terra/10 border border-terra/20 text-terra text-xs font-body mb-6 animate-fade-up stagger-1">
              ✨ Propulsé par l'IA · 100% gratuit
            </div>

            <h1 className="font-display text-5xl md:text-6xl text-ink mb-6 leading-tight animate-fade-up stagger-2">
              Ta routine
              <span className="italic text-terra"> parfaite</span>
              <br />en 2 minutes
            </h1>

            <p className="text-ink/60 text-lg font-body mb-10 leading-relaxed animate-fade-up stagger-3">
              Réponds à 5 questions, l'IA génère une routine personnalisée sur mesure —
              sport, productivité, sommeil ou bien-être.
            </p>

            <button
              onClick={handleStart}
              className="px-10 py-4 bg-ink text-cream rounded-full font-body font-medium text-base hover:bg-terra transition-all duration-300 shadow-lg hover:shadow-terra/20 animate-fade-up stagger-4"
            >
              Créer ma routine gratuitement →
            </button>

            {/* Social proof */}
            <div className="mt-12 flex items-center justify-center gap-8 animate-fade-up stagger-5">
              {[
                { emoji: '🏃', label: 'Sport' },
                { emoji: '🧠', label: 'Focus' },
                { emoji: '🌙', label: 'Sommeil' },
                { emoji: '🌿', label: 'Bien-être' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-2xl">{item.emoji}</div>
                  <div className="text-xs text-ink/40 font-body mt-1">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {[
                {
                  icon: '⚡',
                  title: 'Instantané',
                  desc: 'Ta routine générée en moins de 10 secondes.',
                },
                {
                  icon: '🎯',
                  title: 'Personnalisé',
                  desc: 'Adapté à ton niveau, tes objectifs et tes contraintes.',
                },
                {
                  icon: '📋',
                  title: 'Actionnable',
                  desc: 'Des étapes concrètes à commencer dès aujourd\'hui.',
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="p-5 rounded-2xl bg-white/50 border border-ink/6"
                >
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <h3 className="font-body font-medium text-ink mb-1">{feature.title}</h3>
                  <p className="text-ink/50 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Questionnaire */}
        {appState === 'questionnaire' && (
          <div className="max-w-xl mx-auto pt-12">
            <Questionnaire onSubmit={handleSubmit} isLoading={isLoading} />
            {error && (
              <div className="mt-4 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm font-body">
                ⚠️ {error}
              </div>
            )}
          </div>
        )}

        {/* Result */}
        {appState === 'result' && routine && (
          <div className="max-w-2xl mx-auto pt-8">
            <RoutineDisplay routine={routine} prenom={prenom} onReset={handleReset} />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-ink/30 text-xs font-body border-t border-ink/6">
        <p>Routinely · Fait avec ❤️ · 2024</p>
      </footer>
    </main>
  )
}
