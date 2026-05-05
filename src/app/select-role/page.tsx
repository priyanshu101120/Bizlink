
'use client'
import supabase from '@/supabase/supabase'
import { useRouter } from 'next/navigation'

export default function SelectRole() {
  const router = useRouter()

  const handleRole = async (role: 'retailer' | 'wholesaler') => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    
    await supabase.from('profiles').upsert({
      id: user.id,
      name: user.user_metadata?.full_name || user.email,
      email: user.email,
      role,
    })

    router.push(role === 'retailer' ? '/retailer-dashboard' : '/wholesaler-dashboard')
  }

  return (
    <div className="min-h-screen bg-[#eaebed] flex items-center justify-center">
      <div className="bg-white rounded-2xl p-10 shadow-xl text-center max-w-sm w-full">
        <h2 className="text-2xl font-black mb-2">Aap kaun hain?</h2>
        <p className="text-gray-400 text-sm mb-8">Apna role select karein</p>
        <div className="space-y-3">
          <button
            onClick={() => handleRole('wholesaler')}
            className="w-full bg-[#006989] text-white py-3 rounded-xl font-bold hover:brightness-110 transition"
          >
            🏭 Wholesaler
          </button>
          <button
            onClick={() => handleRole('retailer')}
            className="w-full border-2 border-[#006989] text-[#006989] py-3 rounded-xl font-bold hover:bg-[#006989]/5 transition"
          >
            🛒 Retailer
          </button>
        </div>
      </div>
    </div>
  )
}