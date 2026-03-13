import OpenAI from 'openai'
import { NextRequest, NextResponse } from 'next/server'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const profile = await request.json()

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 1500,
      messages: [
        {
          role: 'system',
          content: `Tu es un coach de vie expert. Crée une routine personnalisée en Markdown avec des sections claires : introduction, semaine type, règles d'or, progression semaine 2. Tutoie l'utilisateur, sois motivant et précis.`
        },
        {
          role: 'user',
          content: `Prénom: ${profile.prenom}, Objectifs: ${profile.categories?.join(', ')}, But: ${profile.objectif}, Niveau: ${profile.niveau}, Temps: ${profile.disponibilite} min/jour, Créneaux: ${profile.creneaux?.join(', ')}, Contraintes: ${profile.contraintes || 'aucune'}. Génère ma routine.`
        }
      ],
    })

    return NextResponse.json({ routine: response.choices[0].message.content })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Impossible de générer la routine. Vérifie ta clé API.' }, { status: 500 })
  }
}
