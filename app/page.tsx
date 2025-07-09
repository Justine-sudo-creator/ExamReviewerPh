import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ReviewerGrid from '@/components/ReviewerGrid'
import Footer from '@/components/Footer'
import FAQSection from '@/components/FAQSection'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ReviewerGrid />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}