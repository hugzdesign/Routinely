'use client'

import { useState } from 'react'
import { UserProfile, RoutineCategory, Level, TimeSlot } from '@/lib/types'

interface QuestionnaireProps {
  onSubmit: (profile: UserProfile) => void
  isLoading: boolean
}

const CATEGORIES: { value: RoutineCategory; label: string; emoji: string; desc: string }[] = [
  { value: 'sport', label: 'Sport & fitness', emoji: '🏃', desc: 'Cardio, musculation, mobilité' },
  { value: 'productivite', label: 'Productivité', emoji: '🧠', desc: 'Focus, deep work, organisation' },
  { value: 'sommeil', label: 'Sommeil', emoji: '🌙', desc: 'Récupération, qualité du repos' },
  { value: 'bienetre', label: 'Bien-être', emoji: '🌿', desc: 'Stress, méditation, équilibre' },
]

const NIVEAUX: { value: Level; label: string; desc: string }[] = [
  { value: 'debutant', label: 'Débutant', desc: 'Je commence, besoin de bases solides' },
  { value: 'intermediaire', label: 'Intermédiaire', desc: 'J\'ai déjà quelques habitudes' },
  { value: 'avance', label: 'Avancé', desc: 'Je veux optimiser ma routine existante' },
]

const CRENEAUX: { value: TimeSlot; label: string; emoji: string }[] = [
  { value: 'matin', label: 'Matin', emoji: '🌅' },
  { value: 'midi', label: 'Midi', emoji: '☀️' },
  { value: 'soir', label: 'Soir', emoji: '🌆' },
  { value: 'flexible', label: 'Flexible', emoji: '🔄' },
]

export default function Questionnaire({ onSubmit, isLoading }: QuestionnaireProps) {
  const [step, setStep] = useState(0)
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    categories: [],
    creneaux: [],
    niveau: 'debutant',
    disponibilite: 30,
    contraintes: '',
  })

  const totalSteps = 5
  const progress = ((step + 1) / totalSteps) * 100

  const toggleCategory = (cat: RoutineCategory) => {
    const current = profile.categories || []
    if (current.includes(cat)) {
      setProfile({ ...profile, categories: current.filter((c) => c !== cat) })
    } else {
      setProfile({ ...profile, categories: [...current, cat] })
    }
  }

  const toggleCreneau = (slot: TimeSlot) => {
    const current = profile.creneaux || []
    if (current.includes(slot)) {
      setProfile({ ...profile, creneaux: current.filter((c) => c !== slot) })
    } else {
      setProfile({ ...profile, creneaux: [...current, slot] })
    }
  }

  const canNext = () => {
    if (step === 0) return profile.prenom && profile.prenom.trim().length > 0
    if (step === 1) return (profile.categories?.length ?? 0) > 0
    if (step === 2) return profile.objectif && profile.objectif.trim().length > 0
    if (step === 3) return profile.niveau
    if (step === 4) return (profile.creneaux?.length ?? 0) > 0
    return true
  }

  const handleSubmit = () => {
    onSubmit(profile as UserProfile)
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-ink/40 mb-2 font-body">
          <span>Étape {step + 1} / {totalSteps}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1 bg-ink/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-terra rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="min-h-[360px] flex flex-col justify-between">
        
        {/* Step 0 — Prénom */}
        {step === 0 && (
          <div className="animate-fade-up">
            <h2 className="font-display text-3xl text-ink mb-2">Bonjour ! 👋</h2>
            <p className="text-ink/60 mb-8 font-body">Comment tu t'appelles ?</p>
            <input
              type="text"
              placeholder="Ton prénom"
              value={profile.prenom || ''}
              onChange={(e) => setProfile({ ...profile, prenom: e.target.value })}
              className="w-full bg-transparent border-b-2 border-ink/20 focus:border-terra outline-none text-2xl font-display py-3 text-ink placeholder:text-ink/25 transition-colors"
              onKeyDown={(e) => e.key === 'Enter' && canNext() && setStep(1)}
              autoFocus
            />
          </div>
        )}

        {/* Step 1 — Catégories */}
        {step === 1 && (
          <div className="animate-fade-up">
            <h2 className="font-display text-3xl text-ink mb-2">Sur quoi tu veux travailler ?</h2>
            <p className="text-ink/60 mb-6 font-body">Choisis un ou plusieurs domaines.</p>
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map((cat) => {
                const selected = profile.categories?.includes(cat.value)
                return (
                  <button
                    key={cat.value}
                    onClick={() => toggleCategory(cat.value)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                      selected
                        ? 'border-terra bg-terra/10'
                        : 'border-ink/10 bg-white/40 hover:border-ink/30'
                    }`}
                  >
                    <div className="text-2xl mb-1">{cat.emoji}</div>
                    <div className="font-body font-500 text-ink text-sm font-medium">{cat.label}</div>
                    <div className="text-ink/50 text-xs mt-0.5">{cat.desc}</div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 2 — Objectif */}
        {step === 2 && (
          <div className="animate-fade-up">
            <h2 className="font-display text-3xl text-ink mb-2">Ton objectif principal ?</h2>
            <p className="text-ink/60 mb-6 font-body">Sois précis, ça aide à personnaliser ta routine.</p>
            <textarea
              placeholder="Ex : perdre 5kg d'ici l'été, me lever à 6h, arrêter de procrastiner..."
              value={profile.objectif || ''}
              onChange={(e) => setProfile({ ...profile, objectif: e.target.value })}
              rows={4}
              className="w-full bg-white/40 border-2 border-ink/10 focus:border-terra outline-none font-body text-ink placeholder:text-ink/30 p-4 rounded-2xl resize-none transition-colors text-base"
              autoFocus
            />
            <div className="mt-4">
              <p className="text-ink/50 text-sm mb-2">Contraintes ou précisions (optionnel)</p>
              <input
                type="text"
                placeholder="Ex : genou fragile, pas le matin, végétarien..."
                value={profile.contraintes || ''}
                onChange={(e) => setProfile({ ...profile, contraintes: e.target.value })}
                className="w-full bg-white/40 border-2 border-ink/10 focus:border-terra outline-none font-body text-ink placeholder:text-ink/30 p-3 rounded-xl transition-colors text-sm"
              />
            </div>
          </div>
        )}

        {/* Step 3 — Niveau */}
        {step === 3 && (
          <div className="animate-fade-up">
            <h2 className="font-display text-3xl text-ink mb-2">Ton niveau actuel ?</h2>
            <p className="text-ink/60 mb-6 font-body">Pour adapter l'intensité de ta routine.</p>
            <div className="space-y-3">
              {NIVEAUX.map((niveau) => (
                <button
                  key={niveau.value}
                  onClick={() => setProfile({ ...profile, niveau: niveau.value })}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-200 flex justify-between items-center ${
                    profile.niveau === niveau.value
                      ? 'border-terra bg-terra/10'
                      : 'border-ink/10 bg-white/40 hover:border-ink/30'
                  }`}
                >
                  <div>
                    <div className="font-medium text-ink text-sm">{niveau.label}</div>
                    <div className="text-ink/50 text-xs mt-0.5">{niveau.desc}</div>
                  </div>
                  {profile.niveau === niveau.value && (
                    <div className="w-5 h-5 rounded-full bg-terra flex items-center justify-center text-white text-xs">✓</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4 — Temps & créneaux */}
        {step === 4 && (
          <div className="animate-fade-up">
            <h2 className="font-display text-3xl text-ink mb-2">Ton temps & tes créneaux</h2>
            <p className="text-ink/60 mb-6 font-body">On s'adapte à ton emploi du temps.</p>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-ink/70 font-medium">Temps disponible par jour</span>
                <span className="text-sm text-terra font-medium">{profile.disponibilite} min</span>
              </div>
              <input
                type="range"
                min={15}
                max={120}
                step={15}
                value={profile.disponibilite}
                onChange={(e) => setProfile({ ...profile, disponibilite: parseInt(e.target.value) })}
                className="w-full accent-terra"
              />
              <div className="flex justify-between text-xs text-ink/30 mt-1">
                <span>15 min</span>
                <span>2h</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-ink/70 font-medium mb-3">Créneaux préférés</p>
              <div className="grid grid-cols-4 gap-2">
                {CRENEAUX.map((creneau) => {
                  const selected = profile.creneaux?.includes(creneau.value)
                  return (
                    <button
                      key={creneau.value}
                      onClick={() => toggleCreneau(creneau.value)}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        selected
                          ? 'border-terra bg-terra/10'
                          : 'border-ink/10 bg-white/40 hover:border-ink/30'
                      }`}
                    >
                      <div className="text-xl mb-1">{creneau.emoji}</div>
                      <div className="text-xs text-ink font-medium">{creneau.label}</div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 rounded-full border-2 border-ink/20 text-ink/60 font-body text-sm hover:border-ink/40 transition-colors"
            >
              ← Retour
            </button>
          )}
          {step < totalSteps - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canNext()}
              className="flex-1 py-3 rounded-full bg-ink text-cream font-body text-sm font-medium hover:bg-ink/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Continuer →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canNext() || isLoading}
              className="flex-1 py-4 rounded-full bg-terra text-white font-body text-sm font-medium hover:bg-terra/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin">⟳</span>
                  Génération en cours...
                </>
              ) : (
                '✨ Générer ma routine'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
