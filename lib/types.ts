export type RoutineCategory = 'sport' | 'productivite' | 'sommeil' | 'bienetre'

export type Level = 'debutant' | 'intermediaire' | 'avance'

export type TimeSlot = 'matin' | 'midi' | 'soir' | 'flexible'

export interface UserProfile {
  prenom: string
  categories: RoutineCategory[]
  objectif: string
  niveau: Level
  disponibilite: number // minutes par jour
  creneaux: TimeSlot[]
  contraintes: string // allergies, blessures, etc.
}

export interface RoutineStep {
  time: string
  activity: string
  duration: string
  tip?: string
}

export interface GeneratedRoutine {
  titre: string
  introduction: string
  semaine: {
    jour: string
    steps: RoutineStep[]
  }[]
  conseils: string[]
  progressionSemaine2: string
}
