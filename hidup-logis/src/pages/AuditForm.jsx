import { useState, useEffect, memo } from 'react'
import FloatingLines from '../components/FloatingLines'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'

// Memoize FloatingLines
const MemoizedFloatingLines = memo(() => (
  <FloatingLines
    enabledWaves={["top", "middle", "bottom"]}
    lineCount={6}
    lineDistance={5}
    bendRadius={5}
    bendStrength={-0.5}
    interactive={true}
    parallax={true}
    linesGradient={['#5b13ec', '#8b5cf6', '#a78bfa']}
    mixBlendMode="screen"
  />
));

MemoizedFloatingLines.displayName = 'MemoizedFloatingLines';

function AuditForm() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    salary: '',
    housing: '',
    food: '',
    transport: '',
    workHours: '',
    savingsTarget: ''
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [limitInfo, setLimitInfo] = useState(null)
  const [canAudit, setCanAudit] = useState(true)

  // Format angka dengan titik sebagai separator ribuan
  const formatRupiah = (angka) => {
    if (!angka) return ''
    // Hapus semua karakter non-digit
    const numberString = angka.toString().replace(/[^,\d]/g, '')
    const split = numberString.split(',')
    const sisa = split[0].length % 3
    let rupiah = split[0].substr(0, sisa)
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi)

    if (ribuan) {
      const separator = sisa ? '.' : ''
      rupiah += separator + ribuan.join('.')
    }

    return split[1] !== undefined ? rupiah + ',' + split[1] : rupiah
  }

  // Remove format untuk get pure number
  const removeFormat = (formatted) => {
    if (!formatted) return ''
    return formatted.toString().replace(/\./g, '')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // List field yang perlu formatting
    const rupiahFields = ['salary', 'housing', 'food', 'transport']
    
    if (rupiahFields.includes(name)) {
      // Remove format dulu, baru simpan pure number
      const pureNumber = removeFormat(value)
      setFormData(prev => ({
        ...prev,
        [name]: pureNumber
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  useEffect(() => {
    checkAuditLimit()
  }, [])

  const checkAuditLimit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/check-limit')
      const result = await response.json()
      
      if (result.success) {
        setLimitInfo(result.data)
        setCanAudit(result.data.canAudit)
        
        if (!result.data.canAudit && !result.data.isPremium) {
          setError(`Limit audit gratis bulan ini habis (${result.data.used}/${result.data.limit}). Upgrade ke Premium untuk melanjutkan.`)
        }
      }
    } catch (error) {
      console.log('⚠️ Tidak bisa cek limit, lanjut mode development')
      setCanAudit(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!canAudit && limitInfo && !limitInfo.isPremium) {
      setError(`Limit audit gratis sudah habis (${limitInfo.used}/${limitInfo.limit}). Upgrade ke Premium untuk melanjutkan.`)
      return
    }
    
    if (!formData.salary || !formData.housing) {
      setError('Harap isi gaji dan biaya tempat tinggal')
      return
    }
    
    setIsLoading(true)
    setError('')
    
    try {
      const payload = {
        salary: parseFloat(formData.salary),
        livingCost: parseFloat(formData.housing),
        foodCost: parseFloat(formData.food),
        transportCost: parseFloat(formData.transport),
        workingHours: parseFloat(formData.workHours),
        savingsTarget: parseFloat(formData.savingsTarget)
      }
      
      console.log('📤 Mengirim data ke backend:', payload)
      
      const response = await fetch('http://localhost:5000/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      
      const result = await response.json();
      console.log('📥 Response dari backend:', result)
      
      if (response.status === 429) {
        setError(result.userMessage || result.message)
        setCanAudit(false)
        if (result.limitInfo) {
          setLimitInfo(result.limitInfo)
        }
        return
      }
      
      if (!response.ok) {
        throw new Error(result.message || 'Terjadi kesalahan')
      }
      
      if (result.success) {
        if (result.limitInfo) {
          setLimitInfo(result.limitInfo)
          setCanAudit(result.limitInfo.canAudit)
        }
        
        navigate('/results', { 
          state: { 
            formData: formData,
            auditResult: result.data,
            limitInfo: result.limitInfo
          }
        })
      } else {
        setError(result.error || 'Terjadi kesalahan saat memproses audit')
      }
      
    } catch (error) {
      console.error('❌ Error:', error)
      setError(error.message || 'Gagal menghubungi server. Pastikan backend berjalan di port 5000.')
    } finally {
      setIsLoading(false)
    }
  }

  // Calculate progress
  const filledFields = Object.values(formData).filter(v => v !== '').length
  const totalFields = Object.keys(formData).length
  const progress = Math.round((filledFields / totalFields) * 100)

  return (
    <div className="min-h-screen bg-[#0a0a0c] font-display text-white selection:bg-primary/30 overflow-x-hidden">
      {/* FloatingLines Background */}
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        zIndex: 0,
        pointerEvents: 'auto'
      }}>
        <MemoizedFloatingLines />
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-[#0a0a0c]/95 border border-primary/40 backdrop-blur-xl rounded-3xl p-12 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              {/* Spinner with glow */}
              <div className="relative mb-8">
                <div className="w-20 h-20 border-4 border-primary/20 rounded-full"></div>
                <div className="absolute top-0 left-0 w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-lg shadow-primary/50"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="material-symbols-outlined text-primary text-3xl animate-pulse">analytics</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-black text-white mb-3">Menganalisis Keputusan</h3>
              <p className="text-white/60 mb-6 leading-relaxed">Menghitung skor finansial, waktu, dan sustainability...</p>
              
              {/* Progress steps */}
              <div className="w-full space-y-2 text-left">
                <div className="flex items-center gap-3 text-sm">
                  <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-white/70">✓ Memvalidasi input</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="size-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <span className="text-white/70">Menghitung Financial Score...</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="size-2 bg-white/30 rounded-full"></div>
                  <span className="text-white/40">Menghitung Time & Sustainability...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <main className="relative">
          
          {/* Hero Section with Form */}
          <section className="relative px-6 pt-32 pb-24">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-12 gap-12">
                
                {/* Left Side - Content & Info */}
                <div className="lg:col-span-5 space-y-8">
                  
                  {/* Title */}
                  <div className="animate-fade-in-up stagger-1">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
                      <span className="material-symbols-outlined text-primary text-sm">fact_check</span>
                      <span className="text-sm font-semibold text-white/80">Decision Audit</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl font-black leading-[1.05] mb-6">
                      <span className="block text-white">Audit</span>
                      <span className="block bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">Keputusan Kerja</span>
                    </h1>
                    
                    <p className="text-lg text-white/60 leading-relaxed">
                      Masukkan data finansial untuk menganalisis kelayakan keputusan secara matematis dan objektif.
                    </p>
                  </div>

                  {/* Progress Indicator */}
                  <div className="animate-fade-in-up stagger-2">
                    <div className="bg-[#0a0a0c]/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-white">Progress Pengisian</span>
                        <span className="text-sm font-bold text-primary">{progress}%</span>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-4">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/50">
                        <span className="material-symbols-outlined text-sm">info</span>
                        <span>{filledFields} dari {totalFields} field terisi</span>
                      </div>
                    </div>
                  </div>

                  {/* Limit Info Banner */}
                  {limitInfo && (
                    <div className={`animate-fade-in-up stagger-3 rounded-2xl p-6 border ${
                      limitInfo.isPremium
                        ? 'bg-gradient-to-br from-primary/20 to-purple-500/10 border-primary/30'
                        : limitInfo.canAudit 
                        ? 'bg-green-500/10 border-green-500/30' 
                        : 'bg-yellow-500/10 border-yellow-500/30'
                    } shadow-xl`}>
                      <div className="flex items-start gap-4">
                        <div className={`size-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          limitInfo.isPremium
                            ? 'bg-primary/30'
                            : limitInfo.canAudit
                            ? 'bg-green-500/20'
                            : 'bg-yellow-500/20'
                        }`}>
                          <span className={`material-symbols-outlined text-2xl ${
                            limitInfo.isPremium
                              ? 'text-primary'
                              : limitInfo.canAudit 
                              ? 'text-green-400' 
                              : 'text-yellow-400'
                          }`}>
                            {limitInfo.isPremium ? 'workspace_premium' : limitInfo.canAudit ? 'check_circle' : 'warning'}
                          </span>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-bold text-white mb-1">
                            {limitInfo.isPremium ? '⭐ Premium User' : 
                             limitInfo.canAudit ? 'Audit Gratis Tersedia' : 'Limit Gratis Habis'}
                          </h3>
                          <p className="text-sm text-white/70 mb-3">
                            {limitInfo.isPremium 
                              ? 'Akses audit tanpa batas dan fitur premium lengkap'
                              : `Kamu punya ${limitInfo.remaining} dari ${limitInfo.limit} audit gratis bulan ini`
                            }
                          </p>
                          
                          {!limitInfo.isPremium && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs text-white/60">
                                <span>Audit digunakan</span>
                                <span className="font-bold">{limitInfo.used}/{limitInfo.limit}</span>
                              </div>
                              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    limitInfo.remaining > 0 ? 'bg-green-500' : 'bg-yellow-500'
                                  }`}
                                  style={{ width: `${(limitInfo.used / limitInfo.limit) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {!limitInfo.isPremium && (
                          <a 
                            href="/pricing" 
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-lg transition-all hover:scale-105"
                          >
                            <span>Upgrade</span>
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Info Cards - Stacked */}
                  <div className="space-y-4 animate-fade-in-up stagger-4">
                    <div className="bg-[#0a0a0c]/85 backdrop-blur-xl border border-white/20 rounded-xl p-4 hover:border-primary/50 transition-all">
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary text-xl flex-shrink-0">speed</span>
                        <div>
                          <p className="text-sm font-bold text-white mb-1">Cepat & Mudah</p>
                          <p className="text-xs text-white/60">Selesai dalam 2 menit</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#0a0a0c]/85 backdrop-blur-xl border border-white/20 rounded-xl p-4 hover:border-purple-500/50 transition-all">
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-purple-400 text-xl flex-shrink-0">lock</span>
                        <div>
                          <p className="text-sm font-bold text-white mb-1">100% Private</p>
                          <p className="text-xs text-white/60">Data tidak disimpan di server</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#0a0a0c]/85 backdrop-blur-xl border border-white/20 rounded-xl p-4 hover:border-green-500/50 transition-all">
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-green-400 text-xl flex-shrink-0">verified</span>
                        <div>
                          <p className="text-sm font-bold text-white mb-1">Objektif & Netral</p>
                          <p className="text-xs text-white/60">Berbasis matematis, bukan opini</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Form */}
                <div className="lg:col-span-7 animate-fade-in-up stagger-2">
                  
                  {/* Error Message */}
                  {error && (
                    <div className={`mb-6 rounded-xl p-5 border ${
                      error.includes('Limit') 
                        ? 'bg-yellow-500/10 border-yellow-500/30' 
                        : 'bg-red-500/10 border-red-500/30'
                    } animate-fade-in`}>
                      <div className="flex items-start gap-3">
                        <span className={`material-symbols-outlined ${
                          error.includes('Limit') ? 'text-yellow-400' : 'text-red-400'
                        } flex-shrink-0`}>
                          {error.includes('Limit') ? 'warning' : 'error'}
                        </span>
                        <div className="flex-1">
                          <p className={`font-bold mb-1 ${
                            error.includes('Limit') ? 'text-yellow-300' : 'text-red-300'
                          }`}>
                            {error}
                          </p>
                          {error.includes('Limit') && !limitInfo?.isPremium && (
                            <a 
                              href="/pricing" 
                              className="inline-flex items-center gap-1 text-yellow-300 underline text-sm mt-2"
                            >
                              Upgrade ke Premium untuk audit tanpa batas
                              <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Form Card */}
                  <div 
                    className={`bg-[#0a0a0c]/90 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-10 shadow-2xl ${
                      !canAudit && !limitInfo?.isPremium ? 'opacity-60' : ''
                    }`}
                    style={{
                      background: 'linear-gradient(135deg, rgba(91, 19, 236, 0.05) 0%, rgba(10, 10, 12, 0.95) 100%)'
                    }}
                  >
                    <form onSubmit={handleSubmit} className="space-y-6">
                      
                      {/* Gaji Bersih */}
                      <div className="group">
                        <label className="flex items-center justify-between text-sm font-bold text-white mb-3">
                          <span className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-lg">account_balance_wallet</span>
                            Gaji Bersih per Bulan
                            <span className="text-primary ml-1">*</span>
                          </span>
                          <span className="text-xs text-white/40 font-normal">Take-home pay</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50 font-bold text-lg">Rp</span>
                          <input
                            type="text"
                            name="salary"
                            value={formatRupiah(formData.salary)}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/20 rounded-xl pl-14 pr-5 py-4 text-white text-lg placeholder-white/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all disabled:opacity-50 group-hover:border-white/30"
                            placeholder="5.000.000"
                            required
                            disabled={isLoading || (!canAudit && !limitInfo?.isPremium)}
                          />
                        </div>
                      </div>

                      {/* Grid 2 Kolom untuk Desktop */}
                      <div className="grid md:grid-cols-2 gap-6">
                        
                        {/* Biaya Tempat Tinggal */}
                        <div className="group">
                          <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                            <span className="material-symbols-outlined text-purple-400 text-lg">home</span>
                            Tempat Tinggal
                            <span className="text-primary ml-1">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-semibold">Rp</span>
                            <input
                              type="text"
                              name="housing"
                              value={formatRupiah(formData.housing)}
                              onChange={handleChange}
                              className="w-full bg-white/5 border border-white/20 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/30 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all disabled:opacity-50 group-hover:border-white/30"
                              placeholder="2.000.000"
                              required
                              disabled={isLoading || (!canAudit && !limitInfo?.isPremium)}
                            />
                          </div>
                          <p className="text-xs text-white/40 mt-1.5">Kost/sewa + listrik + air</p>
                        </div>

                        {/* Biaya Makan */}
                        <div className="group">
                          <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                            <span className="material-symbols-outlined text-green-400 text-lg">restaurant</span>
                            Makan
                            <span className="text-primary ml-1">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-semibold">Rp</span>
                            <input
                              type="text"
                              name="food"
                              value={formatRupiah(formData.food)}
                              onChange={handleChange}
                              className="w-full bg-white/5 border border-white/20 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/30 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all disabled:opacity-50 group-hover:border-white/30"
                              placeholder="1.500.000"
                              required
                              disabled={isLoading || (!canAudit && !limitInfo?.isPremium)}
                            />
                          </div>
                          <p className="text-xs text-white/40 mt-1.5">Makan 3x sehari</p>
                        </div>

                        {/* Biaya Transport */}
                        <div className="group">
                          <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                            <span className="material-symbols-outlined text-orange-400 text-lg">directions_car</span>
                            Transport
                            <span className="text-primary ml-1">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-semibold">Rp</span>
                            <input
                              type="text"
                              name="transport"
                              value={formatRupiah(formData.transport)}
                              onChange={handleChange}
                              className="w-full bg-white/5 border border-white/20 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all disabled:opacity-50 group-hover:border-white/30"
                              placeholder="500.000"
                              required
                              disabled={isLoading || (!canAudit && !limitInfo?.isPremium)}
                            />
                          </div>
                          <p className="text-xs text-white/40 mt-1.5">Pulang-pergi + kebutuhan</p>
                        </div>

                        {/* Jam Kerja */}
                        <div className="group">
                          <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                            <span className="material-symbols-outlined text-blue-400 text-lg">schedule</span>
                            Jam Kerja/Minggu
                            <span className="text-primary ml-1">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              name="workHours"
                              value={formData.workHours}
                              onChange={handleChange}
                              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all disabled:opacity-50 group-hover:border-white/30"
                              placeholder="40"
                              required
                              disabled={isLoading || (!canAudit && !limitInfo?.isPremium)}
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-sm">jam</span>
                          </div>
                          <p className="text-xs text-white/40 mt-1.5">Termasuk overtime</p>
                        </div>
                      </div>

                      {/* Target Tabungan */}
                      <div className="group">
                        <label className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                          <span className="material-symbols-outlined text-yellow-400 text-lg">savings</span>
                          Target Tabungan per Bulan
                          <span className="text-primary ml-1">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            name="savingsTarget"
                            value={formData.savingsTarget}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all disabled:opacity-50 group-hover:border-white/30"
                            placeholder="20"
                            min="0"
                            max="100"
                            required
                            disabled={isLoading || (!canAudit && !limitInfo?.isPremium)}
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-lg font-bold">%</span>
                        </div>
                        <p className="text-xs text-white/40 mt-1.5">Berapa persen dari gaji yang ingin disimpan?</p>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-white/10 my-8"></div>

                      {/* Submit Button */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                        <a 
                          href="/" 
                          className="inline-flex items-center gap-2 text-white/60 hover:text-white font-medium transition-colors disabled:opacity-50"
                          onClick={(e) => isLoading && e.preventDefault()}
                        >
                          <span className="material-symbols-outlined">arrow_back</span>
                          <span>Kembali</span>
                        </a>
                        
                        <button
                          type="submit"
                          className="group flex items-center gap-3 bg-primary hover:bg-primary/90 text-white font-black px-10 py-5 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 w-full sm:w-auto justify-center"
                          disabled={isLoading || (!canAudit && !limitInfo?.isPremium)}
                        >
                          <span>
                            {isLoading ? 'Memproses...' : 
                             !canAudit && !limitInfo?.isPremium ? 'Limit Habis - Upgrade' : 
                             'Mulai Analisis'}
                          </span>
                          {!isLoading && canAudit && (
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -z-10"></div>
            <div className="absolute bottom-40 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] -z-10"></div>
          </section>

          <Footer />
        </main>
      </div>
    </div>
  )
}

export default AuditForm