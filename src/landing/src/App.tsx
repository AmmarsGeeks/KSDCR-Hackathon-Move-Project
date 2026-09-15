import { useState, useEffect } from 'react';
import {
  Shirt, Hospital, Calendar, Gamepad2, Users, Smartphone, Accessibility,
  Activity, FileCheck, Target, Dumbbell,
  MoveRight, ArrowUpRight, Globe, Sparkles, ChevronRight, Play,
  Video, ExternalLink
} from 'lucide-react';
import { RehabStudio } from './components/RehabStudio';
import { PizzaDemoShowcase } from './components/PizzaDemoShowcase';
import { MovementDemoShowcase } from './components/MovementDemoShowcase';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [activeTab, setActiveTab] = useState(0);
  const [viewMode, setViewMode] = useState<'landing' | 'pizza_demo' | 'movement_demo'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const view = params.get('view') || params.get('demo');
      if (view === 'pizza' || view === 'pizza-demo') return 'pizza_demo';
      if (view === 'movement' || view === 'angle' || view === 'movement-demo') return 'movement_demo';
      if (window.location.pathname.includes('pizza')) return 'pizza_demo';
      if (window.location.pathname.includes('movement')) return 'movement_demo';
    }
    return 'landing';
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const isAr = lang === 'ar';

  const tabs = [
    { nameEn: 'Walking & Gait', nameAr: 'المشي وتناسق الحركة', icon: MoveRight },
    { nameEn: 'Stretching & Lat Raise', nameAr: 'الإطالة والرفع الجانبي', icon: ArrowUpRight },
    { nameEn: 'Strength & Bicep Flexion', nameAr: 'القوة وثني الذراع', icon: Dumbbell },
    { nameEn: 'Range of Motion (ROM)', nameAr: 'المدى الحركي والمفاصل', icon: Activity },
  ];

  if (viewMode === 'pizza_demo') {
    return (
      <div className={`min-h-screen bg-neutral-950 font-sans text-neutral-100 p-4 sm:p-6 ${isAr ? 'rtl' : 'ltr'}`} dir={isAr ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center font-black text-white text-lg shadow-lg">
                M
              </div>
              <div>
                <span className="text-xl font-black text-white">MOVE AI</span>
                <span className="text-xs ml-2 text-emerald-400 font-mono">/pizza-demo</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setLang(l => l === 'en' ? 'ar' : 'en')}
                className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold text-neutral-300 hover:text-white"
              >
                <Globe className="w-3.5 h-3.5 inline mr-1 text-emerald-400" />
                {isAr ? 'English' : 'العربية'}
              </button>
              <button
                onClick={() => {
                  window.history.pushState(null, '', window.location.pathname);
                  setViewMode('landing');
                }}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs rounded-xl border border-neutral-700 transition-all"
              >
                {isAr ? '← العودة للرئيسية' : '← Back to Home'}
              </button>
            </div>
          </div>

          <PizzaDemoShowcase lang={lang} onBack={() => {
            window.history.pushState(null, '', window.location.pathname);
            setViewMode('landing');
          }} />
        </div>
      </div>
    );
  }

  if (viewMode === 'movement_demo') {
    return (
      <div className={`min-h-screen bg-neutral-950 font-sans text-neutral-100 p-4 sm:p-6 ${isAr ? 'rtl' : 'ltr'}`} dir={isAr ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center font-black text-white text-lg shadow-lg">
                M
              </div>
              <div>
                <span className="text-xl font-black text-white">MOVE AI</span>
                <span className="text-xs ml-2 text-teal-400 font-mono">/movement-demo</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setLang(l => l === 'en' ? 'ar' : 'en')}
                className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold text-neutral-300 hover:text-white"
              >
                <Globe className="w-3.5 h-3.5 inline mr-1 text-emerald-400" />
                {isAr ? 'English' : 'العربية'}
              </button>
              <button
                onClick={() => {
                  window.history.pushState(null, '', window.location.pathname);
                  setViewMode('landing');
                }}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs rounded-xl border border-neutral-700 transition-all"
              >
                {isAr ? '← العودة للرئيسية' : '← Back to Home'}
              </button>
            </div>
          </div>

          <MovementDemoShowcase lang={lang} onBack={() => {
            window.history.pushState(null, '', window.location.pathname);
            setViewMode('landing');
          }} />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-neutral-950 font-sans text-neutral-100 ${isAr ? 'rtl' : 'ltr'}`} dir={isAr ? 'rtl' : 'ltr'}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 shadow-xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-emerald-900/40">
              M
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white">MOVE</span>
              <span className="text-xs ml-2 px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-semibold uppercase">
                {isAr ? 'النسخة الذكية' : 'AI Rehab'}
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <button onClick={() => scrollToSection('studio')} className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              {isAr ? 'الاستوديو التفاعلي' : 'Live Studio'}
            </button>
            <button onClick={() => scrollToSection('problem')} className="text-neutral-400 hover:text-white transition-colors">
              {isAr ? 'المشكلة والدافع' : 'Problem'}
            </button>
            <button onClick={() => scrollToSection('solution')} className="text-neutral-400 hover:text-white transition-colors">
              {isAr ? 'الحل المبتكر' : 'Solution'}
            </button>
            <button onClick={() => scrollToSection('features')} className="text-neutral-400 hover:text-white transition-colors">
              {isAr ? 'المميزات' : 'Features'}
            </button>
            <button onClick={() => scrollToSection('pipeline')} className="text-neutral-400 hover:text-white transition-colors">
              {isAr ? 'هندسة النظام' : 'Pipeline'}
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(l => l === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold text-neutral-300 hover:text-white hover:border-neutral-700 transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              {isAr ? 'English' : 'العربية'}
            </button>

            <button
              onClick={() => scrollToSection('studio')}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5"
            >
              {isAr ? 'ابدأ التمرين الآن' : 'Try Live Demo'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-16 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/40 via-neutral-950 to-neutral-950 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center mb-8">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                {isAr ? 'تقنية حصرية موجهة للمجتمع السعودي' : 'Culturally-Adapted Saudi Rehab AI'}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-white tracking-tight">
                {isAr ? 'التأهيل الحركي الذكي' : 'Culturally-Adapted AI'}
                <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent mt-2">
                  {isAr ? 'المتكيف مع الزي السعودي' : 'Motion Analysis For Saudi Rehab'}
                </span>
              </h1>

              <p className="text-lg text-neutral-300 leading-relaxed max-w-2xl">
                {isAr
                  ? 'منصة علاج طبيعي قائمة على كاميرا الهاتف والذكاء الاصطناعي دون الحاجة لحساسات أو نوادٍ رياضية. تحول جلسات التمارين المنزلية إلى ألعاب تفاعلية دقيقة وموثوقة حتى مع ارتداء الثوب أو العباءة.'
                  : 'A markerless, smartphone-first AI motion analysis app that transforms home physical therapy into gamified micro-sessions. Engineered specifically for Saudi attire (thobe, abaya) with real-time biofeedback and clinical precision.'}
              </p>

              <div className="flex flex-wrap gap-2.5 pt-2">
                {tabs.map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      activeTab === i
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                    }`}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    {isAr ? tab.nameAr : tab.nameEn}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => scrollToSection('studio')}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-2xl font-bold text-base hover:shadow-xl hover:shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  {isAr ? 'جرب الكاميرا التفاعلية الآن' : 'Launch Live Camera Demo'}
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollToSection('pipeline')}
                  className="border border-neutral-700 bg-neutral-900/60 text-neutral-300 hover:text-white px-7 py-4 rounded-2xl font-bold text-base hover:border-neutral-500 transition-all flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  {isAr ? 'كيف يعمل النظام؟' : 'View Architecture'}
                </button>
              </div>

              {/* Showcase Quick Access */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button
                  onClick={() => {
                    window.history.pushState(null, '', '?view=pizza-demo');
                    setViewMode('pizza_demo');
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isAr ? '🎥 عرض فيديو لعبة البيتزا' : '🎥 Pizza Game Video Demo'}</span>
                </button>
                <button
                  onClick={() => {
                    window.history.pushState(null, '', '?view=movement-demo');
                    setViewMode('movement_demo');
                  }}
                  className="px-4 py-2 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/40 text-teal-300 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5 text-teal-400" />
                  <span>{isAr ? '🎥 عرض فيديو قياس الزوايا' : '🎥 Angle Movement Video Demo'}</span>
                </button>
                <a
                  href="http://localhost:5001/pizzagame"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-bold text-xs flex items-center gap-2 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{isAr ? 'خادم بايثون (:5001)' : 'Python Server (:5001)'}</span>
                </a>
              </div>

              <div className="pt-4 flex items-center gap-6 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {isAr ? 'معالجة محلية 100% داخل المتصفح' : '100% Local On-Device Processing'}
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {isAr ? 'خصوصية تامة بدون رفع الفيديو' : 'Zero Cloud Video Storage'}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-neutral-900/80 border border-neutral-800 p-5 rounded-2xl">
                <div className="text-3xl font-black text-emerald-400 font-mono">33</div>
                <div className="text-xs font-bold text-white mt-1">
                  {isAr ? 'معلم مفصلي ثلاثي الأبعاد' : '3D Joint Landmarks'}
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  {isAr ? 'تتبع فوري بدون علامات بأحدث خوارزميات الرؤية' : 'Sub-millimeter markerless tracking'}
                </p>
              </div>

              <div className="bg-neutral-900/80 border border-neutral-800 p-5 rounded-2xl">
                <div className="text-3xl font-black text-amber-400 font-mono">0.0s</div>
                <div className="text-xs font-bold text-white mt-1">
                  {isAr ? 'زمن المعايرة الأولي' : 'Zero Calibration'}
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  {isAr ? 'قف أمام الكاميرا بأي ملابس وستبدأ الجلسة فوراً' : 'Works immediately in any home clothing'}
                </p>
              </div>

              <div className="bg-neutral-900/80 border border-neutral-800 p-5 rounded-2xl">
                <div className="text-3xl font-black text-teal-400 font-mono">2,589</div>
                <div className="text-xs font-bold text-white mt-1">
                  {isAr ? 'سجل حركي سريري معتمد' : 'IntelliRehabDS Benchmarks'}
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  {isAr ? 'مقارنة آنية لمسار الزوايا مع المعايير الطبية' : 'Kinematic trajectory validation'}
                </p>
              </div>

              <div className="bg-neutral-900/80 border border-neutral-800 p-5 rounded-2xl">
                <div className="text-3xl font-black text-emerald-400 font-mono">3</div>
                <div className="text-xs font-bold text-white mt-1">
                  {isAr ? 'ألعاب علاجية تفاعلية' : 'Gamified Mini-Games'}
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  {isAr ? 'حصاد النخيل، تحليق الصقر، وإيقاع العرضة' : 'Oasis Harvest, Falcon Flight, Ardah Drums'}
                </p>
              </div>
            </div>
          </div>

          <div id="studio" className="pt-8">
            <RehabStudio lang={lang} />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-24 bg-neutral-900 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              {isAr ? 'الفجوة الطبية التي يعالجها مشروع MOVE' : 'The Critical Rehabilitation Gap in Saudi Arabia'}
            </h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              {isAr
                ? 'الحلول الحالية تفترض ملابس رياضية مكشوفة المفاصل أو عيادات باهظة التكاليف'
                : 'Prior computer vision rehab tools assume gym attire and exposed limbs. MOVE adapts directly to the reality of Saudi households.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shirt,
                titleEn: 'Cultural Attire Occlusion Gap',
                titleAr: 'فجوة حجب الملابس التقليدية',
                descEn: 'Standard models suffer severe landmark degradation when limbs are covered by thobe or abaya. MOVE is fine-tuned specifically for loose garments.',
                descAr: 'النماذج التقليدية تفقد دقتها بنسبة تصل إلى 65% عند ارتداء الثوب أو العباءة. يقدم MOVE تعويضاً حركياً متقدماً.'
              },
              {
                icon: Hospital,
                titleEn: 'Clinical Assessment Bottleneck',
                titleAr: 'عبء القياس السريري اليدوي',
                descEn: '38% of Saudi physical therapists report time constraints preventing standardized goniometry and outcome measurements.',
                descAr: '38% من أخصائيي العلاج الطبيعي في المملكة يواجهون ضيق الوقت في إجراء القياسات اليدوية الدقيقة (دراسة Alhwoaimel 2024).'
              },
              {
                icon: Calendar,
                titleEn: 'Patient Adherence Crisis',
                titleAr: 'انقطاع المرضى عن التمارين',
                descEn: 'Up to 65% of patients abandon home rehabilitation without engaging feedback. MOVE replaces paper sheets with gamified micro-sessions.',
                descAr: 'أكثر من 60% من المرضى يتركون التمارين المنزلية المملة. يحول MOVE التأهيل إلى جلسة لعب قصيرة ممتعة.'
              }
            ].map((item, i) => (
              <div key={i} className="bg-neutral-950 border border-neutral-800 rounded-3xl p-8 hover:border-emerald-500/50 transition-all hover:-translate-y-1 shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center mb-6 text-emerald-400">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {isAr ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-neutral-400 leading-relaxed text-sm">
                  {isAr ? item.descAr : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-4">
                {isAr ? 'الابتكار والحل' : 'MOVE INNOVATION'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">
                {isAr ? 'كيف يقدم MOVE تجربة تأهيل ثورية؟' : 'How MOVE Solves the Problem'}
              </h2>
              <p className="text-base text-neutral-300 mb-8 leading-relaxed">
                {isAr
                  ? 'بمجرد وضع الهاتف على أي طاولة منزلية، يقوم محرك الرؤية الحاسوبية بتتبع المفاصل بدقة واحتساب التكرارات والمدى الحركي، مع تقديم توجيه صوتي حي بالعربية والإنجليزية.'
                  : 'Propping a smartphone on any household object allows MOVE to extract 33 kinematic landmarks, score range of motion against gold-standard curves, and guide the patient through spoken voice coaching.'}
              </p>
              <div className="space-y-4">
                {[
                  { en: '100% On-Device Processing — Video never leaves the phone', ar: 'معالجة محلية بالكامل على الجهاز — الفيديو لا يغادر هاتفك إطلاقاً' },
                  { en: 'Occlusion-Robust Kinematic State Machine for Saudi Attire', ar: 'محرك ميكانيكا حيوية متكيف خصيصاً مع الثوب والعباءة الفضفاضة' },
                  { en: 'IntelliRehabDS Gold-Standard Trajectory Benchmarking', ar: 'مقارنة فورية مع 2,589 سجل حركي سريري معتمد' },
                  { en: 'Care-Network Alerts for Caregivers & Therapists on sustained regression', ar: 'تنبيهات لشبكة الرعاية والأخصائيين عند رصد أي تراجع مستمر' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 mt-0.5 text-emerald-400 font-bold text-xs">
                      ✓
                    </div>
                    <p className="text-neutral-300 text-sm font-medium">
                      {isAr ? item.ar : item.en}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { titleEn: 'Gamified Mini-Games', titleAr: 'ألعاب علاجية تفاعلية', icon: Gamepad2, descEn: 'Rotating themed mini-games', descAr: 'مكتبة متجددة لكل تمرين' },
                { titleEn: 'Care Network Alerts', titleAr: 'تنبيه شبكة الرعاية', icon: Users, descEn: 'Caregiver status tracking', descAr: 'متابعة الأسرة والأخصائي' },
                { titleEn: 'No Assumed Gym Setup', titleAr: 'دون تجهيزات رياضية', icon: Smartphone, descEn: 'Single propped phone', descAr: 'هاتف ذكي واحد فقط' },
                { titleEn: 'Explainable AI & Trust', titleAr: 'شفافية وموثوقية AI', icon: Accessibility, descEn: 'Auditable rule-based state machine', descAr: 'منطق خوارزمي سريري مدقق' }
              ].map((item, i) => (
                <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-center hover:border-emerald-500/40 transition-all">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center mb-3 text-emerald-400">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">{isAr ? item.titleAr : item.titleEn}</h4>
                  <p className="text-xs text-neutral-400">{isAr ? item.descAr : item.descEn}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Pipeline Section */}
      <section id="pipeline" className="py-24 bg-neutral-900 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              {isAr ? 'هندسة خط المعالجة الذكي (4 مراحل)' : 'The MOVE 4-Stage AI Pipeline'}
            </h2>
            <p className="text-base text-neutral-400 max-w-2xl mx-auto">
              {isAr
                ? 'فصل دقيق بين الرؤية الحاسوبية على الجهاز، والمنطق الخوارزمي الطبي، وشبكة النقل الآمنة'
                : 'A privacy-first pipeline coordinating local vision models, deterministic biomechanical state machines, and care network transport.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Smartphone, step: '01', titleEn: 'Capture (On-Device)', titleAr: '1. الالتقاط المباشر', descEn: 'Local smartphone camera stream at 30+ FPS. Raw video never leaves the device.', descAr: 'كاميرا الهاتف المباشرة. الفيديو لا يغادر الجهاز نهائياً.' },
              { icon: Target, step: '02', titleEn: 'Landmarks Extraction', titleAr: '2. استخراج المفاصل', descEn: '33 3D body keypoints with per-joint confidence weights and occlusion filters.', descAr: 'استخراج 33 نقطة مفصلية مع أوزان الثقة لتغطية الملابس.' },
              { icon: FileCheck, step: '03', titleEn: 'Deterministic State Machine', titleAr: '3. محرك القواعد السريري', descEn: 'Biomechanical ROM and tempo calculation against IntelliRehabDS ground-truth curves.', descAr: 'حساب زوايا المدى الحركي والسرعة بمقارنة منحنيات معيارية.' },
              { icon: Activity, step: '04', titleEn: 'Biofeedback & Transport', titleAr: '4. التوجيه الفوري والتنبيه', descEn: 'Spoken voice coaching + compact numerical record sent for caregiver trend analysis.', descAr: 'توجيه صوتي فوري وتوليد تقارير رقمية مشفرة لشبكة الرعاية.' }
            ].map((item, i) => (
              <div key={i} className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 relative">
                <div className="text-xs font-mono font-bold text-emerald-400 mb-2">{item.step}</div>
                <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400">
                  <item.icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base mb-2">{isAr ? item.titleAr : item.titleEn}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{isAr ? item.descAr : item.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-neutral-950 border-t border-neutral-800">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-12 text-center">
            {isAr ? 'مقارنة MOVE مع الحلول السابقة والأبحاث' : 'Competitive & Prior-Art Comparison'}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 text-xs uppercase tracking-wider">
                  <th className="py-4 px-4 font-bold">{isAr ? 'المشروع / المنظومة' : 'Solution / System'}</th>
                  <th className="py-4 px-4 font-bold text-center">{isAr ? 'الأجهزة المطلوبة' : 'Hardware Required'}</th>
                  <th className="py-4 px-4 font-bold text-center">{isAr ? 'تحمل الزي الفضفاض' : 'Saudi Clothing Robust'}</th>
                  <th className="py-4 px-4 font-bold text-center">{isAr ? 'ألعاب علاجية متعددة' : 'Multi-Tier Games'}</th>
                  <th className="py-4 px-4 font-bold text-center">{isAr ? 'خصوصية على الجهاز' : 'On-Device Privacy'}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: '🌟 MOVE (Saudi Adapted)', hw: 'Smartphone Only', cloth: '✅ Validated', game: '✅ Multi-Tier Library', priv: '✅ 100% Local', highlight: true },
                  { name: 'Standard WebPose AI (2025)', hw: 'Webcam / Laptop', cloth: '❌ Bare Limbs', game: '⚪ Single Routine', priv: '✅ WebAssembly' },
                  { name: 'PhysioVision (2026)', hw: 'Webcam / Laptop', cloth: '❌ Bare Limbs', game: '❌ Checklist only', priv: '✅ Client Side' },
                  { name: 'RecoveryLab (TreeHacks 2026)', hw: 'Wearables / Lab', cloth: '⚪ Partial', game: '❌ None', priv: '❌ Cloud Sync' },
                  { name: 'MoveAI / EchoRehab', hw: 'Kinect / Fixed Camera', cloth: '❌ Bare Limbs', game: '❌ None', priv: '❌ Cloud' },
                ].map((row, i) => (
                  <tr key={i} className={`border-b border-neutral-800/60 ${row.highlight ? 'bg-emerald-950/30 font-semibold' : ''}`}>
                    <td className={`py-4 px-4 ${row.highlight ? 'text-emerald-300 font-bold' : 'text-neutral-300'}`}>{row.name}</td>
                    <td className="py-4 px-4 text-center text-neutral-400">{row.hw}</td>
                    <td className="py-4 px-4 text-center text-neutral-300">{row.cloth}</td>
                    <td className="py-4 px-4 text-center text-neutral-300">{row.game}</td>
                    <td className="py-4 px-4 text-center text-neutral-300">{row.priv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-black text-white text-sm">
                M
              </div>
              <span className="text-xl font-bold text-white">MOVE</span>
              <span className="text-xs text-neutral-500">
                {isAr ? 'هاكاثون مركز الملك سلمان لأبحاث الإعاقة 2026' : 'KSCDR AI Hackathon 2026'}
              </span>
            </div>
            <div className="flex gap-8 text-neutral-400 text-xs">
              <button onClick={() => scrollToSection('studio')} className="hover:text-emerald-400 transition-colors">
                {isAr ? 'الاستوديو التفاعلي' : 'Live Studio'}
              </button>
              <button onClick={() => scrollToSection('problem')} className="hover:text-emerald-400 transition-colors">
                {isAr ? 'الفجوة البحثية' : 'Research Gap'}
              </button>
              <button onClick={() => scrollToSection('pipeline')} className="hover:text-emerald-400 transition-colors">
                {isAr ? 'هندسة النظام' : 'Architecture'}
              </button>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-neutral-900 text-center text-neutral-500 text-xs">
            {isAr
              ? '© 2026 مشروع MOVE — جميع الحقوق محفوظة لهكاثون مركز الملك سلمان لأبحاث الإعاقة.'
              : '© 2026 MOVE. King Salman Center for Disability Research Hackathon. All rights reserved.'}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
